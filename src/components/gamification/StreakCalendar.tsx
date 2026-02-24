'use client';

import { motion } from 'framer-motion';
import { Flame, Snowflake, Calendar } from 'lucide-react';

interface StreakDay {
  date: string;
  completed: boolean;
  xpEarned: number;
}

interface StreakCalendarProps {
  streak: number;
  maxStreak: number;
  streakFreezeUsed?: boolean;
  recentDays?: StreakDay[];
}

// Generate last 7 days
function generateRecentDays(): StreakDay[] {
  const days: StreakDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({
      date: date.toISOString().split('T')[0],
      completed: i < 4, // Mock: completed last 4 days
      xpEarned: i < 4 ? 10 : 0,
    });
  }
  return days;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES_MM = ['နေ့', 'လာ', 'ဂါ', 'ဟူး', 'ကြာ', 'သော', 'နေ'];

export function StreakCalendar({ 
  streak, 
  maxStreak,
  streakFreezeUsed = false,
  recentDays 
}: StreakCalendarProps) {
  const days = recentDays || generateRecentDays();
  
  const today = new Date();
  const todayIndex = today.getDay();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${streak >= 7 ? 'bg-orange-500/20' : 'bg-slate-800'}`}>
            <Flame className={`h-5 w-5 ${streak >= 7 ? 'text-orange-500 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{streak}</div>
            <div className="text-xs text-slate-400">Day Streak</div>
          </div>
        </div>
        
        {/* Max streak */}
        <div className="text-right">
          <div className="text-sm font-medium text-amber-500">Best: {maxStreak}</div>
          <div className="text-xs text-slate-500">days</div>
        </div>
      </div>

      {/* Streak Freeze Indicator */}
      {streakFreezeUsed && (
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
          <Snowflake className="h-4 w-4 text-blue-400" />
          <span className="text-xs text-blue-300">Streak Freeze Used This Week</span>
        </div>
      )}

      {/* 7-Day Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const date = new Date(day.date);
          const dayName = DAY_NAMES[date.getDay()];
          const dayNum = date.getDate();
          const isToday = index === days.length - 1;
          const isFuture = index > days.findIndex(d => {
            const dDate = new Date(d.date);
            const today = new Date();
            return dDate.toDateString() === today.toDateString();
          });

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex flex-col items-center p-2 rounded-xl transition-all
                ${day.completed 
                  ? 'bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30' 
                  : isToday
                    ? 'bg-amber-500/10 border border-amber-500/30'
                    : 'bg-slate-800/50 border border-slate-700'
                }
                ${isToday ? 'ring-2 ring-amber-500/50' : ''}
              `}
            >
              {/* Day name */}
              <span className={`text-xs ${day.completed ? 'text-teal-400' : 'text-slate-500'}`}>
                {dayName}
              </span>
              
              {/* Day number */}
              <span className={`text-sm font-bold mt-1
                ${day.completed 
                  ? 'text-teal-400' 
                  : isToday 
                    ? 'text-amber-400' 
                    : 'text-slate-500'
                }`}
              >
                {dayNum}
              </span>

              {/* Status indicator */}
              <div className="mt-1">
                {day.completed ? (
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                ) : isToday ? (
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Streak Bonus Info */}
      <div className="mt-4 p-3 bg-slate-800/50 rounded-xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Daily Login Bonus:</span>
          <span className="text-teal-400 font-medium">+10 XP</span>
        </div>
        {streak >= 7 && (
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-orange-400 flex items-center gap-1">
              <Flame className="h-3 w-3" />
              7-Day Streak Bonus:
            </span>
            <span className="text-orange-400 font-medium">+50 XP</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Compact streak indicator for header/sidebar
export function StreakIndicator({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full">
      <Flame className={`h-4 w-4 ${streak >= 7 ? 'text-orange-500' : 'text-slate-400'}`} />
      <span className="text-sm font-medium text-white">{streak}</span>
      <span className="text-xs text-slate-400">day streak</span>
    </div>
  );
}

export default StreakCalendar;
