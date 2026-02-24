'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Check, Building2, Shield, Award, ChevronRight,
  Menu, X, ArrowRight, Clock, TrendingUp, Globe,
  Mail, MapPin, Linkedin, Facebook, Quote, Star, Verified,
  PlayCircle, Users, Wallet, ListChecks, Trophy, CreditCard, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================
// DESIGN SYSTEM CONSTANTS
// ============================================

// Static Burmese translations for instant display (SEA-LION pattern)
const burmeseText = {
  heroTitle: 'အရည်အသွေးများကို ရည်ညွှန်းပါ။ ဆုလာဘ်ရယူပါ။',
  heroSubtitle: 'အရည်အသွေးရှိသော လူငယ်များကို မြန်မာ့ထိပ်တန်းလုပ်ငန်းများနှင့် ဆက်သွယ်ပေးပါ။ အောင်မြင်သော ရည်ညွှန်းမှုတစ်ခုလျှင် ကျပ် ၅,၀၀,၀၀၀ အထိ ရယူနိုင်ပါသည်။',
  licensed: 'အလုပ်သမားဝန်ကြီးဌာနမှ လိုင်စင်ရရှိထားသည်',
  ctaStart: 'ယနေ့ စတင်အကျိုးခံစားပါ',
  ctaBrowse: 'ရာထူးများ ရှာဖွေပါ',
  freeToJoin: 'အခမဲ့ ဝင်ရောက်ပါ',
  percentToYou: '၈၀% သင့်ထံ',
  verifiedEmployers: 'အတည်ပြု လုပ်ငန်းများ',
  howItWorks: 'မည်သို့ လုပ်ဆောင်သည်',
  createAccount: 'အကောင့် ဖန်တီးပါ',
  shareOpps: 'အခွင့်အလမ်းများ မျှဝေပါ',
  earnRewards: 'ဆုလာဘ် ရယူပါ',
  featuredJobs: 'ထူးခြားသော အခွင့်အလမ်းများ',
  partners: 'အယုံကြည်ချက်ရှိသော မိတ်ဖက်များ',
  testimonials: 'အောင်မြင်မှု ဇာတ်ကြောင်းများ',
  whyReferTRM: 'ReferTRM အကြောင်း',
  readyToStart: 'စတင်ရန် အဆင်သင့်ဖြစ်ပြီလား?',
  forEmployers: 'လုပ်ငန်းရှင်များအတွက်',
};

// Trust badges with official credentials
const trustBadges = [
  { label: 'Ministry of Labor Licensed', labelMm: 'အလုပ်သမားဝန်ကြီးဌာန လိုင်စင်', icon: Shield, featured: true },
  { label: '200+ Candidates Placed', labelMm: 'လူ ၂၀၀+ အလုပ်ရခဲ့', icon: Briefcase, featured: false },
  { label: '15M+ MMK Paid Out', labelMm: 'ကျပ် သန်း ၁၅+ ပေးခဲ့', icon: TrendingUp, featured: false },
  { label: '60-Day Replacement', labelMm: 'ရက် ၆၀ အစားထိုး', icon: Award, featured: false },
];

// Stats with verified numbers - bilingual
const stats = [
  { value: '200+', label: 'Professionals Hired', labelMm: 'အလုပ်ရသူများ', description: 'Through our referral network' },
  { value: '50+', label: 'Partner Companies', labelMm: 'မိတ်ဖက်လုပ်ငန်းများ', description: 'Verified employers in Myanmar' },
  { value: '15M+', label: 'MMK Rewarded', labelMm: 'ကျပ် သန်း ၁၅+ ပေးခဲ့', description: 'Paid to referrers via KPay' },
  { value: '98%', label: 'Success Rate', labelMm: 'အောင်မြင်မှု ၉၈%', description: 'Satisfaction from employers' },
];

