import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LaTeX } from '../layout/LaTeX';
import { Sparkles, Check, Play, ArrowRight } from 'lucide-react';

export const Slide12_BellmanChoice: React.FC = () => {
  const [budget, setBudget] = useState(8);
  const [selectedPairIndex, setSelectedPairIndex] = useState<number | null>(1); // default to highest

  const candidateQueries = [
    {
      pair: 'Leo vs Jailer',
      p_ij: 0.52,
      v_plus: 0.61,
      v_minus: 0.58,
      expectedV: 0.52 * 0.61 + 0.48 * 0.58 // 0.595
    },
    {
      pair: 'Maharaja vs Amaran',
      p_ij: 0.56,
      v_plus: 0.74,
      v_minus: 0.68,
      expectedV: 0.56 * 0.74 + 0.44 * 0.68 // 0.713 (Optimal!)
    },
    {
      pair: 'Vikram vs Master',
      p_ij: 0.65,
      v_plus: 0.54,
      v_minus: 0.49,
      expectedV: 0.65 * 0.54 + 0.35 * 0.49 // 0.522
    },
    {
      pair: 'Leo vs Vaathi',
      p_ij: 0.94,
      v_plus: 0.45,
      v_minus: 0.42,
      expectedV: 0.94 * 0.45 + 0.06 * 0.42 // 0.448 (Suboptimal)
    }
  ];

  const executeOptimalQuery = (idx: number) => {
    setSelectedPairIndex(idx);
    if (budget > 0) {
      setBudget(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BELLMAN CHOICE • BAYES-OPTIMAL SEQUENTIAL DESIGN</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-amber-400">
          <span>REMAINING BUDGET:</span>
          <strong className="text-base">{budget}</strong>
        </div>
      </div>

      {/* Main Center Area: Bellman Master Equation + Interactive Candidate Evaluator */}
      <div className="relative z-10 w-full max-w-5xl my-auto flex flex-col items-center gap-6">
        {/* The Master Bellman Equation */}
        <div className="w-full max-w-3xl p-5 rounded-2xl bg-slate-950/90 border-2 border-amber-500/40 shadow-2xl text-center">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
            The Bellman Optimality Recursion
          </span>

          <div className="text-xl md:text-2xl font-mono text-white py-1">
            <LaTeX
              math="V_b(\pi) = \max_{i < j} \left[ p_{ij} V_{b-1}(\pi^{ij+}) + p_{ji} V_{b-1}(\pi^{ij-}) \right]"
              display={true}
            />
          </div>

          <p className="text-xs text-slate-300 font-sans mt-1">
            Evaluates every candidate pair as a 2-branch lookahead and selects the pair with the maximum expected terminal confidence.
          </p>
        </div>

        {/* Candidate Evaluation Table / Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidateQueries.map((q, idx) => {
            const isOptimal = idx === 1; // Maharaja vs Amaran is optimal
            const isSelected = selectedPairIndex === idx;

            return (
              <motion.div
                key={q.pair}
                whileHover={{ scale: 1.01 }}
                className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                  isOptimal
                    ? 'bg-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-display text-white text-base">{q.pair}</span>
                    {isOptimal && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400 text-black font-extrabold">
                        BAYES OPTIMAL
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-slate-400">p_ij = {(q.p_ij * 100).toFixed(0)}%</span>
                </div>

                <div className="my-2.5 text-xs font-mono text-slate-300 flex justify-between items-center">
                  <span>Branch Values: [{q.v_plus.toFixed(2)}, {q.v_minus.toFixed(2)}]</span>
                  <span>Expected Value: <strong className={isOptimal ? 'text-amber-400 text-sm font-bold' : 'text-slate-200 font-bold'}>{q.expectedV.toFixed(3)}</strong></span>
                </div>

                <button
                  onClick={() => executeOptimalQuery(idx)}
                  className={`w-full py-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition ${
                    isOptimal
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : <Play className="w-3 h-3 fill-current" />}
                  <span>{isOptimal ? 'SELECT OPTIMAL QUERY' : 'SELECT SUBOPTIMAL'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>EXHAUSTIVE LOOKAHEAD OPTIMIZATION OVER ALL CANDIDATE PAIRS</span>
        <span className="text-amber-400/80 font-semibold">Maharaja vs Amaran yields highest future certainty (0.713)</span>
      </div>
    </div>
  );
};
