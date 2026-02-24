'use client';

import { motion } from 'framer-motion';
import { Star, Zap, TrendingUp } from 'lucide-react';

interface XPProgressBarProps {
  currentXP: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

// Level configuration
const LEVELS = [
  { tier: 'Bronze', minXP: 0, maxXP: 999, color: '#CD7F32', icon: '🥉' },
  { tier: 'Silver', minXP: 1000, maxXP: 4999, color: '#C0C0C0', icon: '🥈' },
  { tier: 'Gold', minXP: 5000, maxXP: 19999, color: '#FFD700', icon: '🥇' },
  { tier: 'Platinum', minXP: 20000, maxXP: 999999, color: '#14B8A6', icon: '💎' },
];

export function getLevel(xp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevel(xp: number) {
  const currentLevel = getLevel(xp);
  const currentIndex = LEVELS.findIndex(l => l.tier === currentLevel.tier);
  if (currentIndex < LEVELS.length - 1) {
    return LEVELS[currentIndex + 1];
  }
  return null; // Max level
}

export function XPProgressBar({ 
  currentXP, 
  showLabel = true, 
  size = 'md',
  animate = true 
}: XPProgressBarProps) {
  const currentLevel = getLevel(currentXP);
  const nextLevel = getNextLevel(currentXP);
  
  // Calculate progress within current level
  const xpInCurrentLevel = currentXP - currentLevel.minXP;
  const xpNeededForNext = nextLevel ? nextLevel.minXP - currentLevel.minXP : currentLevel.maxXP;
  const progressPercent = nextLevel 
    ? (xpInCurrentLevel / xpNeededForNext) * 100 
    : 100;

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {/* Level Header */}
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentLevel.icon}</span>
            <span 
              className="font-bold text-sm md:text-base"
              style={{ color: currentLevel.color }}
            >
              {currentLevel.tier}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="font-semibold text-white">{currentXP.toLocaleString()}</span>
            <span className="text-slate-400">XP</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className={`relative w-full bg-slate-800 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        {/* Background glow */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: `linear-gradient(90deg, ${currentLevel.color}, transparent)` }}
        />
        
        {/* Progress fill */}
        <motion.div
          className={`h-full rounded-full relative`}
          style={{ 
            background: `linear-gradient(90deg, ${currentLevel.color}, ${currentLevel.color}dd)` 
          }}
          initial={animate ? { width: 0 } : { width: `${progressPercent}%` }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>

      {/* Progress Text */}
      {showLabel && nextLevel && (
        <div className="flex items-center justify-between mt-1.5 text-xs">
          <span className="text-slate-400">
            {xpInCurrentLevel.toLocaleString()} / {xpNeededForNext.toLocaleString()} XP
          </span>
          <div className="flex items-center gap-1 text-slate-500">
            <TrendingUp className="h-3 w-3" />
            <span>Next: {nextLevel.tier}</span>
          </div>
        </div>
      )}

      {/* Max level message */}
      {showLabel && !nextLevel && (
        <div className="flex items-center justify-center mt-1.5 text-xs text-teal-400 font-medium">
          <Star className="h-3 w-3 mr-1" />
          Maximum Level Reached!
        </div>
      )}
    </div>
  );
}

// Compact version for header/sidebar
export function XPProgressCompact({ currentXP }: { currentXP: number }) {
  const level = getLevel(currentXP);
  
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full">
      <span className="text-sm">{level.icon}</span>
      <span 
        className="text-xs font-bold"
        style={{ color: level.color }}
      >
        {level.tier}
      </span>
      <div className="w-px h-4 bg-slate-700" />
      <span className="text-xs text-slate-300">
        {currentXP.toLocaleString()} XP
      </span>
    </div>
  );
}

export default XPProgressBar;
