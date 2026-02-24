'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, ChevronUp, ChevronDown, User, Sparkles } from 'lucide-react';
import { getLevel } from './XPProgressBar';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  nameMm?: string;
  xp: number;
  referrals: number;
  placements: number;
  avatarUrl?: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  timeframe?: 'weekly' | 'monthly' | 'all-time';
  onTimeframeChange?: (timeframe: 'weekly' | 'monthly' | 'all-time') => void;
}

// Mock leaderboard data
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', rank: 1, name: 'Mg Zaw', nameMm: 'မဇော်', xp: 28500, referrals: 45, placements: 12, avatarUrl: '' },
  { id: '2', rank: 2, name: 'Ma Hla', nameMm: 'မှလာ', xp: 22100, referrals: 38, placements: 9, avatarUrl: '' },
  { id: '3', rank: 3, name: 'Ko Thiha', nameMm: 'ကိုသီဟ', xp: 18500, referrals: 32, placements: 7, avatarUrl: '' },
  { id: '4', rank: 4, name: 'Daw Mya', nameMm: 'ဒေါ်မြ', xp: 15200, referrals: 28, placements: 5, avatarUrl: '' },
  { id: '5', rank: 5, name: 'U Aung', nameMm: 'ဦးအောင်', xp: 12000, referrals: 22, placements: 4, avatarUrl: '' },
  { id: '6', rank: 6, name: 'Ma Khin', nameMm: 'မခင်', xp: 9800, referrals: 18, placements: 3, avatarUrl: '' },
  { id: '7', rank: 7, name: 'Ko Min', nameMm: 'ကိုမင်း', xp: 7500, referrals: 15, placements: 2, avatarUrl: '' },
  { id: '8', rank: 8, name: 'Daw Nwe', nameMm: 'ဒေါ်နွယ်', xp: 5200, referrals: 12, placements: 1, avatarUrl: '' },
  { id: '9', rank: 9, name: 'U Thein', nameMm: 'ဦးသိန်း', xp: 3100, referrals: 8, placements: 1, avatarUrl: '' },
  { id: '10', rank: 10, name: 'Ma Win', nameMm: 'မဝင်', xp: 1500, referrals: 5, placements: 0, avatarUrl: '' },
];

const RANK_ICONS: Record<number, { icon: any; color: string; bg: string }> = {
  1: { icon: Crown, color: '#FFD700', bg: 'bg-gradient-to-br from-yellow-500/20 to-amber-600/10' },
  2: { icon: Medal, color: '#C0C0C0', bg: 'bg-gradient-to-br from-slate-400/20 to-slate-500/10' },
  3: { icon: Award, color: '#CD7F32', bg: 'bg-gradient-to-br from-amber-700/20 to-amber-800/10' },
};

export function Leaderboard({ 
  entries, 
  currentUserId,
  timeframe = 'weekly',
  onTimeframeChange 
}: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all-time'>(timeframe);

  const handleTabChange = (tab: 'weekly' | 'monthly' | 'all-time') => {
    setActiveTab(tab);
    onTimeframeChange?.(tab);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-bold text-white">Leaderboard</h3>
        </div>
        
        {/* Timeframe Tabs */}
        <div className="flex bg-slate-800 rounded-lg p-0.5">
          {(['weekly', 'monthly', 'all-time'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all
                ${activeTab === tab 
                  ? 'bg-teal-500 text-white' 
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              {tab === 'weekly' ? 'Week' : tab === 'monthly' ? 'Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {entries.slice(0, 3).map((entry, index) => {
          const rankConfig = RANK_ICONS[entry.rank] || RANK_ICONS[3];
          const RankIcon = rankConfig.icon;
          const level = getLevel(entry.xp);

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${rankConfig.bg} rounded-xl p-3 text-center border border-white/5
                ${entry.rank === 1 ? 'col-span-1 order-2' : entry.rank === 2 ? 'order-1' : 'order-3'}
              `}
            >
              {/* Rank badge */}
              <div className="flex justify-center mb-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${rankConfig.color}20` }}
                >
                  <RankIcon className="h-5 w-5" style={{ color: rankConfig.color }} />
                </div>
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-white">
                  {entry.name.charAt(0)}
                </span>
              </div>

              {/* Name */}
              <p className="text-sm font-semibold text-white truncate">{entry.name}</p>
              <p className="text-xs text-slate-400">{entry.xp.toLocaleString()} XP</p>
              
              {/* Tier badge */}
              <div 
                className="mt-2 px-2 py-0.5 rounded-full text-xs font-medium inline-block"
                style={{ backgroundColor: `${level.color}20`, color: level.color }}
              >
                {level.tier}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Rest of leaderboard */}
      <div className="space-y-2">
        {entries.slice(3).map((entry, index) => {
          const level = getLevel(entry.xp);
          const isCurrentUser = entry.id === currentUserId;

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all
                ${isCurrentUser 
                  ? 'bg-teal-500/10 border border-teal-500/30' 
                  : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-800'
                }`}
            >
              {/* Rank */}
              <div className="w-8 text-center">
                <span className="text-sm font-bold text-slate-400">#{entry.rank}</span>
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {entry.name.charAt(0)}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white truncate">{entry.name}</p>
                  {isCurrentUser && (
                    <span className="text-xs px-1.5 py-0.5 bg-teal-500/20 text-teal-400 rounded">You</span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  {entry.placements} placements • {entry.referrals} referrals
                </p>
              </div>

              {/* XP */}
              <div className="text-right">
                <p className="text-sm font-bold text-white">{entry.xp.toLocaleString()}</p>
                <p className="text-xs text-slate-500">XP</p>
              </div>

              {/* Tier */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ backgroundColor: `${level.color}20` }}
              >
                <span>{level.icon}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Your rank if not in top 10 */}
      {currentUserId && !entries.find(e => e.id === currentUserId) && (
        <div className="mt-4 p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 text-center">
              <span className="text-sm font-bold text-slate-400">#42</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Your Position</p>
              <p className="text-xs text-slate-400">Keep referring to climb up!</p>
            </div>
            <Sparkles className="h-5 w-5 text-teal-400" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