// Real partner companies - Premium partners have logos
const partnerCompanies = [
  { name: 'Makro Myanmar', industry: 'Retail', headcount: '200+', premium: true, logo: '/partner-logo-1.jpg' },
  { name: 'EAC Myanmar', industry: 'FMCG', headcount: '5,000+', premium: true, logo: '/eac-logo.png' },
  { name: 'JDE Myanmar', industry: 'FMCG', headcount: '250+', premium: true, logo: '/partner-logo-3.jpg' },
  { name: 'RK Yangon Steel', industry: 'Construction', headcount: '40+', premium: false },
  { name: 'Universal Energy', industry: 'Energy', headcount: '50+', premium: false },
  { name: 'NielsenIQ Myanmar', industry: 'Research', headcount: '25+', premium: false },
  { name: 'Unicharm Myanmar', industry: 'FMCG', headcount: '100+', premium: false },
  { name: 'KBZ Life Insurance', industry: 'Insurance', headcount: '200+', premium: false },
  { name: 'WOW Sport', industry: 'Retail', headcount: '30+', premium: false },
  { name: 'TOMO', industry: 'Technology', headcount: '40+', premium: false },
  { name: 'Wave Plus', industry: 'Technology', headcount: '20+', premium: false },
  { name: 'GK International', industry: 'Trading', headcount: '35+', premium: false },
  { name: 'Delight Amatat', industry: 'Interior Design', headcount: '25+', premium: false },
  { name: 'Real Aid Microfinance', industry: 'Finance', headcount: '60+', premium: false },
  { name: 'AMI', industry: 'Insurance', headcount: '30+', premium: false },
  { name: 'Yangoods', industry: 'Retail', headcount: '20+', premium: false },
  { name: 'Shwe Taung Htun', industry: 'Media', headcount: '15+', premium: false },
  { name: 'Sun Myat Tun', industry: 'Construction', headcount: '20+', premium: false },
  { name: 'Myanmar IT', industry: 'Technology', headcount: '25+', premium: false },
  { name: 'Salpyar', industry: 'E-commerce', headcount: '15+', premium: false },
];

// How it works steps - bilingual
const howItWorks = [
  { 
    number: '01', 
    title: 'Create Account',
    titleMm: 'အကောင့် ဖန်တီးပါ',
    description: 'Sign up free and receive your unique referral code instantly. No fees, no commitments.',
    descriptionMm: 'အခမဲ့ မှတ်ပုံတင်ပြီး သင့်ကိုယ်ပိုင် ရည်ညွှန်းကုဒ် ချက်ချင်းရပါမည်။ အခကြေးမလိုပါ။',
    icon: Users,
  },
  { 
    number: '02', 
    title: 'Share Opportunities',
    titleMm: 'အခွင့်အလမ်းများ မျှဝေပါ',
    description: 'Browse verified job openings and share with qualified candidates in your network.',
    descriptionMm: 'အတည်ပြုထားသော အလုပ်ခေါ်မှုများကို ကြည့်ရှုပြီး သင့်အသိုင်းအဝိုင်းရှိ အရည်အသွေးရှိသူများနှင့် မျှဝေပါ။',
    icon: Globe,
  },
  { 
    number: '03', 
    title: 'Earn Rewards',
    titleMm: 'ဆုလာဘ် ရယူပါ',
    description: 'When your referral is hired, receive your reward directly via KPay within 30-60 days.',
    descriptionMm: 'သင့်ရည်ညွှန်းသူ အလုပ်ရသောအခါ KPay မှတစ်ဆင့် ရက် ၃၀-၆၀ အတွင်း ဆုလာဘ် ချက်ချင်းရပါမည်။',
    icon: Wallet,
  },
];

