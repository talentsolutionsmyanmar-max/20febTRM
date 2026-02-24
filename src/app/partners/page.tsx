'use client';

import Link from 'next/link';
import {
  Building2, Users, Shield, Award, ChevronRight, ArrowRight,
  Menu, X, Wallet, Check, Verified
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// ============================================
// DESIGN SYSTEM CONSTANTS
// ============================================

const burmeseText = {
  pageTitle: 'ကျွန်ုပ်တို့၏ ယုံကြည်ရသော မိတ်ဖက်ကုမ္ပဏီများ',
  introText: 'ReferTRM သည် မြန်မာ့ထိပ်တန်း ကုမ္ပဏီများနှင့် မိတ်ဖက်လုပ်ဆောင်ပြီး အားလုံးကို အတည်ပြုထားသည် - Talent Solutions Myanmar Co.,Ltd မှ လည်ပတ်ပြီး အလုပ်သမားဝန်ကြီးဌာနမှ လိုင်စင်ရရှိထားသည်။',
  trustedBy: "Myanmar's Industry Leaders များ၏ ယုံကြည်ချက်ရရှိထားသည်",
  premiumPartners: 'အထူးမိတ်ဖက်များ',
  officialPartner: 'တရားဝင် မိတ်ဖက်',
  employees: 'ဝန်ထမ်း',
  verifiedEmployer: 'အတည်ပြု လုပ်ငန်းရှင်',
  allPartners: 'မိတ်ဖက်ကုမ္ပဏီများ အားလုံး',
  ctaTitle: 'ယခု ReferTRM တွင် ပါဝင်ပါ',
  ctaSubtitle: 'အရည်အသွေးရှိသူများကို ဤကုမ္ပဏီများသို့ ရည်ညွှန်းပြီး ဆုလာဘ် ရယူပါ။',
  ctaButton: 'အခမဲ့ အကောင့် ဖန်တီးပါ',
  viewJobs: 'အလုပ်နေရာများ ကြည့်ရှုရန်',
};

// Partner companies data
const premiumPartners = [
  { 
    name: 'Makro Myanmar', 
    nameMm: 'မက်ခရို မြန်မာ',
    industry: 'Retail', 
    industryMm: 'လက်လီရောင်းချေ',
    headcount: '200+', 
    logo: '/partner-logo-1.jpg',
    description: 'Leading wholesale and retail chain in Myanmar',
    descriptionMm: 'မြန်မာတွင် ထိပ်တန်း လက်လီရောင်းချေ လုပ်ငန်း',
  },
  { 
    name: 'EAC Myanmar', 
    nameMm: 'အီးအေစီ မြန်မာ',
    industry: 'FMCG', 
    industryMm: 'စားသောက်ကုန်',
    headcount: '5,000+', 
    logo: '/eac-logo.png',
    description: 'Europe & Asia Commercial - Major FMCG distributor',
    descriptionMm: 'ဥရောပနှင့် အာရှ ကုန်သွယ်ရေး - အဓိက စားသောက်ကုန် ဖြန့်ဖြူးရေး',
  },
  { 
    name: 'JDE Myanmar', 
    nameMm: 'ဂျေဒီအီး မြန်မာ',
    industry: 'FMCG', 
    industryMm: 'စားသောက်ကုန်',
    headcount: '250+', 
    logo: '/partner-logo-3.jpg',
    description: 'Jacobs Douwe Egberts - Global coffee company',
    descriptionMm: 'ဂျေကို့ဗ် ဒိုးအို အက်ဂ်ဘတ် - နိုင်ငံတကာ ကော်ဖီကုမ္ပဏီ',
  },
];

const otherPartners = [
  { name: 'RK Yangon Steel', industry: 'Construction', headcount: '40+' },
  { name: 'Universal Energy', industry: 'Energy', headcount: '50+' },
  { name: 'NielsenIQ Myanmar', industry: 'Research', headcount: '25+' },
  { name: 'Unicharm Myanmar', industry: 'FMCG', headcount: '100+' },
  { name: 'KBZ Life Insurance', industry: 'Insurance', headcount: '200+' },
  { name: 'WOW Sport', industry: 'Retail', headcount: '30+' },
  { name: 'TOMO', industry: 'Technology', headcount: '40+' },
  { name: 'Wave Plus', industry: 'Technology', headcount: '20+' },
  { name: 'GK International', industry: 'Trading', headcount: '35+' },
  { name: 'Delight Amatat', industry: 'Interior Design', headcount: '25+' },
  { name: 'Real Aid Microfinance', industry: 'Finance', headcount: '60+' },
  { name: 'AMI', industry: 'Insurance', headcount: '30+' },
  { name: 'Yangoods', industry: 'Retail', headcount: '20+' },
  { name: 'Shwe Taung Htun', industry: 'Media', headcount: '15+' },
  { name: 'Sun Myat Tun', industry: 'Construction', headcount: '20+' },
  { name: 'Myanmar IT', industry: 'Technology', headcount: '25+' },
  { name: 'Salpyar', industry: 'E-commerce', headcount: '15+' },
];

export default function PartnersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Link href="/jobs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Find Jobs
              </Link>
              <Link href="/partners" className="text-sm font-medium text-teal-600">
                Partners
              </Link>
              <Link href="/company" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                For Employers
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
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
              <Link href="/jobs" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                Find Jobs
              </Link>
              <Link href="/partners" className="block py-2.5 px-3 text-teal-600 bg-teal-50 rounded-lg">
                Partners
              </Link>
              <Link href="/company" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                For Employers
              </Link>
              <Link href="/how-it-works" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                How It Works
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
              Our Trusted Partner Companies
            </h1>
            <p className="text-2xl text-teal-600 font-medium mb-4 burmese-text">
              {burmeseText.pageTitle}
            </p>

            {/* Intro */}
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              ReferTRM partners with leading Myanmar companies – all verified. Operated by{' '}
              <strong>Talent Solutions Myanmar Co.,Ltd</strong>, licensed by Ministry of Labor.
            </p>
            <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto mt-2 burmese-text">
              {burmeseText.introText}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              <div className="px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <span className="text-2xl font-bold text-teal-600">{premiumPartners.length + otherPartners.length}+</span>
                <span className="text-gray-600 ml-1">Companies</span>
              </div>
              <div className="px-4 py-2 bg-amber-50 rounded-full border border-amber-200">
                <span className="text-2xl font-bold text-amber-600">{premiumPartners.length}</span>
                <span className="text-amber-700 ml-1">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TRUSTED BY CAPTION
          ============================================ */}
      <section className="py-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {burmeseText.trustedBy}
          </p>
        </div>
      </section>

      {/* ============================================
          PREMIUM PARTNERS
          ============================================ */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 rounded-full mb-4">
              <Award className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">{burmeseText.premiumPartners}</span>
            </div>
          </div>

          {/* Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {premiumPartners.map((partner, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 h-full
                              hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5
                              transition-all duration-300 text-center">
                  {/* Logo */}
                  <div className="h-16 w-auto mx-auto mb-5 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="h-full w-auto object-contain"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                  <p className="text-teal-600 text-sm mb-3 burmese-text">{partner.nameMm}</p>

                  {/* Industry */}
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-2">
                    <Building2 className="h-4 w-4" />
                    <span>{partner.industry}</span>
                    <span className="text-gray-300">•</span>
                    <span className="burmese-text">{partner.industryMm}</span>
                  </div>

                  {/* Employee Count */}
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
                    <Users className="h-4 w-4" />
                    <span>{partner.headcount} {burmeseText.employees}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4">{partner.description}</p>
                  <p className="text-gray-400 text-xs burmese-text">{partner.descriptionMm}</p>

                  {/* Official Badge */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
                      <Verified className="h-3.5 w-3.5" />
                      {burmeseText.officialPartner}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ALL PARTNERS GRID
          ============================================ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {burmeseText.allPartners}
            </h2>
            <p className="text-gray-600">
              All companies are verified employers committed to fair hiring practices
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {otherPartners.map((partner, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl p-5 border border-gray-100 h-full
                              hover:border-gray-200 hover:shadow-lg
                              transition-all duration-300">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                    <Building2 className="h-5 w-5 text-teal-600" />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                    {partner.name}
                  </h3>

                  {/* Industry */}
                  <p className="text-sm text-gray-500 mb-1">{partner.industry}</p>

                  {/* Employee Count */}
                  <p className="text-xs text-gray-400">{partner.headcount} {burmeseText.employees}</p>

                  {/* Verified Badge */}
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <span className="inline-flex items-center gap-1 text-xs text-teal-600">
                      <Check className="h-3 w-3" />
                      {burmeseText.verifiedEmployer}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                {burmeseText.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-12">
                {burmeseText.viewJobs}
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
              Verified employers
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
                <li><Link href="/partners" className="text-sm text-gray-400 hover:text-white transition-colors">Partners</Link></li>
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
