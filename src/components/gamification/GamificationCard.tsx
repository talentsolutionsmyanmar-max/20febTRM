'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Trophy, Target, TrendingUp, ChevronRight, 
  Sparkles, Gift, Clock, Users
} from 'lucide-react';
import { XPProgressBar } from './XPProgressBar';
import { AchievementBadges } from './AchievementBadges';
import { StreakCalendar } from './StreakCalendar';
import { Button } from '@/components/ui/button';

interface GamificationStats {
  xp: number;
  level: string;
  tier: string;
  streak: number;
  maxStreak: number;
  referrals: number;
  placements: number;
  achievements: string[];
}

interface GamificationCardProps {
  stats?: GamificationStats;
  showFull?: boolean;
}

const DEFAULT_STATS: GamificationStats = {
  xp: 3250,
  level: 'Silver',
  tier: 'Silver',
  streak: 4,
  maxStreak: 12,
  referrals: 8,
  placements: 2,
  achievements: ['first_step', 'learner', 'connector'],
};

export function GamificationCard({ stats, showFull = false }: GamificationCardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements'>('overview');
  const [animatedXP, setAnimatedXP] = useState(0);
  
  const userStats = stats || DEFAULT_STATS;

  // Animate XP on mount
  useEffect(() => {
    const targetXP = userStats.xp;
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedXP(Math.round(targetXP * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [userStats.xp]);

  // Quick stats
  const quickStats = [
    { label: 'Referrals', value: userStats.referrals, icon: Users },
    { label: 'Placements', value: userStats.placements, icon: Target },
    { label: 'Streak', value: userStats.streak, icon: Clock },
  ];

  return (
    <div className="w-full">
      {/* Main Stats Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {/* Header with XP */}
        <div className="p-4 md:p-6 bg-gradient-to-r from-teal-900/30 to-cyan-900/30 border-b border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <span className="text-sm text-slate-400">Your Progress</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {animatedXP.toLocaleString()}
                <span className="text-lg text-slate-400 ml-1">XP</span>
              </div>
            </div>
            
            {/* Level Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-xl"
            >
              <div className="text-2xl mb-0.5">🥈</div>
              <div className="text-xs font-bold text-amber-400">{userStats.tier}</div>
            </motion.div>
          </div>

          {/* XP Progress */}
          <XPProgressBar currentXP={userStats.xp} size="md" />
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 divide-x divide-slate-700 border-b border-slate-700">
          {quickStats.map((stat) => (
            <div key={stat.label} className="p-3 text-center">
              <stat.icon className="h-4 w-4 mx-auto mb-1 text-slate-500" />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all
              ${activeTab === 'overview' 
                ? 'text-teal-400 border-b-2 border-teal-500 bg-teal-500/5' 
                : 'text-slate-400 hover:text-white'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all
              ${activeTab === 'achievements' 
                ? 'text-teal-400 border-b-2 border-teal-500 bg-teal-500/5' 
                : 'text-slate-400 hover:text-white'
              }`}
          >
            Achievements ({userStats.achievements.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              {/* Streak Calendar */}
              <StreakCalendar 
                streak={userStats.streak} 
                maxStreak={userStats.maxStreak}
              />

              {/* Next Reward */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gift className="h-8 w-8 text-amber-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Next Reward</p>
                      <p className="text-xs text-slate-400">Submit 2 more referrals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-amber-400">+100 XP</p>
                    <Button size="sm" className="mt-1 bg-amber-500 hover:bg-amber-600 text-black text-xs">
                      View Jobs
                    </Button>
                  </div>
                </div>
              </div>

              {/* Weekly Goal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Weekly Goal</span>
                  <span className="text-sm font-medium text-teal-400">3/5 Referrals</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Complete for +50 XP bonus!</p>
              </div>
            </div>
          ) : (
            <AchievementBadges unlockedIds={userStats.achievements} />
          )}
        </div>
      </div>
    </div>
  );
}

// Compact version for sidebar
export function GamificationCompact({ stats }: { stats?: GamificationStats }) {
  const userStats = stats || DEFAULT_STATS;

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl">
          🥈
        </div>
        <div>
          <p className="text-sm font-bold text-white">{userStats.xp.toLocaleString()} XP</p>
          <p className="text-xs text-slate-400">{userStats.tier} Tier</p>
        </div>
      </div>
      
      <XPProgressBar currentXP={userStats.xp} showLabel={false} size="sm" />
      
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-slate-400">
          🔥 {userStats.streak} day streak
        </span>
        <span className="text-teal-400">
          {userStats.achievements.length} badges
        </span>
      </div>
    </div>
  );
}

export default GamificationCard;