// Explore ReferTRM cards - bilingual
const exploreCards = [
  { 
    title: 'How It Works',
    titleMm: 'မည်သို့ လုပ်ဆောင်သည်',
    teaser: '3 simple steps to start earning',
    teaserMm: 'စတင်အချိန်းအသာ ၃ ခု',
    icon: ListChecks,
    href: '/how-it-works',
    color: 'bg-blue-50 text-blue-600',
  },
  { 
    title: 'Find Jobs',
    titleMm: 'အလုပ်ရှာဖွေပါ',
    teaser: 'High-reward verified positions',
    teaserMm: 'ဆုလာဘ်မြင့် အလုပ်နေရာများ',
    icon: Briefcase,
    href: '/dashboard/jobs',
    color: 'bg-emerald-50 text-emerald-600',
  },
  { 
    title: 'For Employers',
    titleMm: 'လုပ်ငန်းရှင်များအတွက်',
    teaser: 'Post jobs & get referrals',
    teaserMm: 'အလုပ်တင်ပြီး ရည်ညွှန်းလက်ခံပါ',
    icon: Building2,
    href: '/company',
    color: 'bg-purple-50 text-purple-600',
  },
  { 
    title: 'Success Stories',
    titleMm: 'အောင်မြင်မှု ဇာတ်ကြောင်းများ',
    teaser: 'Real earnings up to 900k MMK',
    teaserMm: 'ကျပ် ၉ သိန်းထိ ရရှိဖူးသည်',
    icon: Trophy,
    href: '/success-stories',
    color: 'bg-amber-50 text-amber-600',
  },
  { 
    title: 'Guaranteed Payouts',
    titleMm: 'အာမခံ ပေးချေမှု',
    teaser: '15M+ MMK paid via KPay',
    teaserMm: 'ကျပ် သန်း ၁၅+ ပေးခဲ့',
    icon: CreditCard,
    href: '/payouts',
    color: 'bg-rose-50 text-rose-600',
  },
  { 
    title: 'Why ReferTRM',
    titleMm: 'ReferTRM အကြောင်း',
    teaser: 'Licensed & transparent',
    teaserMm: 'လိုင်စင်ရ ရိုးသားသည်',
    icon: ShieldCheck,
    href: '/why-refertrm',
    color: 'bg-teal-50 text-teal-600',
  },
];

// Testimonials with real feel
const testimonials = [
  {
    name: 'U Myint Aung',
    title: 'HR Professional',
    location: 'Yangon',
    quote: 'I referred 3 candidates in one month and earned 900,000 MMK. The process was transparent and payment came right on time via KPay.',
    earnings: '900,000 MMK',
    rating: 5,
  },
  {
    name: 'Daw Su Su Hlaing',
    title: 'Marketing Manager',
    location: 'Yangon',
    quote: 'ReferTRM made it incredibly easy to help my friends find jobs while earning extra income. The platform is trustworthy.',
    earnings: '400,000 MMK',
    rating: 5,
  },
  {
    name: 'Ko Zaw Lwin',
    title: 'Sales Executive',
    location: 'Mandalay',
    quote: 'Finally a platform that pays exactly what they promise. Got my referral bonus within the timeline they stated.',
    earnings: '300,000 MMK',
    rating: 5,
  },
];

// Featured jobs data
interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  reward: number;
  urgent?: boolean;
}

