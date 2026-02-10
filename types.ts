export interface TestCase {
  input: any[]; // Arguments to pass to the function
  expected: any; // Expected return value
}

export interface Problem {
  title: string;
  description: string;
  difficulty: string; // Any difficulty word (e.g., Easy, Medium, Hard, Expert, Beginner, etc.)
  functionName: string;
  starterCode: string;
  testCases: TestCase[];
  // User progress tracking
  userCode?: string; // User's saved code for this problem
  completed?: boolean; // Whether user passed all test cases
  completedDate?: string; // ISO Date string
}

export interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  error?: string;
  executionTime: number; // in ms
}

export interface RunSummary {
  total: number;
  passed: number;
  results: TestResult[];
  error?: string; // Global error (e.g. syntax error)
}

export enum AppState {
  IDLE,
  GENERATING_PROBLEM,
  SELECTING_PROBLEM,
  CODING,
  RUNNING_TESTS,
  ANALYZING_FEEDBACK
}
