import React, { useState, useRef, useEffect } from 'react';
import { RunSummary, TestResult } from '../types';
import { HintMessage } from '../services/aiService';

interface Props {
    summary: RunSummary | null;
    hintConversation: HintMessage[];
    isLoadingHint: boolean;
    onGetHint: (userQuestion?: string) => void;
}

// Custom Markdown Parser (Bold + Code Blocks)
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    // Split by code blocks first
    const parts = text.split(/(```[\s\S]*?```)/g);

    return (
        <span>
            {parts.map((part, idx) => {
                if (part.startsWith('```')) {
                    // Code Block
                    const content = part.replace(/^```[\w]*\n?/, '').replace(/```$/, '');
                    return (
                        <div key={idx} className="my-2 bg-[#1e1e1e] border border-[#3e3e3e] rounded p-2 overflow-x-auto font-mono text-xs text-[#d4d4d4]">
                            <pre>{content}</pre>
                        </div>
                    );
                }
                // Regular Text - Parse Bold **text**
                const boldParts = part.split(/(\*\*.*?\*\*)/g);
                return (
                    <span key={idx}>
                        {boldParts.map((bPart, bIdx) => {
                            if (bPart.startsWith('**') && bPart.endsWith('**')) {
                                return <strong key={bIdx} className="text-[#00bcf2]">{bPart.slice(2, -2)}</strong>;
                            }
                            // Handle inline code `text`
                            const codeParts = bPart.split(/(`.*?`)/g);
                            return (
                                <span key={bIdx}>
                                    {codeParts.map((cPart, cIdx) => {
                                        if (cPart.startsWith('`') && cPart.endsWith('`')) {
                                            return <code key={cIdx} className="bg-[#333] px-1 rounded text-[#ce9178] font-mono text-xs">{cPart.slice(1, -1)}</code>;
                                        }
                                        return cPart;
                                    })}
                                </span>
                            );
                        })}
                    </span>
                );
            })}
        </span>
    );
};

