'use client';

import { useState, useEffect, useCallback } from 'react';

interface GamificationData {
  id: string;
  user_id: string;
  xp: number;
  tier: string;
  level: number;
  streak: number;
  max_streak: number;
  last_login_date: string | null;
  total_referrals: number;
  successful_placements: number;
  courses_completed: number;
  achievements: string[];
  created_at: string;
  updated_at: string;
}

interface UseGamificationReturn {
  data: GamificationData | null;
  loading: boolean;
  error: string | null;
  awardXP: (action: string, amount?: number) => Promise<any>;
  checkDailyLogin: () => Promise<any>;
  recordReferral: () => Promise<any>;
  recordPlacement: () => Promise<any>;
  recordCourseCompletion: () => Promise<any>;
  refresh: () => Promise<void>;
}

export function useGamification(userId?: string): UseGamificationReturn {
  const [data, setData] = useState<GamificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const effectiveUserId = userId || 'demo_user';

  // Fetch gamification data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/gamification?user_id=${effectiveUserId}`);
      const json = await res.json();
      
      if (json.success) {
        setData(json.gamification);
        setError(null);
      } else {
        setError(json.error || 'Failed to fetch gamification data');
      }
    } catch (err) {
      setError('Network error');
      console.error('Error fetching gamification:', err);
    } finally {
      setLoading(false);
    }
  }, [effectiveUserId]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Award XP action
  const awardXP = useCallback(async (action: string, amount?: number) => {
    try {
      const res = await fetch('/api/gamification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: effectiveUserId,
          action,
          amount,
        }),
      });
      
      const json = await res.json();
      
      if (json.success) {
        setData(json.gamification);
        return json;
      } else {
        setError(json.error || 'Failed to award XP');
        return null;
      }
    } catch (err) {
      setError('Network error');
      console.error('Error awarding XP:', err);
      return null;
    }
  }, [effectiveUserId]);

  // Check daily login
  const checkDailyLogin = useCallback(async () => {
    return awardXP('daily_login');
  }, [awardXP]);

  // Record referral
  const recordReferral = useCallback(async () => {
    return awardXP('referral_submitted');
  }, [awardXP]);

  // Record placement
  const recordPlacement = useCallback(async () => {
    return awardXP('candidate_placed');
  }, [awardXP]);

  // Record course completion
  const recordCourseCompletion = useCallback(async () => {
    return awardXP('course_completed');
  }, [awardXP]);

  return {
    data,
    loading,
    error,
    awardXP,
    checkDailyLogin,
    recordReferral,
    recordPlacement,
    recordCourseCompletion,
    refresh: fetchData,
  };
}

// Hook for leaderboard
interface LeaderboardEntry {
  user_id: string;
  name: string;
  xp: number;
  tier: string;
  referrals: number;
  placements: number;
  rank: number;
}

interface UseLeaderboardReturn {
  leaderboard: LeaderboardEntry[];
  userPosition: LeaderboardEntry | null;
  loading: boolean;
  error: string | null;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  refresh: () => Promise<void>;
}

export function useLeaderboard(userId?: string): UseLeaderboardReturn {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userPosition, setUserPosition] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState('weekly');

  const fetchData = useCallback(async (tf: string) => {
    try {
      setLoading(true);
      const userIdParam = userId ? `&user_id=${userId}` : '';
      const res = await fetch(`/api/leaderboard?timeframe=${tf}&limit=10${userIdParam}`);
      const json = await res.json();
      
      if (json.success) {
        setLeaderboard(json.leaderboard);
        setUserPosition(json.userPosition);
        setError(null);
      } else {
        setError(json.error || 'Failed to fetch leaderboard');
      }
    } catch (err) {
      setError('Network error');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData(timeframe);
  }, [fetchData, timeframe]);

  const handleSetTimeframe = (tf: string) => {
    setTimeframe(tf);
  };

  return {
    leaderboard,
    userPosition,
    loading,
    error,
    timeframe,
    setTimeframe: handleSetTimeframe,
    refresh: () => fetchData(timeframe),
  };
}

export default useGamification;
