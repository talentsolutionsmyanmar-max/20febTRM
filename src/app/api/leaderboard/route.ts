// API Route: Leaderboard
// Return top users by XP

import { NextRequest, NextResponse } from 'next/server';

// Mock leaderboard data (in production, fetch from Supabase)
const MOCK_LEADERBOARD = [
  { user_id: 'user_1', name: 'Mg Zaw', nameMm: 'မဇော်', xp: 28500, tier: 'Platinum', referrals: 45, placements: 12 },
  { user_id: 'user_2', name: 'Ma Hla', nameMm: 'မှလာ', xp: 22100, tier: 'Platinum', referrals: 38, placements: 9 },
  { user_id: 'user_3', name: 'Ko Thiha', nameMm: 'ကိုသီဟ', xp: 18500, tier: 'Gold', referrals: 32, placements: 7 },
  { user_id: 'user_4', name: 'Daw Mya', nameMm: 'ဒေါ်မြ', xp: 15200, tier: 'Gold', referrals: 28, placements: 5 },
  { user_id: 'user_5', name: 'U Aung', nameMm: 'ဦးအောင်', xp: 12000, tier: 'Gold', referrals: 22, placements: 4 },
  { user_id: 'user_6', name: 'Ma Khin', nameMm: 'မခင်', xp: 9800, tier: 'Silver', referrals: 18, placements: 3 },
  { user_id: 'user_7', name: 'Ko Min', nameMm: 'ကိုမင်း', xp: 7500, tier: 'Silver', referrals: 15, placements: 2 },
  { user_id: 'user_8', name: 'Daw Nwe', nameMm: 'ဒေါ်နွယ်', xp: 5200, tier: 'Silver', referrals: 12, placements: 1 },
  { user_id: 'user_9', name: 'U Thein', nameMm: 'ဦးသိန်း', xp: 3100, tier: 'Silver', referrals: 8, placements: 1 },
  { user_id: 'user_10', name: 'Ma Win', nameMm: 'မဝင်', xp: 1500, tier: 'Silver', referrals: 5, placements: 0 },
];

function getTier(xp: number): string {
  if (xp >= 20000) return 'Platinum';
  if (xp >= 5000) return 'Gold';
  if (xp >= 1000) return 'Silver';
  return 'Bronze';
}

// GET /api/leaderboard - Get leaderboard
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || 'weekly';
    const limit = parseInt(searchParams.get('limit') || '10');
    const currentUserId = searchParams.get('user_id');
    
    // In production, query Supabase with timeframe filter
    // For now, return mock data with ranks
    
    const leaderboard = MOCK_LEADERBOARD
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
        tier: getTier(entry.xp),
      }));
    
    // Find current user's position if not in top 10
    let userPosition = null;
    if (currentUserId) {
      const userIndex = MOCK_LEADERBOARD.findIndex(u => u.user_id === currentUserId);
      if (userIndex === -1) {
        // User not in mock data, return a simulated position
        userPosition = {
          rank: 42,
          name: 'You',
          xp: 3250,
          tier: 'Silver',
          referrals: 8,
          placements: 2,
        };
      } else if (userIndex >= limit) {
        userPosition = {
          ...MOCK_LEADERBOARD[userIndex],
          rank: userIndex + 1,
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      leaderboard,
      userPosition,
      timeframe,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
