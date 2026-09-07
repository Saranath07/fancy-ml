import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOURNAMENT_TWENTY_MOVIES } from '../../data/movies';
import { Movie } from '../../types/presentation';
import { LaTeX } from '../layout/LaTeX';
import { Trophy, Play, RotateCcw, TrendingUp } from 'lucide-react';

interface Match {
  id: number;
  movieA: Movie;
  movieB: Movie;
  winner?: Movie;
  scoreA: number;
  scoreB: number;
}

export const Slide04_Tournament: React.FC = () => {
  // 16 seeded movies for clear 4-round bracket visualization (Round of 16 -> Quarters -> Semis -> Final)
  const initialMovies = TOURNAMENT_TWENTY_MOVIES.slice(0, 16);

  const [ratings, setRatings] = useState<{ [id: string]: number }>(
    Object.fromEntries(initialMovies.map(m => [m.id, m.initialElo]))
  );

  const [matches, setMatches] = useState<Match[]>([
    { id: 1, movieA: initialMovies[0], movieB: initialMovies[1], scoreA: 58, scoreB: 42 },
    { id: 2, movieA: initialMovies[2], movieB: initialMovies[3], scoreA: 64, scoreB: 36 },
    { id: 3, movieA: initialMovies[4], movieB: initialMovies[5], scoreA: 45, scoreB: 55 },
    { id: 4, movieA: initialMovies[6], movieB: initialMovies[7], scoreA: 52, scoreB: 48 },
    { id: 5, movieA: initialMovies[8], movieB: initialMovies[9], scoreA: 61, scoreB: 39 },
    { id: 6, movieA: initialMovies[10], movieB: initialMovies[11], scoreA: 50, scoreB: 50 },
    { id: 7, movieA: initialMovies[12], movieB: initialMovies[13], scoreA: 44, scoreB: 56 },
    { id: 8, movieA: initialMovies[14], movieB: initialMovies[15], scoreA: 67, scoreB: 33 }
  ]);

  const [activeStep, setActiveStep] = useState(0); // 0: round of 16, 1: quarters, 2: semis, 3: final, 4: winner
  const [champion, setChampion] = useState<Movie | null>(null);

  const runNextRound = () => {
    if (activeStep >= 4) return;

    if (activeStep === 0) {
      // Complete R16
      const updatedMatches = matches.map(m => {
        const winner = m.scoreA >= m.scoreB ? m.movieA : m.movieB;
        return { ...m, winner };
      });
      setMatches(updatedMatches);

      // Update Elo ratings
      setRatings(prev => {
        const next = { ...prev };
        updatedMatches.forEach(m => {
          if (m.winner?.id === m.movieA.id) {
            next[m.movieA.id] += 32;
            next[m.movieB.id] -= 32;
          } else {
            next[m.movieA.id] -= 32;
            next[m.movieB.id] += 32;
          }
        });
        return next;
      });

      setActiveStep(1);
    } else if (activeStep === 1) {
      // Quarterfinals
      setActiveStep(2);
    } else if (activeStep === 2) {
      // Semifinals
      setActiveStep(3);
    } else if (activeStep === 3) {
      // Finals -> Crown Maharaja / Leo
      setChampion(initialMovies[2]); // Maharaja as champion
      setActiveStep(4);
    }
  };

  const resetTournament = () => {
    setActiveStep(0);
    setChampion(null);
    setRatings(Object.fromEntries(initialMovies.map(m => [m.id, m.initialElo])));
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>SINGLE-ELIMINATION TOURNAMENT</span>
          </div>
          <div className="text-sm font-mono text-slate-300">
            <LaTeX math="20 - 1 = 19 \text{ matches total}" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runNextRound}
            disabled={activeStep >= 4}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-black font-display font-bold text-xs tracking-wider transition shadow-lg shadow-amber-500/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {activeStep === 0 ? 'SIMULATE ROUND 1' : activeStep < 4 ? 'ADVANCE BRACKET' : 'TOURNAMENT FINISHED'}
          </button>
          <button
            onClick={resetTournament}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Split: Left = Knockout Bracket, Right = Live Elo Board */}
      <div className="relative z-10 w-full flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 items-center my-auto py-2">
        {/* Knockout Bracket View (3 cols) */}
        <div className="lg:col-span-3 h-full flex flex-col justify-center bg-slate-950/60 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-md overflow-hidden">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-3 border-b border-slate-800 pb-2">
            <span>ROUND OF 16 (8 MATCHES)</span>
            <span>QUARTERS</span>
            <span>SEMIS</span>
            <span>CHAMPION PODIUM</span>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center h-full">
            {/* Column 1: Round of 16 */}
            <div className="space-y-2">
              {matches.slice(0, 4).map(m => (
                <div
                  key={m.id}
                  className={`p-2 rounded-lg border text-xs flex flex-col gap-1 transition ${
                    m.winner ? 'bg-slate-900 border-slate-700' : 'bg-slate-900/50 border-slate-800'
                  }`}
                >
                  <div className={`flex justify-between items-center ${m.winner?.id === m.movieA.id ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>
                    <span className="truncate w-24">{m.movieA.title}</span>
                    <span className="font-mono text-[10px]">{m.scoreA}</span>
                  </div>
                  <div className={`flex justify-between items-center ${m.winner?.id === m.movieB.id ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>
                    <span className="truncate w-24">{m.movieB.title}</span>
                    <span className="font-mono text-[10px]">{m.scoreB}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Quarters */}
            <div className="space-y-6 flex flex-col justify-around">
              {[0, 1].map(qIdx => (
                <div
                  key={qIdx}
                  className={`p-2.5 rounded-lg border text-xs flex flex-col gap-1.5 ${
                    activeStep >= 2 ? 'bg-slate-900 border-amber-500/40 text-white' : 'bg-slate-900/30 border-slate-800 text-slate-600'
                  }`}
                >
                  <span className="truncate font-semibold">
                    {activeStep >= 1 ? (qIdx === 0 ? 'Leo' : 'Maharaja') : 'TBD'}
                  </span>
                  <span className="truncate font-semibold">
                    {activeStep >= 1 ? (qIdx === 0 ? 'Vikram' : 'Kaithi') : 'TBD'}
                  </span>
                </div>
              ))}
            </div>

            {/* Column 3: Semis */}
            <div className="flex flex-col justify-center">
              <div
                className={`p-3 rounded-xl border text-xs flex flex-col gap-2 ${
                  activeStep >= 3 ? 'bg-slate-900 border-cyan-500/50 text-cyan-300' : 'bg-slate-900/20 border-slate-800 text-slate-600'
                }`}
              >
                <span className="font-bold">{activeStep >= 2 ? 'Leo' : 'TBD'}</span>
                <span className="font-bold">{activeStep >= 2 ? 'Maharaja' : 'TBD'}</span>
              </div>
            </div>

            {/* Column 4: Champion Podium */}
            <div className="flex flex-col items-center justify-center">
              <AnimatePresence>
                {champion ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent border-2 border-amber-400 shadow-2xl shadow-amber-500/30"
                  >
                    <Trophy className="w-10 h-10 text-amber-400 mb-2 animate-bounce" />
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">Tournament Winner</span>
                    <h4 className="text-lg font-extrabold text-white font-display mt-0.5">{champion.title}</h4>
                    <span className="text-xs text-slate-300 mt-1 font-mono">Elo: {ratings[champion.id] + 96}</span>
                  </motion.div>
                ) : (
                  <div className="w-28 h-36 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 text-xs font-mono">
                    <Trophy className="w-6 h-6 mb-1 opacity-40" />
                    <span>CHAMPION</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Live Elo Leaderboard (1 col) */}
        <div className="h-full bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400 font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>LIVE ELO LEADERBOARD</span>
          </div>

          <div className="space-y-1.5 my-auto max-h-[38vh] overflow-y-auto pr-1">
            {initialMovies
              .slice()
              .sort((a, b) => ratings[b.id] - ratings[a.id])
              .slice(0, 7)
              .map((m, rank) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500 text-[11px]">#{rank + 1}</span>
                    <span className="font-semibold text-slate-200 truncate w-24">{m.title}</span>
                  </div>
                  <span className="font-mono text-amber-400 font-bold text-[11px]">{ratings[m.id]}</span>
                </div>
              ))}
          </div>

          <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800">
            Bracket decides who survives; Elo aggregates evidence across matches.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-2 border-t border-slate-800/60">
        <span>SINGLE-ELIMINATION: EFFICIENT BUT UNFORGIVING</span>
        <span className="text-amber-400/80 font-semibold">Click 'Advance Bracket' to simulate round updates</span>
      </div>
    </div>
  );
};
