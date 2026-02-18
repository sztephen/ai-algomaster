import { Problem, RunSummary } from "../types";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "google/gemini-3-pro-preview";
const EXECUTION_SIM_MODEL = "google/gemini-3-flash-preview";
const API_KEY_STORAGE_KEY = 'algomaster_openrouter_key';

const getApiKey = (): string => {
    // Check localStorage first (user-entered key), then fall back to env var
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) return storedKey;
    return (import.meta as any).env?.VITE_OPENROUTER_API_KEY || '';
};

export const saveApiKey = (key: string): void => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
};

export const getSavedApiKey = (): string => {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
};

export const hasApiKey = (): boolean => {
    return !!getApiKey();
};

interface OpenRouterMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

interface OpenRouterResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

interface CallOpenRouterOptions {
    jsonMode?: boolean;
    model?: string;
    temperature?: number;
}

export interface AISimulatedCaseResult {
    stdout: string;
    runtimeError?: string;
}

export interface AISimulatedExecution {
    compileError?: string;
    caseResults: AISimulatedCaseResult[];
}

const extractJsonObjectText = (responseText: string): string => {
    let jsonStr = responseText;

    const codeBlockMatch = responseText.match(/```[\s\S]*?```/);
    if (codeBlockMatch) {
        const blockContent = codeBlockMatch[0]
            .replace(/^```(?:[\w+\-.]*)?/, '')
            .replace(/```$/, '');
        jsonStr = blockContent;
    }

    const firstOpen = jsonStr.indexOf('{');
    const lastClose = jsonStr.lastIndexOf('}');
    if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
        jsonStr = jsonStr.substring(firstOpen, lastClose + 1);
    }

    return jsonStr;
};

const callOpenRouter = async (
    messages: OpenRouterMessage[],
    options: CallOpenRouterOptions = {}
): Promise<string> => {
    const {
        jsonMode = false,
        model = DEFAULT_MODEL,
        temperature
    } = options;

    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("OpenRouter API key not configured. Please enter your API key on the home screen.");
    }

    const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
            "X-Title": "AI AlgoMaster"
        },
        body: JSON.stringify({
            model,
            messages,
            ...(typeof temperature === 'number' && { temperature }),
            ...(jsonMode && { response_format: { type: "json_object" } })
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content || "";
};

export const simulateCppExecution = async (code: string, stdinCases: string[]): Promise<AISimulatedExecution> => {
    const systemPrompt = `You are a strict and deterministic C++17 compiler/runtime simulator.
Return ONLY valid JSON with no markdown and no extra keys.`;

    const userPrompt = `
Simulate this C++ code against each stdin case in order.

C++ code:
\`\`\`cpp
${code}
\`\`\`

stdin_cases_json:
${JSON.stringify(stdinCases, null, 2)}

Rules:
1. First do compile checking exactly like a strict C++17 compiler:
   - Syntax/parsing errors
   - Missing symbols/includes
   - Type errors and signature mismatches
   - Any other compile-time error
2. If code does not compile, return "compile_error" (string) and set "case_results" to [].
3. If code compiles, set "compile_error" to null.
4. For each stdin case, return one object in "case_results" with:
   - "stdout": exact output text from stdout (string, can be empty)
   - "runtime_error": null when none, otherwise a short error message
5. Simulate stdin/stdout behavior faithfully (token parsing like std::cin >> by whitespace).
6. Keep case_results length exactly equal to stdin_cases_json length when compile_error is null.
7. Be conservative: if uncertain about a case, prefer runtime_error over invented stdout.
8. No explanations. JSON only.

Required output format:
{
  "compile_error": null,
  "case_results": [
    { "stdout": "text", "runtime_error": null }
  ]
}`;

    const messages: OpenRouterMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
    ];

    let responseText = "";
    try {
        responseText = await callOpenRouter(messages, {
            jsonMode: true,
            model: EXECUTION_SIM_MODEL,
            temperature: 0
        });
    } catch (flashError: any) {
        const msg = String(flashError?.message || flashError).toLowerCase();
        const shouldFallbackModel =
            msg.includes("model") ||
            msg.includes("unsupported") ||
            msg.includes("not found") ||
            msg.includes("unavailable");

        if (!shouldFallbackModel) {
            throw flashError;
        }

        responseText = await callOpenRouter(messages, {
            jsonMode: true,
            model: DEFAULT_MODEL,
            temperature: 0
        });
    }

    const parsed = JSON.parse(extractJsonObjectText(responseText));
    const compileError = typeof parsed.compile_error === 'string' ? parsed.compile_error : undefined;
    const rawCaseResults = Array.isArray(parsed.case_results) ? parsed.case_results : [];

    const caseResults: AISimulatedCaseResult[] = rawCaseResults.map((item: any) => ({
        stdout: typeof item?.stdout === 'string' ? item.stdout : String(item?.stdout ?? ''),
        runtimeError: typeof item?.runtime_error === 'string' ? item.runtime_error : undefined
    }));

    if (!compileError && stdinCases.length > 0 && caseResults.length === 0) {
        throw new Error("AI simulation produced no case outputs.");
    }

    return { compileError, caseResults };
};

