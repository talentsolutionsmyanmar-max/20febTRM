// Supabase Configuration for ReferTRM
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured with REAL values (not placeholders)
export function isSupabaseConfigured(): boolean {
  // Check if URL is a valid Supabase URL (must start with https:// and not be a placeholder)
  const hasValidUrl: boolean = Boolean(supabaseUrl) && 
    supabaseUrl.startsWith('https://') && 
    !supabaseUrl.includes('your_supabase') &&
    !supabaseUrl.includes('your-project') &&
    supabaseUrl.length > 20;
  
  // Check if key looks like a real JWT (starts with eyJ)
  const hasValidKey: boolean = Boolean(supabaseAnonKey) && 
    supabaseAnonKey.startsWith('eyJ') &&
    !supabaseAnonKey.includes('your_supabase') &&
    !supabaseAnonKey.includes('your-anon') &&
    supabaseAnonKey.length > 50;
  
  const configured = hasValidUrl && hasValidKey;
  
  if (typeof window !== 'undefined') {
    console.log('Supabase URL:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'NOT SET');
    console.log('Supabase Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 15)}...` : 'NOT SET');
    console.log('Supabase properly configured:', configured);
  }
  return configured;
}

// Create Supabase client only if properly configured
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null;

// User profile interface
export interface UserProfile {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  avatarUrl: string | null;
  avatarType: string;
  points: number;
  totalPointsEarned: number;
  streak: number;
  maxStreak: number;
  referralCode: string;
  totalReferrals: number;
  successfulReferrals: number;
  totalEarned: number;
  level: string;
  lastLoginAt: string | null;
  lastBonusClaim: string | null;
  createdAt: string;
  updatedAt: string;
}

// Generate referral code
function generateReferralCode(): string {
  return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Sign up with email and password
export async function signUpWithEmail(email: string, password: string, name: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) throw error;

  if (data.user) {
    await createUserProfile(data.user.id, { email, name });
  }

  return {
    user: data.user,
    session: data.session,
    needsEmailConfirmation: !data.session
  };
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    try {
      await updateUserProfile(data.user.id, { lastLoginAt: new Date().toISOString() });
    } catch (e) {
      console.error('Error updating last login:', e);
    }
  }

  return data.user;
}

// Sign in as guest
export async function signInAsGuest() {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;

  if (data.user) {
    await createUserProfile(data.user.id, { name: 'Guest User' });
  }

  return data.user;
}

// Sign out
export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

// Get current user
export async function getCurrentUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}

// Create user profile
export async function createUserProfile(uid: string, data: Partial<UserProfile> = {}): Promise<void> {
  if (!supabase) return;

  const now = new Date().toISOString();
  const profile = {
    id: uid,
    email: data.email || null,
    phone: data.phone || null,
    name: data.name || null,
    avatarUrl: data.avatarUrl || null,
    avatarType: data.avatarType || 'neutral',
    points: data.points ?? 50,
    totalPointsEarned: data.totalPointsEarned ?? 50,
    streak: data.streak ?? 1,
    maxStreak: data.maxStreak ?? 1,
    referralCode: data.referralCode || generateReferralCode(),
    totalReferrals: 0,
    successfulReferrals: 0,
    totalEarned: 0,
    level: data.level || 'Amateur',
    lastLoginAt: now,
    lastBonusClaim: null,
    createdAt: now,
    updatedAt: now,
  };

  const { error } = await supabase
    .from('User')
    .upsert(profile, { onConflict: 'id' });

  if (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

// Get user profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', uid)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        await createUserProfile(uid, { name: 'User' });
        const { data: newData } = await supabase
          .from('User')
          .select('*')
          .eq('id', uid)
          .single();
        return newData as UserProfile;
      }
      return null;
    }

    return data as UserProfile;
  } catch (e) {
    console.error('Exception getting profile:', e);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase
    .from('User')
    .update({ ...data, updatedAt: new Date().toISOString() })
    .eq('id', uid);

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Reset password
export async function resetPassword(email: string) {
  if (!supabase) return;
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

// Auth state listener
export function onAuthStateChange(callback: (user: any) => void) {
  if (!supabase) {
    callback(null);
    return () => {};
  }

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });

  return () => {
    data.subscription.unsubscribe();
  };
}

// Get leaderboard
export async function getLeaderboard(limitCount: number = 10): Promise<UserProfile[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('User')
    .select('*')
    .order('totalPointsEarned', { ascending: false })
    .limit(limitCount);

  if (error) return [];
  return data as UserProfile[];
}

// Referral interface
export interface Referral {
  id: string;
  referrerId: string;
  referrerCode: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  status: 'pending' | 'applied' | 'interview' | 'hired' | 'rejected' | 'withdrawn';
  rewardAmount: number;
  rewardPaid: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Get user referrals
export async function getUserReferrals(userId: string): Promise<Referral[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('Referral')
    .select('*')
    .eq('referrerId', userId)
    .order('createdAt', { ascending: false });

  if (error) return [];
  return data as Referral[];
}

// Job Listing interface
export interface JobListing {
  id: string;
  title: string;
  titleMm?: string;
  company: string;
  companyId: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryDisplay?: string;
  reward: number;
  successFee?: number;
  skills?: string[];
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  urgent: boolean;
  featured?: boolean;
  description?: string;
  requirements?: string[];
  status: 'active' | 'closed' | 'draft';
  views?: number;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

// Get active jobs
export async function getActiveJobs(): Promise<JobListing[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('Job')
    .select('*')
    .eq('status', 'active')
    .order('createdAt', { ascending: false });

  if (error) return [];
  return data as JobListing[];
}
