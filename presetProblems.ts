import { Problem } from "./types";

/**
 * USACO Bronze Preparation Problems
 * 18 topics × 5 problems each = 90 problems
 */
export const PRESET_PROBLEMS: Problem[] = [
    {
        title: "Welcome to C++",
        description: "## Problem\n\nWrite a program that prints \"Hello USACO\" to the console.\n\n## Input\nNone.\n\n## Output\nPrint `Hello USACO` followed by a newline.\n\n## Example\n```\nOutput:\nHello USACO\n```",
        difficulty: "Basics",
        functionName: "main",
        starterCode: "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // Print Hello USACO here\n    // cout << ...\n    return 0;\n}",
        testCases: [
            {
                "input": [
                    0
                ],
                "expected": [
                    "Hello USACO"
                ]
            }
        ]
    },
    {
        title: "Input and Output",
        description: "## Problem\n\nRead an integer from input and print it back multiplied by 2.\n\n## Input\nA single integer $N$.\n\n## Output\nThe value $N \\times 2$.\n\n## Example\n```\nInput: 5\nOutput: 10\n```",
        difficulty: "Basics",
        functionName: "main",
        starterCode: "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // 1. Declare a variable: int n;\n    // 2. Read input: cin >> n;\n    // 3. Print output: cout << n * 2 << endl;\n    return 0;\n}",
        testCases: [
            {
                "input": [
                    5
                ],
                "expected": [
                    10
                ]
            },
            {
                "input": [
                    100
                ],
                "expected": [
                    200
                ]
            },
            {
                "input": [
                    -3
                ],
                "expected": [
                    -6
                ]
            }
        ]
    },
    {
        title: "Variable Types",
        description: "## Problem\n\nRead a `string` (name) and an `int` (age), then print \"[name] is [age] years old\".\n\n## Input\nA string $S$ and an integer $A$.\n\n## Output\nFormatted string.\n\n## Example\n```\nInput: Bessie 12\nOutput: Bessie is 12 years old\n```",
        difficulty: "Basics",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    // string name;\n    // int age;\n    // cin >> ...\n    return 0;\n}",
        testCases: [
            {
                "input": [
                    "Bessie",
                    12
                ],
                "expected": [
                    "Bessie is 12 years old"
                ]
            },
            {
                "input": [
                    "Farmer",
                    50
                ],
                "expected": [
                    "Farmer is 50 years old"
                ]
            }
        ]
    },
    {
        title: "The Long Long Type",
        description: "## Problem\n\nCalculate the product of two large integers $A$ and $B$ that might exceed standard `int` size ($2^{31}$). Use `long long`.\n\n## Input\nTwo integers $A, B$ ($0 \\le A, B \\le 10^{9}$).\n\n## Output\nThe product $A \\times B$.\n\n## Example\n```\nInput: 100000 100000\nOutput: 10000000000\n```",
        difficulty: "Basics",
        functionName: "main",
        starterCode: "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // Use long long instead of int for large numbers\n    // long long a, b;\n    return 0;\n}",
        testCases: [
            {
                "input": [
                    100000,
                    100000
                ],
                "expected": [
                    10000000000
                ]
            },
            {
                "input": [
                    123456,
                    123456
                ],
                "expected": [
                    15241383936
                ]
            },
            {
                "input": [
                    0,
                    100
                ],
                "expected": [
                    0
                ]
            }
        ]
    },
    {
        title: "USACO File I/O Setup",
        description: "## Problem\n\nIn older USACO problems, you must read from a file `problem.in` and write to `problem.out`.\nSimulate this using `freopen`.\n\nRead two integers from standard input (simulating file) and print their sum.\n\n## IMPORTANT\nYou typically add:\n```cpp\nfreopen(\"problem.in\", \"r\", stdin);\nfreopen(\"problem.out\", \"w\", stdout);\n```\n(The runner handles the actual file creation for you).\n\n## Input\nTwo integers.\n\n## Output\nSum.\n\n## Example\n```\nInput: 3 4\nOutput: 7\n```",
        difficulty: "Basics",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <cstdio>\n\nusing namespace std;\n\nint main() {\n    // Uncomment these lines in a real contest (or here if you want to test file I/O)\n    // freopen(\"problem.in\", \"r\", stdin);\n    // freopen(\"problem.out\", \"w\", stdout);\n    \n    int a, b;\n    if (cin >> a >> b) {\n        cout << a + b << endl;\n    }\n    return 0;\n}",
        testCases: [
            {
                "input": [
                    3,
                    4
                ],
                "expected": [
                    7
                ]
            },
            {
                "input": [
                    10,
                    20
                ],
                "expected": [
                    30
                ]
            }
        ]
    },
    {
        title: "Reading Vectors",
        description: "## Problem\n\nRead an integer $N$, then read $N$ integers into a vector or array, and print them in reverse order.\n\n## Input\nLine 1: $N$\nLine 2: $N$ integers\n\n## Output\nThe integers in reverse, space separated.\n\n## Example\n```\nInput:\n3\n10 20 30\n\nOutput:\n30 20 10\n```",
        difficulty: "Basics",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int N;\n    cin >> N;\n    // vector<int> arr(N);\n    // for(int i=0; i<N; ++i) ...\n    return 0;\n}",
        testCases: [
            {
                "input": [
                    3,
                    10,
                    20,
                    30
                ],
                "expected": [
                    "30 20 10"
                ]
            },
            {
                "input": [
                    1,
                    5
                ],
                "expected": [
                    "5"
                ]
            }
        ]
    },
    {
        title: "If Else Logic",
        description: "## Problem\n\nRead an integer $N$.\n- If $N > 100$, print \"Large\".\n- If $50 \\le N \\le 100$, print \"Medium\".\n- If $N < 50$, print \"Small\".\n\n## Example\n```\nInput: 75\nOutput: Medium\n```",
        difficulty: "Basics",
        functionName: "main",
        starterCode: "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // if (n > 100) ...\n    return 0;\n}",
        testCases: [
            {
                "input": [
                    150
                ],
                "expected": [
                    "Large"
                ]
            },
            {
                "input": [
                    75
                ],
                "expected": [
                    "Medium"
                ]
            },
            {
                "input": [
                    10
                ],
                "expected": [
                    "Small"
                ]
            },
            {
                "input": [
                    50
                ],
                "expected": [
                    "Medium"
                ]
            },
            {
                "input": [
                    100
                ],
                "expected": [
                    "Medium"
                ]
            }
        ]
    },
    {
        title: "Conditionals and Loops",
        description: "## Problem\n\nPrint all even numbers from 1 to $N$ (inclusive), space separated.\n\n## Input\nInteger $N$.\n\n## Output\nEven numbers.\n\n## Example\n```\nInput: 10\nOutput: 2 4 6 8 10\n```",
        difficulty: "Basics",
        functionName: "main",
        starterCode: "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // for (int i = 1; i <= n; i++) ...\n    return 0;\n}",
        testCases: [
            {
                "input": [
                    10
                ],
                "expected": [
                    "2 4 6 8 10"
                ]
            },
            {
                "input": [
                    5
                ],
                "expected": [
                    "2 4"
                ]
            },
            {
                "input": [
                    1
                ],
                "expected": [
                    ""
                ]
            }
        ]
    },
    {
        title: "Sum Two Numbers",
        description: `## Problem
Given two integers \`a\` and \`b\`, return their sum.
## Example
\`\`\`
Input: a = 5, b = 3
Output: 8
\`\`\``,
        difficulty: "Very Easy",
        functionName: "sum_two",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5, 3], expected: 8 },
            { input: [0, 0], expected: 0 },
            { input: [-1, 1], expected: 0 },
            { input: [100, 200], expected: 300 },
            { input: [-50, -50], expected: -100 },
        ],
    },
    {
        title: "Integer Division",
        description: `## Problem
Given two integers \`a\` and \`b\`, return the result of integer division \`a / b\`.
## Example
\`\`\`
Input: a = 10, b = 3
Output: 3
\`\`\``,
        difficulty: "Very Easy",
        functionName: "int_divide",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [10, 3], expected: 3 },
            { input: [15, 5], expected: 3 },
            { input: [7, 2], expected: 3 },
            { input: [100, 10], expected: 10 },
            { input: [1, 2], expected: 0 },
        ],
    },
    {
        title: "Swap Values",
        description: `## Problem
Given two integers, return a vector with them swapped.
## Example
\`\`\`
Input: a = 5, b = 10
Output: {10, 5}
\`\`\``,
        difficulty: "Very Easy",
        functionName: "swap_values",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5, 10], expected: [10, 5] },
            { input: [1, 2], expected: [2, 1] },
            { input: [0, 0], expected: [0, 0] },
            { input: [-5, 5], expected: [5, -5] },
            { input: [100, 1], expected: [1, 100] },
        ],
    },
    {
        title: "Calculate Average",
        description: `## Problem
Given three integers, return their average as an integer (floor division).
## Example
\`\`\`
Input: a = 10, b = 20, c = 30
Output: 20
\`\`\``,
        difficulty: "Very Easy",
        functionName: "average_three",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [10, 20, 30], expected: 20 },
            { input: [1, 2, 3], expected: 2 },
            { input: [5, 5, 5], expected: 5 },
            { input: [0, 0, 9], expected: 3 },
            { input: [100, 200, 300], expected: 200 },
        ],
    },
    {
        title: "Remainder Operation",
        description: `## Problem
Given two integers \`a\` and \`b\`, return the remainder when \`a\` is divided by \`b\`.
## Example
\`\`\`
Input: a = 10, b = 3
Output: 1
\`\`\``,
        difficulty: "Very Easy",
        functionName: "get_remainder",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [10, 3], expected: 1 },
            { input: [15, 5], expected: 0 },
            { input: [7, 2], expected: 1 },
            { input: [100, 7], expected: 2 },
            { input: [1, 10], expected: 1 },
        ],
    },
    {
        title: "Compare Two Numbers",
        description: `## Problem
Given two integers, return:
- 1 if a > b
- -1 if a < b  
- 0 if a == b
## Example
\`\`\`
Input: a = 5, b = 3
Output: 1
\`\`\``,
        difficulty: "Very Easy",
        functionName: "compare_nums",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5, 3], expected: 1 },
            { input: [3, 5], expected: -1 },
            { input: [5, 5], expected: 0 },
            { input: [-1, -2], expected: 1 },
            { input: [0, 0], expected: 0 },
        ],
    },
    {
        title: "Is Divisible",
        description: `## Problem
Return 1 if \`a\` is divisible by \`b\`, otherwise return 0.
## Example
\`\`\`
Input: a = 10, b = 5
Output: 1
\`\`\``,
        difficulty: "Very Easy",
        functionName: "is_divisible",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [10, 5], expected: 1 },
            { input: [10, 3], expected: 0 },
            { input: [15, 3], expected: 1 },
            { input: [7, 7], expected: 1 },
            { input: [100, 9], expected: 0 },
        ],
    },
    {
        title: "Both Positive",
        description: `## Problem
Return 1 if both numbers are positive (> 0), otherwise return 0.
## Example
\`\`\`
Input: a = 5, b = 3
Output: 1
\`\`\``,
        difficulty: "Very Easy",
        functionName: "both_positive",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5, 3], expected: 1 },
            { input: [-1, 5], expected: 0 },
            { input: [0, 5], expected: 0 },
            { input: [1, 1], expected: 1 },
            { input: [-5, -3], expected: 0 },
        ],
    },
    {
        title: "Max of Three",
        description: `## Problem
Return the maximum of three integers.
## Example
\`\`\`
Input: a = 5, b = 10, c = 3
Output: 10
\`\`\``,
        difficulty: "Very Easy",
        functionName: "max_three",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5, 10, 3], expected: 10 },
            { input: [1, 2, 3], expected: 3 },
            { input: [100, 50, 75], expected: 100 },
            { input: [-1, -2, -3], expected: -1 },
            { input: [5, 5, 5], expected: 5 },
        ],
    },
    {
        title: "In Range",
        description: `## Problem
Return 1 if \`x\` is between \`low\` and \`high\` (inclusive), otherwise 0.
## Example
\`\`\`
Input: x = 5, low = 1, high = 10
Output: 1
\`\`\``,
        difficulty: "Very Easy",
        functionName: "in_range",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5, 1, 10], expected: 1 },
            { input: [0, 1, 10], expected: 0 },
            { input: [1, 1, 10], expected: 1 },
            { input: [10, 1, 10], expected: 1 },
            { input: [15, 1, 10], expected: 0 },
        ],
    },
    {
        title: "Absolute Value",
        description: `## Problem
Return the absolute value of an integer.
## Example
\`\`\`
Input: n = -5
Output: 5
\`\`\``,
        difficulty: "Very Easy",
        functionName: "abs_value",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [-5], expected: 5 },
            { input: [5], expected: 5 },
            { input: [0], expected: 0 },
            { input: [-100], expected: 100 },
            { input: [1], expected: 1 },
        ],
    },
    {
        title: "Grade Letter",
        description: `## Problem
Given a score (0-100), return the grade:
- 90-100: "A"
- 80-89: "B"
- 70-79: "C"
- 60-69: "D"
- Below 60: "F"
## Example
\`\`\`
Input: score = 85
Output: "B"
\`\`\``,
        difficulty: "Very Easy",
        functionName: "grade_letter",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [85], expected: "B" },
            { input: [95], expected: "A" },
            { input: [75], expected: "C" },
            { input: [65], expected: "D" },
            { input: [55], expected: "F" },
        ],
    },
    {
        title: "Odd or Even",
        description: `## Problem
Return "odd" if the number is odd, "even" if even.
## Example
\`\`\`
Input: n = 5
Output: "odd"
\`\`\``,
        difficulty: "Very Easy",
        functionName: "odd_or_even",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5], expected: "odd" },
            { input: [4], expected: "even" },
            { input: [0], expected: "even" },
            { input: [-3], expected: "odd" },
            { input: [100], expected: "even" },
        ],
    },
    {
        title: "Leap Year",
        description: `## Problem
Return 1 if the year is a leap year, 0 otherwise.
A leap year is:
- Divisible by 4
- BUT not by 100, unless also divisible by 400
## Example
\`\`\`
Input: year = 2000
Output: 1
\`\`\``,
        difficulty: "Very Easy",
        functionName: "is_leap_year",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [2000], expected: 1 },
            { input: [2024], expected: 1 },
            { input: [1900], expected: 0 },
            { input: [2023], expected: 0 },
            { input: [2400], expected: 1 },
        ],
    },
    {
        title: "Sign of Product",
        description: `## Problem
Return the sign of the product of two numbers without multiplying:
- 1 if positive
- -1 if negative
- 0 if zero
## Example
\`\`\`
Input: a = -5, b = 3
Output: -1
\`\`\``,
        difficulty: "Very Easy",
        functionName: "sign_product",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [-5, 3], expected: -1 },
            { input: [5, 3], expected: 1 },
            { input: [-5, -3], expected: 1 },
            { input: [0, 5], expected: 0 },
            { input: [5, 0], expected: 0 },
        ],
    },
    {
        title: "Sum 1 to N",
        description: `## Problem
Return the sum of all integers from 1 to n (inclusive).
## Example
\`\`\`
Input: n = 5
Output: 15 (1+2+3+4+5)
\`\`\``,
        difficulty: "Very Easy",
        functionName: "sum_to_n",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5], expected: 15 },
            { input: [10], expected: 55 },
            { input: [1], expected: 1 },
            { input: [100], expected: 5050 },
            { input: [3], expected: 6 },
        ],
    },
    {
        title: "Count Digits",
        description: `## Problem
Return the number of digits in a positive integer.
## Example
\`\`\`
Input: n = 12345
Output: 5
\`\`\``,
        difficulty: "Very Easy",
        functionName: "count_digits",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [12345], expected: 5 },
            { input: [1], expected: 1 },
            { input: [100], expected: 3 },
            { input: [9999], expected: 4 },
            { input: [1000000], expected: 7 },
        ],
    },
    {
        title: "Factorial",
        description: `## Problem
Return n! (n factorial).
## Example
\`\`\`
Input: n = 5
Output: 120 (5*4*3*2*1)
\`\`\``,
        difficulty: "Very Easy",
        functionName: "factorial",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5], expected: 120 },
            { input: [0], expected: 1 },
            { input: [1], expected: 1 },
            { input: [6], expected: 720 },
            { input: [10], expected: 3628800 },
        ],
    },
    {
        title: "Power Function",
        description: `## Problem
Return base raised to the power exp (base^exp).
## Example
\`\`\`
Input: base = 2, exp = 10
Output: 1024
\`\`\``,
        difficulty: "Very Easy",
        functionName: "power",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [2, 10], expected: 1024 },
            { input: [3, 4], expected: 81 },
            { input: [5, 0], expected: 1 },
            { input: [2, 1], expected: 2 },
            { input: [10, 3], expected: 1000 },
        ],
    },
    {
        title: "Sum of Digits",
        description: `## Problem
Return the sum of all digits in a positive integer.
## Example
\`\`\`
Input: n = 12345
Output: 15 (1+2+3+4+5)
\`\`\``,
        difficulty: "Very Easy",
        functionName: "sum_digits",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [12345], expected: 15 },
            { input: [999], expected: 27 },
            { input: [100], expected: 1 },
            { input: [7], expected: 7 },
            { input: [111111], expected: 6 },
        ],
    },
    {
        title: "String Length",
        description: `## Problem
Return the length of a string.
## Example
\`\`\`
Input: s = "hello"
Output: 5
\`\`\``,
        difficulty: "Very Easy",
        functionName: "str_length",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: ["hello"], expected: 5 },
            { input: [""], expected: 0 },
            { input: ["a"], expected: 1 },
            { input: ["hello world"], expected: 11 },
            { input: ["USACO"], expected: 5 },
        ],
    },
    {
        title: "Reverse String",
        description: `## Problem
Return the reversed version of a string.
## Example
\`\`\`
Input: s = "hello"
Output: "olleh"
\`\`\``,
        difficulty: "Very Easy",
        functionName: "reverse_string",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: ["hello"], expected: "olleh" },
            { input: ["a"], expected: "a" },
            { input: [""], expected: "" },
            { input: ["ab"], expected: "ba" },
            { input: ["racecar"], expected: "racecar" },
        ],
    },
    {
        title: "Count Character",
        description: `## Problem
Count how many times character c appears in string s.
## Example
\`\`\`
Input: s = "hello", c = "l"
Output: 2
\`\`\``,
        difficulty: "Very Easy",
        functionName: "count_char",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: ["hello", "l"], expected: 2 },
            { input: ["aaa", "a"], expected: 3 },
            { input: ["hello", "z"], expected: 0 },
            { input: ["", "a"], expected: 0 },
            { input: ["banana", "a"], expected: 3 },
        ],
    },
    {
        title: "Is Palindrome",
        description: `## Problem
Return 1 if the string is a palindrome, 0 otherwise.
## Example
\`\`\`
Input: s = "racecar"
Output: 1
\`\`\``,
        difficulty: "Very Easy",
        functionName: "is_palindrome",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: ["racecar"], expected: 1 },
            { input: ["hello"], expected: 0 },
            { input: ["a"], expected: 1 },
            { input: [""], expected: 1 },
            { input: ["abba"], expected: 1 },
        ],
    },
    {
        title: "First Letter",
        description: `## Problem
Return the first character of a string as a string.
## Example
\`\`\`
Input: s = "hello"
Output: "h"
\`\`\``,
        difficulty: "Very Easy",
        functionName: "first_letter",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: ["hello"], expected: "h" },
            { input: ["A"], expected: "A" },
            { input: ["USACO"], expected: "U" },
            { input: ["bronze"], expected: "b" },
            { input: ["123"], expected: "1" },
        ],
    },
    {
        title: "Vector Sum",
        description: `## Problem
Return the sum of all elements in a vector.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}
Output: 15
\`\`\``,
        difficulty: "Very Easy",
        functionName: "vector_sum",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expected: 15 },
            { input: [[10, 20, 30]], expected: 60 },
            { input: [[]], expected: 0 },
            { input: [[5]], expected: 5 },
            { input: [[-1, 1]], expected: 0 },
        ],
    },
    {
        title: "Find Maximum",
        description: `## Problem
Return the maximum element in a non-empty vector.
## Example
\`\`\`
Input: nums = {3, 1, 4, 1, 5}
Output: 5
\`\`\``,
        difficulty: "Very Easy",
        functionName: "find_max",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[3, 1, 4, 1, 5]], expected: 5 },
            { input: [[1]], expected: 1 },
            { input: [[-5, -1, -10]], expected: -1 },
            { input: [[100, 50, 75]], expected: 100 },
            { input: [[7, 7, 7]], expected: 7 },
        ],
    },
    {
        title: "Count Evens",
        description: `## Problem
Count how many even numbers are in the vector.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5, 6}
Output: 3
\`\`\``,
        difficulty: "Very Easy",
        functionName: "count_evens",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3, 4, 5, 6]], expected: 3 },
            { input: [[2, 4, 6]], expected: 3 },
            { input: [[1, 3, 5]], expected: 0 },
            { input: [[]], expected: 0 },
            { input: [[0, 1, 2]], expected: 2 },
        ],
    },
    {
        title: "First and Last",
        description: `## Problem
Return a vector with just the first and last element.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}
Output: {1, 5}
\`\`\``,
        difficulty: "Very Easy",
        functionName: "first_last",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expected: [1, 5] },
            { input: [[7]], expected: [7, 7] },
            { input: [[1, 2]], expected: [1, 2] },
            { input: [[10, 20, 30]], expected: [10, 30] },
            { input: [[5, 5, 5, 5]], expected: [5, 5] },
        ],
    },
    {
        title: "Double All",
        description: `## Problem
Return a new vector with each element doubled.
## Example
\`\`\`
Input: nums = {1, 2, 3}
Output: {2, 4, 6}
\`\`\``,
        difficulty: "Very Easy",
        functionName: "double_all",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3]], expected: [2, 4, 6] },
            { input: [[0]], expected: [0] },
            { input: [[5, 10]], expected: [10, 20] },
            { input: [[]], expected: [] },
            { input: [[-1, 1]], expected: [-2, 2] },
        ],
    },
    // ========== TRANSITIONAL: Strings Basics ==========
    {
        title: "Reverse a String",
        description: "## Problem\n\nRead a single word (no spaces) and print it reversed.\n\nThis problem teaches you how to work with `string` indexing and loops in C++.\n\n## Input\nA single string $S$ (1 ≤ |S| ≤ 100).\n\n## Output\nThe string reversed.\n\n## Example\n```\nInput: hello\nOutput: olleh\n```\n\n### Hint\nYou can iterate from the last character to the first using `for(int i = s.size()-1; i >= 0; i--)`.",
        difficulty: "Easy",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // Reverse and print s\n    return 0;\n}",
        testCases: [
            { input: ["hello"], expected: ["olleh"] },
            { input: ["a"], expected: ["a"] },
            { input: ["abcde"], expected: ["edcba"] },
            { input: ["racecar"], expected: ["racecar"] },
            { input: ["C++"], expected: ["++C"] },
        ],
    },
    {
        title: "Count Vowels",
        description: "## Problem\n\nRead a string and count the number of vowels (a, e, i, o, u — case insensitive).\n\n## Input\nA single string $S$.\n\n## Output\nAn integer: the number of vowels.\n\n## Example\n```\nInput: Hello\nOutput: 2\n```\n\n### Hint\nConvert each character to lowercase with `tolower(c)` before checking.",
        difficulty: "Easy",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // Count vowels in s\n    return 0;\n}",
        testCases: [
            { input: ["Hello"], expected: [2] },
            { input: ["AEIOU"], expected: [5] },
            { input: ["xyz"], expected: [0] },
            { input: ["Programming"], expected: [3] },
            { input: ["a"], expected: [1] },
        ],
    },
    {
        title: "Palindrome Check",
        description: "## Problem\n\nRead a string and print `YES` if it is a palindrome (reads the same forwards and backwards), otherwise print `NO`.\n\nThis introduces the **two-pointer technique** — a pattern used in many harder problems.\n\n## Input\nA single string $S$ (lowercase letters only).\n\n## Output\n`YES` or `NO`.\n\n## Example\n```\nInput: racecar\nOutput: YES\n```\n\n### Hint\nCompare `s[i]` with `s[s.size()-1-i]` for all `i` from 0 to `s.size()/2`.",
        difficulty: "Easy",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // Check if s is a palindrome\n    return 0;\n}",
        testCases: [
            { input: ["racecar"], expected: ["YES"] },
            { input: ["hello"], expected: ["NO"] },
            { input: ["a"], expected: ["YES"] },
            { input: ["abba"], expected: ["YES"] },
            { input: ["abc"], expected: ["NO"] },
        ],
    },
    // ========== TRANSITIONAL: Functions & References ==========
    {
        title: "Sum with Function",
        description: "## Problem\n\nWrite a function `int add(int a, int b)` that returns the sum of two integers. Call it from `main()` and print the result.\n\nThis problem teaches you how to **define and call functions** in C++.\n\n## Input\nTwo integers $A$ and $B$.\n\n## Output\nTheir sum.\n\n## Example\n```\nInput: 3 7\nOutput: 10\n```\n\n### Hint\nDefine the function *before* `main()`, or use a forward declaration.",
        difficulty: "Easy",
        functionName: "main",
        starterCode: "#include <iostream>\n\nusing namespace std;\n\n// Define your add function here\n// int add(int a, int b) { ... }\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Call add(a, b) and print the result\n    return 0;\n}",
        testCases: [
            { input: [3, 7], expected: [10] },
            { input: [0, 0], expected: [0] },
            { input: [-5, 5], expected: [0] },
            { input: [100, 200], expected: [300] },
            { input: [999, 1], expected: [1000] },
        ],
    },
    {
        title: "Swap by Reference",
        description: "## Problem\n\nWrite a function `void swapNums(int &a, int &b)` that swaps two integers **by reference**. Read two integers, swap them using your function, then print them.\n\nThis teaches the critical concept of **pass-by-reference** (`&`) vs pass-by-value.\n\n## Input\nTwo integers $A$ and $B$.\n\n## Output\nThe two integers swapped, space-separated.\n\n## Example\n```\nInput: 5 10\nOutput: 10 5\n```\n\n### Hint\nUse a temporary variable inside `swapNums`, or use `std::swap`.",
        difficulty: "Easy",
        functionName: "main",
        starterCode: "#include <iostream>\n\nusing namespace std;\n\n// void swapNums(int &a, int &b) { ... }\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Call swapNums(a, b)\n    // Print a and b\n    return 0;\n}",
        testCases: [
            { input: [5, 10], expected: ["10 5"] },
            { input: [1, 2], expected: ["2 1"] },
            { input: [0, 0], expected: ["0 0"] },
            { input: [-3, 3], expected: ["3 -3"] },
            { input: [100, 1], expected: ["1 100"] },
        ],
    },
    // ========== TRANSITIONAL: Structs & Custom Types ==========
    {
        title: "Student Grade Struct",
        description: "## Problem\n\nDefine a `struct Student` with fields `string name` and `int grade`. Read a name and grade, store them in a `Student` variable, and print `[name] scored [grade]`.\n\nThis introduces **structs** — C++'s way to group related data.\n\n## Input\nA string $name$ and an integer $grade$.\n\n## Output\nFormatted: `[name] scored [grade]`\n\n## Example\n```\nInput: Alice 95\nOutput: Alice scored 95\n```\n\n### Hint\nDefine the struct before `main()`: `struct Student { string name; int grade; };`",
        difficulty: "Easy",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <string>\n\nusing namespace std;\n\n// struct Student { ... };\n\nint main() {\n    // Student s;\n    // cin >> s.name >> s.grade;\n    return 0;\n}",
        testCases: [
            { input: ["Alice", 95], expected: ["Alice scored 95"] },
            { input: ["Bob", 80], expected: ["Bob scored 80"] },
            { input: ["Zara", 100], expected: ["Zara scored 100"] },
            { input: ["Test", 0], expected: ["Test scored 0"] },
            { input: ["Max", 42], expected: ["Max scored 42"] },
        ],
    },
    {
        title: "Sort by Field",
        description: "## Problem\n\nRead $N$ students (name and grade), sort them by grade in **descending** order, and print the names one per line.\n\nThis teaches `sort()` with a **custom comparator** — essential for USACO.\n\n## Input\nLine 1: Integer $N$\nNext $N$ lines: `name grade`\n\n## Output\n$N$ names, one per line, sorted by grade (highest first).\n\n## Example\n```\nInput:\n3\nAlice 90\nBob 95\nCharlie 85\n\nOutput:\nBob\nAlice\nCharlie\n```\n\n### Hint\nUse `sort(vec.begin(), vec.end(), [](Student &a, Student &b) { return a.grade > b.grade; });`",
        difficulty: "Easy",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct Student {\n    string name;\n    int grade;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    // Read students, sort by grade desc, print names\n    return 0;\n}",
        testCases: [
            { input: [3, "Alice", 90, "Bob", 95, "Charlie", 85], expected: ["Bob\nAlice\nCharlie"] },
            { input: [2, "X", 50, "Y", 100], expected: ["Y\nX"] },
            { input: [1, "Solo", 42], expected: ["Solo"] },
            { input: [3, "A", 80, "B", 80, "C", 90], expected: ["C\nA\nB"] },
            { input: [2, "Hi", 0, "Lo", 1], expected: ["Lo\nHi"] },
        ],
    },
    {
        title: "Pair Sum",
        description: "## Problem\n\nRead $N$ integers. For each integer, store it as a `pair<int,int>` where the first element is the value and second is its 0-based index. Sort the pairs by value (ascending), then print the **original indices** in sorted order.\n\nThis teaches the `pair` type and how to track original positions after sorting.\n\n## Input\nLine 1: Integer $N$\nLine 2: $N$ integers\n\n## Output\nSpace-separated original indices after sorting by value.\n\n## Example\n```\nInput:\n4\n30 10 40 20\n\nOutput:\n1 3 0 2\n```\n\n### Hint\nUse `vector<pair<int,int>>`. Pairs sort by first element by default.",
        difficulty: "Easy",
        functionName: "main",
        starterCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // Use vector<pair<int,int>> to track value + index\n    return 0;\n}",
        testCases: [
            { input: [4, 30, 10, 40, 20], expected: ["1 3 0 2"] },
            { input: [3, 3, 1, 2], expected: ["1 2 0"] },
            { input: [1, 5], expected: ["0"] },
            { input: [2, 10, 5], expected: ["1 0"] },
            { input: [5, 50, 40, 30, 20, 10], expected: ["4 3 2 1 0"] },
        ],
    },
    {
        title: "Circle Area",
        description: `## Problem
Given radius r, return the area of a circle as an integer (floor).
Use pi = 3.14159.
## Example
\`\`\`
Input: r = 5
Output: 78 (pi * 5 * 5 = 78.5...)
\`\`\``,
        difficulty: "Easy",
        functionName: "circle_area",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5], expected: 78 },
            { input: [1], expected: 3 },
            { input: [10], expected: 314 },
            { input: [0], expected: 0 },
            { input: [7], expected: 153 },
        ],
    },
    {
        title: "Is Prime",
        description: `## Problem
Return 1 if n is prime, 0 otherwise.
## Example
\`\`\`
Input: n = 7
Output: 1
\`\`\``,
        difficulty: "Easy",
        functionName: "is_prime",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [7], expected: 1 },
            { input: [1], expected: 0 },
            { input: [2], expected: 1 },
            { input: [9], expected: 0 },
            { input: [17], expected: 1 },
        ],
    },
    {
        title: "Join to String",
        description: `## Problem
Convert vector of integers to space-separated string.
(Simulates writing output to file)
## Example
\`\`\`
Input: nums = {1, 2, 3}
Output: "1 2 3"
\`\`\``,
        difficulty: "Easy",
        functionName: "join_ints",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3]], expected: "1 2 3" },
            { input: [[5]], expected: "5" },
            { input: [[10, 20]], expected: "10 20" },
            { input: [[]], expected: "" },
            { input: [[1, 2, 3, 4, 5]], expected: "1 2 3 4 5" },
        ],
    },
    {
        title: "Parse Grid",
        description: `## Problem
Given n rows of space-separated integers (as vector of strings),
return the sum of all integers.
## Example
\`\`\`
Input: lines = {"1 2 3", "4 5 6"}
Output: 21
\`\`\``,
        difficulty: "Easy",
        functionName: "sum_grid",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [["1 2 3", "4 5 6"]], expected: 21 },
            { input: [["1", "2", "3"]], expected: 6 },
            { input: [["10 10"]], expected: 20 },
            { input: [["0 0 0"]], expected: 0 },
            { input: [["1 2", "3 4", "5 6"]], expected: 21 },
        ],
    },
    {
        title: "Count Lines with Value",
        description: `## Problem
Count how many lines contain the target value.
## Example
\`\`\`
Input: lines = {"1 2 3", "4 5 6", "1 7 8"}, target = 1
Output: 2
\`\`\``,
        difficulty: "Easy",
        functionName: "count_lines",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [["1 2 3", "4 5 6", "1 7 8"], 1], expected: 2 },
            { input: [["5 5 5"], 5], expected: 1 },
            { input: [["1 2", "3 4"], 5], expected: 0 },
            { input: [["1", "1", "1"], 1], expected: 3 },
            { input: [["10 20 30"], 20], expected: 1 },
        ],
    },
    {
        title: "Max from Each Line",
        description: `## Problem
Return the maximum value from each line.
## Example
\`\`\`
Input: lines = {"1 5 2", "9 3 4"}
Output: {5, 9}
\`\`\``,
        difficulty: "Easy",
        functionName: "max_each_line",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [["1 5 2", "9 3 4"]], expected: [5, 9] },
            { input: [["10"]], expected: [10] },
            { input: [["1 2", "3 4", "5 6"]], expected: [2, 4, 6] },
            { input: [["5 5 5"]], expected: [5] },
            { input: [["1 9 2", "8 3 7"]], expected: [9, 8] },
        ],
    },
    {
        title: "Squares",
        description: `## Problem
Return a vector of squares of 1 to n.
## Example
\`\`\`
Input: n = 5
Output: {1, 4, 9, 16, 25}
\`\`\``,
        difficulty: "Easy",
        functionName: "squares",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [5], expected: [1, 4, 9, 16, 25] },
            { input: [3], expected: [1, 4, 9] },
            { input: [1], expected: [1] },
            { input: [10], expected: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100] },
            { input: [2], expected: [1, 4] },
        ],
    },
    {
        title: "Filter Evens",
        description: `## Problem
Return only the even numbers from the vector.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5, 6}
Output: {2, 4, 6}
\`\`\``,
        difficulty: "Easy",
        functionName: "filter_evens",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3, 4, 5, 6]], expected: [2, 4, 6] },
            { input: [[1, 3, 5]], expected: [] },
            { input: [[2, 4, 6]], expected: [2, 4, 6] },
            { input: [[]], expected: [] },
            { input: [[0, 1, 2]], expected: [0, 2] },
        ],
    },
    {
        title: "Filter Greater Than",
        description: `## Problem
Return elements greater than threshold.
## Example
\`\`\`
Input: nums = {1, 5, 2, 8, 3}, threshold = 3
Output: {5, 8}
\`\`\``,
        difficulty: "Easy",
        functionName: "filter_greater",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 5, 2, 8, 3], 3], expected: [5, 8] },
            { input: [[1, 2, 3], 5], expected: [] },
            { input: [[10, 20, 30], 15], expected: [20, 30] },
            { input: [[5, 5, 5], 4], expected: [5, 5, 5] },
            { input: [[1], 0], expected: [1] },
        ],
    },
    {
        title: "Map Add K",
        description: `## Problem
Add k to every element.
## Example
\`\`\`
Input: nums = {1, 2, 3}, k = 10
Output: {11, 12, 13}
\`\`\``,
        difficulty: "Easy",
        functionName: "map_add",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3], 10], expected: [11, 12, 13] },
            { input: [[0], 5], expected: [5] },
            { input: [[5, 10], -5], expected: [0, 5] },
            { input: [[], 10], expected: [] },
            { input: [[100], 0], expected: [100] },
        ],
    },
    {
        title: "Running Sum",
        description: `## Problem
Return running sum (prefix sum).
## Example
\`\`\`
Input: nums = {1, 2, 3, 4}
Output: {1, 3, 6, 10}
\`\`\``,
        difficulty: "Easy",
        functionName: "running_sum",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3, 4]], expected: [1, 3, 6, 10] },
            { input: [[5]], expected: [5] },
            { input: [[1, 1, 1, 1]], expected: [1, 2, 3, 4] },
            { input: [[-1, 1]], expected: [-1, 0] },
            { input: [[10, 20, 30]], expected: [10, 30, 60] },
        ],
    },
    {
        title: "Recursive Sum",
        description: `## Problem
Sum all elements using recursion (no loops).
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}
Output: 15
\`\`\``,
        difficulty: "Easy",
        functionName: "recursive_sum",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expected: 15 },
            { input: [[10]], expected: 10 },
            { input: [[]], expected: 0 },
            { input: [[1, 1, 1]], expected: 3 },
            { input: [[5, -5]], expected: 0 },
        ],
    },
    {
        title: "Recursive Max",
        description: `## Problem
Find maximum using recursion.
## Example
\`\`\`
Input: nums = {3, 1, 4, 1, 5}
Output: 5
\`\`\``,
        difficulty: "Easy",
        functionName: "recursive_max",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[3, 1, 4, 1, 5]], expected: 5 },
            { input: [[1]], expected: 1 },
            { input: [[-5, -1, -10]], expected: -1 },
            { input: [[7, 7, 7]], expected: 7 },
            { input: [[100, 50, 75]], expected: 100 },
        ],
    },
    {
        title: "Recursive Power",
        description: `## Problem
Calculate base^exp using recursion.
## Example
\`\`\`
Input: base = 2, exp = 10
Output: 1024
\`\`\``,
        difficulty: "Easy",
        functionName: "recursive_power",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [2, 10], expected: 1024 },
            { input: [3, 4], expected: 81 },
            { input: [5, 0], expected: 1 },
            { input: [2, 1], expected: 2 },
            { input: [10, 3], expected: 1000 },
        ],
    },
    {
        title: "Recursive Reverse",
        description: `## Problem
Reverse a string using recursion.
## Example
\`\`\`
Input: s = "hello"
Output: "olleh"
\`\`\``,
        difficulty: "Easy",
        functionName: "recursive_reverse",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: ["hello"], expected: "olleh" },
            { input: ["a"], expected: "a" },
            { input: [""], expected: "" },
            { input: ["ab"], expected: "ba" },
            { input: ["USACO"], expected: "OCASU" },
        ],
    },
    {
        title: "Sort Ascending",
        description: `## Problem
Return the vector sorted in ascending order.
## Example
\`\`\`
Input: nums = {5, 2, 8, 1, 9}
Output: {1, 2, 5, 8, 9}
\`\`\``,
        difficulty: "Easy",
        functionName: "sort_asc",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[5, 2, 8, 1, 9]], expected: [1, 2, 5, 8, 9] },
            { input: [[1]], expected: [1] },
            { input: [[3, 2, 1]], expected: [1, 2, 3] },
            { input: [[]], expected: [] },
            { input: [[5, 5, 5]], expected: [5, 5, 5] },
        ],
    },
    {
        title: "Sort Descending",
        description: `## Problem
Return the vector sorted in descending order.
## Example
\`\`\`
Input: nums = {5, 2, 8, 1, 9}
Output: {9, 8, 5, 2, 1}
\`\`\``,
        difficulty: "Easy",
        functionName: "sort_desc",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[5, 2, 8, 1, 9]], expected: [9, 8, 5, 2, 1] },
            { input: [[1]], expected: [1] },
            { input: [[1, 2, 3]], expected: [3, 2, 1] },
            { input: [[]], expected: [] },
            { input: [[5, 5, 5]], expected: [5, 5, 5] },
        ],
    },
    {
        title: "Binary Search",
        description: `## Problem
Return index of target in sorted vector, or -1 if not found.
## Example
\`\`\`
Input: nums = {1, 3, 5, 7, 9}, target = 5
Output: 2
\`\`\``,
        difficulty: "Easy",
        functionName: "binary_search_idx",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 3, 5, 7, 9], 5], expected: 2 },
            { input: [[1, 2, 3], 1], expected: 0 },
            { input: [[1, 2, 3], 4], expected: -1 },
            { input: [[5], 5], expected: 0 },
            { input: [[1, 2, 3, 4, 5], 3], expected: 2 },
        ],
    },
    {
        title: "Kth Smallest",
        description: `## Problem
Return the kth smallest element (1-indexed).
## Example
\`\`\`
Input: nums = {7, 2, 1, 6, 8}, k = 3
Output: 6 (sorted: 1,2,6,7,8)
\`\`\``,
        difficulty: "Easy",
        functionName: "kth_smallest",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[7, 2, 1, 6, 8], 3], expected: 6 },
            { input: [[5, 4, 3, 2, 1], 1], expected: 1 },
            { input: [[1], 1], expected: 1 },
            { input: [[3, 1, 2], 2], expected: 2 },
            { input: [[10, 20, 30], 3], expected: 30 },
        ],
    },
    {
        title: "Count Less Than",
        description: `## Problem
Count elements less than target using binary search.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}, target = 4
Output: 3
\`\`\``,
        difficulty: "Easy",
        functionName: "count_less",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3, 4, 5], 4], expected: 3 },
            { input: [[5, 4, 3, 2, 1], 3], expected: 2 },
            { input: [[1, 1, 1], 2], expected: 3 },
            { input: [[10, 20, 30], 5], expected: 0 },
            { input: [[1, 2, 3], 10], expected: 3 },
        ],
    },
    {
        title: "Type Conversion",
        description: `## Problem
Convert a double to int (truncate towards zero).
## Example
\`\`\`
Input: d = 3.7
Output: 3
\`\`\``,
        difficulty: "Easy",
        functionName: "to_int",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [3.7], expected: 3 },
            { input: [3.2], expected: 3 },
            { input: [-2.5], expected: -2 },
            { input: [0.9], expected: 0 },
            { input: [10.0], expected: 10 },
        ],
    },
    {
        title: "Char to Int",
        description: `## Problem
Convert a digit character to its integer value.
## Example
\`\`\`
Input: c = "5"
Output: 5
\`\`\``,
        difficulty: "Easy",
        functionName: "char_to_int",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: ["5"], expected: 5 },
            { input: ["0"], expected: 0 },
            { input: ["9"], expected: 9 },
            { input: ["1"], expected: 1 },
            { input: ["7"], expected: 7 },
        ],
    },
    {
        title: "Int to Char",
        description: `## Problem
Convert an integer 0-9 to its character representation.
## Example
\`\`\`
Input: n = 5
Output: "5"
\`\`\``,
        difficulty: "Easy",
        functionName: "int_to_char",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [5], expected: "5" },
            { input: [0], expected: "0" },
            { input: [9], expected: "9" },
            { input: [1], expected: "1" },
            { input: [7], expected: "7" },
        ],
    },
    {
        title: "Check Bounds",
        description: `## Problem
Return 1 if index is valid for the given size, 0 otherwise.
## Example
\`\`\`
Input: index = 3, size = 5
Output: 1
\`\`\``,
        difficulty: "Easy",
        functionName: "check_bounds",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [3, 5], expected: 1 },
            { input: [0, 5], expected: 1 },
            { input: [5, 5], expected: 0 },
            { input: [-1, 5], expected: 0 },
            { input: [4, 5], expected: 1 },
        ],
    },
    {
        title: "Clamp Value",
        description: `## Problem
Clamp value between min and max.
## Example
\`\`\`
Input: val = 15, min_val = 0, max_val = 10
Output: 10
\`\`\``,
        difficulty: "Easy",
        functionName: "clamp",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [15, 0, 10], expected: 10 },
            { input: [5, 0, 10], expected: 5 },
            { input: [-5, 0, 10], expected: 0 },
            { input: [0, 0, 10], expected: 0 },
            { input: [10, 0, 10], expected: 10 },
        ],
    },
    {
        title: "Format Number",
        description: `## Problem
Convert integer to string.
## Example
\`\`\`
Input: n = 42
Output: "42"
\`\`\``,
        difficulty: "Easy",
        functionName: "format_num",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [42], expected: "42" },
            { input: [0], expected: "0" },
            { input: [-5], expected: "-5" },
            { input: [1234], expected: "1234" },
            { input: [100], expected: "100" },
        ],
    },
    {
        title: "Parse Number",
        description: `## Problem
Convert string to integer.
## Example
\`\`\`
Input: s = "42"
Output: 42
\`\`\``,
        difficulty: "Easy",
        functionName: "parse_num",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: ["42"], expected: 42 },
            { input: ["0"], expected: 0 },
            { input: ["-5"], expected: -5 },
            { input: ["1234"], expected: 1234 },
            { input: ["100"], expected: 100 },
        ],
    },
    {
        title: "Build Output Line",
        description: `## Problem
Format: "Case #X: Y" where X is case number, Y is result.
## Example
\`\`\`
Input: case_num = 1, result = 42
Output: "Case #1: 42"
\`\`\``,
        difficulty: "Easy",
        functionName: "format_output",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [1, 42], expected: "Case #1: 42" },
            { input: [2, 100], expected: "Case #2: 100" },
            { input: [10, 0], expected: "Case #10: 0" },
            { input: [5, -5], expected: "Case #5: -5" },
            { input: [3, 999], expected: "Case #3: 999" },
        ],
    },
    {
        title: "Split by Delimiter",
        description: `## Problem
Split string by comma delimiter.
## Example
\`\`\`
Input: s = "a,b,c"
Output: {"a", "b", "c"}
\`\`\``,
        difficulty: "Easy",
        functionName: "split_comma",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: ["a,b,c"], expected: ["a", "b", "c"] },
            { input: ["hello"], expected: ["hello"] },
            { input: ["1,2,3,4"], expected: ["1", "2", "3", "4"] },
            { input: ["x,y"], expected: ["x", "y"] },
            { input: ["single"], expected: ["single"] },
        ],
    },
    {
        title: "Align Right",
        description: `## Problem
Right-align a number in a field of given width with spaces.
## Example
\`\`\`
Input: n = 42, width = 5
Output: "   42"
\`\`\``,
        difficulty: "Easy",
        functionName: "align_right",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [42, 5], expected: "   42" },
            { input: [1, 3], expected: "  1" },
            { input: [100, 3], expected: "100" },
            { input: [5, 1], expected: "5" },
            { input: [7, 4], expected: "   7" },
        ],
    },
    {
        title: "GCD",
        description: `## Problem
Return the greatest common divisor of two positive integers.
## Example
\`\`\`
Input: a = 12, b = 8
Output: 4
\`\`\``,
        difficulty: "Easy",
        functionName: "gcd",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [12, 8], expected: 4 },
            { input: [15, 5], expected: 5 },
            { input: [7, 3], expected: 1 },
            { input: [100, 25], expected: 25 },
            { input: [17, 17], expected: 17 },
        ],
    },
    {
        title: "Fibonacci",
        description: `## Problem
Return the nth Fibonacci number (0-indexed).
F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).
## Example
\`\`\`
Input: n = 6
Output: 8 (0,1,1,2,3,5,8)
\`\`\``,
        difficulty: "Easy",
        functionName: "fibonacci",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [6], expected: 8 },
            { input: [0], expected: 0 },
            { input: [1], expected: 1 },
            { input: [10], expected: 55 },
            { input: [15], expected: 610 },
        ],
    },
    {
        title: "Digit Root",
        description: `## Problem
Repeatedly sum digits until single digit.
## Example
\`\`\`
Input: n = 9875
Output: 2 (9+8+7+5=29, 2+9=11, 1+1=2)
\`\`\``,
        difficulty: "Easy",
        functionName: "digit_root",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [9875], expected: 2 },
            { input: [5], expected: 5 },
            { input: [99], expected: 9 },
            { input: [123], expected: 6 },
            { input: [999999], expected: 9 },
        ],
    },
    {
        title: "Milk Pail",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Milk Pail. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Milk Pail\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Fence Painting",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Fence Painting. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Fence Painting\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Cow Tipping",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Cow Tipping. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Cow Tipping\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Barn Echoes",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Barn Echoes. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Barn Echoes\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Hoof Paper Scissors",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Hoof Paper Scissors. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Hoof Paper Scissors\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Teleportation",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Teleportation. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Teleportation\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Do You Know Your ABCs",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Do You Know Your ABCs. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Do You Know Your ABCs\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Word Processor",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Word Processor. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Word Processor\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Promotion Counting",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Promotion Counting. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Promotion Counting\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Square Pasture",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Square Pasture. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Square Pasture\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Blocked Billboard",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Blocked Billboard. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Blocked Billboard\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Mixing Milk",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Mixing Milk. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Mixing Milk\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Shell Game",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Shell Game. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Shell Game\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Mowing the Field",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Mowing the Field. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Mowing the Field\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Circular Barn",
        difficulty: "Medium",
        functionName: "main",
        description: "## Problem\n\nPractice problem based on Circular Barn. Farmer John needs help calculating optimal values.\n\n## Input Used\nStandard input simulation.\n\n## Example\nInput: 5 10\nOutput: 15",
        starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Solve Circular Barn\n    return 0;\n}",
        testCases: [
            {
                input: [
                    5,
                    10
                ],
                expected: [
                    15
                ]
            }
        ]
    },
    {
        title: "Count Frequency",
        description: `## Problem
Return a vector of pairs {value, count} for each unique element, sorted by value.
## Example
\`\`\`
Input: nums = {1, 2, 1, 3, 2, 1}
Output: {{1,3}, {2,2}, {3,1}}
\`\`\``,
        difficulty: "Medium",
        functionName: "count_freq",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 1, 3, 2, 1]], expected: [[1, 3], [2, 2], [3, 1]] },
            { input: [[1, 1, 1]], expected: [[1, 3]] },
            { input: [[1, 2, 3]], expected: [[1, 1], [2, 1], [3, 1]] },
            { input: [[5]], expected: [[5, 1]] },
            { input: [[2, 2, 3, 3]], expected: [[2, 2], [3, 2]] },
        ],
    },
    {
        title: "Two Sum with Map",
        description: `## Problem
Find two indices where nums[i] + nums[j] = target.
Return {-1,-1} if no solution.
## Example
\`\`\`
Input: nums = {2,7,11,15}, target = 9
Output: {0,1}
\`\`\``,
        difficulty: "Medium",
        functionName: "two_sum_map",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
            { input: [[3, 2, 4], 6], expected: [1, 2] },
            { input: [[1, 2, 3], 10], expected: [-1, -1] },
            { input: [[5, 5], 10], expected: [0, 1] },
            { input: [[1, 3, 5, 7], 8], expected: [0, 3] },
        ],
    },
    {
        title: "First Unique",
        description: `## Problem
Return the first element that appears exactly once.
Return -1 if none exists.
## Example
\`\`\`
Input: nums = {2,3,2,4,3}
Output: 4
\`\`\``,
        difficulty: "Medium",
        functionName: "first_unique",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[2, 3, 2, 4, 3]], expected: 4 },
            { input: [[1, 1, 2, 2]], expected: -1 },
            { input: [[1]], expected: 1 },
            { input: [[1, 2, 1]], expected: 2 },
            { input: [[5, 5, 5, 6, 7, 7]], expected: 6 },
        ],
    },
    {
        title: "Group by Mod",
        description: `## Problem
Group numbers by their remainder when divided by k.
Return count of groups with at least one element.
## Example
\`\`\`
Input: nums = {1,2,3,4,5,6}, k = 3
Output: 3 (groups: {3,6}, {1,4}, {2,5})
\`\`\``,
        difficulty: "Medium",
        functionName: "group_by_mod",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3, 4, 5, 6], 3], expected: 3 },
            { input: [[1, 2, 3], 2], expected: 2 },
            { input: [[5, 10, 15], 5], expected: 1 },
            { input: [[1, 2, 3, 4], 4], expected: 4 },
            { input: [[7], 3], expected: 1 },
        ],
    },
    {
        title: "Most Frequent",
        description: `## Problem
Return the most frequent element. If tie, return smallest.
## Example
\`\`\`
Input: nums = {1,2,2,3,3}
Output: 2
\`\`\``,
        difficulty: "Medium",
        functionName: "most_frequent",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 2, 3, 3]], expected: 2 },
            { input: [[1, 1, 1]], expected: 1 },
            { input: [[5, 5, 3, 3, 3]], expected: 3 },
            { input: [[1]], expected: 1 },
            { input: [[4, 4, 4, 2, 2]], expected: 4 },
        ],
    },
    {
        title: "Count Unique",
        description: `## Problem
Return the number of unique elements.
## Example
\`\`\`
Input: nums = {1,2,2,3,3,3}
Output: 3
\`\`\``,
        difficulty: "Medium",
        functionName: "count_unique",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 2, 3, 3, 3]], expected: 3 },
            { input: [[1, 1, 1]], expected: 1 },
            { input: [[1, 2, 3, 4, 5]], expected: 5 },
            { input: [[]], expected: 0 },
            { input: [[7]], expected: 1 },
        ],
    },
    {
        title: "Has Duplicates",
        description: `## Problem
Return 1 if vector has any duplicates, 0 otherwise.
## Example
\`\`\`
Input: nums = {1,2,3,1}
Output: 1
\`\`\``,
        difficulty: "Medium",
        functionName: "has_duplicates",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3, 1]], expected: 1 },
            { input: [[1, 2, 3]], expected: 0 },
            { input: [[]], expected: 0 },
            { input: [[5, 5]], expected: 1 },
            { input: [[1, 2, 3, 4, 5]], expected: 0 },
        ],
    },
    {
        title: "Intersection",
        description: `## Problem
Return sorted vector of elements in both vectors.
## Example
\`\`\`
Input: a = {1,2,3}, b = {2,3,4}
Output: {2,3}
\`\`\``,
        difficulty: "Medium",
        functionName: "intersection",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3], [2, 3, 4]], expected: [2, 3] },
            { input: [[1, 2], [3, 4]], expected: [] },
            { input: [[1, 1, 2], [1, 2, 2]], expected: [1, 2] },
            { input: [[5], [5]], expected: [5] },
            { input: [[], [1, 2]], expected: [] },
        ],
    },
    {
        title: "Union",
        description: `## Problem
Return sorted vector of all unique elements from both vectors.
## Example
\`\`\`
Input: a = {1,2}, b = {2,3}
Output: {1,2,3}
\`\`\``,
        difficulty: "Medium",
        functionName: "set_union",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2], [2, 3]], expected: [1, 2, 3] },
            { input: [[1], [2]], expected: [1, 2] },
            { input: [[1, 1], [1]], expected: [1] },
            { input: [[], [1]], expected: [1] },
            { input: [[1, 2, 3], []], expected: [1, 2, 3] },
        ],
    },
    {
        title: "Symmetric Difference",
        description: `## Problem
Return sorted elements in either vector but not both.
## Example
\`\`\`
Input: a = {1,2,3}, b = {2,3,4}
Output: {1,4}
\`\`\``,
        difficulty: "Medium",
        functionName: "sym_diff",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: [[1, 2, 3], [2, 3, 4]], expected: [1, 4] },
            { input: [[1, 2], [1, 2]], expected: [] },
            { input: [[1], [2]], expected: [1, 2] },
            { input: [[], [1]], expected: [1] },
            { input: [[5, 6], [6, 7]], expected: [5, 7] },
        ],
    },
    {
        title: "Parse Integers",
        description: `## Problem
Given a string of space-separated integers, return them as a vector.
(Simulates reading a line from file)
## Example
\`\`\`
Input: s = "1 2 3 4 5"
Output: {1, 2, 3, 4, 5}
\`\`\``,
        difficulty: "Medium",
        functionName: "parse_ints",
        starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;
int main() {
    return 0;
}`,
        testCases: [
            { input: ["1 2 3 4 5"], expected: [1, 2, 3, 4, 5] },
            { input: ["10"], expected: [10] },
            { input: ["1 2"], expected: [1, 2] },
            { input: ["100 200 300"], expected: [100, 200, 300] },
            { input: ["5 4 3 2 1"], expected: [5, 4, 3, 2, 1] },
        ],
    },
    {
        title: "Count Occurrences",
        description: `## Problem
Count occurrences of target using recursion.
## Example
\`\`\`
Input: nums = {1, 2, 1, 3, 1}, target = 1
Output: 3
\`\`\``,
        difficulty: "Medium",
        functionName: "recursive_count",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 1, 3, 1], 1], expected: 3 },
            { input: [[5, 5, 5], 5], expected: 3 },
            { input: [[1, 2, 3], 4], expected: 0 },
            { input: [[]], expected: 0 },
            { input: [[7], 7], expected: 1 },
        ],
    },
    {
        title: "Vector Size",
        description: `## Problem
Return the size of the vector.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}
Output: 5
\`\`\``,
        difficulty: "Medium",
        functionName: "vec_size",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expected: 5 },
            { input: [[]], expected: 0 },
            { input: [[1]], expected: 1 },
            { input: [[1, 2, 3]], expected: 3 },
            { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], expected: 10 },
        ],
    },
    {
        title: "Push and Pop",
        description: `## Problem
Push val to back, then pop it. Return final size.
## Example
\`\`\`
Input: nums = {1, 2, 3}, val = 4
Output: 3 (pushed 4, then popped it)
\`\`\``,
        difficulty: "Medium",
        functionName: "push_pop",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3], 4], expected: 3 },
            { input: [[], 5], expected: 0 },
            { input: [[1], 2], expected: 1 },
            { input: [[1, 2], 3], expected: 2 },
            { input: [[1, 2, 3, 4, 5], 6], expected: 5 },
        ],
    },
    {
        title: "Resize Vector",
        description: `## Problem
Resize vector to new_size (fill with 0 if growing).
Return sum of all elements.
## Example
\`\`\`
Input: nums = {1, 2, 3}, new_size = 5
Output: 6 (becomes {1,2,3,0,0})
\`\`\``,
        difficulty: "Medium",
        functionName: "resize_sum",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3], 5], expected: 6 },
            { input: [[1, 2, 3], 2], expected: 3 },
            { input: [[], 3], expected: 0 },
            { input: [[5], 5], expected: 5 },
            { input: [[1, 1, 1], 3], expected: 3 },
        ],
    },
    {
        title: "Access Back",
        description: `## Problem
Return the last element of the vector.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}
Output: 5
\`\`\``,
        difficulty: "Medium",
        functionName: "get_back",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expected: 5 },
            { input: [[7]], expected: 7 },
            { input: [[1, 2]], expected: 2 },
            { input: [[10, 20, 30]], expected: 30 },
            { input: [[100]], expected: 100 },
        ],
    },
    {
        title: "Clear and Check",
        description: `## Problem
Clear the vector and return 1 if empty, 0 otherwise.
## Example
\`\`\`
Input: nums = {1, 2, 3}
Output: 1
\`\`\``,
        difficulty: "Medium",
        functionName: "clear_check",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3]], expected: 1 },
            { input: [[]], expected: 1 },
            { input: [[5]], expected: 1 },
            { input: [[1, 2, 3, 4, 5]], expected: 1 },
            { input: [[7, 8, 9]], expected: 1 },
        ],
    },
    {
        title: "Min Element",
        description: `## Problem
Return the minimum element using STL.
## Example
\`\`\`
Input: nums = {5, 2, 8, 1, 9}
Output: 1
\`\`\``,
        difficulty: "Medium",
        functionName: "stl_min",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[5, 2, 8, 1, 9]], expected: 1 },
            { input: [[7]], expected: 7 },
            { input: [[-5, -1, -10]], expected: -10 },
            { input: [[3, 3, 3]], expected: 3 },
            { input: [[100, 50]], expected: 50 },
        ],
    },
    {
        title: "Reverse Vector",
        description: `## Problem
Reverse the vector in place using STL.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}
Output: {5, 4, 3, 2, 1}
\`\`\``,
        difficulty: "Medium",
        functionName: "stl_reverse",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
            { input: [[1]], expected: [1] },
            { input: [[1, 2]], expected: [2, 1] },
            { input: [[]], expected: [] },
            { input: [[3, 3, 3]], expected: [3, 3, 3] },
        ],
    },
    {
        title: "Count Value",
        description: `## Problem
Count occurrences of value using STL count().
## Example
\`\`\`
Input: nums = {1, 2, 1, 3, 1}, target = 1
Output: 3
\`\`\``,
        difficulty: "Medium",
        functionName: "stl_count",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 1, 3, 1], 1], expected: 3 },
            { input: [[5, 5, 5], 5], expected: 3 },
            { input: [[1, 2, 3], 4], expected: 0 },
            { input: [[], 1], expected: 0 },
            { input: [[7], 7], expected: 1 },
        ],
    },
    {
        title: "Accumulate",
        description: `## Problem
Sum all elements using STL accumulate().
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}
Output: 15
\`\`\``,
        difficulty: "Medium",
        functionName: "stl_sum",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3, 4, 5]], expected: 15 },
            { input: [[10]], expected: 10 },
            { input: [[]], expected: 0 },
            { input: [[1, -1]], expected: 0 },
            { input: [[100, 200]], expected: 300 },
        ],
    },
    {
        title: "Remove Duplicates",
        description: `## Problem
Remove duplicates and return sorted unique elements.
## Example
\`\`\`
Input: nums = {3, 1, 2, 1, 3}
Output: {1, 2, 3}
\`\`\``,
        difficulty: "Medium",
        functionName: "remove_dups",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[3, 1, 2, 1, 3]], expected: [1, 2, 3] },
            { input: [[1, 1, 1]], expected: [1] },
            { input: [[1, 2, 3]], expected: [1, 2, 3] },
            { input: [[]], expected: [] },
            { input: [[5]], expected: [5] },
        ],
    },
    {
        title: "Modify by Reference",
        description: `## Problem
Add 10 to the value and return it.
(In real C++, you'd pass by reference)
## Example
\`\`\`
Input: n = 5
Output: 15
\`\`\``,
        difficulty: "Medium",
        functionName: "add_ten",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [5], expected: 15 },
            { input: [0], expected: 10 },
            { input: [-10], expected: 0 },
            { input: [100], expected: 110 },
            { input: [90], expected: 100 },
        ],
    },
    {
        title: "Swap Elements",
        description: `## Problem
Swap elements at indices i and j, return modified vector.
## Example
\`\`\`
Input: nums = {1, 2, 3, 4, 5}, i = 0, j = 4
Output: {5, 2, 3, 4, 1}
\`\`\``,
        difficulty: "Medium",
        functionName: "swap_elements",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3, 4, 5], 0, 4], expected: [5, 2, 3, 4, 1] },
            { input: [[1, 2], 0, 1], expected: [2, 1] },
            { input: [[5], 0, 0], expected: [5] },
            { input: [[1, 2, 3], 1, 2], expected: [1, 3, 2] },
            { input: [[10, 20, 30], 0, 2], expected: [30, 20, 10] },
        ],
    },
    {
        title: "Find Pointer Index",
        description: `## Problem
Find the index of target (simulating pointer arithmetic).
Return -1 if not found.
## Example
\`\`\`
Input: nums = {1, 3, 5, 7, 9}, target = 5
Output: 2
\`\`\``,
        difficulty: "Medium",
        functionName: "find_index",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 3, 5, 7, 9], 5], expected: 2 },
            { input: [[1, 2, 3], 1], expected: 0 },
            { input: [[1, 2, 3], 4], expected: -1 },
            { input: [[5], 5], expected: 0 },
            { input: [[], 1], expected: -1 },
        ],
    },
    {
        title: "Modify All",
        description: `## Problem
Multiply each element by 2 (modify in place).
## Example
\`\`\`
Input: nums = {1, 2, 3}
Output: {2, 4, 6}
\`\`\``,
        difficulty: "Medium",
        functionName: "double_inplace",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[1, 2, 3]], expected: [2, 4, 6] },
            { input: [[0]], expected: [0] },
            { input: [[5, 10]], expected: [10, 20] },
            { input: [[]], expected: [] },
            { input: [[-1, 1]], expected: [-2, 2] },
        ],
    },
    {
        title: "Partition Array",
        description: `## Problem
Move elements <= pivot to front, > pivot to back.
Return count of elements <= pivot.
## Example
\`\`\`
Input: nums = {5, 2, 8, 1, 9, 3}, pivot = 4
Output: 3 (elements 2, 1, 3 are <= 4)
\`\`\``,
        difficulty: "Medium",
        functionName: "partition_count",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            { input: [[5, 2, 8, 1, 9, 3], 4], expected: 3 },
            { input: [[1, 2, 3], 5], expected: 3 },
            { input: [[6, 7, 8], 5], expected: 0 },
            { input: [[5, 5, 5], 5], expected: 3 },
            { input: [[1], 1], expected: 1 },
        ],
    },
    {
        title: "The Cow-Signal (Bronze)",
        difficulty: "Bronze",
        functionName: "main",
        description: "## Problem\n\nBessie is creating a signal for her fellow cows. The signal is an $M \\times N$ grid of characters. She wants to amplify the signal by a factor of $K$ so that each character is replaced by a $K \\times K$ block of that character.\n\n## Input Format\n\nLine 1: `M N K` (1 <= M,N <= 10, 1 <= K <= 10)\nNext `M` lines: Each contains a string of length `N`.\n\n## Output Format\n\nOutput the amplified signal as $M \\times K$ lines, each with $N \\times K$ characters.\n\n## Example\n\n```\nInput:\n5 4 2\nXXX.\nX..X\nXXX.\nX..X\nXXX.\n\nOutput:\nXXXXXX..\nXXXXXX..\nXX....XX\nXX....XX\nXXXXXX..\nXXXXXX..\nXX....XX\nXX....XX\nXXXXXX..\nXXXXXX..\n```",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    5,
                    4,
                    2,
                    "XXX.",
                    "X..X",
                    "XXX.",
                    "X..X",
                    "XXX."
                ],
                expected: [
                    "XXXXXX..",
                    "XXXXXX..",
                    "XX....XX",
                    "XX....XX",
                    "XXXXXX..",
                    "XXXXXX..",
                    "XX....XX",
                    "XX....XX",
                    "XXXXXX..",
                    "XXXXXX.."
                ]
            },
            {
                input: [
                    1,
                    1,
                    3,
                    "X"
                ],
                expected: [
                    "XXX",
                    "XXX",
                    "XXX"
                ]
            },
            {
                input: [
                    2,
                    2,
                    1,
                    "AB",
                    "CD"
                ],
                expected: [
                    "AB",
                    "CD"
                ]
            }
        ]
    },
    {
        title: "Speeding Ticket (Bronze)",
        difficulty: "Bronze",
        functionName: "main",
        description: "## Problem\n\nBessie is driving on a road of length 100 miles. The road is split into $N$ segments, each with a specific speed limit. Bessie travels the road in $M$ segments, each at a constant speed.\n\nFind the maximum amount Bessie exceeds the speed limit at any point.\n\n## Input Format\n\nLine 1: `N M`\nNext `N` lines: `length limit`\nNext `M` lines: `length speed`\n(Sum of lengths is always 100 for both).\n\n## Output Format\n\nA single integer: max amount over the limit (0 if never over).\n\n## Example\n\n```\nInput:\n3 3\n40 75\n50 35\n10 45\n40 76\n20 30\n40 40\n\nOutput:\n5\n```",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    3,
                    3,
                    40,
                    75,
                    50,
                    35,
                    10,
                    45,
                    40,
                    76,
                    20,
                    30,
                    40,
                    40
                ],
                expected: [
                    5
                ]
            },
            {
                input: [
                    1,
                    1,
                    100,
                    50,
                    100,
                    50
                ],
                expected: [
                    0
                ]
            },
            {
                input: [
                    1,
                    1,
                    100,
                    50,
                    100,
                    60
                ],
                expected: [
                    10
                ]
            }
        ]
    },
    {
        title: "The Lost Cow (Bronze)",
        difficulty: "Bronze",
        functionName: "main",
        description: "## Problem\n\nFarmer John is at position $x$ and Bessie is at $y$. FJ searches in a zig-zag: $x+1, x-2, x+4, x-8...$\nFind total distance traveled until he reaches Bessie.\n\n## Input Format\n\nLine 1: `x y`\n\n## Output Format\n\nTotal distance.\n\n## Example\n\n```\nInput:\n3 6\n\nOutput:\n9\n```",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    3,
                    6
                ],
                expected: [
                    9
                ]
            },
            {
                input: [
                    0,
                    1
                ],
                expected: [
                    1
                ]
            },
            {
                input: [
                    0,
                    -1
                ],
                expected: [
                    3
                ]
            }
        ]
    },
    {
        title: "The Bovine Shuffle (Bronze)",
        difficulty: "Bronze",
        functionName: "main",
        description: "## Problem\n\nYou are given a shuffle description (where cow at $i$ moves to $a_i$) and the final order of cows after 3 shuffles. Find the initial order.\n\n## Input Format\n\nLine 1: $N$\nLine 2: $N$ integers $a_1 \\dots a_N$\nLine 3: $N$ integers (final IDs)\n\n## Output Format\n\n$N$ lines with initial IDs.\n\n## Example\n\n```\nInput:\n5\n1 3 4 5 2\n1234567 2222222 3333333 4444444 5555555\n\nOutput:\n1234567\n5555555\n2222222\n3333333\n4444444\n```",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    5,
                    1,
                    3,
                    4,
                    5,
                    2,
                    1234567,
                    2222222,
                    3333333,
                    4444444,
                    5555555
                ],
                expected: [
                    1234567,
                    5555555,
                    2222222,
                    3333333,
                    4444444
                ]
            }
        ]
    },
    {
        title: "The Bucket List (Bronze)",
        difficulty: "Bronze",
        functionName: "main",
        description: "## Problem\n\nGiven $N$ cows, each needing $b_i$ buckets from time $s_i$ to $t_i$. Buckets can be reused. Find min buckets needed.\n\n## Input Format\n\nLine 1: $N$\nNext $N$ lines: $s_i$ $t_i$ $b_i$\n\n## Output Format\n\nMin total buckets.\n\n## Example\n\n```\nInput:\n3\n4 10 1\n8 13 3\n2 6 2\n\nOutput:\n4\n```",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    3,
                    4,
                    10,
                    1,
                    8,
                    13,
                    3,
                    2,
                    6,
                    2
                ],
                expected: [
                    4
                ]
            }
        ]
    },
    {
        title: "Grass Planting",
        difficulty: "Bronze+",
        functionName: "main",
        description: "## Problem (Silver/Bronze Hard)\n\nComplex simulation involving Grass Planting.\n\n## Input\nStandard grid or graph input.\n",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    5
                ],
                expected: [
                    5
                ]
            }
        ]
    },
    {
        title: "Milk Measurement",
        difficulty: "Bronze+",
        functionName: "main",
        description: "## Problem (Silver/Bronze Hard)\n\nComplex simulation involving Milk Measurement.\n\n## Input\nStandard grid or graph input.\n",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    5
                ],
                expected: [
                    5
                ]
            }
        ]
    },
    {
        title: "Hoofball",
        difficulty: "Bronze+",
        functionName: "main",
        description: "## Problem (Silver/Bronze Hard)\n\nComplex simulation involving Hoofball.\n\n## Input\nStandard grid or graph input.\n",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    5
                ],
                expected: [
                    5
                ]
            }
        ]
    },
    {
        title: "Why Did the Cow Cross the Road",
        difficulty: "Bronze+",
        functionName: "main",
        description: "## Problem (Silver/Bronze Hard)\n\nComplex simulation involving Why Did the Cow Cross the Road.\n\n## Input\nStandard grid or graph input.\n",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    5
                ],
                expected: [
                    5
                ]
            }
        ]
    },
    {
        title: "Rental Service",
        difficulty: "Bronze+",
        functionName: "main",
        description: "## Problem (Silver/Bronze Hard)\n\nComplex simulation involving Rental Service.\n\n## Input\nStandard grid or graph input.\n",
        starterCode: `// Write your full solution here\n// Use strict stdin/stdout`,
        testCases: [
            {
                input: [
                    5
                ],
                expected: [
                    5
                ]
            }
        ]
    }
];
