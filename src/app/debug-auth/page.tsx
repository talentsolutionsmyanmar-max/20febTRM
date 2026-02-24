'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DebugAuthPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Checking...');
  const [localStorageUser, setLocalStorageUser] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage
    const savedUser = localStorage.getItem('refertrm_user');
    setLocalStorageUser(savedUser);
    
    if (savedUser) {
      setStatus('User found in localStorage');
    } else {
      setStatus('No user in localStorage');
    }
  }, []);

  const forceDemoLogin = () => {
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
    
    localStorage.setItem('refertrm_user', JSON.stringify(user));
    setStatus('User saved! Redirecting...');
    
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 500);
  };

  const clearStorage = () => {
    localStorage.removeItem('refertrm_user');
    setLocalStorageUser(null);
    setStatus('Storage cleared');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Debug Auth Status</h1>
        
        <div className="bg-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Status</h2>
          <p className="text-teal-400">{status}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">localStorage User</h2>
          <pre className="text-xs text-slate-300 overflow-auto max-h-60">
            {localStorageUser || 'null'}
          </pre>
        </div>

        <div className="flex gap-4">
          <button
            onClick={forceDemoLogin}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl font-semibold"
          >
            Force Demo Login
          </button>
          <button
            onClick={clearStorage}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-semibold"
          >
            Clear Storage
          </button>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-xl font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}