export const generateProblems = async (userPrompt: string): Promise<Problem[]> => {
    const systemPrompt = `You are a C++ coding interview generator. Output ONLY valid JSON, no markdown.`;

    const userMessage = `
User Request: "${userPrompt}"

Generate a list of C++ coding problems based on the user's request.
If the user does not specify a quantity, generate at least 3 problems.

For EACH problem, provide:
1. A clear, Markdown-formatted description. Include strict Input/Output format specifications (e.g. "Line 1: Two integers...").
2. A C++ starter code template with a \`main\` function and standard includes.
3. Exactly 25 diverse test cases covering edge cases.
4. Deterministic solutions.

CRITICAL: 
- 'input_json' must be valid JSON arguments. Note: The system converts arrays to "Length Elements..." in stdin automatically.
- 'expected_json' must be valid JSON return value.
- Use standard C++ types.

Output strictly in this JSON format:
{
  "problems": [
    {
      "title": "Problem Title",
      "description": "Markdown description. Explicitly state Input/Output format.",
      "difficulty": "Beg/Easy/Med/Hard",
      "functionName": "main",
      "starterCode": "#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    // Your code here\\n    return 0;\\n}",
      "testCases": [
        { "input_json": "[[1, 2], 9]", "expected_json": "[0, 1]" }
      ]
    }
  ]
}`;

    try {
        const responseText = await callOpenRouter([
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
        ], { jsonMode: true });

        // Extract JSON from response
        let jsonStr = responseText;

        // 1. Try to extract from markdown code block first
        const codeBlockMatch = responseText.match(/```[\s\S]*?```/);
        if (codeBlockMatch) {
            // Remove the backticks and any potential language tag/whitespace at start/end
            // We don't rely on regex groups for language tags as they can be messy.
            // Just take the content and then look for braces.
            const blockContent = codeBlockMatch[0].replace(/^```(?:[\w+\-.]*)?/, '').replace(/```$/, '');
            jsonStr = blockContent;
        }

        // 2. Locate the outer-most JSON object brackets
        const firstOpen = jsonStr.indexOf('{');
        const lastClose = jsonStr.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            jsonStr = jsonStr.substring(firstOpen, lastClose + 1);
        }

        const data = JSON.parse(jsonStr);

        if (!data.problems || !Array.isArray(data.problems)) {
            throw new Error("Invalid response format: 'problems' array missing.");
        }

        // Process each problem
        const processedProblems = data.problems.map((prob: any) => {
            const rawTestCases = Array.isArray(prob.testCases) ? prob.testCases : [];
            if (rawTestCases.length === 0) {
                throw new Error(`Invalid response format: problem "${prob.title || 'Untitled'}" is missing testCases.`);
            }

            const processedTestCases = rawTestCases.map((tc: any) => {
                let parsedInput = [];
                let parsedExpected = null;

                try {
                    parsedInput = JSON.parse(tc.input_json);
                } catch (e) {
                    console.error("Failed to parse input_json", tc.input_json);
                    parsedInput = [tc.input_json];
                }

                try {
                    parsedExpected = JSON.parse(tc.expected_json);
                } catch (e) {
                    console.error("Failed to parse expected_json", tc.expected_json);
                    parsedExpected = tc.expected_json;
                }

                return {
                    input: Array.isArray(parsedInput) ? parsedInput : [parsedInput],
                    expected: parsedExpected
                };
            });

            return {
                ...prob,
                testCases: processedTestCases
            };
        });

        return processedProblems;

    } catch (error) {
        console.error("OpenRouter Error:", error);
        throw error;
    }
};

