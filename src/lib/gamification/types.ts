// Gamification Types for ReferTRM

export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface UserGamification {
  id: string;
  user_id: string;
  xp: number;
  tier: Tier;
  level: number;
  streak: number;
  max_streak: number;
  last_login_date: string | null;
  last_streak_date: string | null;
  total_referrals: number;
  successful_placements: number;
  courses_completed: number;
  achievements: string[];
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  nameMm: string;
  description: string;
  xpReward: number;
  requirement: string;
  category: 'referral' | 'learning' | 'streak' | 'tier';
}

export interface XPTransaction {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  source: 'login' | 'referral' | 'placement' | 'course' | 'achievement' | 'profile' | 'bonus';
  reference_id?: string;
  created_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  name: string;
  xp: number;
  tier: Tier;
  referrals: number;
  placements: number;
  rank: number;
}

// XP Configuration
export const XP_CONFIG = {
  // Daily actions
  DAILY_LOGIN: 10,
  DAILY_LOGIN_7_DAY_BONUS: 50,
  
  // Referral actions
  REFERRAL_SUBMITTED: 50,
  CANDIDATE_INTERVIEWED: 100,
  CANDIDATE_PLACED: 500,
  
  // Learning actions
  COURSE_COMPLETED: 200,
  QUIZ_PERFECT: 30,
  
  // Profile actions
  PROFILE_COMPLETED: 30,
  AVATAR_UPLOADED: 10,
  
  // Achievement bonuses (varies per achievement)
  ACHIEVEMENT_UNLOCK: 0, // Defined per achievement
} as const;

// Tier Configuration
export const TIER_CONFIG: Record<Tier, { minXP: number; maxXP: number; color: string; icon: string; referralSlots: number; rewardBonus: number }> = {
  Bronze: { minXP: 0, maxXP: 999, color: '#CD7F32', icon: '🥉', referralSlots: 1, rewardBonus: 0 },
  Silver: { minXP: 1000, maxXP: 4999, color: '#C0C0C0', icon: '🥈', referralSlots: 3, rewardBonus: 5 },
  Gold: { minXP: 5000, maxXP: 19999, color: '#FFD700', icon: '🥇', referralSlots: 5, rewardBonus: 10 },
  Platinum: { minXP: 20000, maxXP: 999999, color: '#14B8A6', icon: '💎', referralSlots: 999, rewardBonus: 15 },
};

// Achievement Definitions
export const ACHIEVEMENT_DEFINITIONS: Achievement[] = [
  {
    id: 'first_step',
    name: 'First Step',
    nameMm: 'ပထမခြေလှမ်း',
    description: 'Complete your profile',
    xpReward: 30,
    requirement: 'Complete profile',
    category: 'referral',
  },
  {
    id: 'connector',
    name: 'Connector',
    nameMm: 'ဆက်သွယ်သူ',
    description: 'Submit 5 referrals',
    xpReward: 100,
    requirement: '5 referrals',
    category: 'referral',
  },
  {
    id: 'star_referrer',
    name: 'Star Referrer',
    nameMm: 'ကြယ်ပွင့်',
    description: 'Get 1 candidate hired',
    xpReward: 200,
    requirement: '1 placement',
    category: 'referral',
  },
  {
    id: 'champion',
    name: 'Champion',
    nameMm: 'ချန်ပီယံ',
    description: 'Get 10 candidates hired',
    xpReward: 1000,
    requirement: '10 placements',
    category: 'referral',
  },
  {
    id: 'learner',
    name: 'Learner',
    nameMm: 'သင်ယူသူ',
    description: 'Complete 1 Academy course',
    xpReward: 50,
    requirement: '1 course',
    category: 'learning',
  },
  {
    id: 'scholar',
    name: 'Scholar',
    nameMm: 'ပညာရှင်',
    description: 'Complete 5 Academy courses',
    xpReward: 300,
    requirement: '5 courses',
    category: 'learning',
  },
  {
    id: 'on_fire',
    name: 'On Fire!',
    nameMm: 'မီးလောင်နေ',
    description: '7-day login streak',
    xpReward: 100,
    requirement: '7 day streak',
    category: 'streak',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    nameMm: 'စိန်',
    description: 'Reach Platinum tier',
    xpReward: 500,
    requirement: '20000+ XP',
    category: 'tier',
  },
  {
    id: 'bullseye',
    name: 'Bullseye',
    nameMm: 'တိတိကျကျ',
    description: '3 perfect referrals in a row',
    xpReward: 150,
    requirement: '3 hires in a row',
    category: 'referral',
  },
];

// Helper function to get tier from XP
export function getTierFromXP(xp: number): Tier {
  if (xp >= TIER_CONFIG.Platinum.minXP) return 'Platinum';
  if (xp >= TIER_CONFIG.Gold.minXP) return 'Gold';
  if (xp >= TIER_CONFIG.Silver.minXP) return 'Silver';
  return 'Bronze';
}

// Helper function to get level from XP (1 level per 500 XP)
export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 500) + 1;
}