// Typewriter Component
const Typewriter: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
    const [displayed, setDisplayed] = useState('');
    const index = useRef(0);

    useEffect(() => {
        index.current = 0;
        setDisplayed('');

        const interval = setInterval(() => {
            if (index.current < text.length) {
                setDisplayed((prev) => prev + text.charAt(index.current));
                index.current++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 10); // Speed: 10ms per char

        return () => clearInterval(interval);
    }, [text]);

    return <FormattedText text={displayed} />;
};

export const ResultsPanel: React.FC<Props> = ({ summary, hintConversation, isLoadingHint, onGetHint }) => {
    const [showAll, setShowAll] = useState(false);
    const [followUpInput, setFollowUpInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Reset showAll when summary changes (new run)
    // Auto-expand if there are failures
    useEffect(() => {
        if (summary) {
            const hasFails = summary.passed < summary.total && !summary.error;
            setShowAll(hasFails);
        }
    }, [summary]);

    // Scroll to bottom of chat when new messages come in
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [hintConversation, isLoadingHint]);

    const handleSendFollowUp = () => {
        if (followUpInput.trim() && !isLoadingHint) {
            onGetHint(followUpInput.trim());
            setFollowUpInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendFollowUp();
        }
    };

    // Render test summary at top
    const renderTestSummary = () => {
        if (!summary) return null;
        if (summary.error) {
            return (
                <div className="bg-[#f85149]/10 border border-[#f85149]/30 text-[#f85149] p-3 rounded text-sm font-mono animate-fade-in-up">
                    <span className="font-bold">Error:</span> {summary.error}
                </div>
            );
        }
        const allPassed = summary.passed === summary.total;
        return (
            <div className={`flex items-center gap-3 p-3 rounded border animate-fade-in-up ${allPassed
                ? 'bg-[#2ea043]/10 border-[#2ea043]/30'
                : 'bg-[#ffd343]/10 border-[#ffd343]/30'
                }`}>
                <span className={`text-lg font-bold font-mono ${allPassed ? 'text-[#2ea043]' : 'text-[#ffd343]'}`}>
                    {summary.passed}/{summary.total}
                </span>
                <span className="text-gray-400 text-sm">
                    test cases passed
                </span>
                {allPassed && <span className="text-[#2ea043] subtle-status">✓</span>}
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col bg-[#252526]/95 backdrop-blur-sm overflow-hidden">
            {/* Test Results Summary - Always at top */}
            <div className="p-4 border-b border-[#333] flex-shrink-0">
                <h2 className="text-xs font-bold text-[#cccccc] uppercase tracking-wider mb-3">Results</h2>
                {summary ? renderTestSummary() : (
                    <p className="text-gray-500 text-sm">Run your code to see results.</p>
                )}
            </div>

            {/* AI Hint Chat Section */}
            <div className="flex-1 flex flex-col min-h-0 bg-[#1e1e1e]/95 relative">
                {/* Header */}
                <div className="p-3 border-b border-[#333] bg-[#252526]/95 backdrop-blur-sm flex items-center justify-between z-10 shadow-sm">
                    <h3 className="text-[#ffd343] text-sm font-bold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        AI Hints
                    </h3>
                    {hintConversation.length === 0 && (
                        <button
                            onClick={() => onGetHint()}
                            disabled={isLoadingHint}
                            className={`px-3 py-1.5 rounded text-sm font-medium modern-btn
                ${isLoadingHint
                                    ? 'bg-[#333] text-gray-500 cursor-not-allowed'
                                    : 'bg-[#ffd343]/20 text-[#ffd343] hover:bg-[#ffd343]/30 border border-[#ffd343]/30'
                                }`}
                        >
                            {isLoadingHint ? 'Starting...' : 'Get Hint'}
                        </button>
                    )}
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {hintConversation.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2 opacity-60">
                            <span className="text-4xl opacity-20">?</span>
                            <p className="text-sm">Need help? Ask AI.</p>
                        </div>
                    ) : (
                        hintConversation.map((msg, idx) => {
                            const isLastMessage = idx === hintConversation.length - 1;
                            const shouldTypewrite = isLastMessage && msg.role === 'assistant';

                            return (
                                <div
                                    key={idx}
                                    className={`flex w-full message-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[90%] p-3 rounded-xl text-sm leading-relaxed shadow-sm
                                            ${msg.role === 'user'
                                                ? 'bg-[#0078d4] text-white rounded-br-none'
                                                : 'bg-[#333] text-[#e0e0e0] rounded-bl-none border border-[#444]'
                                            }`}
                                    >
                                        {shouldTypewrite ? (
                                            <Typewriter text={msg.content} onComplete={() => { }} />
                                        ) : (
                                            <FormattedText text={msg.content} />
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {/* Thinking Indicator */}
                    {isLoadingHint && (
                        <div className="flex justify-start thinking-indicator message-in">
                            <div className="bg-[#333] border border-[#444] rounded-xl rounded-bl-none p-3 flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-[#ffd343] rounded-full typing-dot" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-[#ffd343] rounded-full typing-dot" style={{ animationDelay: '120ms' }}></div>
                                    <div className="w-2 h-2 bg-[#ffd343] rounded-full typing-dot" style={{ animationDelay: '240ms' }}></div>
                                </div>
                                <span className="text-xs text-gray-400 font-medium ml-1">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Follow-up Input */}
                {hintConversation.length > 0 && (
                    <div className="p-3 border-t border-[#333] bg-[#252526]/95 backdrop-blur-sm">
                        <div className="flex gap-2 relative">
                            <input
                                type="text"
                                value={followUpInput}
                                onChange={(e) => setFollowUpInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask a follow-up question..."
                                className="flex-1 bg-[#1e1e1e] border border-[#3e3e3e] rounded-full px-4 py-2 text-sm text-[#cccccc] placeholder-gray-500 outline-none modern-input"
                                disabled={isLoadingHint}
                            />
                            <button
                                onClick={handleSendFollowUp}
                                disabled={isLoadingHint || !followUpInput.trim()}
                                className={`px-4 py-2 rounded-full text-sm font-bold modern-btn
                  ${isLoadingHint || !followUpInput.trim()
                                        ? 'bg-[#333] text-gray-500 cursor-not-allowed'
                                        : 'bg-[#ffd343] text-black hover:bg-[#e5c23d] shadow-lg'
                                    }`}
                            >
                                <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Test Case Details - Collapsible at bottom */}
            {summary && !summary.error && (
                <div className="border-t border-[#333] max-h-[40%] overflow-y-auto bg-[#1e1e1e]">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="w-full p-2 text-xs text-gray-400 hover:bg-[#333] flex items-center justify-center gap-2 modern-btn"
                    >
                        {showAll ? 'Hide' : 'Show'} test case details
                        <svg
                            className={`w-3 h-3 transform transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {showAll && (
                        <div className="p-2 space-y-1 animate-fade-in-down">
                            {summary.results.map((result, idx) => (
                                <TestCaseRow key={idx} result={result} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const TestCaseRow: React.FC<{ result: TestResult; index: number }> = ({ result, index }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`border rounded-md text-xs ${result.passed ? 'border-[#2ea043]/20 bg-[#2ea043]/5' : 'border-[#f85149]/20 bg-[#f85149]/5'}`}>
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-2 text-left hover:bg-white/5 rounded-t-md modern-btn"
            >
                <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold shadow-sm ${result.passed ? 'bg-[#2ea043] text-white' : 'bg-[#f85149] text-white'}`}>
                        {index + 1}
                    </span>
                    <span className={`font-semibold ${result.passed ? 'text-[#2ea043]' : 'text-[#f85149]'}`}>
                        {result.passed ? 'PASS' : 'FAIL'}
                    </span>
                </div>
                <svg
                    className={`w-3 h-3 text-gray-500 transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {expanded && (
                <div className="p-3 border-t border-white/5 font-mono text-[10px] space-y-3 bg-[#1e1e1e] rounded-b-md animate-fade-in">
                    <div>
                        <span className="text-gray-500 block mb-1 font-semibold uppercase">Input</span>
                        <div className="text-[#9cdcfe] break-all bg-[#0d0d0d] p-1.5 rounded border border-[#333]">{result.input}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <span className="text-gray-500 block mb-1 font-semibold uppercase">Expected</span>
                            <div className="text-[#ce9178] break-all bg-[#0d0d0d] p-1.5 rounded border border-[#333]">{result.expected}</div>
                        </div>
                        <div>
                            <span className="text-gray-500 block mb-1 font-semibold uppercase">Actual</span>
                            <div className={`p-1.5 rounded border border-[#333] break-all bg-[#0d0d0d] ${result.passed ? 'text-[#ce9178]' : 'text-[#f85149]'}`}>{result.actual}</div>
                        </div>
                    </div>
                    {result.error && (
                        <div className="mt-1 pt-2 border-t border-white/10">
                            <span className="text-[#f85149] break-all font-bold">Error: {result.error}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
