'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star, Flame, Trophy, Users, BookOpen, Gift, Zap, Copy,
  Share2, Crown, Briefcase, Check, Building2, ChevronRight, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const quickActions = [
  { icon: BookOpen, label: 'Continue Learning', href: '/dashboard/academy', color: 'bg-purple-500' },
  { icon: Briefcase, label: 'Browse Jobs', href: '/dashboard/jobs', color: 'bg-teal-500' },
  { icon: Users, label: 'Invite Friends', href: '/dashboard/referrals', color: 'bg-amber-500' },
  { icon: Gift, label: 'Redeem Points', href: '/dashboard/rewards', color: 'bg-blue-500' },
];

const levelColors: Record<string, string> = {
  Amateur: 'text-green-600',
  Professional: 'text-blue-600',
  Expert: 'text-purple-600',
  Master: 'text-amber-600',
};

const levelIcons: Record<string, string> = {
  Amateur: '🌱',
  Professional: '💼',
  Expert: '⭐',
  Master: '👑',
};

const STREAK_MILESTONES = [
  { days: 3, bonus: 5 },
  { days: 7, bonus: 10 },
  { days: 14, bonus: 20 },
  { days: 30, bonus: 35 },
  { days: 60, bonus: 50 },
  { days: 100, bonus: 75 },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [checkinDone, setCheckinDone] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const savedReferrals = JSON.parse(localStorage.getItem('refertrm_referrals') || '[]');
    setReferralCount(savedReferrals.length);
    
    // Check if already checked in today
    const lastCheckin = localStorage.getItem('refertrm_last_checkin');
    if (lastCheckin === new Date().toDateString()) {
      setCheckinDone(true);
    }
  }, []);

  const streak = user?.streak || 1;
  const points = user?.points || 50;
  const maxStreak = user?.maxStreak || 1;
  const level = user?.level || 'Amateur';
  const displayName = user?.displayName || user?.name || 'Demo User';
  const referralCode = user?.referralCode || 'REFXXXXX';
  const totalReferrals = referralCount || user?.totalReferrals || 0;

  const nextMilestone = STREAK_MILESTONES.find(m => m.days > streak) || STREAK_MILESTONES[STREAK_MILESTONES.length - 1];
  const nextBonus = STREAK_MILESTONES.find(m => m.days > streak)?.bonus || 75;

  const copyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCheckin = () => {
    if (!checkinDone) {
      const newPoints = points + 10 + streak;
      localStorage.setItem('refertrm_last_checkin', new Date().toDateString());
      setCheckinDone(true);
      // Would update user points here with Supabase
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-5">
              <Link href="/dashboard/settings" className="group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-4xl shadow-lg group-hover:shadow-xl transition-shadow">
                  🧑
                </div>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Welcome back, {displayName}! 👋
                </h1>
                <p className="text-gray-600 mb-3">
                  Ready to earn rewards today?
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 ${levelColors[level]}`}>
                    <Crown className="h-3 w-3" />
                    {level} {levelIcons[level]}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-600">
                    <Flame className="h-3 w-3" />
                    {streak} Day Streak
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-amber-600">
                    <Star className="h-3 w-3" />
                    {points.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">{points.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">{user?.completedModules?.length || 0}</div>
                <div className="text-sm text-gray-500">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{totalReferrals}</div>
                <div className="text-sm text-gray-500">Referrals</div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Level Progress</span>
              <span className="text-teal-600 font-medium">
                {points} / {level === 'Master' ? '∞' : (level === 'Expert' ? 1000 : level === 'Professional' ? 600 : 300)} XP
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${level === 'Master' ? 100 : (level === 'Expert' ? ((points - 600) / 400) * 100 : level === 'Professional' ? ((points - 300) / 300) * 100 : (points / 300) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Points */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <Star className="h-8 w-8 text-amber-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{points.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Points</div>
              </div>
              
              {/* Streak */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <Flame className="h-8 w-8 text-orange-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{streak}</div>
                <div className="text-sm text-gray-500">Day Streak</div>
                <div className="text-xs text-gray-400 mt-1">Best: {maxStreak}</div>
              </div>
              
              {/* Referrals */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <Users className="h-8 w-8 text-green-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{totalReferrals}</div>
                <div className="text-sm text-gray-500">Referrals</div>
              </div>
              
              {/* Modules */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <BookOpen className="h-8 w-8 text-purple-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{user?.completedModules?.length || 0}</div>
                <div className="text-sm text-gray-500">Modules Done</div>
              </div>
            </div>

            {/* Streak Milestones */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Streak Milestones
              </h3>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {STREAK_MILESTONES.map((milestone, index) => {
                  const isCompleted = streak >= milestone.days;
                  const isCurrent = streak < milestone.days && (STREAK_MILESTONES[index - 1]?.days || 0) <= streak;
                  
                  return (
                    <div
                      key={milestone.days}
                      className={`flex-shrink-0 w-20 h-24 rounded-xl flex flex-col items-center justify-center relative border ${
                        isCompleted
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : isCurrent
                          ? 'bg-orange-50 border-orange-300'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      {isCompleted && (
                        <div className="absolute -top-2 -right-2">
                          <Trophy className="h-5 w-5 text-amber-400" />
                        </div>
                      )}
                      <span className={`text-2xl font-bold ${isCompleted ? 'text-white' : 'text-gray-600'}`}>
                        {milestone.days}
                      </span>
                      <span className={`text-xs ${isCompleted ? 'text-orange-100' : 'text-gray-400'}`}>days</span>
                      <span className={`text-xs mt-1 ${isCompleted ? 'text-amber-200' : 'text-gray-400'}`}>
                        +{milestone.bonus} pts
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-gray-600 text-sm mt-4">
                🎯 <span className="text-teal-600 font-medium">{nextMilestone.days - streak} more days</span> to unlock +{nextBonus} bonus points!
              </p>
            </div>

            {/* Referral Code */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5 text-teal-500" />
                Share & Earn
              </h3>
              <p className="text-sm text-gray-600 mb-3">Your unique referral code</p>
              <div className="flex items-center gap-2 mb-4">
                <code className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-teal-600 font-mono text-lg">
                  {referralCode}
                </code>
                <Button 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={copyReferralCode}
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
                  Share on Telegram
                </Button>
                <Button variant="outline" className="flex-1 border-gray-300">
                  Copy Link
                </Button>
              </div>
            </div>

            {/* Explore Features */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/dashboard/leaderboard">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                    <Trophy className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                    <span className="text-sm text-gray-700">Leaderboard</span>
                  </div>
                </Link>
                <Link href="/dashboard/companies">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                    <Building2 className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <span className="text-sm text-gray-700">Companies</span>
                  </div>
                </Link>
                <Link href="/dashboard/community">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                    <Users className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <span className="text-sm text-gray-700">Community</span>
                  </div>
                </Link>
                <Link href="/dashboard/jobs">
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                    <Briefcase className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <span className="text-sm text-gray-700">Jobs</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Daily Check-in */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Daily Check-in
                </h3>
                {!checkinDone && (
                  <span className="px-2 py-1 bg-teal-50 text-teal-600 text-xs font-medium rounded-full animate-pulse">
                    Available!
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-orange-500">{streak}</span>
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-500">Day Streak</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">--</div>
                  <p className="text-sm text-gray-500">Total Check-ins</p>
                </div>
              </div>
              
              <Button
                onClick={handleCheckin}
                className={`w-full font-medium ${checkinDone ? 'bg-gray-100 text-gray-500' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
                disabled={checkinDone}
              >
                {checkinDone ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Checked In Today
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Check In Now
                  </>
                )}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                      <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-2`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs text-gray-700">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Prize Pool */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6 text-center">
              <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600 mb-1">300,000 MMK</div>
              <div className="text-sm text-gray-600 mb-4">Monthly Prize Pool</div>
              <Link href="/dashboard/leaderboard">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  View Leaderboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