export const getAIFeedback = async (problem: Problem, userCode: string, runSummary: RunSummary): Promise<string> => {
    const failedTests = runSummary.results.filter(r => !r.passed).slice(0, 3);

    const prompt = `
The user is solving: "${problem.title}".

User's C++ Code:
\`\`\`cpp
${userCode}
\`\`\`

Test Results: Passed ${runSummary.passed}/${runSummary.total}.
Failures: ${JSON.stringify(failedTests)}
Error: ${runSummary.error || "None"}

INSTRUCTIONS:
1. **Analyze the user's code** and identify why it failed the specific test cases or produced the error.
2. **Prioritize FIXING** the user's existing logic/approach if possible, rather than suggesting a completely different solution. Only suggest a new approach if the current one is fundamentally flawed.
3. **Format your response** using clear Markdown:
   - Use **Bold** for key terms, variable names, and emphasis.
   - Use \`Code blocks\` for code snippets.
   - Use > Blockquotes for important notes.
   - Use ### Headers to structure your feedback (e.g., "### Error Analysis", "### Suggested Fix").
4. Provide a **Corrected Code Snippet** at the end that fixes the specific issue.

Keep the explanation concise but helpful.
`;

    try {
        const response = await callOpenRouter([
            { role: "user", content: prompt }
        ]);
        return response || "Keep going!";
    } catch (e) {
        return "Unable to generate feedback.";
    }
};

export interface HintMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const getAIHint = async (
    problem: Problem,
    userCode: string,
    conversationHistory: HintMessage[] = [],
    userQuestion?: string
): Promise<string> => {
    const systemPrompt = `You are a straightforward coding tutor helping a student solve a C++ problem.

RULES:
- Be direct and helpful - no fluff
- Give clear, actionable guidance
- You can mention specific techniques, data structures (like unordered_map, vector, etc.), or STL algorithms to try
- If they ask a follow-up question, answer it directly
- Don't write the full solution, but you can show small code snippets or examples if it helps explain a concept
- Keep responses concise (2-4 sentences usually)`;

    const problemContext = `
Problem: **${problem.title}** (${problem.difficulty})

${problem.description}

Current code:
\`\`\`cpp
${userCode}
\`\`\``;

    // Build messages with conversation history
    const messages: OpenRouterMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: problemContext }
    ];

    // Add conversation history
    for (const msg of conversationHistory) {
        messages.push({ role: msg.role, content: msg.content });
    }

    // Add the new question if provided
    if (userQuestion) {
        messages.push({ role: "user", content: userQuestion });
    } else if (conversationHistory.length === 0) {
        messages.push({ role: "user", content: "I'm stuck. What approach should I consider?" });
    }

    try {
        const response = await callOpenRouter(messages);
        return response || "Try thinking about what data structure would help here.";
    } catch (e) {
        return "Unable to get hint. Check your approach and edge cases!";
    }
};
