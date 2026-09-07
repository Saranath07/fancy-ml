import React from 'react';
import { motion } from 'framer-motion';
import { HERO_FIVE_MOVIES } from '../../data/movies';
import { PosterCard } from '../ui/PosterCard';
import { LaTeX } from '../layout/LaTeX';
import { Trophy, Smartphone, Search, Bot } from 'lucide-react';

export const Slide13_AdaptiveFinale: React.FC = () => {
  const champion = HERO_FIVE_MOVIES[2]; // Maharaja

  const realWorldEchoes = [
    {
      icon: <Smartphone className="w-5 h-5 text-purple-400" />,
      title: 'Feed Personalization',
      desc: 'Instagram Reels & Spotify actively test items to infer latent user taste in sub-linear steps.'
    },
    {
      icon: <Search className="w-5 h-5 text-blue-400" />,
      title: 'Search Ranking',
      desc: 'Google interprets search result clicks as noisy pairwise preferences to rank billions of web pages.'
    },
    {
      icon: <Bot className="w-5 h-5 text-emerald-400" />,
      title: 'LLM Alignment (RLHF & DPO)',
      desc: 'ChatGPT and Claude learn human tone by comparing Response A vs Response B via the Bradley-Terry model.'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>ADAPTIVE FINALE • 10 QUESTIONS LATER</span>
        </div>

        <div className="text-sm font-mono text-cyan-400 font-bold">
          <LaTeX math="10 \ll 190 \quad \implies \quad \text{Bayes-Optimal Final Selection}" />
        </div>
      </div>

      {/* Center Stage: Champion Podium & Real-World AI Pillars */}
      <div className="relative z-10 w-full max-w-5xl my-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        {/* Left 2 cols: Champion on Podium */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border-2 border-amber-500/40 backdrop-blur-md shadow-2xl">
          <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase mb-2">
            CONVERGED POSTERIOR #1
          </span>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glow-gold"
          >
            <PosterCard
              movie={champion}
              size="lg"
              isWinner={true}
              showDetails={true}
            />
          </motion.div>

          <div className="mt-4 text-center">
            <h3 className="text-xl font-extrabold text-white font-display">{champion.title}</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">Posterior Confidence: <strong>91.4%</strong></p>
          </div>
        </div>

        {/* Right 3 cols: The 3 Pillars of Modern Pairwise AI */}
        <div className="lg:col-span-3 flex flex-col gap-3.5">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
            Where This Runs The Modern World
          </span>

          {realWorldEchoes.map((echo, idx) => (
            <motion.div
              key={echo.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * idx, duration: 0.5 }}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex items-start gap-4"
            >
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0">
                {echo.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">{echo.title}</h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-sans">{echo.desc}</p>
              </div>
            </motion.div>
          ))}

          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-transparent to-cyan-500/15 border border-amber-500/30 text-xs text-slate-200 font-sans italic text-center mt-1">
            “When judgments are expensive, deciding what to ask can matter as much as learning from the answer.”
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>MACHINE LEARNING AS OPTIMAL DECISION-MAKING UNDER UNCERTAINTY</span>
        <span className="text-amber-400/80 font-semibold">Thank you!</span>
      </div>
    </div>
  );
};
