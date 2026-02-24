// API Route: Gamification
// Handle gamification data, XP awards, and achievements

import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo (in production, use Supabase)
const gamificationStore = new Map<string, any>();

// XP Configuration
const XP_CONFIG = {
  DAILY_LOGIN: 10,
  DAILY_LOGIN_7_DAY_BONUS: 50,
  REFERRAL_SUBMITTED: 50,
  CANDIDATE_INTERVIEWED: 100,
  CANDIDATE_PLACED: 500,
  COURSE_COMPLETED: 200,
  PROFILE_COMPLETED: 30,
};

// Tier thresholds
const TIER_THRESHOLDS = {
  Bronze: { min: 0, max: 999 },
  Silver: { min: 1000, max: 4999 },
  Gold: { min: 5000, max: 19999 },
  Platinum: { min: 20000, max: 999999 },
};

function getTier(xp: number): string {
  if (xp >= 20000) return 'Platinum';
  if (xp >= 5000) return 'Gold';
  if (xp >= 1000) return 'Silver';
  return 'Bronze';
}

function getLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

function getDefaultGamification(userId: string) {
  return {
    id: `gam_${userId}`,
    user_id: userId,
    xp: 0,
    tier: 'Bronze',
    level: 1,
    streak: 0,
    max_streak: 0,
    last_login_date: null,
    total_referrals: 0,
    successful_placements: 0,
    courses_completed: 0,
    achievements: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// GET /api/gamification - Get user's gamification data
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('user_id') || 'demo_user';
    
    // Get from store or return default
    let data = gamificationStore.get(userId);
    if (!data) {
      data = getDefaultGamification(userId);
      gamificationStore.set(userId, data);
    }
    
    return NextResponse.json({
      success: true,
      gamification: data,
    });
  } catch (error) {
    console.error('Error fetching gamification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gamification data' },
      { status: 500 }
    );
  }
}

