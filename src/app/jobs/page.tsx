'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase, MapPin, Building2, Search, Shield, Flame,
  ChevronRight, ArrowRight, Menu, X, Wallet, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================
// DESIGN SYSTEM CONSTANTS
// ============================================

const burmeseText = {
  pageTitle: 'အလုပ်နေရာများ - မြန်မာတွင် ဆုလာဘ်မြင့် အလုပ်များ',
  introText: 'ReferTRM တွင် အတည်ပြုထားသော လုပ်ငန်းရှင်များထံမှ ဆုလာဘ်မြင့် အလုပ်နေရာများကို ရှာဖွေပါ - Talent Solutions Myanmar Co.,Ltd မှ လည်ပတ်ပြီး အလုပ်သမားဝန်ကြီးဌာနမှ လိုင်စင်ရ ရရှိထားသည်။',
  featuredTitle: 'ထူးခြားသော အလုပ်နေရာများ',
  featuredSubtitle: 'ဆုလာဘ်အမြင့်ဆုံး အလုပ်နေရာများ',
  allPositions: 'ရာထူးအားလုံး ကြည့်ရှုရန်',
  noPositions: 'အလုပ်နေရာ မရှိသေးပါ',
  noPositionsMm: 'နောက်ထပ် ပြန်စစ်ပါ',
  searchPlaceholder: 'အလုပ်၊ ကုမ္ပဏီ၊ နေရာ ရှာဖွေပါ...',
  urgentOnly: 'အရေးပေါ်သာ',
  allLevels: 'အဆင့်အားလုံး',
  entryLevel: 'စတင်အဆင့်',
  midLevel: 'အလယ်အဆင့်',
  seniorLevel: 'အကြီးအဆင့်',
  referralReward: 'ရည်ညွှန်းဆုလာဘ်',
  youKeep: 'သင့်အတွက် (၈၀%)',
  viewDetails: 'အသေးစိတ် ကြည့်ရှုပါ',
  referNow: 'ယခု ရည်ညွှန်းပါ',
  positions: 'ရာထူးများ',
  urgent: 'အရေးပေါ်',
  ctaTitle: 'အခမဲ့ အကောင့် ဖန်တီးပါ',
  ctaSubtitle: 'သင့်ကိုယ်ပိုင် ရည်ညွှန်းကုဒ် ရယူပြီး စတင် ဆုလာဘ် ရယူပါ။',
  filterByLevel: 'အဆင့်အားဖြင့် စိစစ်ပါ',
};

// Job interface
interface Job {
  id: string;
  title: string;
  titleMm?: string;
  company: string;
  location: string;
  salary?: string;
  reward: number;
  urgent?: boolean;
  skills?: string[];
  level?: string;
}

// Level colors
const levelColors: Record<string, string> = {
  Entry: 'bg-green-50 text-green-700 border-green-200',
  Mid: 'bg-blue-50 text-blue-700 border-blue-200',
  Senior: 'bg-purple-50 text-purple-700 border-purple-200',
};

const levelLabels: Record<string, string> = {
  Entry: burmeseText.entryLevel,
  Mid: burmeseText.midLevel,
  Senior: burmeseText.seniorLevel,
};

