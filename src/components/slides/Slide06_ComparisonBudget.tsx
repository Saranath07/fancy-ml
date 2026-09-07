import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LaTeX } from '../layout/LaTeX';
import { Coins, HelpCircle, ArrowRight } from 'lucide-react';

export const Slide06_ComparisonBudget: React.FC = () => {
  const [budgetTokens, setBudgetTokens] = useState(10);
  const [spentQuestions, setSpentQuestions] = useState<string[]>([]);

  const candidatePairs = [
    { id: 'leo-jailer', label: 'Leo vs Jailer', value: 'High Information' },
    { id: 'maharaja-amaran', label: 'Maharaja vs Amaran', value: 'Highest Information' },
    { id: 'vikram-master', label: 'Vikram vs Master', value: 'Moderate Information' },
    { id: 'leo-vaathi', label: 'Leo vs Vaathi', value: 'Zero Information (Predictable)' }
  ];

  const spendToken = (pairLabel: string) => {
    if (budgetTokens <= 0) return;
    setBudgetTokens(prev => prev - 1);
    setSpentQuestions(prev => [pairLabel, ...prev]);
  };

  const resetBudget = () => {
    setBudgetTokens(10);
    setSpentQuestions([]);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-bold">
          <Coins className="w-3.5 h-3.5" />
          <span>EVIDENCE HAS A COST • OPPORTUNITY COST OF QUERIES</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={resetBudget}
            className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            Reset Budget
          </button>
        </div>
      </div>

      {/* Main Comparison Section */}
      <div className="relative z-10 w-full max-w-5xl my-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: The Budget Paradox */}
        <div className="flex flex-col gap-5 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">The Dilemma</span>
            <span className="text-xs font-mono text-amber-400 font-bold">{budgetTokens} TOKENS LEFT</span>
          </div>

          <div className="py-2 text-2xl font-mono text-white flex flex-col gap-2">
            <LaTeX math="\binom{20}{2} = 190 \text{ round-robin pairs}" display={true} />
            <div className="text-amber-400 text-center text-xl font-bold font-mono">
              <LaTeX math="\text{Budget: } b = 10 \text{ questions total}" display={true} />
            </div>
          </div>

          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            Full round-robin needs 190 questions. The audience will only answer <strong>10</strong>.
            Every single question asked leaves 180 questions unasked!
          </p>

          {/* 10 Gold Tokens Visualizer */}
          <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-900 border border-slate-800">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isAvailable = idx < budgetTokens;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isAvailable ? 1 : 0.75,
                    opacity: isAvailable ? 1 : 0.25
                  }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs border ${
                    isAvailable
                      ? 'bg-gradient-to-tr from-amber-600 to-yellow-400 text-black border-amber-300 shadow-md shadow-amber-500/30 glow-gold'
                      : 'bg-slate-800 text-slate-600 border-slate-700'
                  }`}
                >
                  $
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Which Pair Should We Query? */}
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>ACTIVE SELECTION: CHOOSE NEXT PAIR TO QUERY</span>
          </div>

          <div className="space-y-2.5">
            {candidatePairs.map(pair => (
              <button
                key={pair.id}
                onClick={() => spendToken(pair.label)}
                disabled={budgetTokens <= 0}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 transition disabled:opacity-35 text-left group"
              >
                <div>
                  <span className="font-semibold text-white text-sm group-hover:text-cyan-300 transition">
                    {pair.label}
                  </span>
                  <span className={`block text-[11px] font-mono mt-0.5 ${
                    pair.value.includes('High') ? 'text-amber-400' : 'text-slate-500'
                  }`}>
                    {pair.value}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-amber-400 transition">
                  <span>Query (-1 Token)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>

          {spentQuestions.length > 0 && (
            <div className="mt-2 text-xs font-mono text-slate-400">
              Queried so far: <span className="text-amber-400 font-semibold">{spentQuestions.slice(0, 3).join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>ACTIVE LEARNING: DECIDING WHAT TO LEARN NEXT</span>
        <span className="text-amber-400/80 font-semibold">Click candidate pairs to consume query budget</span>
      </div>
    </div>
  );
};