// POST /api/gamification - Award XP or update gamification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      user_id = 'demo_user', 
      action, 
      amount,
      reference_id 
    } = body;
    
    // Get current data
    let data = gamificationStore.get(user_id) || getDefaultGamification(user_id);
    let xpEarned = 0;
    let message = '';
    let achievementsUnlocked: string[] = [];
    const today = new Date().toISOString().split('T')[0];
    
    switch (action) {
      case 'daily_login':
        // Check if already logged in today
        if (data.last_login_date === today) {
          return NextResponse.json({
            success: true,
            gamification: data,
            message: 'Already logged in today',
            xpEarned: 0,
          });
        }
        
        // Update streak
        let newStreak = 1;
        if (data.last_login_date) {
          const lastDate = new Date(data.last_login_date);
          const todayDate = new Date(today);
          const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            newStreak = data.streak + 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        }
        
        xpEarned = XP_CONFIG.DAILY_LOGIN;
        
        // 7-day streak bonus
        if (newStreak > 0 && newStreak % 7 === 0) {
          xpEarned += XP_CONFIG.DAILY_LOGIN_7_DAY_BONUS;
          message = `🔥 ${newStreak}-day streak! Bonus XP awarded!`;
        }
        
        // Check for streak achievement
        if (newStreak >= 7 && !data.achievements.includes('on_fire')) {
          achievementsUnlocked.push('on_fire');
        }
        
        data = {
          ...data,
          streak: newStreak,
          max_streak: Math.max(data.max_streak, newStreak),
          last_login_date: today,
          xp: data.xp + xpEarned,
          tier: getTier(data.xp + xpEarned),
          level: getLevel(data.xp + xpEarned),
          achievements: [...data.achievements, ...achievementsUnlocked],
        };
        break;
        
      case 'referral_submitted':
        xpEarned = XP_CONFIG.REFERRAL_SUBMITTED;
        const newReferralCount = data.total_referrals + 1;
        
        // Check achievements
        if (newReferralCount >= 5 && !data.achievements.includes('connector')) {
          achievementsUnlocked.push('connector');
        }
        
        data = {
          ...data,
          total_referrals: newReferralCount,
          xp: data.xp + xpEarned,
          tier: getTier(data.xp + xpEarned),
          level: getLevel(data.xp + xpEarned),
          achievements: [...data.achievements, ...achievementsUnlocked],
        };
        message = 'Referral submitted! +50 XP';
        break;
        
      case 'candidate_interviewed':
        xpEarned = XP_CONFIG.CANDIDATE_INTERVIEWED;
        data = {
          ...data,
          xp: data.xp + xpEarned,
          tier: getTier(data.xp + xpEarned),
          level: getLevel(data.xp + xpEarned),
        };
        message = 'Candidate interviewed! +100 XP';
        break;
        
      case 'candidate_placed':
        xpEarned = XP_CONFIG.CANDIDATE_PLACED;
        const newPlacementCount = data.successful_placements + 1;
        
        // Check achievements
        if (newPlacementCount >= 1 && !data.achievements.includes('star_referrer')) {
          achievementsUnlocked.push('star_referrer');
        }
        if (newPlacementCount >= 10 && !data.achievements.includes('champion')) {
          achievementsUnlocked.push('champion');
        }
        
        data = {
          ...data,
          successful_placements: newPlacementCount,
          xp: data.xp + xpEarned,
          tier: getTier(data.xp + xpEarned),
          level: getLevel(data.xp + xpEarned),
          achievements: [...data.achievements, ...achievementsUnlocked],
        };
        message = '🎉 Candidate placed! +500 XP';
        break;
        
      case 'course_completed':
        xpEarned = XP_CONFIG.COURSE_COMPLETED;
        const newCourseCount = data.courses_completed + 1;
        
        // Check achievements
        if (newCourseCount >= 1 && !data.achievements.includes('learner')) {
          achievementsUnlocked.push('learner');
        }
        if (newCourseCount >= 5 && !data.achievements.includes('scholar')) {
          achievementsUnlocked.push('scholar');
        }
        
        data = {
          ...data,
          courses_completed: newCourseCount,
          xp: data.xp + xpEarned,
          tier: getTier(data.xp + xpEarned),
          level: getLevel(data.xp + xpEarned),
          achievements: [...data.achievements, ...achievementsUnlocked],
        };
        message = 'Course completed! +200 XP';
        break;
        
      case 'profile_completed':
        xpEarned = XP_CONFIG.PROFILE_COMPLETED;
        
        if (!data.achievements.includes('first_step')) {
          achievementsUnlocked.push('first_step');
        }
        
        data = {
          ...data,
          xp: data.xp + xpEarned,
          tier: getTier(data.xp + xpEarned),
          level: getLevel(data.xp + xpEarned),
          achievements: [...data.achievements, ...achievementsUnlocked],
        };
        message = 'Profile completed! +30 XP';
        break;
        
      case 'custom_xp':
        // For admin/bonus XP
        xpEarned = amount || 0;
        data = {
          ...data,
          xp: data.xp + xpEarned,
          tier: getTier(data.xp + xpEarned),
          level: getLevel(data.xp + xpEarned),
        };
        message = `+${xpEarned} XP awarded`;
        break;
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
    
    // Update timestamp
    data.updated_at = new Date().toISOString();
    
    // Save to store
    gamificationStore.set(user_id, data);
    
    // Check for tier achievement
    if (data.tier === 'Platinum' && !data.achievements.includes('diamond')) {
      data.achievements.push('diamond');
      gamificationStore.set(user_id, data);
      achievementsUnlocked.push('diamond');
    }
    
    return NextResponse.json({
      success: true,
      gamification: data,
      xpEarned,
      message,
      achievementsUnlocked,
      leveledUp: getLevel(data.xp) > getLevel(data.xp - xpEarned),
    });
  } catch (error) {
    console.error('Error updating gamification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gamification data' },
      { status: 500 }
    );
  }
}
