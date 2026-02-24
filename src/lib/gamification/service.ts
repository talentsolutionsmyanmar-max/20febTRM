// Gamification Service - Core business logic for XP, streaks, and achievements

import { 
  UserGamification, 
  XP_CONFIG, 
  TIER_CONFIG,
  ACHIEVEMENT_DEFINITIONS,
  getTierFromXP,
  getLevelFromXP
} from './types';

// Storage keys for localStorage fallback
const GAMIFICATION_KEY = 'refertrm_gamification';
const XP_TRANSACTIONS_KEY = 'refertrm_xp_transactions';

// Default gamification state
export function getDefaultGamification(userId: string): UserGamification {
  return {
    id: `gam_${Date.now()}`,
    user_id: userId,
    xp: 0,
    tier: 'Bronze',
    level: 1,
    streak: 0,
    max_streak: 0,
    last_login_date: null,
    last_streak_date: null,
    total_referrals: 0,
    successful_placements: 0,
    courses_completed: 0,
    achievements: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Get user gamification data (from localStorage or return default)
export function getUserGamification(userId: string): UserGamification {
  if (typeof window === 'undefined') {
    return getDefaultGamification(userId);
  }

  try {
    const stored = localStorage.getItem(GAMIFICATION_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.user_id === userId) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error reading gamification data:', error);
  }

  return getDefaultGamification(userId);
}

// Save gamification data to localStorage
export function saveUserGamification(data: UserGamification): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(GAMIFICATION_KEY, JSON.stringify({
      ...data,
      updated_at: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error saving gamification data:', error);
  }
}

// Award XP to user
export function awardXP(
  userId: string, 
  amount: number, 
  reason: string,
  source: UserGamification['xp'] extends infer T ? T : never
): { newXP: number; leveledUp: boolean; tierUp: boolean; previousTier: string; newTier: string } {
  const current = getUserGamification(userId);
  const previousTier = current.tier;
  const previousXP = current.xp;
  
  const newXP = previousXP + amount;
  const newTier = getTierFromXP(newXP);
  const newLevel = getLevelFromXP(newXP);
  
  const leveledUp = newLevel > current.level;
  const tierUp = newTier !== previousTier;
  
  // Update gamification data
  const updated: UserGamification = {
    ...current,
    xp: newXP,
    tier: newTier,
    level: newLevel,
  };
  
  saveUserGamification(updated);
  
  // Record transaction
  recordXPTransaction(userId, amount, reason, source as any);
  
  return {
    newXP,
    leveledUp,
    tierUp,
    previousTier,
    newTier,
  };
}

// Check and update daily login streak
export function checkDailyLogin(userId: string): { 
  streak: number; 
  xpEarned: number; 
  isNewDay: boolean;
  streakBonus: boolean;
} {
  const current = getUserGamification(userId);
  const today = new Date().toISOString().split('T')[0];
  const lastLogin = current.last_login_date;
  
  // Already logged in today
  if (lastLogin === today) {
    return {
      streak: current.streak,
      xpEarned: 0,
      isNewDay: false,
      streakBonus: false,
    };
  }
  
  let newStreak = current.streak;
  let streakBonus = false;
  
  // Check if streak should continue
  if (lastLogin) {
    const lastDate = new Date(lastLogin);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day - continue streak
      newStreak = current.streak + 1;
    } else if (diffDays > 1) {
      // Streak broken - reset
      newStreak = 1;
    }
  } else {
    // First login ever
    newStreak = 1;
  }
  
  // Check for 7-day streak bonus
  if (newStreak > 0 && newStreak % 7 === 0) {
    streakBonus = true;
  }
  
  // Calculate XP
  let xpEarned = XP_CONFIG.DAILY_LOGIN;
  if (streakBonus) {
    xpEarned += XP_CONFIG.DAILY_LOGIN_7_DAY_BONUS;
  }
  
  // Update gamification data
  const updated: UserGamification = {
    ...current,
    streak: newStreak,
    max_streak: Math.max(current.max_streak, newStreak),
    last_login_date: today,
    last_streak_date: today,
    xp: current.xp + xpEarned,
    tier: getTierFromXP(current.xp + xpEarned),
    level: getLevelFromXP(current.xp + xpEarned),
  };
  
  saveUserGamification(updated);
  recordXPTransaction(userId, xpEarned, `Daily login (streak: ${newStreak})`, 'login');
  
  // Check for streak achievement
  if (newStreak >= 7 && !current.achievements.includes('on_fire')) {
    unlockAchievement(userId, 'on_fire');
  }
  
  return {
    streak: newStreak,
    xpEarned,
    isNewDay: true,
    streakBonus,
  };
}

// Record referral action
export function recordReferralAction(userId: string): { 
  xpEarned: number; 
  totalReferrals: number;
  achievementUnlocked: string[];
} {
  const current = getUserGamification(userId);
  const newTotalReferrals = current.total_referrals + 1;
  const xpEarned = XP_CONFIG.REFERRAL_SUBMITTED;
  
  // Check for achievements
  const achievementsUnlocked: string[] = [];
  
  if (newTotalReferrals >= 5 && !current.achievements.includes('connector')) {
    achievementsUnlocked.push('connector');
  }
  
  // Update data
  const updated: UserGamification = {
    ...current,
    total_referrals: newTotalReferrals,
    xp: current.xp + xpEarned,
    tier: getTierFromXP(current.xp + xpEarned),
    level: getLevelFromXP(current.xp + xpEarned),
    achievements: [...current.achievements, ...achievementsUnlocked],
  };
  
  saveUserGamification(updated);
  recordXPTransaction(userId, xpEarned, 'Referral submitted', 'referral');
  
  // Award achievement XP
  achievementsUnlocked.forEach(achievementId => {
    const achievement = ACHIEVEMENT_DEFINITIONS.find(a => a.id === achievementId);
    if (achievement) {
      awardXP(userId, achievement.xpReward, `Achievement: ${achievement.name}`, 'achievement');
    }
  });
  
  return {
    xpEarned,
    totalReferrals: newTotalReferrals,
    achievementUnlocked: achievementsUnlocked,
  };
}

// Record placement (candidate hired)
export function recordPlacement(userId: string): { 
  xpEarned: number; 
  totalPlacements: number;
  achievementUnlocked: string[];
} {
  const current = getUserGamification(userId);
  const newPlacements = current.successful_placements + 1;
  const xpEarned = XP_CONFIG.CANDIDATE_PLACED;
  
  // Check for achievements
  const achievementsUnlocked: string[] = [];
  
  if (newPlacements >= 1 && !current.achievements.includes('star_referrer')) {
    achievementsUnlocked.push('star_referrer');
  }
  if (newPlacements >= 10 && !current.achievements.includes('champion')) {
    achievementsUnlocked.push('champion');
  }
  
  // Update data
  let newXp = current.xp + xpEarned;
  const updated: UserGamification = {
    ...current,
    successful_placements: newPlacements,
    xp: newXp,
    tier: getTierFromXP(newXp),
    level: getLevelFromXP(newXp),
    achievements: [...current.achievements, ...achievementsUnlocked],
  };
  
  saveUserGamification(updated);
  recordXPTransaction(userId, xpEarned, 'Candidate placed!', 'placement');
  
  // Award achievement XP
  achievementsUnlocked.forEach(achievementId => {
    const achievement = ACHIEVEMENT_DEFINITIONS.find(a => a.id === achievementId);
    if (achievement) {
      awardXP(userId, achievement.xpReward, `Achievement: ${achievement.name}`, 'achievement');
    }
  });
  
  return {
    xpEarned,
    totalPlacements: newPlacements,
    achievementUnlocked: achievementsUnlocked,
  };
}

// Record course completion
export function recordCourseCompletion(userId: string): { 
  xpEarned: number; 
  totalCourses: number;
  achievementUnlocked: string[];
} {
  const current = getUserGamification(userId);
  const newCourses = current.courses_completed + 1;
  const xpEarned = XP_CONFIG.COURSE_COMPLETED;
  
  // Check for achievements
  const achievementsUnlocked: string[] = [];
  
  if (newCourses >= 1 && !current.achievements.includes('learner')) {
    achievementsUnlocked.push('learner');
  }
  if (newCourses >= 5 && !current.achievements.includes('scholar')) {
    achievementsUnlocked.push('scholar');
  }
  
  // Update data
  let newXp = current.xp + xpEarned;
  const updated: UserGamification = {
    ...current,
    courses_completed: newCourses,
    xp: newXp,
    tier: getTierFromXP(newXp),
    level: getLevelFromXP(newXp),
    achievements: [...current.achievements, ...achievementsUnlocked],
  };
  
  saveUserGamification(updated);
  recordXPTransaction(userId, xpEarned, 'Course completed', 'course');
  
  // Award achievement XP
  achievementsUnlocked.forEach(achievementId => {
    const achievement = ACHIEVEMENT_DEFINITIONS.find(a => a.id === achievementId);
    if (achievement) {
      awardXP(userId, achievement.xpReward, `Achievement: ${achievement.name}`, 'achievement');
    }
  });
  
  return {
    xpEarned,
    totalCourses: newCourses,
    achievementUnlocked: achievementsUnlocked,
  };
}

// Unlock achievement manually
export function unlockAchievement(userId: string, achievementId: string): boolean {
  const current = getUserGamification(userId);
  
  if (current.achievements.includes(achievementId)) {
    return false; // Already unlocked
  }
  
  const achievement = ACHIEVEMENT_DEFINITIONS.find(a => a.id === achievementId);
  if (!achievement) {
    return false; // Invalid achievement
  }
  
  const updated: UserGamification = {
    ...current,
    achievements: [...current.achievements, achievementId],
    xp: current.xp + achievement.xpReward,
    tier: getTierFromXP(current.xp + achievement.xpReward),
    level: getLevelFromXP(current.xp + achievement.xpReward),
  };
  
  saveUserGamification(updated);
  recordXPTransaction(userId, achievement.xpReward, `Achievement: ${achievement.name}`, 'achievement');
  
  return true;
}

// Record XP transaction
function recordXPTransaction(
  userId: string, 
  amount: number, 
  reason: string, 
  source: 'login' | 'referral' | 'placement' | 'course' | 'achievement' | 'profile' | 'bonus'
): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(XP_TRANSACTIONS_KEY);
    const transactions = stored ? JSON.parse(stored) : [];
    
    transactions.unshift({
      id: `xp_${Date.now()}`,
      user_id: userId,
      amount,
      reason,
      source,
      created_at: new Date().toISOString(),
    });
    
    // Keep only last 100 transactions
    const trimmed = transactions.slice(0, 100);
    localStorage.setItem(XP_TRANSACTIONS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error recording XP transaction:', error);
  }
}

// Get XP transactions
export function getXPTransactions(userId: string): any[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(XP_TRANSACTIONS_KEY);
    if (stored) {
      const transactions = JSON.parse(stored);
      return transactions.filter((t: any) => t.user_id === userId);
    }
  } catch (error) {
    console.error('Error reading XP transactions:', error);
  }
  
  return [];
}

// Get tier benefits for user
export function getTierBenefits(tier: string): {
  referralSlots: number;
  rewardBonus: number;
  features: string[];
} {
  const config = TIER_CONFIG[tier as keyof typeof TIER_CONFIG] || TIER_CONFIG.Bronze;
  
  const featuresMap: Record<string, string[]> = {
    Bronze: ['Basic referral tracking'],
    Silver: ['Priority support', '5% reward bonus'],
    Gold: ['Exclusive jobs', '10% reward bonus', 'Priority matching'],
    Platinum: ['Unlimited referrals', '15% reward bonus', 'VIP support', 'First access to new jobs'],
  };
  
  return {
    referralSlots: config.referralSlots,
    rewardBonus: config.rewardBonus,
    features: featuresMap[tier] || featuresMap.Bronze,
  };
}
