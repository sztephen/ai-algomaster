import React, { useEffect, useState, useRef, useCallback } from 'react';

// Declare Prism global
declare var Prism: any;

interface Props {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  isRunning: boolean;
  onCursorMove?: (line: number, col: number) => void;
  starterCode?: string;
}

// Auto-close pairs for C++
const BRACKET_PAIRS: { [key: string]: string } = {
  '(': ')',
  '[': ']',
  '{': '}',
  '"': '"',
  "'": "'",
  '<': '>',
};

// Undo/Redo history
interface HistoryEntry {
  code: string;
  cursorPos: number;
}

const MAX_HISTORY = 100;

export const Editor: React.FC<Props> = ({ code, onChange, onRun, isRunning, onCursorMove, starterCode }) => {
  const [lines, setLines] = useState<number[]>([]);
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  // Undo/Redo state
  const [history, setHistory] = useState<HistoryEntry[]>([{ code: '', cursorPos: 0 }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUndoRedoRef = useRef(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  // Initialize history with initial code
  useEffect(() => {
    if (code && history.length === 1 && history[0].code === '') {
      setHistory([{ code, cursorPos: code.length }]);
    }
  }, []);

  useEffect(() => {
    const count = code.split('\n').length;
    setLines(Array.from({ length: Math.max(count, 1) }, (_, i) => i + 1));

    // Highlight code for C++
    if (typeof Prism !== 'undefined' && Prism.languages.cpp) {
      const html = Prism.highlight(code, Prism.languages.cpp, 'cpp');
      setHighlightedCode(html + (code.endsWith('\n') ? '<br>' : ''));
    } else {
      setHighlightedCode(code);
    }
  }, [code]);

  // Save to history on code change (with debounce logic handled by flag)
  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }

    const cursorPos = textareaRef.current?.selectionStart || 0;
    const lastEntry = history[historyIndex];

    // Only save if code actually changed
    if (lastEntry && lastEntry.code !== code) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ code, cursorPos });
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [code]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const entry = history[newIndex];
      onChange(entry.code);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = entry.cursorPos;
          textareaRef.current.selectionEnd = entry.cursorPos;
        }
      }, 0);
    }
  }, [historyIndex, history, onChange]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const entry = history[newIndex];
      onChange(entry.code);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = entry.cursorPos;
          textareaRef.current.selectionEnd = entry.cursorPos;
        }
      }, 0);
    }
  }, [historyIndex, history, onChange]);

  const updateCursorStats = (e: React.SyntheticEvent<HTMLTextAreaElement> | HTMLTextAreaElement) => {
    if (!onCursorMove) return;
    const target = 'currentTarget' in e ? (e.currentTarget as HTMLTextAreaElement) : e;
    const { selectionStart } = target;
    const value = target.value;
    const textBeforeCursor = value.substring(0, selectionStart);
    const linesBeforeCursor = textBeforeCursor.split('\n');
    const line = linesBeforeCursor.length;
    const col = linesBeforeCursor[linesBeforeCursor.length - 1].length + 1;
    onCursorMove(line, col);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const { selectionStart, selectionEnd, value } = textarea;

    // Cmd/Ctrl + Enter to run
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isRunning) onRun();
      return;
    }

    // Cmd/Ctrl + Z for undo
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
      return;
    }

    // Cmd/Ctrl + Shift + Z for redo
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      redo();
      return;
    }

    // Tab handling - insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const newValue = value.substring(0, selectionStart) + "    " + value.substring(selectionEnd);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = selectionStart + 4;
        textarea.selectionEnd = selectionStart + 4;
        updateCursorStats(textarea);
      }, 0);
      return;
    }

    // Backspace - handle dedent (remove 4 spaces at once)
    if (e.key === 'Backspace') {
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const textBeforeCursor = value.substring(lineStart, selectionStart);

      // If cursor is at start of indentation (only spaces before cursor on this line)
      if (/^( {4})+$/.test(textBeforeCursor) && selectionStart === selectionEnd) {
        e.preventDefault();
        const newValue = value.substring(0, selectionStart - 4) + value.substring(selectionStart);
        onChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = selectionStart - 4;
          textarea.selectionEnd = selectionStart - 4;
          updateCursorStats(textarea);
        }, 0);
        return;
      }
    }

    // Auto-close brackets and quotes (except < which is often used for comparison)
    if (BRACKET_PAIRS[e.key] && e.key !== '<') {
      const closingChar = BRACKET_PAIRS[e.key];
      // For quotes, only auto-close if next char is space/newline/end or at end
      if (e.key === '"' || e.key === "'") {
        const nextChar = value[selectionEnd];
        if (nextChar && nextChar !== ' ' && nextChar !== '\n' && nextChar !== '\t' && nextChar !== ';' && nextChar !== ')' && nextChar !== ']' && nextChar !== '}') {
          return; // Don't auto-close
        }
      }

      e.preventDefault();
      const newValue = value.substring(0, selectionStart) + e.key + closingChar + value.substring(selectionEnd);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = selectionStart + 1;
        textarea.selectionEnd = selectionStart + 1;
        updateCursorStats(textarea);
      }, 0);
      return;
    }

    // Skip over closing brackets if typed
    if ([')', ']', '}', '"', "'", '>'].includes(e.key)) {
      if (value[selectionStart] === e.key) {
        e.preventDefault();
        setTimeout(() => {
          textarea.selectionStart = selectionStart + 1;
          textarea.selectionEnd = selectionStart + 1;
          updateCursorStats(textarea);
        }, 0);
        return;
      }
    }

    // Enter handling - auto-indent for C++
    if (e.key === 'Enter') {
      e.preventDefault();

      // Find the start of the current line
      const lastNewLine = value.lastIndexOf('\n', selectionStart - 1);
      const currentLineText = value.substring(lastNewLine + 1, selectionStart);

      // Capture existing indentation
      const match = currentLineText.match(/^(\s*)/);
      let indent = match ? match[1] : '';

      // Check context
      const isBlockStart = currentLineText.trim().endsWith('{');
      const isBlockEnd = value[selectionEnd] === '}';

      let insertion = '';
      let cursorOffset = 0;

      if (isBlockStart && isBlockEnd) {
        // {|} -> Enter -> splits into 3 lines properly indented
        const innerIndent = indent + '    ';
        insertion = '\n' + innerIndent + '\n' + indent;
        cursorOffset = 1 + innerIndent.length;
      } else {
        // Normal behavior
        if (isBlockStart) {
          indent += '    ';
        }
        insertion = '\n' + indent;
        cursorOffset = insertion.length;
      }

      const newValue = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
      onChange(newValue);

      setTimeout(() => {
        const newCursorPos = selectionStart + cursorOffset;
        if (textarea) {
          textarea.selectionStart = newCursorPos;
          textarea.selectionEnd = newCursorPos;
          updateCursorStats(textarea);

          // Scroll adjustment if needed
          const lineHeight = 28; // Larger line height
          const currentScroll = textarea.scrollTop;
          const textareaHeight = textarea.clientHeight;
          // Use newValue to calculate position
          const caretPosition = (newValue.substring(0, newCursorPos).split('\n').length) * lineHeight;

          if (caretPosition > currentScroll + textareaHeight) {
            textarea.scrollTop = caretPosition - textareaHeight + lineHeight;
          }
        }
      }, 0);
    }

    // Auto-add closing brace when typing { and pressing Enter
    if (e.key === '}') {
      // Auto-dedent closing brace
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const textBeforeCursor = value.substring(lineStart, selectionStart);

      if (/^\s+$/.test(textBeforeCursor) && textBeforeCursor.length >= 4) {
        e.preventDefault();
        const newIndent = textBeforeCursor.substring(4);
        const newValue = value.substring(0, lineStart) + newIndent + '}' + value.substring(selectionEnd);
        onChange(newValue);

        setTimeout(() => {
          const newPos = lineStart + newIndent.length + 1;
          textarea.selectionStart = newPos;
          textarea.selectionEnd = newPos;
          updateCursorStats(textarea);
        }, 0);
        return;
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (linesRef.current) {
      linesRef.current.scrollTop = scrollTop;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]/90 backdrop-blur-sm">
      {/* Editor Tab Bar */}
      <div className="flex items-center justify-between bg-[#252526]/95 border-b border-[#333] z-10">
        <div className="flex">
          <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-[#0078d4] text-[#cccccc] text-sm font-medium flex items-center gap-2">
            <span className="text-[#0078d4] font-bold">C++</span>
            solution.cpp
          </div>
        </div>
        <div className="p-1 flex items-center gap-2">
          <span className="text-[#666] text-[10px] font-mono hidden sm:inline">
            {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+↵ Run · {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+Z Undo
          </span>
          {starterCode && (
            <button
              onClick={() => {
                if (confirm('Reset code to starter template? Your changes will be lost.')) {
                  onChange(starterCode);
                }
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-sm text-[11px] font-medium text-gray-400 hover:text-white hover:bg-[#333] modern-btn"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          )}
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-sm text-sm font-bold modern-btn
                ${isRunning
                ? 'bg-[#333] text-gray-500 cursor-not-allowed'
                : 'bg-[#2ea043] hover:bg-[#238636] text-white shadow-sm'}`}
          >
            {isRunning ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
            <span className="uppercase tracking-wider">Run</span>
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex overflow-hidden">
        {/* Line Numbers - Larger text */}
        <div
          ref={linesRef}
          className="w-14 bg-[#1a1f27] text-[#858585] text-right pr-3 py-4 select-none code-font text-base leading-7 overflow-hidden"
        >
          {lines.map(line => (
            <div key={line}>{line}</div>
          ))}
        </div>

        {/* Code Container */}
        <div className="flex-1 relative h-full">
          {/* Highlighting Layer (Background) - Larger text */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 m-0 py-4 px-3 bg-transparent pointer-events-none code-font text-base leading-7 overflow-hidden whitespace-pre"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', Courier, monospace" }}
          >
            <code
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
              className="language-cpp"
            />
          </pre>

          {/* Input Layer (Foreground) - Larger text, matching padding */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={updateCursorStats}
            onClick={updateCursorStats}
            onScroll={handleScroll}
            className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white py-4 px-3 outline-none resize-none code-font text-base leading-7 whitespace-pre"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            style={{
              color: 'transparent',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', Courier, monospace",
              caretColor: 'white'
            }}
          />
        </div>
      </div>
    </div>
  );
};
