'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, Clock, Check, X, AlertCircle, ChevronRight,
  Briefcase, Building2, Calendar, ArrowRight, Loader2,
  RefreshCw, Phone, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Referral {
  id: string;
  job_title: string;
  company_name: string;
  candidate_name: string;
  candidate_email: string;
  candidate_phone: string;
  status: string;
  reward_amount: number;
  created_at: string;
  notes?: string;
}

const statusConfig: Record<string, { color: string; bg: string; icon: any; label: string }> = {
  pending: { color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock, label: 'Pending Review' },
  applied: { color: 'text-blue-600', bg: 'bg-blue-50', icon: AlertCircle, label: 'Applied' },
  interview: { color: 'text-purple-600', bg: 'bg-purple-50', icon: Calendar, label: 'Interview' },
  hired: { color: 'text-green-600', bg: 'bg-green-50', icon: Check, label: 'Hired!' },
  rejected: { color: 'text-red-600', bg: 'bg-red-50', icon: X, label: 'Not Selected' },
  paid: { color: 'text-teal-600', bg: 'bg-teal-50', icon: Check, label: 'Paid!' },
};

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  // Fetch referrals
  const fetchReferrals = async () => {
    try {
      // Try Supabase first
      const res = await fetch('/api/supabase/referrals');
      const data = await res.json();
      
      if (data.referrals && data.referrals.length > 0) {
        setReferrals(data.referrals);
      } else {
        // Fallback to localStorage
        const savedReferrals = JSON.parse(localStorage.getItem('refertrm_referrals') || '[]');
        setReferrals(savedReferrals);
      }
    } catch (error) {
      console.error('Error fetching referrals:', error);
      // Fallback to localStorage
      const savedReferrals = JSON.parse(localStorage.getItem('refertrm_referrals') || '[]');
      setReferrals(savedReferrals);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchReferrals();
  };

  // Calculate stats
  const totalReferrals = referrals.length;
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
  const hiredReferrals = referrals.filter(r => r.status === 'hired' || r.status === 'paid').length;
  const totalEarnings = referrals
    .filter(r => r.status === 'hired' || r.status === 'paid')
    .reduce((sum, r) => sum + Math.round((r.reward_amount || 0) * 0.8), 0);

  // Calculate referrer earning (80%)
  const calculateEarning = (amount: number) => Math.round(amount * 0.8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Referrals</h1>
              <p className="text-gray-600 mt-1">
                Track and manage your candidate referrals
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
                className="border-gray-300"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Link href="/dashboard/jobs">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Find Jobs to Refer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-gray-900">{totalReferrals}</div>
              <div className="text-sm text-gray-600">Total Referrals</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-amber-600">{pendingReferrals}</div>
              <div className="text-sm text-amber-700">Pending</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{hiredReferrals}</div>
              <div className="text-sm text-green-700">Hired</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-teal-600">{totalEarnings.toLocaleString()}</div>
              <div className="text-sm text-teal-700">Earned (MMK)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : referrals.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No referrals yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start referring candidates to open positions and earn rewards when they get hired.
            </p>
            <Link href="/dashboard/jobs">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                Browse Open Positions
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {referrals.map((referral) => {
              const config = statusConfig[referral.status] || statusConfig.pending;
              const StatusIcon = config.icon;
              
              return (
                <div key={referral.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                          <Briefcase className="h-6 w-6 text-teal-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {referral.job_title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Building2 className="h-4 w-4" />
                            <span>{referral.company_name}</span>
                          </div>
                          <div className="text-sm text-gray-700 mb-2">
                            <span className="text-gray-500">Candidate:</span> {referral.candidate_name}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            {referral.candidate_phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {referral.candidate_phone}
                              </div>
                            )}
                            {referral.candidate_email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {referral.candidate_email}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status & Reward */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Your Earning (80%)</div>
                        <div className="text-lg font-semibold text-teal-600">
                          {calculateEarning(referral.reward_amount || 0).toLocaleString()} MMK
                        </div>
                        {referral.reward_amount && (
                          <div className="text-xs text-gray-400">
                            of {referral.reward_amount.toLocaleString()} total
                          </div>
                        )}
                      </div>
                      <div className={`px-4 py-2 rounded-lg ${config.bg} flex items-center gap-2`}>
                        <StatusIcon className={`h-4 w-4 ${config.color}`} />
                        <span className={`text-sm font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span>
                      Submitted {new Date(referral.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <button className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Info Box */}
        {referrals.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
            <h4 className="font-semibold text-teal-900 mb-2">How Payments Work</h4>
            <ul className="space-y-2 text-sm text-teal-800">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-teal-600 mt-0.5" />
                You earn 80% of the referral reward when candidate is hired
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-teal-600 mt-0.5" />
                Payments are sent via KPay within 30-60 days after hiring
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-teal-600 mt-0.5" />
                60-day replacement warranty for employers
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
