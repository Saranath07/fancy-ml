import { assetUrl } from '../../lib/asset-url';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LaTeX } from '../layout/LaTeX';
import { GitFork } from 'lucide-react';

const storyFrames = [
  { src: '/img-1.png', title: 'A Skybound Dream', alt: 'Aspiration & Childhood Dream' },
  { src: '/img-2.png', title: 'An Unspoken Bond', alt: 'Bond & College Love' },
  { src: '/img-3.png', title: 'The Weight of Choice', alt: 'The Dilemma & Weight of Choice' },
  { src: '/img-4.png', title: 'The Departures Gate', alt: 'The Irreversible Departure' }
];

interface Slide08Props {
  stage?: number;
  onAdvance?: () => void;
}

export const Slide08_IrreversibleFork: React.FC<Slide08Props> = ({
  stage,
  onAdvance
}) => {
  const [internalStage, setInternalStage] = useState(0);
  const currentStage = stage !== undefined ? stage : internalStage;
  const isAllFour = currentStage >= 4;
  const revealEquation = currentStage >= 5;

  const handleNext = () => {
    if (currentStage < 5) {
      setInternalStage((s) => s + 1);
    }
    onAdvance?.();
  };

  const handlePrev = () => {
    if (currentStage > 0) {
      setInternalStage((s) => s - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStage]);

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between items-center select-none py-2 cursor-pointer"
      onClick={handleNext}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between w-full z-20">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 font-bold">
          <GitFork className="w-3.5 h-3.5 text-purple-400" />
          <span>SEQUENTIAL DECISION PROCESS • LOOKAHEAD PRINCIPLE</span>
        </div>

        <div className="text-sm font-mono text-slate-400">
          <LaTeX math="A \longleftarrow \Large\circ\normalsize \longrightarrow B" />
        </div>
      </div>

      {/* Center Story Canvas: Picture by picture OR All 4 Frames + Equation */}
      <div className="relative z-10 w-full max-w-6xl my-auto flex flex-col items-center justify-center gap-5 md:gap-6">
        <AnimatePresence mode="wait">
          {!isAllFour ? (
            <motion.div
              key={`focus-${currentStage}`}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl max-h-[70vh] flex flex-col items-center justify-center gap-3"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 shadow-2xl flex items-center justify-center p-2">
                <img
                  src={assetUrl(storyFrames[currentStage].src)}
                  alt={storyFrames[currentStage].alt}
                  loading="eager"
                  className="max-h-[60vh] max-w-full object-contain rounded-xl"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.35 }}
                className="text-amber-100/95 font-serif text-xl md:text-2xl font-medium tracking-wide text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              >
                <LaTeX math={String.raw`\text{${storyFrames[currentStage].title}}`} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="all-four"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center gap-5 md:gap-6"
            >
              {/* 4 Story Frames in a Chronological Row without numbers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
                {storyFrames.map((frame, idx) => (
                  <motion.div
                    key={frame.src}
                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 shadow-2xl group hover:border-amber-400/50 transition-colors duration-300">
                      <img
                        src={assetUrl(frame.src)}
                        alt={frame.alt}
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="text-amber-200/90 text-xs md:text-sm font-mono tracking-wide text-center">
                      <LaTeX math={String.raw`\text{${frame.title}}`} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dynamic Programming Equation Directly Below (Revealed at final stage) */}
              <AnimatePresence>
                {revealEquation && (
                  <motion.div
                    key="bellman-eq"
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.96 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col items-center justify-center text-center py-2"
                  >
                    <div className="text-2xl md:text-4xl font-serif font-bold text-amber-100 my-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                      <LaTeX
                        math={String.raw`V_b(\pi) = \max_{i < j} \left[ p_{ij} V_{b-1}(\pi^{ij+}) + p_{ji} V_{b-1}(\pi^{ij-}) \right]`}
                        display={true}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60 w-full">
        <span>TIME IS IRREVERSIBLE FOR HUMANS • COMPUTERS SIMULATE BOTH PATHS</span>
        <span className="text-amber-400 font-semibold">Bellman Lookahead Recursion</span>
      </div>
    </div>
  );
};
