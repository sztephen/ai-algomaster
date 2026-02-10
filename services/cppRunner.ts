import { PISTON_API_URL } from "../constants";
import { TestCase, RunSummary, TestResult } from "../types";

// Helper to format input arguments into a string stream for stdin
const formatInput = (args: any[]): string => {
    return args.map(arg => {
        if (Array.isArray(arg)) {
            // New USACO convention: arrays are usually preceded by their length
            // We'll prepend the length to be helpful
            return `${arg.length} ${arg.join(' ')}`;
        }
        return String(arg);
    }).join(' ');
};

// Helper to format expected output into a string for comparison
const formatExpected = (expected: any): string => {
    if (Array.isArray(expected)) {
        return expected.join(' ');
    }
    return String(expected);
};

// Normalize output by splitting into tokens to ignore whitespace differences
const normalizeOutput = (str: string): string[] => {
    return str.trim().split(/\s+/).filter(s => s.length > 0);
};

export const runCppCode = async (
    code: string,
    functionName: string, // Unused in this mode, kept for interface compatibility
    testCases: TestCase[]
): Promise<RunSummary> => {

    const results: TestResult[] = [];

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

            const response = await fetch(PISTON_API_URL, {
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
                results.push({
                    passed: false,
                    input: JSON.stringify(tc.input),
                    expected: JSON.stringify(tc.expected),
                    actual: 'Compilation Error',
                    error: data.compile.stderr || data.compile.output,
                    executionTime: 0
                } as TestResult);
                continue;
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
                error: error.message,
                executionTime: 0
            } as TestResult);
        }
    }

    // Check if any compilation error occurred
    const compileError = results.find(r => r.actual === 'Compilation Error');
    if (compileError) {
        return {
            total: testCases.length,
            passed: 0,
            results: [],
            error: `Compilation Error:\n${compileError.error}`
        };
    }

    const passedCount = results.filter(r => r.passed).length;

    return {
        total: testCases.length,
        passed: passedCount,
        results
    };
};
