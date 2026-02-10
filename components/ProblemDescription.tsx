import React from 'react';
import { Problem } from '../types';

interface Props {
  problem: Problem;
}

export const ProblemDescription: React.FC<Props> = ({ problem }) => {
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // C++ Blue Headers
      if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-bold mb-4 text-[#0078d4] border-b border-[#333] pb-2">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold mb-3 text-[#0078d4] mt-4">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-base font-bold mb-2 text-[#00bcf2] mt-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1 text-gray-300 list-disc list-outside">{line.replace('- ', '')}</li>;
      if (line.startsWith('```')) return null;

      // Inline Code highlight
      if (line.includes('`')) {
        const parts = line.split('`');
        return (
          <p key={i} className="mb-2 text-[#cccccc] leading-relaxed text-sm">
            {parts.map((part, idx) => idx % 2 === 1 ? <code key={idx} className="bg-[#333] px-1 rounded text-[#00bcf2] font-mono text-xs">{part}</code> : part)}
          </p>
        )
      }
      return <p key={i} className="mb-2 text-[#cccccc] leading-relaxed text-sm">{line}</p>;
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      <div className="p-4 border-b border-[#333] bg-[#252526] sticky top-0 z-10 flex-shrink-0">
        <h1 className="text-lg font-bold text-[#cccccc] mb-2">{problem.title}</h1>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border 
                ${problem.difficulty === 'Basics' ? 'border-cyan-400/30 text-cyan-400 bg-cyan-400/10' :
              problem.difficulty === 'Very Easy' ? 'border-teal-400/30 text-teal-400 bg-teal-400/10' :
                problem.difficulty === 'Easy' ? 'border-green-400/30 text-green-400 bg-green-400/10' :
                  problem.difficulty === 'Medium' ? 'border-yellow-400/30 text-yellow-400 bg-yellow-400/10' :
                    problem.difficulty === 'Bronze' ? 'border-orange-400/30 text-orange-400 bg-orange-400/10' :
                      'border-red-400/30 text-red-400 bg-red-400/10'}`}>
            {problem.difficulty}
          </span>
          {problem.completed && (
            <span className="text-[10px] font-medium text-[#2ea043] flex items-center gap-1 bg-[#2ea043]/10 px-2 py-0.5 rounded border border-[#2ea043]/20">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Completed {problem.completedDate ? `on ${new Date(problem.completedDate).toLocaleDateString()}` : ''}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
        <div className="prose prose-invert max-w-none text-sm">
          {formatText(problem.description)}
        </div>

        <div className="mt-8 pt-4 border-t border-[#333]">
          <h3 className="text-[#0078d4] font-bold mb-3 text-sm uppercase tracking-wide">Examples</h3>
          <div className="space-y-4">
            {problem.testCases.slice(0, 2).map((tc, idx) => (
              <div key={idx} className="bg-[#1e1e1e] border border-[#333] rounded p-3 font-mono text-xs">
                <div className="mb-1 flex">
                  <span className="text-gray-500 w-16 shrink-0 select-none">Input:</span>
                  <span className="text-[#9cdcfe]">{JSON.stringify(tc.input)}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-16 shrink-0 select-none">Output:</span>
                  <span className="text-[#ce9178]">{JSON.stringify(tc.expected)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
