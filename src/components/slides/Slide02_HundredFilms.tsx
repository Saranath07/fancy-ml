import { assetUrl } from '../../lib/asset-url';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { generateHundredFilms, HUNDRED_TAMIL_FILMS } from '../../data/movies';
import { LaTeX } from '../layout/LaTeX';
import { Network, AlertTriangle } from 'lucide-react';

export const Slide02_HundredFilms: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [edgeCount, setEdgeCount] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const films = useRef(generateHundredFilms()).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExploded(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Animated edge count ticker
  useEffect(() => {
    if (!isExploded) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 99;
      if (current >= 4950) {
        current = 4950;
        clearInterval(interval);
      }
      setEdgeCount(current);
    }, 25);

    return () => clearInterval(interval);
  }, [isExploded]);

  // Canvas edge drawing animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isExploded) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let linesDrawn = 0;

    const width = canvas.width;
    const height = canvas.height;

    // Generate grid points (10 x 10)
    const points: { x: number; y: number }[] = [];
    const cols = 10;
    const rows = 10;
    const padX = width * 0.08;
    const padY = height * 0.12;
    const stepX = (width - 2 * padX) / (cols - 1);
    const stepY = (height - 2 * padY) / (rows - 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          x: padX + c * stepX,
          y: padY + r * stepY
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.6;

      const targetLines = Math.min(linesDrawn + 45, 1200); // sample representative dense web
      linesDrawn = targetLines;

      for (let i = 0; i < targetLines; i++) {
        const p1 = points[i % points.length];
        const p2 = points[(i * 37 + 13) % points.length];

        ctx.strokeStyle = `rgba(245, 158, 11, ${0.12 + (i % 5) * 0.03})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      if (linesDrawn < 1200) {
        animId = requestAnimationFrame(draw);
      }
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [isExploded]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden">
      {/* Top Header */}
      <div className="z-20 flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full">
          <Network className="w-3.5 h-3.5 animate-spin" />
          <span>GLOBAL COMPARISON GRAPH • N = 100</span>
        </div>

        <div className="text-base md:text-lg text-amber-100 font-serif">
          <LaTeX math={String.raw`\text{What if we have 100 films?}`} />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-1 rounded-full">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>COGNITIVE OVERLOAD LIMIT REACHED</span>
        </div>
      </div>

      {/* Center 10x10 Film Poster Grid with Canvas Overlay */}
      <div className="relative z-10 w-full max-w-5xl aspect-[16/10] my-auto flex items-center justify-center">
        {/* Canvas for 4,950 connection lines */}
        <canvas
          ref={canvasRef}
          width={1000}
          height={600}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* 100 Posters Grid */}
        <div className="grid grid-cols-10 gap-1.5 md:gap-2.5 w-full h-full p-2">
          {films.map((film, idx) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: isExploded ? 0.35 : 0.85,
                scale: 1,
                filter: isExploded ? 'grayscale(80%)' : 'grayscale(0%)'
              }}
              transition={{ delay: (idx % 20) * 0.03 }}
              className="relative aspect-[2/3] rounded-md overflow-hidden bg-slate-800 border border-white/5 group shadow-sm"
              title={film.title}
            >
              <img
                src={assetUrl(film.poster)}
                alt={film.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to title placeholder if image fails
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.2';
                }}
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-transparent transition duration-200" />
              <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                <p className="text-[9px] font-medium text-white truncate text-center leading-tight">
                  {film.title}
                </p>
                {film.year && (
                  <p className="text-[8px] font-mono text-amber-400 text-center leading-none">
                    {film.year}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Illuminated Equation Card */}
        {isExploded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', damping: 20 }}
            className="absolute z-30 px-8 py-6 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border-2 border-amber-500/50 shadow-2xl flex flex-col items-center gap-3 text-center"
          >
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
              Pairwise Complexity Explosion
            </span>

            <div className="text-2xl md:text-4xl font-bold text-white font-mono">
              <LaTeX math="\binom{100}{2} = \frac{100 \cdot 99}{2} = 4,950" display={true} />
            </div>

            <p className="text-sm text-slate-300 max-w-md font-sans">
              A human cannot hold 4,950 simultaneous relationships in memory.
              Global ranking fails. We need a smaller, atomic unit of comparison.
            </p>

            <div className="flex items-center gap-3 mt-1 font-mono text-xs">
              <span className="text-slate-400">Total edges:</span>
              <span className="text-amber-400 font-extrabold text-sm">{edgeCount.toLocaleString()}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom status */}
      <div className="w-full flex items-center justify-between text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>O(N²) RELATIONSHIP EXPLOSION</span>
        <span className="text-amber-400/90 font-semibold">Solution: Decompose into 1v1 duels</span>
      </div>
    </div>
  );
};
