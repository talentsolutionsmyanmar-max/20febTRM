'use client';

import Link from 'next/link';
import {
  Shield, Clock, CreditCard, Check, ArrowRight, Menu, X, Wallet,
  TrendingUp, Users, Award, ShieldCheck, Building2
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// ============================================
// DESIGN SYSTEM CONSTANTS
// ============================================

const burmeseText = {
  pageTitle: 'အာမခံပြီး မြန်ဆန်သော KPay မှတစ်ဆင့် ပေးချေမှု',
  introText: 'ReferTRM သည် လုံခြုံစိတ်ချရသော ရိုးသားပွင့်လင်းသော ပေးချေမှုများကို အာမခံပေးသည် - Talent Solutions Myanmar Co.,Ltd မှ လည်ပတ်သည်။',
  keyPoint1Title: 'အလုပ်ရှင်တစ်ဦးအတွက် ကျပ် ၅,၀၀,၀၀၀ အထိ',
  keyPoint1Desc: 'အောင်မြင်သော အလုပ်ခန့်မှုတစ်ခုလျှင် အမြင့်ဆုံး ဆုလာဘ်',
  keyPoint2Title: 'သင့်အတွက် ၈၀%',
  keyPoint2Desc: 'ဆုလာဘ်၏ ၈၀% ကို သင့်ထံသို့ တိုက်ရိုက်ပေးပါသည်',
  keyPoint3Title: 'KPay မှတစ်ဆင့် ရက် ၃၀-၆၀',
  keyPoint3Desc: 'KBZ Pay, CB Pay, AYA Pay, MMQR များဖြင့် မြန်မြန်ဆန်ဆန် ပေးချေပါသည်',
  keyPoint4Title: '၁၀၀% ပေးချေမှုနှုန်း',
  keyPoint4Desc: 'ကတိကဝတ်ပြုထားသမျှ အားလုံး အတိအကျ ပေးချေပါသည်',
  keyPoint5Title: 'ကျပ် သန်း ၁၅+ ဖြန့်ဝေပြီး',
  keyPoint5Desc: 'ရည်ညွှန်းသူများထံသို့ ပေးခဲ့ပြီးပြီ',
  keyPoint6Title: 'ရက် ၆၀ အစားထိုးအာမခံ',
  keyPoint6Desc: 'လုပ်ငန်းရှင်များအတွက် လူထွက်ပါက အစားထိုးပေးသည်',
  howItWorksTitle: 'ပေးချေမှု မည်သို့ လုပ်ဆောင်သည်',
  step1Title: 'ရည်ညွှန်းသူ အလုပ်စတင်သည်',
  step1Desc: 'သင့်ရည်ညွှန်းသူ အလုပ်စတင်ပြီး စမ်းသပ်ကာလ ကျော်လွန်သည်',
  step2Title: 'ဆုလာဘ် တွက်ချက်သည်',
  step2Desc: '၈၀% ကို သင့်အတွက်၊ ၂၀% ကို ပလက်ဖောင်းအတွက်',
  step3Title: 'KPay သို့ ပေးပို့သည်',
  step3Desc: 'ရက် ၃၀-၆၀ အတွင်း သင့်ငွေပေးချေမှု စနစ်သို့ ပေးပို့ပါသည်',
  ctaTitle: 'ယခု စတင် ရယူပါ',
  ctaSubtitle: 'အခမဲ့ အကောင့် ဖန်တီးပြီး သင့်ကိုယ်ပိုင် ရည်ညွှန်းကုဒ် ရယူပါ။',
  ctaButton: 'အခမဲ့ အကောင့် ဖန်တီးပါ',
  viewJobs: 'အလုပ်နေရာများ ကြည့်ရှုရန်',
  paymentMethods: 'ပေးချေမှုနည်းလမ်းများ',
  instantTransfer: 'ချက်ချင်း ငွေပေးချေမှု',
  noHiddenFees: 'ဝှက်ထားသော အခကြေးများ မရှိပါ',
  securePayment: 'လုံခြုံသော ပေးချေမှု',
  supportedPayments: 'ကျွန်ုပ်တို့ ပံ့ပိုးထားသော ပေးချေမှု စနစ်များ',
};

// Key points data
const keyPoints = [
  {
    icon: TrendingUp,
    title: 'Up to 500,000 MMK per hire',
    titleMm: burmeseText.keyPoint1Title,
    description: 'Maximum reward per successful placement',
    descriptionMm: burmeseText.keyPoint1Desc,
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Wallet,
    title: 'You keep 80%',
    titleMm: burmeseText.keyPoint2Title,
    description: '80% of reward goes directly to you',
    descriptionMm: burmeseText.keyPoint2Desc,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Clock,
    title: '30-60 days via KPay',
    titleMm: burmeseText.keyPoint3Title,
    description: 'Fast payment via KBZ Pay, CB Pay, AYA Pay, MMQR',
    descriptionMm: burmeseText.keyPoint3Desc,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: ShieldCheck,
    title: '100% payout rate',
    titleMm: burmeseText.keyPoint4Title,
    description: 'Every promised payment delivered',
    descriptionMm: burmeseText.keyPoint4Desc,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Users,
    title: '15M+ MMK distributed',
    titleMm: burmeseText.keyPoint5Title,
    description: 'Already paid to referrers',
    descriptionMm: burmeseText.keyPoint5Desc,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Shield,
    title: '60-day replacement warranty',
    titleMm: burmeseText.keyPoint6Title,
    description: 'Free replacement for employers if candidate leaves',
    descriptionMm: burmeseText.keyPoint6Desc,
    color: 'bg-rose-50 text-rose-600',
  },
];

// Payment steps
const paymentSteps = [
  {
    step: '01',
    title: 'Referee Starts Work',
    titleMm: burmeseText.step1Title,
    description: 'Your referral starts and completes probation period',
    descriptionMm: burmeseText.step1Desc,
    icon: Building2,
  },
  {
    step: '02',
    title: 'Reward Calculated',
    titleMm: burmeseText.step2Title,
    description: '80% for you, 20% for platform operations',
    descriptionMm: burmeseText.step2Desc,
    icon: CreditCard,
  },
  {
    step: '03',
    title: 'Paid to KPay',
    titleMm: burmeseText.step3Title,
    description: 'Transferred to your payment account within 30-60 days',
    descriptionMm: burmeseText.step3Desc,
    icon: Wallet,
  },
];

export default function PayoutsPage() {
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
              <Link href="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </Link>
              <Link href="/payouts" className="text-sm font-medium text-teal-600">
                Payouts
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
              <Link href="/how-it-works" className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                How It Works
              </Link>
              <Link href="/payouts" className="block py-2.5 px-3 text-teal-600 bg-teal-50 rounded-lg">
                Payouts
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
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* License Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Licensed by Ministry of Labor, Myanmar
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-[1.1] tracking-tight">
              Guaranteed & Fast Payouts
            </h1>
            <p className="text-2xl text-teal-100 font-medium mb-4">
              via KPay
            </p>
            <p className="text-lg text-teal-200 font-medium burmese-text mb-6">
              {burmeseText.pageTitle}
            </p>

            {/* Intro */}
            <p className="text-teal-100 leading-relaxed max-w-2xl mx-auto">
              ReferTRM ensures secure, transparent payouts – operated by{' '}
              <strong className="text-white">Talent Solutions Myanmar Co.,Ltd</strong>.
            </p>
            <p className="text-teal-200/80 leading-relaxed max-w-2xl mx-auto mt-2 burmese-text">
              {burmeseText.introText}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold">15M+</div>
                <div className="text-teal-200 text-sm">MMK Paid</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-teal-200 text-sm">Payout Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold">80%</div>
                <div className="text-teal-200 text-sm">To You</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          KEY POINTS GRID
          ============================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Trust ReferTRM Payouts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent, reliable, and fast – every time
            </p>
          </div>

          {/* Key Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyPoints.map((point, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full
                              hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5
                              transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${point.color} flex items-center justify-center mb-5`}>
                    <point.icon className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-teal-600 text-sm mb-2 burmese-text">
                    {point.titleMm}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">{point.description}</p>
                  <p className="text-gray-400 text-xs mt-1 burmese-text">{point.descriptionMm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          HOW PAYMENT WORKS
          ============================================ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {burmeseText.howItWorksTitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, transparent payment process
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector */}
                {index < paymentSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-teal-200 to-transparent -translate-y-1/2 z-0" />
                )}
                
                <div className="relative bg-white rounded-2xl p-8 border border-gray-100 text-center
                              hover:shadow-lg transition-all duration-300">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600 font-bold mb-4">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-teal-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-teal-600 text-sm mb-2 burmese-text">
                    {step.titleMm}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  <p className="text-gray-400 text-xs mt-1 burmese-text">{step.descriptionMm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PAYMENT METHODS
          ============================================ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {burmeseText.supportedPayments}
            </h2>
            <p className="text-gray-600">{burmeseText.paymentMethods}</p>
          </div>

          {/* Payment Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <img src="/payment-kbz.png" alt="KBZ Pay" className="h-12 w-auto mb-2" />
              <span className="text-xs text-gray-500">KBZ Pay</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/payment-cb.jpg" alt="CB Pay" className="h-12 w-auto mb-2" />
              <span className="text-xs text-gray-500">CB Pay</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/payment-aya.png" alt="AYA Pay" className="h-12 w-auto mb-2" />
              <span className="text-xs text-gray-500">AYA Pay</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/payment-mmqr.png" alt="MMQR" className="h-12 w-auto mb-2" />
              <span className="text-xs text-gray-500">MMQR</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
              {burmeseText.instantTransfer}
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
              {burmeseText.noHiddenFees}
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
              {burmeseText.securePayment}
            </span>
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
                <li><Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/payouts" className="text-sm text-gray-400 hover:text-white transition-colors">Payouts</Link></li>
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
