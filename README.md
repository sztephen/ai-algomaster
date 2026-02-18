<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1en4Q6d0OJZ4QOvILfZtuW2NADLPTsbxC

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## C++ Test Execution

As of **February 15, 2026**, the public Piston API endpoint is whitelist-only.  
You now have two ways to run C++ test cases:

- AI simulation (Gemini via OpenRouter): add your OpenRouter key in-app
- Direct execution API (Piston-compatible): configure your own endpoint

- In-app: Home screen -> `Code Runner API URL`
- Or via env: set `VITE_PISTON_API_URL` in `.env.local`

Example endpoint: `http://localhost:2000/api/v2/piston/execute`
