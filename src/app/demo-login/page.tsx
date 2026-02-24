'use client';

import { useEffect, useState } from 'react';

export default function DemoLoginPage() {
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const setupDemo = async () => {
      try {
        setStatus('Creating demo account...');
        
        // Direct localStorage set
        const user = {
          uid: 'demo_' + Date.now(),
          email: 'demo@refertrm.com',
          displayName: 'Demo User',
          name: 'Demo User',
          isGuest: true,
          points: 50,
          totalPointsEarned: 50,
          streak: 1,
          maxStreak: 1,
          completedModules: [],
          level: 'Amateur',
          avatar: '',
          avatarType: 'neutral',
          avatarUrl: null,
          referralCode: 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          totalEarnings: 0,
          successfulReferrals: 0,
          totalReferrals: 0,
          lastLoginAt: new Date().toISOString(),
          lastBonusClaim: null,
          purchasedItems: [],
        };
        
        // Set user in localStorage
        localStorage.setItem('refertrm_user', JSON.stringify(user));
        console.log('Demo user saved:', user.uid);
        
        setStatus('Verifying...');
        
        // Verify it was saved
        const saved = localStorage.getItem('refertrm_user');
        if (!saved) {
          throw new Error('Failed to save to localStorage');
        }
        
        console.log('Verified user in localStorage');
        setStatus('Redirecting to dashboard...');
        
        // Wait a moment for localStorage to be fully written
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Demo login error:', error);
        setStatus('Error! Click here to try again');
      }
    };

    setupDemo();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">{status}</p>
        <p className="text-slate-400 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  );
}