function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/supabase/jobs?limit=6');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch {
        console.error('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-50 rounded-2xl p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">No positions available</p>
        <p className="text-sm text-gray-400 mt-1">Check back soon for new opportunities</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {jobs.slice(0, 6).map((job) => (
        <Link key={job.id} href="/dashboard/jobs" className="group">
          <article className="relative bg-white rounded-2xl p-6 border border-gray-100 h-full
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
                  {job.location && (
                    <p className="text-xs text-gray-500">{job.location}</p>
                  )}
                </div>
              </div>
              {job.urgent && (
                <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[11px] font-semibold 
                               rounded-full uppercase tracking-wide">
                  Urgent
                </span>
              )}
            </div>
            
            {/* Job Title */}
            <h3 className="font-semibold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
              {job.title}
            </h3>
            
            {/* Reward Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">
                  Referral Reward
                </p>
                <p className="text-lg font-bold text-teal-600">
                  {job.reward?.toLocaleString()} MMK
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center
                            group-hover:bg-teal-50 transition-colors">
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 
                                       group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      
      {/* ============================================
          NAVIGATION - Premium Sticky Header
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
              <Link href="/dashboard/jobs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Find Jobs
              </Link>
              <Link href="/company" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                For Employers
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
          <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 animate-fade-in">
            <nav className="space-y-1">
              <Link href="/dashboard/jobs" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                Find Jobs
              </Link>
              <Link href="/company" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                For Employers
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
          HERO SECTION - Premium Impact
          ============================================ */}
      <section className="relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-white pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* License Badge - Premium Treatment */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 rounded-full mb-8 shadow-lg shadow-teal-600/20">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Licensed by Ministry of Labor, Myanmar
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-teal-300" />
              <span className="text-xs font-medium text-teal-100">Verified</span>
            </div>

            {/* Main Headline - Bilingual */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 leading-[1.1] tracking-tight">
              Refer Talent.
              <br />
              <span className="text-teal-600">Earn Rewards.</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-700 mb-6 font-medium burmese-text">
              {burmeseText.heroTitle}
            </p>

            {/* Subheadline - Bilingual */}
            <p className="text-lg md:text-xl text-gray-600 mb-2 leading-relaxed max-w-2xl">
              Connect qualified candidates with Myanmar's top employers. 
              Earn up to <strong className="text-gray-900 font-semibold">500,000 MMK</strong> per successful referral, 
              paid directly via KPay.
            </p>
            <p className="text-base text-gray-500 mb-8 leading-relaxed max-w-2xl burmese-text">
              {burmeseText.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/register">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12
                                           shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30
                                           transition-all duration-200">
                  Start Earning Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/jobs">
                <Button size="lg" variant="outline" className="px-8 h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50">
                  Browse Positions
                </Button>
              </Link>
            </div>

            {/* Trust Indicators - Clean 3-item bar - Bilingual */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-2 text-sm text-gray-600">
              <span className="flex flex-col items-start gap-0.5">
                <span className="flex items-center gap-2 font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-teal-600" />
                  </div>
                  Free to join
                </span>
                <span className="text-xs text-gray-400 ml-7 burmese-text">{burmeseText.freeToJoin}</span>
              </span>
              <span className="flex flex-col items-start gap-0.5">
                <span className="flex items-center gap-2 font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-teal-600" />
                  </div>
                  80% to you
                </span>
                <span className="text-xs text-gray-400 ml-7 burmese-text">{burmeseText.percentToYou}</span>
              </span>
              <span className="flex flex-col items-start gap-0.5">
                <span className="flex items-center gap-2 font-medium">
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-teal-600" />
                  </div>
                  Verified employers
                </span>
                <span className="text-xs text-gray-400 ml-7 burmese-text">{burmeseText.verifiedEmployers}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TRUSTED BY - Premium Partner Logos
          ============================================ */}
      <section className="py-12 md:py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Trusted by Myanmar&apos;s Industry Leaders
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partnerCompanies.filter(c => c.premium).map((company, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="h-12 md:h-14 w-auto transition-all duration-300">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          STATS BAR - Clean & Professional - Bilingual
          ============================================ */}
      <section className="bg-gray-900 py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-300">{stat.label}</div>
                <div className="text-xs text-teal-400 mt-0.5 burmese-text">{stat.labelMm}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST BADGES - Grid Layout - Bilingual
          ============================================ */}
      <section className="py-10 md:py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {trustBadges.map((badge, index) => (
              <div 
                key={index} 
                className={`flex flex-col p-4 rounded-xl transition-all duration-200
                           ${badge.featured 
                             ? 'bg-teal-50 border border-teal-100' 
                             : 'bg-gray-50 border border-gray-100 hover:border-gray-200'}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                                ${badge.featured ? 'bg-teal-100' : 'bg-white border border-gray-100'}`}>
                    <badge.icon className={`h-5 w-5 ${badge.featured ? 'text-teal-600' : 'text-gray-500'}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{badge.label}</span>
                </div>
                <span className="text-xs text-gray-400 ml-13 burmese-text">{badge.labelMm}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          EXPLORE REFERTRM - Icon Cards Grid
          ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Explore ReferTRM
            </h2>
            <p className="text-teal-600 font-medium burmese-text">
              ReferTRM ကို စူးစမ်းလေ့လာပါ
            </p>
            <p className="text-gray-600 mt-2">
              Everything you need to start earning through referrals
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreCards.map((card, index) => (
              <Link key={index} href={card.href} className="group">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full
                              hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/5
                              hover:scale-[1.02] transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center mb-5
                                group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-8 w-8" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-teal-600 text-sm mb-3 burmese-text">
                    {card.titleMm}
                  </p>
                  
                  {/* Teaser */}
                  <p className="text-gray-600 text-sm mb-3">{card.teaser}</p>
                  <p className="text-gray-400 text-xs burmese-text">{card.teaserMm}</p>
                  
                  {/* Learn More */}
                  <div className="flex items-center gap-2 text-teal-600 text-sm font-medium mt-4 pt-4 border-t border-gray-50">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS - Premium Cards - Bilingual
          ============================================ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              How It Works
            </h2>
            <p className="text-teal-600 font-medium burmese-text mb-2">
              {burmeseText.howItWorks}
            </p>
            <p className="text-gray-600 max-w-xl mx-auto">
              Start earning referral rewards in three straightforward steps
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full
                              hover:border-teal-100 hover:shadow-xl hover:shadow-gray-900/5
                              transition-all duration-300">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-bold text-gray-100 group-hover:text-teal-50 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-teal-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-teal-600 text-sm mb-2 burmese-text">
                    {step.titleMm}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">
                    {step.description}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed burmese-text">
                    {step.descriptionMm}
                  </p>
                </div>

                {/* Connector Arrow */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-6 w-6 text-gray-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED JOBS
          ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">
                Open Positions
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Opportunities
              </h2>
              <p className="text-gray-600 mt-2">
                High-reward positions from verified employers
              </p>
            </div>
            <Link href="/dashboard/jobs" 
                  className="hidden md:flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm group">
              View all positions
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <FeaturedJobs />

          <div className="mt-8 text-center md:hidden">
            <Link href="/dashboard/jobs">
              <Button variant="outline" className="border-gray-200">
                View All Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          PARTNER COMPANIES - Premium Grid
          ============================================ */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">
              Trusted Partners
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Companies. Real Hirings.
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              We work exclusively with verified employers who are committed to fair hiring practices
            </p>
          </div>
          
          {/* Premium Partners Row */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-teal-400/70 uppercase tracking-wider mb-6 text-center">
              Premium Partners
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {partnerCompanies.filter(c => c.premium).map((company, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-2xl p-6 text-center border border-teal-500/30
                                hover:border-teal-400/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 h-full">
                    <div className="h-16 w-auto mx-auto mb-4 transition-all duration-300">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="h-full w-auto object-contain mx-auto"
                      />
                    </div>
                    <p className="font-semibold text-white mb-1">{company.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{company.industry}</p>
                    <p className="text-[11px] text-teal-400 font-medium">{company.headcount} employees</p>
                    <div className="mt-3 pt-3 border-t border-gray-700/50">
                      <span className="text-[10px] text-teal-300/80 uppercase tracking-wider font-semibold">Official Partner</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Partners Row - Horizontal Marquee Scroll */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center">
              Trusted Partners
            </p>
            <div className="relative overflow-hidden">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
              
              {/* Scrolling container */}
              <div className="flex animate-marquee">
                {/* First set of partners */}
                {partnerCompanies.filter(c => !c.premium).map((company, index) => (
                  <div key={index} className="flex-shrink-0 mx-4">
                    <div className="bg-gray-800/50 rounded-lg px-6 py-3 border border-gray-700/50
                                  hover:border-teal-500/30 hover:bg-gray-800 transition-all duration-200">
                      <p className="font-medium text-white text-sm whitespace-nowrap">{company.name}</p>
                    </div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {partnerCompanies.filter(c => !c.premium).map((company, index) => (
                  <div key={`dup-${index}`} className="flex-shrink-0 mx-4">
                    <div className="bg-gray-800/50 rounded-lg px-6 py-3 border border-gray-700/50
                                  hover:border-teal-500/30 hover:bg-gray-800 transition-all duration-200">
                      <p className="font-medium text-white text-sm whitespace-nowrap">{company.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-10">
            All partner companies undergo verification before listing positions on our platform.
          </p>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS - Premium Cards
          ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">
              Success Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real People. Real Earnings.
            </h2>
            <p className="text-gray-600">
              Hear from referrers who have earned through ReferTRM
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100
                                        hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-300">
                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="h-8 w-8 text-teal-100 mb-3" />
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title} • {testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-teal-600">{testimonial.earnings}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Earned</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PAYOUT PROOF - Trust Builder
          ============================================ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-teal-200 uppercase tracking-wider mb-4">
                Guaranteed Payouts
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We Pay What We Promise
              </h2>
              <p className="text-teal-100 mb-8 leading-relaxed">
                Over 15,000,000 MMK has been distributed to referrers through our platform. 
                Every successful referral receives their reward via KPay within 30-60 days of 
                the candidate's start date—guaranteed.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm text-teal-200">Payout rate</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <p className="text-3xl font-bold">30-60</p>
                  <p className="text-sm text-teal-200">Days to payment</p>
                </div>
              </div>
            </div>

            {/* Payment Card Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl p-6 shadow-2xl shadow-teal-900/30">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Payment Sent</p>
                    <p className="text-sm text-gray-500">via KPay</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Amount</p>
                  <p className="text-3xl font-bold text-gray-900">400,000 MMK</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="text-gray-900 font-mono">KP2024-XXXX-XXXX</span>
                </div>
                <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                  Example payout notification. Real rewards are sent directly to your KPay account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHY CHOOSE US + CTA
          ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Why Choose Us */}
            <div>
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">
                Why ReferTRM
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built for Myanmar's Job Market
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We're a licensed recruitment agency committed to transparency. 
                Our platform connects talent with verified employers, ensuring 
                safe and rewarding opportunities for everyone.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Shield, title: 'Licensed & Verified', desc: 'Registered with Ministry of Labor. All employers are vetted.' },
                  { icon: Award, title: 'Fair Rewards', desc: 'You keep 80% of the referral fee. No hidden charges.' },
                  { icon: Clock, title: 'Reliable Payouts', desc: 'Fast, secure payments via KPay. Track every step.' },
                  { icon: Globe, title: 'Local Expertise', desc: 'Built for Myanmar. We understand local hiring needs.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0
                                  group-hover:bg-teal-100 transition-colors">
                      <item.icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-0.5">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA Card */}
            <div className="bg-gray-900 rounded-3xl p-8 md:p-10 text-white">
              <h3 className="text-2xl font-bold mb-3">
                Ready to Start Earning?
              </h3>
              <p className="text-gray-400 mb-8">
                Create your free account and get your referral code instantly.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Free account setup',
                  'Access to all job listings',
                  'Unique referral tracking code',
                  'Real-time progress updates',
                  'KPay payout integration',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-teal-400" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register">
                <Button size="lg" className="w-full bg-white text-gray-900 hover:bg-gray-100 h-12
                                           font-semibold shadow-xl shadow-white/10">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-center text-xs text-gray-500 mt-4">
                No credit card required. Takes 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOR EMPLOYERS
          ============================================ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">
              For Employers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hiring? We Can Help
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Access Myanmar's trusted referral network to find quality, pre-vetted candidates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center
                          hover:shadow-lg hover:shadow-gray-900/5 transition-shadow">
              <p className="text-2xl font-bold text-gray-900 mb-1">Free</p>
              <p className="text-sm text-gray-500 mb-5">3 job postings</p>
              <p className="text-gray-600 text-sm mb-6">
                Perfect for trying out the platform and testing our referral network.
              </p>
              <Link href="/company">
                <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50">Get Started</Button>
              </Link>
            </div>

            {/* Popular Plan */}
            <div className="relative bg-white rounded-2xl p-6 border-2 border-teal-500 text-center shadow-xl shadow-teal-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-teal-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">350K MMK</p>
              <p className="text-sm text-gray-500 mb-5">15 active jobs/month</p>
              <p className="text-gray-600 text-sm mb-6">
                Dedicated support, premium listings, and priority candidate matching.
              </p>
              <Link href="/company">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Contact Sales</Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center
                          hover:shadow-lg hover:shadow-gray-900/5 transition-shadow">
              <p className="text-2xl font-bold text-gray-900 mb-1">Custom</p>
              <p className="text-sm text-gray-500 mb-5">Enterprise</p>
              <p className="text-gray-600 text-sm mb-6">
                Unlimited postings, priority support, API access, and custom integrations.
              </p>
              <Link href="/company">
                <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50">Talk to Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start Your Referral Journey Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of referrers already earning rewards by connecting talent with opportunities in Myanmar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12
                                         shadow-lg shadow-teal-600/25">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/company">
              <Button size="lg" variant="outline" className="px-8 h-12 border-gray-200">
                For Employers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER - Premium
          ============================================ */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo.png" alt="ReferTRM" className="h-7 w-auto" />
                <span className="text-lg font-semibold">
                  Refer<span className="text-teal-400">TRM</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                Myanmar's trusted referral hiring platform. Licensed by the Ministry of Labor, 
                connecting talented professionals with verified employers since 2024.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <Shield className="h-4 w-4 text-teal-400" />
                  <span>Licensed Recruitment Agency</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 text-teal-400" />
                  <span>Yangon, Myanmar</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <Mail className="h-4 w-4 text-teal-400" />
                  <span>contact@refertrm.com</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link href="/dashboard/jobs" className="text-sm text-gray-400 hover:text-white transition-colors">Find Jobs</Link></li>
                <li><Link href="/company" className="text-sm text-gray-400 hover:text-white transition-colors">For Employers</Link></li>
                <li><Link href="/dashboard/academy" className="text-sm text-gray-400 hover:text-white transition-colors">Academy</Link></li>
                <li><Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Payment Partners Section */}
          <div className="border-t border-gray-800 pt-10 mb-10">
            <div className="text-center mb-6">
              <h4 className="font-semibold text-white mb-2 flex items-center justify-center gap-2">
                <Wallet className="h-5 w-5 text-teal-400" />
                Payment Partners
              </h4>
              <p className="text-sm text-gray-400">We support all major Myanmar payment systems</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {/* KBZ Pay */}
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50 hover:border-purple-500/30 transition-colors">
                <div className="h-10 w-auto mx-auto mb-2 flex items-center justify-center">
                  <img src="/payment-kbz.png" alt="KBZ Pay" className="h-full w-auto object-contain" />
                </div>
                <p className="font-medium text-white text-sm">KBZ Pay</p>
                <p className="text-xs text-gray-500">Most Popular</p>
              </div>
              {/* CB Pay */}
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50 hover:border-blue-500/30 transition-colors">
                <div className="h-10 w-auto mx-auto mb-2 flex items-center justify-center">
                  <img src="/payment-cb.jpg" alt="CB Pay" className="h-full w-auto object-contain" />
                </div>
                <p className="font-medium text-white text-sm">CB Pay</p>
                <p className="text-xs text-gray-500">CB Bank</p>
              </div>
              {/* AYA Pay */}
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
                <div className="h-10 w-auto mx-auto mb-2 flex items-center justify-center">
                  <img src="/payment-aya.png" alt="AYA Pay" className="h-full w-auto object-contain" />
                </div>
                <p className="font-medium text-white text-sm">AYA Pay</p>
                <p className="text-xs text-gray-500">AYA Bank</p>
              </div>
              {/* MMQR */}
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50 hover:border-red-500/30 transition-colors">
                <div className="h-10 w-auto mx-auto mb-2 flex items-center justify-center">
                  <img src="/payment-mmqr.png" alt="MMQR" className="h-full w-auto object-contain" />
                </div>
                <p className="font-medium text-white text-sm">MMQR</p>
                <p className="text-xs text-gray-500">Any Bank</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-teal-400" />
                Instant transfer
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-teal-400" />
                No hidden fees
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-teal-400" />
                Secure & tracked
              </span>
            </div>
            <p className="text-center text-xs text-gray-600 mt-4">
              15,000,000+ MMK already paid out to referrers
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 ReferTRM. All rights reserved. Licensed by Ministry of Labor, Myanmar.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center
                                   text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center
                                   text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

