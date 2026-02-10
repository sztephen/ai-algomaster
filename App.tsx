import React, { useState, useEffect, useRef } from 'react';
import { Problem, RunSummary, AppState } from './types';
import { generateProblems, getAIHint, HintMessage, saveApiKey, getSavedApiKey, hasApiKey } from './services/aiService';
import { runCppCode } from './services/cppRunner';
import { Editor } from './components/Editor';
import { ProblemDescription } from './components/ProblemDescription';
import { ResultsPanel } from './components/ResultsPanel';
import { PRESET_PROBLEMS } from './presetProblems';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);

  // Layout State
  const [leftWidth, setLeftWidth] = useState(30); // Percentage
  const [rightWidth, setRightWidth] = useState(30); // Percentage
  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);

  // Data
  const [generatedProblems, setGeneratedProblems] = useState<Problem[]>([]);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState<number>(0);

  // Current Active Problem Data
  const [userCode, setUserCode] = useState<string>("");
  const [runSummary, setRunSummary] = useState<RunSummary | null>(null);
  const [cursorStats, setCursorStats] = useState({ line: 1, col: 1 });

  // Hint State - supports conversation with follow-up questions
  const [hintConversation, setHintConversation] = useState<HintMessage[]>([]);
  const [isLoadingHint, setIsLoadingHint] = useState<boolean>(false);

  // Inputs
  const [userPrompt, setUserPrompt] = useState("Give me 3 easy C++ problems about array manipulation.");
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeProblem = generatedProblems[selectedProblemIndex];
  const [isPresetMode, setIsPresetMode] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState(getSavedApiKey());
  const [showApiKeySection, setShowApiKeySection] = useState(!hasApiKey());

  // LocalStorage keys
  const PRESET_PROGRESS_KEY = 'algomaster_preset_progress';
  const GLOBAL_STATE_KEY = 'algomaster_global_state';

  // Persistence Logic
  useEffect(() => {
    // Load state on mount
    try {
      const savedState = localStorage.getItem(GLOBAL_STATE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.generatedProblems && parsed.generatedProblems.length > 0) {
          setGeneratedProblems(parsed.generatedProblems);
          setSelectedProblemIndex(parsed.selectedProblemIndex || 0);
          setIsPresetMode(!!parsed.isPresetMode);
          setUserCode(parsed.userCode || "");
          setState(AppState.SELECTING_PROBLEM); // Default to selection view if data exists

          // If we had an active problem in the saved state, maybe go there? 
          // But safer to go to selection screen to avoid confusion.
          if (parsed.viewState === AppState.CODING) {
            setState(AppState.CODING);
          }
        }
      }
    } catch (e) {
      console.error("Failed to load persistence state", e);
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (generatedProblems.length > 0) {
      const stateToSave = {
        generatedProblems,
        selectedProblemIndex,
        isPresetMode,
        userCode, // Save current scratchpad too
        viewState: state
      };
      localStorage.setItem(GLOBAL_STATE_KEY, JSON.stringify(stateToSave));
    }
  }, [generatedProblems, selectedProblemIndex, isPresetMode, userCode, state]);

  // Save preset progress to localStorage
  const savePresetProgress = (problems: Problem[]) => {
    const progress: Record<number, { userCode: string; completed: boolean; completedDate?: string }> = {};
    problems.forEach((prob, idx) => {
      if (prob.userCode || prob.completed) {
        progress[idx] = {
          userCode: prob.userCode || '',
          completed: prob.completed || false,
          completedDate: prob.completedDate
        };
      }
    });
    localStorage.setItem(PRESET_PROGRESS_KEY, JSON.stringify(progress));
  };

  // Load preset progress from localStorage
  const loadPresetProgress = (): Record<number, { userCode: string; completed: boolean; completedDate?: string }> => {
    try {
      const saved = localStorage.getItem(PRESET_PROGRESS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  // Save user code (and auto-save)
  const saveCurrentCode = () => {
    if (activeProblem && userCode !== activeProblem.starterCode) {
      const updatedProblems = [...generatedProblems];
      const currentProb = updatedProblems[selectedProblemIndex];
      updatedProblems[selectedProblemIndex] = {
        ...currentProb,
        userCode: userCode
      };
      setGeneratedProblems(updatedProblems);

      if (isPresetMode) {
        savePresetProgress(updatedProblems);
      }
    }
  };

  // Manual Export (Save to File) - for both Preset and Generated
  const handleExportProgress = () => {
    // Save current code first before exporting
    const problemsToSave = generatedProblems.map((prob, idx) => ({
      ...prob,
      userCode: idx === selectedProblemIndex ? userCode : prob.userCode
    }));

    const dataStr = JSON.stringify(problemsToSave, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `algomaster_progress_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Manual Import (Load from File)
  const handleImportProgress = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const importedProblems = JSON.parse(text) as Problem[];
        if (!Array.isArray(importedProblems) || importedProblems.length === 0) {
          throw new Error('Invalid file format');
        }

        if (confirm(`Load ${importedProblems.length} problems from file? Current progress will be replaced.`)) {
          setGeneratedProblems(importedProblems);
          // If these look like preset problems (check first title?), maybe set preset mode? 
          // For now, treat as "loaded" content. 
          // But if user wants to "Restore" preset progress, we usually expect them to be in preset mode.
          // Let's just load them.
          setIsPresetMode(true); // Treat imported as a "set"
          setState(AppState.SELECTING_PROBLEM);
          setError(null);
        }
      } catch (err: any) {
        setError('Failed to import: ' + err.message);
      }
    };
    input.click();
  };

  // Reset all preset progress
  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem(PRESET_PROGRESS_KEY);
      // Reload presets without saved progress
      setGeneratedProblems([...PRESET_PROBLEMS]);
    }
  };

  // Resizing Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingLeft.current) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 15 && newWidth < 45) setLeftWidth(newWidth);
      }
      if (isDraggingRight.current) {
        const newWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
        if (newWidth > 15 && newWidth < 45) setRightWidth(newWidth);
      }
    };
    const handleMouseUp = () => {
      if (isDraggingLeft.current || isDraggingRight.current) {
        isDraggingLeft.current = false;
        isDraggingRight.current = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';

        // Remove overlay if it exists (used to prevent iframe/editor capture during drag)
        const overlay = document.getElementById('drag-overlay');
        if (overlay) overlay.style.display = 'none';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startResizingLeft = () => {
    isDraggingLeft.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const overlay = document.getElementById('drag-overlay');
    if (overlay) overlay.style.display = 'block';
  };

  const startResizingRight = () => {
    isDraggingRight.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const overlay = document.getElementById('drag-overlay');
    if (overlay) overlay.style.display = 'block';
  };

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    setState(AppState.GENERATING_PROBLEM);
    setError(null);
    setGeneratedProblems([]);
    try {
      const problems = await generateProblems(userPrompt);
      if (problems.length === 0) throw new Error("No problems generated. Try a different prompt.");
      setGeneratedProblems(problems);
      setState(AppState.SELECTING_PROBLEM);
    } catch (e: any) {
      setError("Generation Failed: " + e.message);
      setState(AppState.IDLE);
    }
  };

  const handleLoadPresets = () => {
    // Load preset problems with saved progress
    const savedProgress = loadPresetProgress();
    const problemsWithProgress = PRESET_PROBLEMS.map((prob, idx) => {
      const saved = savedProgress[idx];
      if (saved) {
        return {
          ...prob,
          userCode: saved.userCode || prob.starterCode,
          completed: saved.completed || false,
          completedDate: saved.completedDate
        };
      }
      return { ...prob };
    });
    setGeneratedProblems(problemsWithProgress);
    setIsPresetMode(true);
    setState(AppState.SELECTING_PROBLEM);
    setError(null);
  };

  const selectProblem = (index: number) => {
    // Save current code before switching
    saveCurrentCode();

    setSelectedProblemIndex(index);
    const prob = generatedProblems[index];
    // Load saved code or use starter code
    setUserCode(prob.userCode || prob.starterCode);
    setRunSummary(null);
    setHintConversation([]);
    setCursorStats({ line: 1, col: 1 });
    setState(AppState.CODING);
  };

  // Existing handleRun updated for Date
  const handleRun = async () => {
    if (!activeProblem) return;
    setState(AppState.RUNNING_TESTS);
    setRunSummary(null);
    try {
      const summary = await runCppCode(userCode, activeProblem.functionName, activeProblem.testCases);
      setRunSummary(summary);

      // Mark as completed if all tests pass
      const allPassed = summary.passed === summary.total && !summary.error;
      const updatedProblems = [...generatedProblems];
      const currentProb = updatedProblems[selectedProblemIndex];

      const isNewCompletion = allPassed && !currentProb.completed;

      updatedProblems[selectedProblemIndex] = {
        ...currentProb,
        userCode: userCode,
        completed: allPassed || currentProb.completed,
        completedDate: isNewCompletion ? new Date().toISOString() : currentProb.completedDate
      };
      setGeneratedProblems(updatedProblems);

      if (isPresetMode) {
        savePresetProgress(updatedProblems);
      }

      setState(AppState.CODING);
    } catch (e: any) {
      setError("Runtime Error: " + e.message);
      setState(AppState.CODING);
    }
  };

  const handleGetHint = async (userQuestion?: string) => {
    if (!activeProblem || isLoadingHint) return;
    setIsLoadingHint(true);
    try {
      const hint = await getAIHint(activeProblem, userCode, hintConversation, userQuestion);
      // Add to conversation history
      const newMessages: HintMessage[] = [];
      if (userQuestion) {
        newMessages.push({ role: 'user', content: userQuestion });
      } else if (hintConversation.length === 0) {
        newMessages.push({ role: 'user', content: "I'm stuck. What approach should I consider?" });
      }
      newMessages.push({ role: 'assistant', content: hint });
      setHintConversation(prev => [...prev, ...newMessages]);
    } catch (e) {
      setHintConversation(prev => [...prev, { role: 'assistant', content: 'Unable to get hint. Try again!' }]);
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleBackToSelection = () => {
    // Save current code before leaving
    saveCurrentCode();

    setState(AppState.SELECTING_PROBLEM);
    setRunSummary(null);
    setHintConversation([]);
  };

  const handleBackToHome = () => {
    // Save progress before going home for preset mode
    if (isPresetMode && generatedProblems.length > 0) {
      savePresetProgress(generatedProblems);
    }
    setState(AppState.IDLE);
    setGeneratedProblems([]);
    setIsPresetMode(false);
    setError(null);
  };

  const handleCursorMove = (line: number, col: number) => {
    setCursorStats({ line, col });
  };

  // --- Views ---

  if (state === AppState.IDLE) {
    return (
      <div className="h-full flex items-center justify-center bg-[#1e1e1e] p-4 relative overflow-hidden">
        {/* C++ inspired Background Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0078d4] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00bcf2] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-2xl w-full bg-[#2d2d2d] border border-[#3e3e3e] rounded-xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-4">
              <span className="text-[#0078d4]">AI</span>
              <span className="text-[#00bcf2]">AlgoMaster</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Generate C++ interview questions tailored to your needs.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#0078d4] mb-2 uppercase tracking-wide">
                Describe your challenge
              </label>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="w-full h-32 bg-[#1e1e1e] border border-[#3e3e3e] rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-[#0078d4] focus:border-transparent outline-none resize-none text-lg leading-relaxed placeholder-gray-600 code-font shadow-inner"
                placeholder="e.g. 'Give me 5 vector problems ranging from easy to hard' or 'Create a very hard dynamic programming challenge about graphs'"
              />
            </div>

            {error && <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-900/50">{error}</div>}

            <button
              onClick={handleGenerate}
              className="w-full bg-[#0078d4] hover:bg-[#005a9e] text-white font-bold py-4 rounded-lg transition-all transform active:scale-[0.99] shadow-lg text-lg flex items-center justify-center gap-2"
            >
              <span>Generate Challenges</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </button>

            <button
              onClick={handleImportProgress}
              className="w-full bg-transparent hover:bg-[#2d2d2d] text-gray-400 hover:text-white font-medium py-3 rounded-lg transition-all border border-[#3e3e3e] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Load Saved Progress</span>
            </button>

            <button
              onClick={handleLoadPresets}
              className="w-full bg-[#00bcf2] hover:bg-[#00a4d6] text-[#1e1e1e] font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Use Preset Problems (No AI)</span>
            </button>

            {/* API Key Section */}
            <div className="mt-2 border border-[#3e3e3e] rounded-lg overflow-hidden">
              <button
                onClick={() => setShowApiKeySection(!showApiKeySection)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-[#333] transition"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span>OpenRouter API Key</span>
                  {hasApiKey() && <span className="text-green-400 text-xs">✓ Saved</span>}
                </div>
                <svg className={`w-4 h-4 transition-transform ${showApiKeySection ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showApiKeySection && (
                <div className="px-4 pb-4 space-y-3 border-t border-[#3e3e3e]">
                  <p className="text-xs text-gray-500 pt-3">
                    Required for AI-generated problems and hints. Get a key at{' '}
                    <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-[#0078d4] hover:underline">openrouter.ai/keys</a>
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="sk-or-v1-..."
                      className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded px-3 py-2 text-sm text-gray-200 font-mono placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        saveApiKey(apiKeyInput);
                        setShowApiKeySection(false);
                      }}
                      disabled={!apiKeyInput.trim()}
                      className="px-4 py-2 bg-[#0078d4] hover:bg-[#005a9e] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded transition"
                    >
                      Save
                    </button>
                  </div>
                  {hasApiKey() && (
                    <button
                      onClick={() => {
                        setApiKeyInput('');
                        saveApiKey('');
                      }}
                      className="text-xs text-red-400 hover:text-red-300 transition"
                    >
                      Clear saved key
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === AppState.GENERATING_PROBLEM) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#1e1e1e] text-white space-y-8">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-4 border-[#0078d4]/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#00bcf2] rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[#0078d4] text-3xl font-bold">
            C++
          </div>
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold animate-pulse text-[#0078d4]">Crafting Challenges...</h2>
          <p className="text-gray-500 mt-4 text-lg">AI is interpreting your request and designing C++ solutions.</p>
        </div>
      </div>
    );
  }

  if (state === AppState.SELECTING_PROBLEM) {
    const completedCount = generatedProblems.filter(p => p.completed).length;
    const totalCount = generatedProblems.length;
    const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    // Filter problems by search
    const filteredProblems = generatedProblems
      .map((prob, idx) => ({ prob, idx }))
      .filter(({ prob }) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          prob.title.toLowerCase().includes(q) ||
          prob.difficulty.toLowerCase().includes(q) ||
          prob.description.toLowerCase().includes(q)
        );
      });

    return (
      <div className="h-full flex flex-col bg-[#1e1e1e] text-white p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex gap-2">
              <span className="text-[#0078d4]">Select</span>
              <span className="text-[#00bcf2]">Challenge</span>
              {isPresetMode && (
                <span className="text-sm font-normal text-gray-400 ml-4 self-center">
                  {completedCount}/{totalCount} completed
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleExportProgress}
                className="text-[#2ea043] hover:text-white px-4 py-2 rounded border border-[#2ea043]/50 hover:bg-[#2ea043]/20 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Export Progress
              </button>
              {isPresetMode && (
                <button
                  onClick={handleResetProgress}
                  className="text-red-400 hover:text-white px-4 py-2 rounded border border-red-500/50 hover:bg-red-500/20 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
              )}
              <button onClick={handleBackToHome} className="text-gray-400 hover:text-white px-4 py-2 rounded border border-[#3e3e3e] hover:bg-[#2d2d2d] transition">
                Start Over
              </button>
            </div>
          </div>

          {/* Search & Progress */}
          <div className="mb-6 space-y-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems by title, difficulty..."
              className="w-full bg-[#1e1e1e] border border-[#3e3e3e] rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent transition"
            />
            {isPresetMode && (
              <div className="relative">
                <div className="w-full h-2 bg-[#333] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0078d4] to-[#2ea043] rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 mt-1 block text-right">
                  {Math.round(progressPct)}% complete
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {filteredProblems.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p className="text-lg">No problems match "{searchQuery}"</p>
                <button onClick={() => setSearchQuery('')} className="text-[#0078d4] text-sm mt-2 hover:underline">Clear search</button>
              </div>
            )}
            {filteredProblems.map(({ prob, idx }) => (
              <div
                key={idx}
                onClick={() => selectProblem(idx)}
                style={{ animationDelay: `${idx * 0.05}s` }}
                className="bg-[#252526] border border-[#3e3e3e] rounded-lg p-6 cursor-pointer hover:border-[#0078d4] hover:bg-[#2d2d2d] transition-all group relative overflow-hidden shadow-lg animate-fade-in-up"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-6xl font-bold text-[#0078d4]">{idx + 1}</span>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider
                    ${prob.difficulty === 'Basics' ? 'bg-cyan-400/20 text-cyan-400' :
                      prob.difficulty === 'Very Easy' ? 'bg-teal-400/20 text-teal-400' :
                        prob.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
                          prob.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                            prob.difficulty === 'Bronze' ? 'bg-orange-400/20 text-orange-400' :
                              'bg-red-400/20 text-red-400'}`}>
                    {prob.difficulty}
                  </span>
                  {prob.completed && (
                    <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#2ea043] text-white flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Done
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-[#0078d4] transition-colors line-clamp-2">{prob.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-4 mb-4">{prob.description.replace(/[#*`]/g, '')}</p>

                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-sm font-semibold ${prob.completed ? 'text-[#2ea043]' : 'text-[#0078d4]'}`}>
                    {prob.completed ? 'Review Solution' : 'Solve Challenge'}
                  </span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform text-[#0078d4]">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Coding View
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Invisible overlay for smoother dragging */}
      <div id="drag-overlay" className="fixed inset-0 z-50 hidden cursor-col-resize"></div>

      {/* Header */}
      <header className="h-12 border-b border-[#333] bg-[#252526] flex items-center justify-between px-4 shrink-0 select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToSelection}
            className="text-gray-400 hover:text-white flex items-center gap-1 text-xs font-medium hover:bg-[#333] px-2 py-1 rounded transition"
          >
            ← Problems
          </button>
          <div className="h-4 w-px bg-[#333]"></div>
          <div className="flex items-center gap-2">
            <span className="text-[#0078d4] font-bold text-lg">C++</span>
            <span className="font-bold text-sm text-[#cccccc]">
              {activeProblem?.title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-white/5
                ${activeProblem?.difficulty === 'Basics' ? 'text-cyan-400 bg-cyan-400/10' :
              activeProblem?.difficulty === 'Very Easy' ? 'text-teal-400 bg-teal-400/10' :
                activeProblem?.difficulty === 'Easy' ? 'text-green-400 bg-green-400/10' :
                  activeProblem?.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' :
                    activeProblem?.difficulty === 'Bronze' ? 'text-orange-400 bg-orange-400/10' :
                      'text-red-400 bg-red-400/10'}`}>
            {activeProblem?.difficulty}
          </span>
        </div>
      </header>

      {/* Resizable Content Area */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Left: Problem Description */}
        <div style={{ width: `${leftWidth}%` }} className="h-full min-w-[200px]">
          {activeProblem && <ProblemDescription problem={activeProblem} />}
        </div>

        {/* Left Resizer */}
        <div
          className="resizer w-1 bg-[#333] hover:bg-[#0078d4] cursor-col-resize z-20 flex-shrink-0"
          onMouseDown={startResizingLeft}
        ></div>

        {/* Middle: Editor */}
        <div style={{ width: `${100 - leftWidth - rightWidth}%` }} className="h-full flex-1 min-w-[300px]">
          <Editor
            code={userCode}
            onChange={setUserCode}
            onRun={handleRun}
            isRunning={state === AppState.RUNNING_TESTS || state === AppState.ANALYZING_FEEDBACK}
            onCursorMove={handleCursorMove}
            starterCode={activeProblem?.starterCode}
          />
        </div>

        {/* Right Resizer */}
        <div
          className="resizer w-1 bg-[#333] hover:bg-[#0078d4] cursor-col-resize z-20 flex-shrink-0"
          onMouseDown={startResizingRight}
        ></div>

        {/* Right: Results */}
        <div style={{ width: `${rightWidth}%` }} className="h-full min-w-[200px]">
          <ResultsPanel
            summary={runSummary}
            hintConversation={hintConversation}
            isLoadingHint={isLoadingHint}
            onGetHint={handleGetHint}
          />
        </div>

      </div>

      {/* Footer Status Bar - VS Code Style */}
      <footer className="h-6 bg-[#0078d4] text-white flex items-center px-2 text-xs select-none">
        <div className="flex gap-4">
          <span>C++17</span>
          <span>Ln {cursorStats.line}, Col {cursorStats.col}</span>
          <span>Spaces: 4</span>
          <span>UTF-8</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
