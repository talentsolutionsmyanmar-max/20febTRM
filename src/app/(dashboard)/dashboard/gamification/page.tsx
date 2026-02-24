'use client';

import { useState } from 'react';
import { 
  Zap, Trophy, Target, Users, Clock, 
  Gift, Star, Flame
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  GamificationCard, 
  Leaderboard, 
  MOCK_LEADERBOARD,
  AchievementBadges,
  getLevel
} from '@/components/gamification';

interface UserStats {
  xp: number;
  streak: number;
  maxStreak: number;
  referrals: number;
  placements: number;
  achievements: string[];
}

export default function GamificationPage() {
  const [stats] = useState<UserStats>({
    xp: 3250,
    streak: 4,
    maxStreak: 12,
    referrals: 8,
    placements: 2,
    achievements: ['first_step', 'learner', 'connector'],
  });

  const level = getLevel(stats.xp);

  // Calculate tier benefits
  const getTierBenefits = () => {
    switch (level.tier) {
      case 'Bronze':
        return { slots: 1, bonus: 0, features: ['Basic referral tracking'] };
      case 'Silver':
        return { slots: 3, bonus: 5, features: ['Priority support', '5% reward bonus'] };
      case 'Gold':
        return { slots: 5, bonus: 10, features: ['Exclusive jobs', '10% reward bonus', 'Priority matching'] };
      case 'Platinum':
        return { slots: 999, bonus: 15, features: ['Unlimited referrals', '15% reward bonus', 'VIP support', 'First access to new jobs'] };
      default:
        return { slots: 1, bonus: 0, features: [] };
    }
  };

  const benefits = getTierBenefits();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-6 w-6 text-amber-400" />
                <h1 className="text-3xl font-bold text-white">Gamification Hub</h1>
              </div>
              <p className="text-slate-400">
                Earn XP, unlock achievements, and climb the leaderboard
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="text-lg font-bold text-white">{stats.streak}</span>
                <span className="text-sm text-orange-400">day streak</span>
              </div>
              <Link href="/dashboard/jobs">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Target className="h-4 w-4 mr-2" />
                  Find Jobs to Earn XP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Gamification Card */}
            <GamificationCard stats={stats} showFull />

            {/* Tier Benefits */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {level.tier} Tier Benefits
                </h3>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${level.color}20`, color: level.color }}
                >
                  Current Level
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {benefits.slots === 999 ? '∞' : benefits.slots}
                  </div>
                  <div className="text-sm text-gray-600">Referral Slots</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">
                    +{benefits.bonus}%
                  </div>
                  <div className="text-sm text-gray-600">Reward Bonus</div>
                </div>
              </div>

              <ul className="space-y-2">
                {benefits.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <Star className="h-4 w-4 text-amber-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* XP Earning Guide */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-4">How to Earn XP</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { action: 'Daily Login', xp: 10, icon: Clock },
                  { action: 'Referral Submitted', xp: 50, icon: Users },
                  { action: 'Candidate Interviewed', xp: 100, icon: Target },
                  { action: 'Successful Placement', xp: 500, icon: Trophy },
                  { action: 'Course Completed', xp: 200, icon: Star },
                  { action: 'Profile Complete', xp: 30, icon: Zap },
                ].map((item) => (
                  <div key={item.action} className="bg-white/60 rounded-lg p-3 flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-amber-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.action}</div>
                      <div className="text-xs text-amber-600 font-medium">+{item.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <Leaderboard entries={MOCK_LEADERBOARD} />
            </div>
          </div>
        </div>

        {/* All Achievements */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">All Achievements</h3>
          <AchievementBadges unlockedIds={stats.achievements} size="lg" />
        </div>
      </div>
    </div>
  );
}
