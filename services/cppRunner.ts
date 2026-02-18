import { getRunnerApiUrl } from "../constants";
import { TestCase, RunSummary, TestResult } from "../types";
import { hasApiKey, simulateCppExecution } from "./aiService";

// Helper to format input arguments into a string stream for stdin
const serializeInputArg = (arg: any): string => {
    if (Array.isArray(arg)) {
        // Include size for each dimension so nested arrays stay parseable by token-based stdin.
        return `${arg.length} ${arg.map(serializeInputArg).join(' ')}`.trim();
    }
    return String(arg);
};

const formatInput = (args: any[]): string => {
    return args.map(serializeInputArg).join(' ');
};

// Helper to format expected output into a string for comparison
const flattenExpectedTokens = (value: any): string[] => {
    if (Array.isArray(value)) {
        return value.flatMap(flattenExpectedTokens);
    }
    return [String(value)];
};

const formatExpected = (expected: any): string => {
    return flattenExpectedTokens(expected).join(' ');
};

// Normalize output by splitting into tokens to ignore whitespace differences
const normalizeOutput = (str: string): string[] => {
    return str.trim().split(/\s+/).filter(s => s.length > 0);
};

const tokensMatch = (actualTokens: string[], expectedTokens: string[]): boolean => {
    if (actualTokens.length !== expectedTokens.length) return false;
    for (let i = 0; i < actualTokens.length; i++) {
        if (actualTokens[i] !== expectedTokens[i]) return false;
    }
    return true;
};

const runCppCodeWithAISimulation = async (
    code: string,
    testCases: TestCase[]
): Promise<RunSummary> => {
    const stdinCases = testCases.map(tc => formatInput(tc.input));
    const expectedTokenSets = testCases.map(tc => normalizeOutput(formatExpected(tc.expected)));

    const simulated = await simulateCppExecution(code, stdinCases);

    if (simulated.compileError) {
        return {
            total: testCases.length,
            passed: 0,
            results: [],
            error: `Compilation Error (AI Simulation):\n${simulated.compileError}`
        };
    }

    if (simulated.caseResults.length !== testCases.length) {
        throw new Error(
            `AI simulation returned ${simulated.caseResults.length} test outputs for ${testCases.length} test cases.`
        );
    }

    const results: TestResult[] = simulated.caseResults.map((caseResult, idx) => {
        const expectedTokens = expectedTokenSets[idx];
        const stdin = stdinCases[idx];

        if (caseResult.runtimeError) {
            return {
                passed: false,
                input: stdin,
                expected: expectedTokens.join(' '),
                actual: 'Runtime Error',
                error: `AI Simulation: ${caseResult.runtimeError}`,
                executionTime: 0
            } as TestResult;
        }

        const actualTokens = normalizeOutput(caseResult.stdout || '');
        const passed = tokensMatch(actualTokens, expectedTokens);

        return {
            passed,
            input: stdin,
            expected: expectedTokens.join(' '),
            actual: actualTokens.join(' '),
            executionTime: 0
        } as TestResult;
    });

    return {
        total: testCases.length,
        passed: results.filter(r => r.passed).length,
        results
    };
};

