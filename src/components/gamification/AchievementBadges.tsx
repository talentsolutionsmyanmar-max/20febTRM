'use client';

import { motion } from 'framer-motion';
import { Lock, Check, Star, Users, Trophy, BookOpen, Flame, Diamond, Target, Award } from 'lucide-react';

// Achievement definitions
export const ACHIEVEMENTS = [
  {
    id: 'first_step',
    name: 'First Step',
    nameMm: 'ပထမခြေလှမ်း',
    description: 'Complete your profile',
    icon: Star,
    xpReward: 30,
    requirement: 'Complete profile',
    color: '#10B981',
  },
  {
    id: 'connector',
    name: 'Connector',
    nameMm: 'ဆက်သွယ်သူ',
    description: 'Submit 5 referrals',
    icon: Users,
    xpReward: 100,
    requirement: '5 referrals',
    color: '#3B82F6',
  },
  {
    id: 'star_referrer',
    name: 'Star Referrer',
    nameMm: 'ကြယ်ပွင့်',
    description: 'Get 1 candidate hired',
    icon: Trophy,
    xpReward: 200,
    requirement: '1 placement',
    color: '#F59E0B',
  },
  {
    id: 'champion',
    name: 'Champion',
    nameMm: 'ချန်ပီယံ',
    description: 'Get 10 candidates hired',
    icon: Award,
    xpReward: 1000,
    requirement: '10 placements',
    color: '#EF4444',
  },
  {
    id: 'learner',
    name: 'Learner',
    nameMm: 'သင်ယူသူ',
    description: 'Complete 1 Academy course',
    icon: BookOpen,
    xpReward: 50,
    requirement: '1 course',
    color: '#8B5CF6',
  },
  {
    id: 'scholar',
    name: 'Scholar',
    nameMm: 'ပညာရှင်',
    description: 'Complete 5 Academy courses',
    icon: BookOpen,
    xpReward: 300,
    requirement: '5 courses',
    color: '#6366F1',
  },
  {
    id: 'on_fire',
    name: 'On Fire!',
    nameMm: 'မီးလောင်နေ',
    description: '7-day login streak',
    icon: Flame,
    xpReward: 100,
    requirement: '7 day streak',
    color: '#F97316',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    nameMm: 'စိန်',
    description: 'Reach Platinum tier',
    icon: Diamond,
    xpReward: 500,
    requirement: '20000+ XP',
    color: '#14B8A6',
  },
  {
    id: 'bullseye',
    name: 'Bullseye',
    nameMm: 'တိတိကျကျ',
    description: '3 perfect referrals in a row',
    icon: Target,
    xpReward: 150,
    requirement: '3 hires in a row',
    color: '#EC4899',
  },
];

interface AchievementBadgesProps {
  unlockedIds: string[];
  showLocked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadges({ 
  unlockedIds, 
  showLocked = true,
  size = 'md' 
}: AchievementBadgesProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Achievements</h3>
        <span className="text-sm text-slate-400">
          {unlockedCount} / {totalCount} unlocked
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {ACHIEVEMENTS.map((achievement, index) => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          const Icon = achievement.icon;

          if (!isUnlocked && !showLocked) return null;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <div
                className={`${sizeClasses[size]} rounded-xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300
                  ${isUnlocked 
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2' 
                    : 'bg-slate-900/50 border border-slate-800 opacity-50'
                  }`}
                style={isUnlocked ? { borderColor: achievement.color } : {}}
              >
                {/* Glow effect for unlocked */}
                {isUnlocked && (
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ background: `radial-gradient(circle, ${achievement.color}, transparent)` }}
                  />
                )}

                {/* Icon */}
                <Icon 
                  className={`${iconSizes[size]} relative z-10 transition-transform group-hover:scale-110
                    ${isUnlocked ? '' : 'text-slate-600'}`}
                  style={isUnlocked ? { color: achievement.color } : {}}
                />

                {/* Lock icon for locked */}
                {!isUnlocked && (
                  <Lock className="absolute bottom-1 right-1 h-3 w-3 text-slate-600" />
                )}

                {/* Check mark for unlocked */}
                {isUnlocked && (
                  <Check 
                    className="absolute bottom-1 right-1 h-3 w-3"
                    style={{ color: achievement.color }}
                  />
                )}
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                <div className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center whitespace-nowrap shadow-lg">
                  <p className="text-xs font-medium text-white">{achievement.name}</p>
                  <p className="text-xs text-slate-400">{isUnlocked ? `+${achievement.xpReward} XP` : achievement.requirement}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Single badge component
export function AchievementBadge({ 
  achievementId, 
  isUnlocked 
}: { 
  achievementId: string;
  isUnlocked: boolean;
}) {
  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!achievement) return null;

  const Icon = achievement.icon;

  return (
    <div 
      className={`w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden
        ${isUnlocked 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2' 
          : 'bg-slate-900/50 border border-slate-800 opacity-50'
        }`}
      style={isUnlocked ? { borderColor: achievement.color } : {}}
    >
      {isUnlocked && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle, ${achievement.color}, transparent)` }}
        />
      )}
      <Icon 
        className="h-6 w-6 relative z-10"
        style={isUnlocked ? { color: achievement.color } : {}}
      />
    </div>
  );
}

export default AchievementBadges;
