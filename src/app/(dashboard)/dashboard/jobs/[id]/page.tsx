'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase, MapPin, Building2, ArrowLeft, Clock, Users,
  Check, Send, Phone, Mail, User, MessageSquare, Loader2,
  CheckCircle, AlertCircle, Flame, DollarSign, Zap, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  reward: number;
  urgent?: boolean;
  skills?: string[];
  level?: string;
  description?: string;
  requirements?: string[];
}

interface ReferralForm {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  relationship: string;
  notes: string;
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { recordReferral, data: gamificationData } = useGamification(user?.id);
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [xpEarned, setXpEarned] = useState(0);
  
  const [form, setForm] = useState<ReferralForm>({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    relationship: '',
    notes: ''
  });

  // Fetch job details
  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/supabase/jobs?id=${id}`);
        const data = await res.json();
        
        if (data.job) {
          setJob(data.job);
        } else if (data.jobs) {
          // Find from list
          const found = data.jobs.find((j: Job) => j.id === id);
          setJob(found || null);
        }
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  // Calculate referrer's earning (80%)
  const referrerEarning = job ? Math.round(job.reward * 0.8) : 0;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.candidateName || !form.candidatePhone) {
      setError('Please fill in candidate name and phone number');
      return;
    }

    if (!user) {
      setError('Please log in to submit a referral');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // Create referral via API
      const res = await fetch('/api/supabase/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: job?.id,
          referrer_id: user.id || 'guest',
          candidate_name: form.candidateName,
          candidate_email: form.candidateEmail,
          candidate_phone: form.candidatePhone,
          relationship: form.relationship,
          notes: form.notes,
          job_title: job?.title,
          company_name: job?.company,
          reward_amount: job?.reward,
          status: 'pending'
        })
      });

      const data = await res.json();

      if (data.success || res.ok) {
        // Also save to localStorage as backup
        const savedReferrals = JSON.parse(localStorage.getItem('refertrm_referrals') || '[]');
        const newReferral = {
          id: data.referral?.id || Date.now().toString(),
          job_title: job?.title,
          company_name: job?.company,
          candidate_name: form.candidateName,
          candidate_email: form.candidateEmail,
          candidate_phone: form.candidatePhone,
          status: 'pending',
          reward_amount: job?.reward,
          created_at: new Date().toISOString()
        };
        savedReferrals.unshift(newReferral);
        localStorage.setItem('refertrm_referrals', JSON.stringify(savedReferrals));
        
        // Award XP for referral
        const xpResult = await recordReferral();
        if (xpResult) {
          setXpEarned(xpResult.xpEarned || 50);
          if (xpResult.achievementsUnlocked?.length > 0) {
            setAchievementUnlocked(xpResult.achievementsUnlocked[0]);
          }
        } else {
          setXpEarned(50); // Default XP
        }
        
        setSubmitted(true);
      } else {
        // Fallback: just save to localStorage
        const savedReferrals = JSON.parse(localStorage.getItem('refertrm_referrals') || '[]');
        const newReferral = {
          id: Date.now().toString(),
          job_title: job?.title,
          company_name: job?.company,
          candidate_name: form.candidateName,
          candidate_email: form.candidateEmail,
          candidate_phone: form.candidatePhone,
          status: 'pending',
          reward_amount: job?.reward,
          created_at: new Date().toISOString()
        };
        savedReferrals.unshift(newReferral);
        localStorage.setItem('refertrm_referrals', JSON.stringify(savedReferrals));
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Submit error:', err);
      // Fallback to localStorage
      const savedReferrals = JSON.parse(localStorage.getItem('refertrm_referrals') || '[]');
      const newReferral = {
        id: Date.now().toString(),
        job_title: job?.title,
        company_name: job?.company,
        candidate_name: form.candidateName,
        candidate_email: form.candidateEmail,
        candidate_phone: form.candidatePhone,
        status: 'pending',
        reward_amount: job?.reward,
        created_at: new Date().toISOString()
      };
      savedReferrals.unshift(newReferral);
      localStorage.setItem('refertrm_referrals', JSON.stringify(savedReferrals));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
        <p className="text-gray-600 mb-6">This job may have been removed or is no longer available.</p>
        <Link href="/dashboard/jobs">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>
      </div>
    );
  }

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Referral Submitted!</h2>
          <p className="text-gray-600 mb-6">
            You've referred <span className="font-semibold">{form.candidateName}</span> for the {job.title} position at {job.company}.
          </p>
          
          {/* XP Earned Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="h-5 w-5 text-amber-500" />
              <span className="text-sm text-amber-700 font-medium">XP Earned</span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-amber-600">+{xpEarned} XP</div>
          </div>
          
          {/* Potential Earning */}
          <div className="bg-teal-50 rounded-xl p-4 mb-6">
            <div className="text-sm text-teal-700 mb-1">Your Potential Earning</div>
            <div className="text-3xl font-bold text-teal-600">{referrerEarning.toLocaleString()} MMK</div>
            <div className="text-xs text-teal-600 mt-1">80% of total reward</div>
          </div>
          
          <div className="space-y-3">
            <Link href="/dashboard/referrals" className="block">
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                View My Referrals
              </Button>
            </Link>
            <Link href="/dashboard/jobs" className="block">
              <Button variant="outline" className="w-full">
                Browse More Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/dashboard/jobs" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
                {job.urgent && (
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-full flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    Urgent
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-5 w-5" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-5 w-5" />
                  <span>{job.location}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-5 w-5" />
                    <span>{job.salary}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 text-center min-w-[180px]">
              <div className="text-sm text-teal-700 mb-1">Referral Reward</div>
              <div className="text-2xl font-bold text-teal-600">{job.reward.toLocaleString()} MMK</div>
              <div className="text-xs text-teal-600 mt-1">You keep {referrerEarning.toLocaleString()} (80%)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {job.description && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Job Description</h3>
                <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <Check className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How it works */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-6">
              <h3 className="font-semibold text-amber-900 mb-4">How Referral Works</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm">1</div>
                  <span className="text-amber-800">Submit candidate details</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm">2</div>
                  <span className="text-amber-800">We contact your candidate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm">3</div>
                  <span className="text-amber-800">Candidate gets interviewed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm">4</div>
                  <span className="text-amber-800">Get paid via KPay when hired!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-500" />
                Refer a Candidate
              </h3>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Candidate Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Candidate Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={form.candidateName}
                      onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
                      placeholder="e.g., Ma Hla Hla"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={form.candidatePhone}
                      onChange={(e) => setForm({ ...form, candidatePhone: e.target.value })}
                      placeholder="e.g., 09912345678"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={form.candidateEmail}
                      onChange={(e) => setForm({ ...form, candidateEmail: e.target.value })}
                      placeholder="e.g., hlahla@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Relationship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How do you know them?
                  </label>
                  <select
                    value={form.relationship}
                    onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Former Colleague</option>
                    <option value="family">Family Member</option>
                    <option value="acquaintance">Acquaintance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why are they a good fit?
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Share why this candidate would be great for this role..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Referral
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you confirm you have the candidate's permission to share their details.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
