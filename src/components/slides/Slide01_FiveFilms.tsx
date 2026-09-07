import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_FIVE_MOVIES } from '../../data/movies';
import { PosterCard } from '../ui/PosterCard';
import { Sparkles, Users } from 'lucide-react';

export const Slide01_FiveFilms: React.FC = () => {
  const [votes, setVotes] = useState<{ [id: string]: number }>({
    leo: 24,
    jailer: 31,
    maharaja: 42,
    amaran: 38,
    goat: 19
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleVote = (movieId: string) => {
    setSelectedId(movieId);
    setVotes(prev => ({
      ...prev,
      [movieId]: (prev[movieId] || 0) + 1
    }));
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center select-none">
      {/* Top Ambient Title Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-400"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>INSTINCTIVE SELECTION • 5 ALTERNATIVES</span>
      </motion.div>

      {/* Main 5-Poster Arc */}
      <div className="relative z-10 w-full max-w-6xl flex justify-center items-end gap-4 md:gap-8 my-auto pt-6">
        {HERO_FIVE_MOVIES.map((movie, index) => {
          const isSelected = selectedId === movie.id;
          // Arc curvature rotation: -6deg, -3deg, 0deg, +3deg, +6deg
          const rotation = (index - 2) * 3;
          const yOffset = Math.abs(index - 2) * 12;

          return (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 60, scale: 0.85 }}
              animate={{ opacity: 1, y: yOffset, scale: 1 }}
              transition={{ delay: 0.15 * index, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ transform: `rotate(${rotation}deg)` }}
              className="flex flex-col items-center group"
            >
              <PosterCard
                movie={movie}
                size="hero"
                votes={votes[movie.id]}
                isSelected={isSelected}
                highlightColor={movie.accentColor}
                onClick={() => handleVote(movie.id)}
                showDetails={true}
              />
              
              <button
                onClick={() => handleVote(movie.id)}
                className={`mt-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                  isSelected
                    ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/30'
                    : 'bg-white/5 hover:bg-white/15 text-slate-300 border-white/10 hover:border-white/25'
                }`}
              >
                {isSelected ? 'YOUR CHOICE' : 'VOTE THIS FILM'}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Audience Silhouette & Instruction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full flex items-center justify-between text-xs text-slate-500 font-mono pt-4 border-t border-slate-800/60"
      >
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <span>LIVE AUDIENCE POLL ACTIVE • INSTINCT-DRIVEN</span>
        </div>
        <div className="text-amber-400/80 font-semibold animate-pulse">
          Click any film to cast a vote
        </div>
      </motion.div>
    </div>
  );
};
