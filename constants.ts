// Piston API configuration for C++ code execution
export const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

// C++ test runner template - wraps user code with a main() that runs test cases
export const CPP_TEST_TEMPLATE = `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <map>
#include <unordered_map>
#include <set>
#include <unordered_set>
#include <cmath>
#include <climits>

using namespace std;

// Helper to convert vector<int> to string for comparison
template<typename T>
string vec_to_string(const vector<T>& v) {
    ostringstream oss;
    oss << "[";
    for (size_t i = 0; i < v.size(); i++) {
        if constexpr (is_same_v<T, string>) {
            oss << "\\"" << v[i] << "\\"";
        } else {
            oss << v[i];
        }
        if (i < v.size() - 1) oss << ",";
    }
    oss << "]";
    return oss.str();
}

// USER_CODE_PLACEHOLDER

int main() {
    int passed = 0;
    int total = 0;
    
    // TEST_CASES_PLACEHOLDER
    
    cout << "RESULTS:" << passed << "/" << total << endl;
    return 0;
}
`;

// Map of function return types for generating proper test code
export const CPP_FUNCTION_TYPES: { [key: string]: { returnType: string; compareMethod: string } } = {
  'vector<int>': { returnType: 'vector<int>', compareMethod: 'vec_to_string' },
  'vector<string>': { returnType: 'vector<string>', compareMethod: 'vec_to_string' },
  'string': { returnType: 'string', compareMethod: 'direct' },
  'int': { returnType: 'int', compareMethod: 'direct' },
  'bool': { returnType: 'bool', compareMethod: 'direct' },
  'double': { returnType: 'double', compareMethod: 'direct' },
};
