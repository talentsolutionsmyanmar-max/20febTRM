'use client';

import { useEffect, useState } from 'react';

export default function GoPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage directly
    const savedUser = localStorage.getItem('refertrm_user');
    
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        createDemoUser();
      }
    } else {
      createDemoUser();
    }
    
    setLoading(false);
  }, []);

  const createDemoUser = () => {
    const newUser = {
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
    
    localStorage.setItem('refertrm_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  if (loading) {
    return (
      <div style={{ padding: 40, background: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '4px solid #14b8a6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, background: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>
            <span style={{ color: '#14b8a6' }}>Refer</span>TRM
          </h1>
          <button
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>

        {/* Welcome */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Welcome, {user?.name || 'Demo User'}! 👋</h2>
          <p style={{ color: '#94a3b8' }}>ကောင်းသောနေ့လေးပါ</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
            <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#fbbf24' }}>{user?.points || 50}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Points</div>
            </div>
            <div style={{ background: 'rgba(249,115,22,0.1)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#f97316' }}>{user?.streak || 1}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Day Streak</div>
            </div>
            <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#22c55e' }}>{user?.totalReferrals || 0}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Referrals</div>
            </div>
          </div>
        </div>

        {/* Referral Code */}
        <div style={{ background: 'linear-gradient(to right, rgba(20,184,166,0.1), rgba(6,182,212,0.1))', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid rgba(20,184,166,0.2)' }}>
          <h3 style={{ marginBottom: 12 }}>Your Referral Code</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <code style={{ flex: 1, background: '#1e293b', padding: '12px 16px', borderRadius: 12, color: '#14b8a6', fontSize: 18 }}>
              {user?.referralCode || 'REFXXXXX'}
            </code>
            <button
              onClick={() => { navigator.clipboard.writeText(user?.referralCode || ''); alert('Copied!'); }}
              style={{ padding: '0 24px', background: '#14b8a6', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 'bold' }}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <a href="/dashboard/jobs" style={{ background: '#1e293b', borderRadius: 12, padding: 20, textAlign: 'center', textDecoration: 'none', color: 'white' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💼</div>
            <div>Browse Jobs</div>
          </a>
          <a href="/dashboard/academy" style={{ background: '#1e293b', borderRadius: 12, padding: 20, textAlign: 'center', textDecoration: 'none', color: 'white' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📚</div>
            <div>Academy</div>
          </a>
        </div>

        {/* Full Dashboard Link */}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <a href="/dashboard" style={{ color: '#14b8a6', fontSize: 16 }}>Go to Full Dashboard →</a>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