export const runCppCode = async (
    code: string,
    functionName: string, // Unused in this mode, kept for interface compatibility
    testCases: TestCase[]
): Promise<RunSummary> => {

    const results: TestResult[] = [];
    const runnerApiUrl = getRunnerApiUrl();
    const aiAvailable = hasApiKey();
    let aiFallbackError: string | null = null;

    // Prefer AI simulation if an OpenRouter key exists.
    if (aiAvailable) {
        try {
            return await runCppCodeWithAISimulation(code, testCases);
        } catch (aiError: any) {
            aiFallbackError = aiError?.message || String(aiError);
            console.warn("AI simulation failed, falling back to code-runner API:", aiError);
        }
    }

    // Helper to sleep
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Execute test cases sequentially to avoid Rate Limiting (1 request / 200ms)
    for (const [idx, tc] of testCases.entries()) {
        // Add delay between requests (except the first one)
        if (idx > 0) await sleep(300);

        const stdin = formatInput(tc.input);
        const expectedTokens = normalizeOutput(formatExpected(tc.expected));

        try {
            const hasUncommentedFileIO = (code: string) => {
                const lines = code.split('\n');
                return lines.some(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('//')) return false;
                    return line.includes('freopen') || line.includes('ifstream');
                });
            };

            let finalCode = code;

            // If file I/O is detected, wrap the user code to generate problem.in at runtime
            if (hasUncommentedFileIO(code)) {
                // Use standard string literal with escaping instead of raw string
                // This avoids delimiter issues and compiler quirks
                const escapedInput = stdin
                    .replace(/\\/g, '\\\\')
                    .replace(/"/g, '\\"')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '');

                finalCode = `
#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <unistd.h>
#include <cstdio>

// Rename user main so we can wrap it
#define main _user_main

${code}

#undef main

int main() {
    // 1. Create problem.in from the test case input
    std::ofstream in("problem.in");
    in << "${escapedInput}";
    in.close();

    // 2. Save original stdout fd
    int original_stdout = dup(fileno(stdout));

    // 3. Run user main (which might freopen stdout)
    _user_main();

    // 4. Restore stdout
    fflush(stdout);
    dup2(original_stdout, fileno(stdout));
    close(original_stdout);

    // 5. Read problem.out and print to restored stdout
    std::ifstream out("problem.out");
    if (out) {
        std::cout << out.rdbuf();
    }

    return 0;
}
`;
            }

            const response = await fetch(runnerApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: 'cpp',
                    version: '10.2.0',
                    files: [
                        {
                            name: 'solution',
                            content: finalCode
                        }
                    ],
                    stdin: stdin, // Still pass stdin for good measure, though freopen will ignore it
                    compile_timeout: 10000,
                    run_timeout: 5000,
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                const isWhitelistError =
                    response.status === 401 &&
                    /whitelist only/i.test(errorText);

                if (isWhitelistError) {
                    return {
                        total: testCases.length,
                        passed: 0,
                        results: [],
                        error: aiFallbackError
                            ? `Code runner rejected requests from this endpoint (${runnerApiUrl}). The public Piston API became whitelist-only on February 15, 2026. AI simulation also failed: ${aiFallbackError}`
                            : `Code runner rejected requests from this endpoint (${runnerApiUrl}). The public Piston API became whitelist-only on February 15, 2026. Configure your own Piston URL in the app settings (Code Runner API URL) or add an OpenRouter API key to use AI simulation fallback.`
                    };
                }

                results.push({
                    passed: false,
                    input: JSON.stringify(tc.input),
                    expected: JSON.stringify(tc.expected),
                    actual: 'API Error',
                    error: `API Error: ${response.status} - ${errorText}`,
                    executionTime: 0
                } as TestResult);
                continue;
            }

            const data = await response.json();

            // Check for compilation errors
            if (data.compile && data.compile.code !== 0) {
                return {
                    total: testCases.length,
                    passed: 0,
                    results: [],
                    error: `Compilation Error:\n${data.compile.stderr || data.compile.output}`
                };
            }

            // Check for runtime errors
            if (data.run && data.run.code !== 0 && data.run.stderr) {
                results.push({
                    passed: false,
                    input: JSON.stringify(tc.input),
                    expected: JSON.stringify(tc.expected),
                    actual: 'Runtime Error',
                    error: data.run.stderr,
                    executionTime: 0
                } as TestResult);
                continue;
            }

            // Compare output
            const stdout = data.run?.stdout || '';
            const actualTokens = normalizeOutput(stdout);

            // Compare tokens
            let passed = actualTokens.length === expectedTokens.length;
            if (passed) {
                for (let i = 0; i < actualTokens.length; i++) {
                    if (actualTokens[i] !== expectedTokens[i]) {
                        passed = false;
                        break;
                    }
                }
            }

            results.push({
                passed,
                input: stdin, // Show what was actually fed to stdin
                expected: expectedTokens.join(' '),
                actual: actualTokens.join(' '),
                error: undefined,
                executionTime: 0
            } as TestResult);

        } catch (error: any) {
            results.push({
                passed: false,
                input: JSON.stringify(tc.input),
                expected: JSON.stringify(tc.expected),
                actual: 'Network Error',
                error: aiFallbackError
                    ? `${error.message} (AI simulation fallback also failed: ${aiFallbackError})`
                    : error.message,
                executionTime: 0
            } as TestResult);
        }
    }

    const passedCount = results.filter(r => r.passed).length;

    return {
        total: testCases.length,
        passed: passedCount,
        results
    };
};