export default function JobsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from Supabase
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/supabase/jobs?limit=50');
        const data = await res.json();
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || job.level === selectedLevel;
    const matchesUrgent = !showUrgentOnly || job.urgent;
    return matchesSearch && matchesLevel && matchesUrgent;
  });

  // Calculate potential earnings (80% to user)
  const calculateUserEarning = (reward: number) => Math.round(reward * 0.8);

  return (
    <div className="min-h-screen bg-white">
      
      {/* ============================================
          NAVIGATION - Same as Homepage
          ============================================ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="ReferTRM" className="h-8 w-auto" />
              <span className="text-lg font-semibold text-gray-900 tracking-tight">
                Refer<span className="text-teal-600">TRM</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/jobs" className="text-sm font-medium text-teal-600">
                Find Jobs
              </Link>
              <Link href="/company" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                For Employers
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </Link>
              <Link href="/dashboard/academy" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Academy
              </Link>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20">
                  Start Referring
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4">
            <nav className="space-y-1">
              <Link href="/jobs" className="block py-2.5 px-3 text-teal-600 bg-teal-50 rounded-lg">
                Find Jobs
              </Link>
              <Link href="/company" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                For Employers
              </Link>
              <Link href="/how-it-works" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                How It Works
              </Link>
              <Link href="/dashboard/academy" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                Academy
              </Link>
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">Start Referring</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-white">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            {/* License Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 rounded-full mb-6 shadow-lg shadow-teal-600/20">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Licensed by Ministry of Labor, Myanmar
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
              Open Positions
            </h1>
            <p className="text-2xl text-teal-600 font-medium mb-4">
              High-Reward Jobs in Myanmar
            </p>
            <p className="text-lg text-teal-700 font-medium burmese-text mb-4">
              {burmeseText.pageTitle}
            </p>

            {/* Intro */}
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Browse high-reward positions from verified employers on ReferTRM – powered by{' '}
              <strong>Talent Solutions Myanmar Co.,Ltd</strong>, licensed recruitment agency.
            </p>
            <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto mt-2 burmese-text">
              {burmeseText.introText}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              <div className="px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <span className="text-2xl font-bold text-teal-600">{jobs.length}</span>
                <span className="text-gray-600 ml-1">{burmeseText.positions}</span>
              </div>
              <div className="px-4 py-2 bg-amber-50 rounded-full border border-amber-200">
                <span className="text-2xl font-bold text-amber-600">{jobs.filter(j => j.urgent).length}</span>
                <span className="text-amber-700 ml-1">{burmeseText.urgent}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEARCH & FILTERS
          ============================================ */}
      <section className="bg-white border-b border-gray-100 sticky top-16 md:top-[72px] z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={burmeseText.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-gray-50"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 bg-gray-50"
              >
                <option value="all">{burmeseText.allLevels}</option>
                <option value="Entry">{burmeseText.entryLevel}</option>
                <option value="Mid">{burmeseText.midLevel}</option>
                <option value="Senior">{burmeseText.seniorLevel}</option>
              </select>
              
              <button
                onClick={() => setShowUrgentOnly(!showUrgentOnly)}
                className={`px-4 py-3 rounded-xl border font-medium transition-all flex items-center gap-2 ${
                  showUrgentOnly
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 bg-gray-50'
                }`}
              >
                <Flame className="h-4 w-4" />
                <span className="hidden sm:inline">{burmeseText.urgentOnly}</span>
              </button>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> positions
            </span>
            <span>
              Potential earnings:{' '}
              <span className="font-semibold text-teal-600">
                {filteredJobs.reduce((sum, j) => sum + calculateUserEarning(j.reward), 0).toLocaleString()} MMK
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          JOBS GRID
          ============================================ */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-20 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
              <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-1">{burmeseText.noPositions}</p>
              <p className="text-sm text-gray-400 burmese-text">{burmeseText.noPositionsMm}</p>
              <Link href="/register" className="mt-6 inline-block">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Get Notified When Jobs Are Posted
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Link key={job.id} href={`/dashboard/jobs/${job.id}`} className="group">
                  <article className="bg-white rounded-2xl p-6 border border-gray-100 h-full
                               hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5
                               transition-all duration-300">
                    {/* Top Section */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 
                              flex items-center justify-center border border-gray-100">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{job.company}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.level && (
                          <span className={`px-2 py-1 text-[10px] font-medium rounded-full border ${levelColors[job.level] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                            {levelLabels[job.level] || job.level}
                          </span>
                        )}
                        {job.urgent && (
                          <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-semibold rounded-full uppercase">
                            Urgent
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Job Title */}
                    <h3 className="font-semibold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                      {job.title}
                    </h3>

                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                            +{job.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Reward Section */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">
                          {burmeseText.referralReward}
                        </p>
                        <p className="text-lg font-bold text-teal-600">
                          {job.reward?.toLocaleString()} MMK
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-gray-400 mb-1">
                          {burmeseText.youKeep}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {calculateUserEarning(job.reward).toLocaleString()} MMK
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center justify-between text-sm text-teal-600 font-medium">
                        <span>{burmeseText.viewDetails}</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {burmeseText.ctaTitle}
          </h2>
          <p className="text-teal-100 text-lg mb-8 burmese-text">
            {burmeseText.ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 h-12
                                         shadow-lg hover:shadow-xl transition-all duration-200">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-12">
                Learn How It Works
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-teal-200/80 text-sm">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Free forever
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              80% to you
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              KPay payouts
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <img src="/logo.png" alt="ReferTRM" className="h-8 w-auto" />
                <span className="text-lg font-semibold">
                  Refer<span className="text-teal-400">TRM</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Myanmar&apos;s #1 referral hiring platform. Connect talent with opportunities and earn rewards.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                <strong className="text-gray-400">Talent Solutions Myanmar Co.,Ltd</strong><br />
                Licensed Recruitment Agency under Ministry of Labor, Myanmar
              </p>
              <p className="text-gray-600 text-xs mt-2 burmese-text">
                အလုပ်သမားဝန်ကြီးဌာန လိုင်စင်ရ အလုပ်ခန့်အေဂျင်စီ
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/jobs" className="text-sm text-gray-400 hover:text-white transition-colors">Find Jobs</Link></li>
                <li><Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/company" className="text-sm text-gray-400 hover:text-white transition-colors">For Employers</Link></li>
                <li><Link href="/dashboard/academy" className="text-sm text-gray-400 hover:text-white transition-colors">Academy</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Payment Partners */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="text-center mb-4">
              <h4 className="text-sm font-medium text-gray-400 flex items-center justify-center gap-2">
                <Wallet className="h-4 w-4 text-teal-400" />
                Payment Partners
              </h4>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <img src="/payment-kbz.png" alt="KBZ Pay" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/payment-cb.jpg" alt="CB Pay" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/payment-aya.png" alt="AYA Pay" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/payment-mmqr.png" alt="MMQR" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ReferTRM by Talent Solutions Myanmar Co.,Ltd. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1 burmese-text">
              အလုပ်သမားဝန်ကြီးဌာန လိုင်စင်ရ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
