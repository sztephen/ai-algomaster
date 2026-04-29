# AI AlgoMaster 🚀

AI AlgoMaster is a modern, AI-powered platform for practicing C++ algorithm challenges. Whether you're preparing for technical interviews or sharpening your problem-solving skills, AI AlgoMaster provides tailored challenges, real-time code execution, and intelligent AI hints.



## ✨ Features

- **AI Challenge Generation**: Describe the type of problems you want (e.g., "5 hard dynamic programming questions"), and AI will craft them for you.
- **Preset Curriculum**: A curated set of C++ problems ranging from Basics to Hard.
- **Intelligent Hints**: Get stuck? Ask the AI for a hint without giving away the full solution.
- **Live Code Execution**: Run your C++ code directly in the browser using the Piston API or AI simulation.
- **Progress Tracking**: Automatically saves your progress locally. Export and import your data anytime.
- **Modern UI**: A sleek, responsive, and ambient dark-themed interface designed for focus.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **OpenRouter API Key** (for AI features)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sztephen/ai-algomaster.git
   cd ai-algomaster
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_key_here
   VITE_PISTON_API_URL=https://emkc.org/api/v2/piston/execute
   ```
   *(Note: You can also set these directly in the application UI)*

4. **Run the app**:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS (Modern UI Design)
- **AI**: Google Gemini (via OpenRouter)
- **Code Execution**: Piston API

## 📝 License

Private / All Rights Reserved.

---

*Made with ❤️ by Stephen Sun*
