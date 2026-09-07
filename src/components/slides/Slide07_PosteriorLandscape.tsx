import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LaTeX } from '../layout/LaTeX';
import { Activity, RefreshCw } from 'lucide-react';

export const Slide07_PosteriorLandscape: React.FC = () => {
  const [observedVotes, setObservedVotes] = useState(0);

  // Mean & variance shift with votes
  const priorMean = 0.0;
  const shift = observedVotes * 0.45;
  const currentMean = priorMean + shift;
  const variance = Math.max(0.6, 2.0 - observedVotes * 0.25);

  const addObservation = () => {
    if (observedVotes < 5) {
      setObservedVotes(prev => prev + 1);
    }
  };

  const resetObservations = () => {
    setObservedVotes(0);
  };

  // Generate SVG path for Gaussian curve N(currentMean, variance)
  const generateGaussianPath = (mean: number, std: number, width: number, height: number) => {
    const points: string[] = [];
    const minX = -4.0;
    const maxX = 4.0;
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const xVal = minX + (i / steps) * (maxX - minX);
      // Gaussian PDF: f(x) = (1 / (std * sqrt(2*pi))) * exp(-0.5 * ((x-mean)/std)^2)
      const expTerm = Math.exp(-0.5 * Math.pow((xVal - mean) / std, 2));
      const yVal = (1 / (std * Math.sqrt(2 * Math.PI))) * expTerm;

      const screenX = ((xVal - minX) / (maxX - minX)) * width;
      const screenY = height - (yVal / 0.8) * height * 0.85;

      points.push(`${i === 0 ? 'M' : 'L'} ${screenX.toFixed(1)} ${screenY.toFixed(1)}`);
    }

    return points.join(' ');
  };

  const svgWidth = 600;
  const svgHeight = 220;
  const posteriorPath = generateGaussianPath(currentMean, Math.sqrt(variance), svgWidth, svgHeight);
  const priorPath = generateGaussianPath(priorMean, Math.sqrt(2.0), svgWidth, svgHeight);

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold">
          <Activity className="w-3.5 h-3.5" />
          <span>BAYESIAN BELIEF UPDATING • PRIOR TO POSTERIOR</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={addObservation}
            disabled={observedVotes >= 5}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-black font-display font-bold text-xs tracking-wider transition shadow-lg shadow-amber-500/20"
          >
            + OBSERVE VOTE ({observedVotes}/5)
          </button>
          <button
            onClick={resetObservations}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Center Graph & Formula */}
      <div className="relative z-10 w-full max-w-5xl my-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left 2 cols: Interactive Probability Density Graph */}
        <div className="lg:col-span-2 flex flex-col p-6 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-slate-500 inline-block" />
              <span className="text-slate-400">Prior π(θ) [Dotted]</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-amber-400 inline-block shadow-sm shadow-amber-400" />
              <span className="text-amber-400 font-bold">Posterior π(θ|D) [Solid]</span>
            </span>
          </div>

          {/* SVG Density Curves */}
          <div className="relative w-full h-56 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 p-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
              {/* Baseline axis */}
              <line x1="0" y1={svgHeight - 15} x2={svgWidth} y2={svgHeight - 15} stroke="#334155" strokeWidth="1" />

              {/* Dotted Prior curve */}
              <path
                d={priorPath}
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="4,4"
              />

              {/* Dynamic Posterior curve */}
              <motion.path
                initial={false}
                animate={{ d: posteriorPath }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                fill="rgba(245, 158, 11, 0.12)"
                stroke="#fbbf24"
                strokeWidth="3"
              />
            </svg>

            {/* Zero axis marker */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500">
              θ = 0.0 (Uncertainty center)
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mt-3">
            <span>Observed wins for Film A: <strong className="text-amber-400 font-bold">{observedVotes}</strong></span>
            <span>Current belief mean: <strong className="text-cyan-400 font-bold">{currentMean.toFixed(2)}</strong></span>
            <span>Uncertainty width (σ²): <strong className="text-slate-200">{variance.toFixed(2)}</strong></span>
          </div>
        </div>

        {/* Right 1 col: Math Breakdown */}
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            Bayes' Theorem for Latent Skills
          </span>

          <div className="py-2 text-xl font-mono text-white text-center">
            <LaTeX
              math="\pi(\theta \mid D) \propto P(D \mid \theta)\,\pi(\theta)"
              display={true}
            />
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            - <strong>Prior π(θ)</strong>: Our initial beliefs about latent skills before asking the audience.
          </p>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            - <strong>Likelihood P(D|θ)</strong>: How likely the observed duel vote was under candidate skills.
          </p>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            - <strong>Posterior π(θ|D)</strong>: Our refined belief. Uncertainty narrows, but never collapses completely from a single result.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>EVIDENCE SHIFTS THE DENSITY; IT DOES NOT ELIMINATE UNCERTAINTY</span>
        <span className="text-amber-400/80 font-semibold">Click '+ Observe Vote' to watch the posterior deform</span>
      </div>
    </div>
  );
};
