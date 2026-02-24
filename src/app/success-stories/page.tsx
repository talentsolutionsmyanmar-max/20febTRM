'use client';

import Link from 'next/link';
import {
  Shield, Star, Quote, ArrowRight, Menu, X, Wallet, Check,
  TrendingUp, Users, Award
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// ============================================
// DESIGN SYSTEM CONSTANTS
// ============================================

const burmeseText = {
  pageTitle: 'အောင်မြင်မှု ဇာတ်ကြောင်းများ - ရည်ညွှန်းသူများထံမှ စစ်မှန်သော ဝင်ငွေများ',
  introText: 'ReferTRM တွင် စစ်မှန်သော လူများသည် စစ်မှန်သော ဆုလာဘ်များ ရရှိနေကြသည် - လိုင်စင်ရ Talent Solutions Myanmar Co.,Ltd မှ လည်ပတ်သည်။',
  testimonial1Quote: 'တစ်လအတွင်း ကျွန်ုပ်သည် ကျွန်ုပ်၏ အသိုင်းအဝိုင်းမှ အရည်အသွေးရှိသူ ၃ ဦးကို ရည်ညွှန်းတင်သွင်းခဲ့ပြီး ကျပ် ၉,၀၀,၀၀၀ ရရှိခဲ့သည်။ လုပ်ငန်းစဉ်သည် ရိုးသားပွင့်လင်းပြီး KPay မှတစ်ဆင့် အချိန်မှန် ပေးချေမှု ရရှိခဲ့သည်။',
  testimonial2Quote: 'ReferTRM သည် ကျွန်ုပ်၏ မိတ်ဆွေများအား အလုပ်ရှာရာတွင် ကူညီပေးရင်း ထပ်တိုးဝင်ငွေ ရရှိစေရန် အလွန်လွယ်ကူစေပါသည်။ ပလက်ဖောင်းသည် ယုံကြည်စိတ်ချရပါသည်။',
  testimonial3Quote: 'နောက်ဆုံးတွင် ကတိကဝတ်ပြုထားသည့်အတိုင်း အတိအကျ ပေးချေသော ပလက်ဖောင်းတစ်ခု တွေ့ရှိခဲ့သည်။ သတ်မှတ်ထားသော အချိန်အတွင်း ကျွန်ုပ်၏ ရည်ညွှန်းဆုလာဘ် ရရှိခဲ့ပါသည်။',
  highlightTitle: 'ယခုဆို ကျပ် သန်း ၁၅+ ပေးခဲ့ပြီးပြီ',
  highlightSubtitle: 'တရားဝင် လုပ်ငန်းများမှ ရည်ညွှန်းသူများထံသို့',
  ctaTitle: 'နောက်ထပ် အောင်မြင်မှု ဇာတ်ကြောင်း ဖြစ်လာပါ',
  ctaSubtitle: 'ယခု အခမဲ့ အကောင့် ဖန်တီးပြီး သင့်ကိုယ်ပိုင် ရည်ညွှန်းကုဒ် ရယူပါ။',
  ctaButton: 'အခမဲ့ အကောင့် ဖန်တီးပါ',
  viewJobs: 'အလုပ်နေရာများ ကြည့်ရှုရန်',
  earned: 'ရရှိခဲ့သည်',
  verifiedEarning: 'အတည်ပြု ဝင်ငွေ',
};

// Testimonials data
const testimonials = [
  {
    name: 'U Myint Aung',
    nameMm: 'ဦးမြင့်အောင်',
    title: 'HR Professional',
    titleMm: 'လူ့အရင်းအမြစ် ကျွမ်းကျင်သူ',
    location: 'Yangon',
    locationMm: 'ရန်ကုန်',
    quote: 'I referred 3 candidates in one month and earned 900,000 MMK. The process was transparent and payment came right on time via KPay.',
    quoteMm: burmeseText.testimonial1Quote,
    earnings: '900,000 MMK',
    rating: 5,
  },
  {
    name: 'Daw Su Su Hlaing',
    nameMm: 'ဒေါ်စူစူလှိုင်',
    title: 'Marketing Manager',
    titleMm: 'မာကတ်တင်း မန်နေဂျာ',
    location: 'Yangon',
    locationMm: 'ရန်ကုန်',
    quote: 'ReferTRM made it incredibly easy to help my friends find jobs while earning extra income. The platform is trustworthy.',
    quoteMm: burmeseText.testimonial2Quote,
    earnings: '400,000 MMK',
    rating: 5,
  },
  {
    name: 'Ko Zaw Lwin',
    nameMm: 'ကိုဇော်လွင်',
    title: 'Sales Executive',
    titleMm: 'ကုန်သွယ်ရောင်းချသူ',
    location: 'Mandalay',
    locationMm: 'မန္တလေး',
    quote: 'Finally a platform that pays exactly what they promise. Got my referral bonus within the timeline they stated.',
    quoteMm: burmeseText.testimonial3Quote,
    earnings: '300,000 MMK',
    rating: 5,
  },
];

// Stats
const stats = [
  { value: '15M+', label: 'MMK Paid Out', labelMm: 'ကျပ် ပေးခဲ့ပြီး', icon: TrendingUp },
  { value: '200+', label: 'Successful Referrals', labelMm: 'အောင်မြင်သော ရည်ညွှန်းမှု', icon: Users },
  { value: '98%', label: 'Satisfaction Rate', labelMm: 'ကျေနပ်မှုနှုန်း', icon: Award },
];

export default function SuccessStoriesPage() {
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
              <Link href="/partners" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Partners
              </Link>
              <Link href="/success-stories" className="text-sm font-medium text-teal-600">
                Success Stories
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
              <Link href="/partners" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                Partners
              </Link>
              <Link href="/success-stories" className="block py-2.5 px-3 text-teal-600 bg-teal-50 rounded-lg">
                Success Stories
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
              Success Stories
            </h1>
            <p className="text-2xl text-teal-600 font-medium mb-4">
              Real Earnings from Referrers
            </p>
            <p className="text-lg text-teal-700 font-medium burmese-text mb-4">
              {burmeseText.pageTitle}
            </p>

            {/* Intro */}
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Real people earning real rewards on ReferTRM – powered by licensed{' '}
              <strong>Talent Solutions Myanmar Co.,Ltd</strong>.
            </p>
            <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto mt-2 burmese-text">
              {burmeseText.introText}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS BAR
          ============================================ */}
      <section className="bg-gray-900 py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-300">{stat.label}</div>
                <div className="text-xs text-teal-400 mt-0.5 burmese-text">{stat.labelMm}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS
          ============================================ */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real People. Real Earnings.
            </h2>
            <p className="text-teal-600 font-medium burmese-text mb-2">
              စစ်မှန်သော လူများ။ စစ်မှန်သော ဝင်ငွေများ။
            </p>
            <p className="text-gray-600">
              Hear from referrers who have earned through ReferTRM
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 h-full
                              hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5
                              transition-all duration-300">
                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-teal-100 mb-3" />

                  {/* English Quote */}
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {/* Burmese Quote */}
                  <p className="text-gray-400 mb-6 leading-relaxed text-xs burmese-text">
                    &quot;{testimonial.quoteMm}&quot;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-xs text-gray-500 burmese-text">{testimonial.nameMm}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.title} • {testimonial.location}
                      </p>
                      <p className="text-xs text-gray-400 burmese-text">
                        {testimonial.titleMm} • {testimonial.locationMm}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-teal-600">{testimonial.earnings}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{burmeseText.earned}</p>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <span className="inline-flex items-center gap-1.5 text-xs text-teal-600 font-medium">
                      <Check className="h-3.5 w-3.5" />
                      {burmeseText.verifiedEarning}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          HIGHLIGHT SECTION
          ============================================ */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {burmeseText.highlightTitle}
          </h2>
          <p className="text-teal-100 text-lg burmese-text">
            {burmeseText.highlightSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-teal-200" />
              <span>100% Payout Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-teal-200" />
              <span>30-60 Day Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-teal-200" />
              <span>KPay Transfer</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {burmeseText.ctaTitle}
          </h2>
          <p className="text-gray-600 text-lg mb-8 burmese-text">
            {burmeseText.ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12
                                         shadow-lg hover:shadow-xl transition-all duration-200">
                {burmeseText.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="px-8 h-12 border-gray-200 hover:border-gray-300">
                {burmeseText.viewJobs}
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-gray-500 text-sm">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
              Free forever
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
              80% to you
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
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
                <li><Link href="/partners" className="text-sm text-gray-400 hover:text-white transition-colors">Partners</Link></li>
                <li><Link href="/success-stories" className="text-sm text-gray-400 hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/company" className="text-sm text-gray-400 hover:text-white transition-colors">For Employers</Link></li>
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
