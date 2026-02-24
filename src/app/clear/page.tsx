'use client';

import { useEffect, useState } from 'react';

export default function ClearCachePage() {
  const [status, setStatus] = useState('Click button to clear cache');

  const clearAll = async () => {
    setStatus('Clearing...');
    
    // Clear localStorage
    localStorage.clear();
    setStatus('Cleared localStorage');
    
    // Clear sessionStorage
    sessionStorage.clear();
    setStatus('Cleared sessionStorage');
    
    // Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        await caches.delete(name);
        console.log('Deleted cache:', name);
      }
      setStatus('Cleared all caches');
    }
    
    // Unregister service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
        console.log('Unregistered SW');
      }
      setStatus('Unregistered service workers');
    }
    
    setStatus('✅ All cleared! Redirecting to /go...');
    
    setTimeout(() => {
      window.location.href = '/go';
    }, 1500);
  };

  return (
    <div style={{ 
      padding: 40, 
      background: '#0f172a', 
      color: 'white', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ color: '#f59e0b', marginBottom: 20 }}>Clear Cache</h1>
      <p style={{ marginBottom: 30, color: '#94a3b8' }}>{status}</p>
      <button
        onClick={clearAll}
        style={{
          padding: '16px 32px',
          background: '#f59e0b',
          color: '#000',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 18,
          fontWeight: 'bold'
        }}
      >
        Clear Everything & Go to Demo
      </button>
    </div>
  );
}
