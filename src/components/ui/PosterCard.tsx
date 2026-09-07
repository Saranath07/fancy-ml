import { assetUrl } from '../../lib/asset-url';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Movie } from '../../types/presentation';
import { Trophy, Star } from 'lucide-react';

interface PosterCardProps {
  movie: Movie;
  votes?: number;
  isSelected?: boolean;
  isWinner?: boolean;
  isEliminated?: boolean;
  elo?: number;
  highlightColor?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDetails?: boolean;
  className?: string;
}

export const PosterCard: React.FC<PosterCardProps> = ({
  movie,
  votes,
  isSelected = false,
  isWinner = false,
  isEliminated = false,
  elo,
  highlightColor,
  onClick,
  size = 'md',
  showDetails = false,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-36 text-xs',
    md: 'w-36 h-54 text-sm',
    lg: 'w-48 h-72 text-base',
    hero: 'w-56 h-84 md:w-64 md:h-96 text-lg'
  }[size];

  const glowStyle = isWinner
    ? '0 0 35px rgba(245, 158, 11, 0.7), 0 0 70px rgba(245, 158, 11, 0.3)'
    : isSelected
    ? `0 0 30px ${highlightColor || 'rgba(6, 182, 212, 0.6)'}`
    : '0 10px 25px -5px rgba(0, 0, 0, 0.6)';

  return (
    <motion.div
      layoutId={`poster-${movie.id}`}
      whileHover={!isEliminated ? { y: -8, scale: 1.03 } : {}}
      whileTap={!isEliminated && onClick ? { scale: 0.97 } : {}}
      onClick={!isEliminated ? onClick : undefined}
      style={{
        boxShadow: glowStyle,
        borderColor: isWinner
          ? '#fbbf24'
          : isSelected
          ? (highlightColor || '#38bdf8')
          : 'rgba(255, 255, 255, 0.12)'
      }}
      className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 select-none ${sizeClasses} ${
        isEliminated ? 'opacity-35 grayscale filter pointer-events-none' : ''
      } ${className}`}
    >
      {/* Background Poster Image or Fallback */}
      {!imageError ? (
        <img
          src={assetUrl(movie.poster)}
          alt={movie.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className="w-full h-full flex flex-col justify-between p-4"
          style={{
            background: `linear-gradient(135deg, ${movie.accentColor}40 0%, #090d16 100%)`
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-white leading-tight font-display">{movie.title}</h3>
            <p className="text-white/60 text-xs mt-1">{movie.year} • {movie.director}</p>
          </div>
        </div>
      )}

      {/* Glass gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Title & info if showDetails */}
      {showDetails && (
        <div className="absolute bottom-2 left-2 right-2 z-10 pointer-events-none">
          <p className="text-white font-bold font-display text-sm truncate drop-shadow-md">
            {movie.title}
          </p>
          <p className="text-slate-400 text-[11px] truncate">{movie.director}</p>
        </div>
      )}

      {/* Winner Crown Badge */}
      {isWinner && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-1 -right-1 z-20 bg-gradient-to-r from-amber-500 to-yellow-300 text-black px-2.5 py-1 rounded-bl-xl font-extrabold flex items-center gap-1 text-xs shadow-lg shadow-amber-500/50"
        >
          <Trophy className="w-3.5 h-3.5" />
          WINNER
        </motion.div>
      )}

      {/* Vote Count Badge */}
      {votes !== undefined && (
        <motion.div
          key={votes}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 backdrop-blur-md text-amber-400 px-3 py-0.5 rounded-full font-mono font-bold text-xs border border-amber-500/30 flex items-center gap-1 shadow-md"
        >
          <span className="text-white/50 text-[10px]">VOTES</span>
          <span>{votes}</span>
        </motion.div>
      )}

      {/* Elo Rating Badge */}
      {elo !== undefined && (
        <div className="absolute top-2 left-2 z-20 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-cyan-300 border border-cyan-500/20">
          ELO {Math.round(elo)}
        </div>
      )}
    </motion.div>
  );
};
