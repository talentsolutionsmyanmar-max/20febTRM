'use client';

import Link from 'next/link';
import { 
  Users, Globe, Wallet, Check, Shield, Clock, Award,
  ChevronRight, ArrowRight, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// ============================================
// DESIGN SYSTEM CONSTANTS
// ============================================

const burmeseText = {
  pageTitle: 'ReferTRM မည်သို့ လုပ်ဆောင်သည် - စတင်အချိန်းအသာ ၃ ခု',
  introText: 'ReferTRM သည် Talent Solutions Myanmar Co.,Ltd မှ လည်ပတ်ပြီး အလုပ်သမားဝန်ကြီးဌာနမှ လိုင်စင်ရရှိထားသော ပလက်ဖောင်းဖြစ်ပြီး ရည်ညွှန်းခန့်ချုပ်မှုလုပ်ငန်းကို ရိုးရှင်းလွယ်ကူပြီး ဆုလာဘ်ရရှိနိုင်စေရန် ပြုလုပ်ပေးသည်။',
  step1Title: 'အကောင့် ဖန်တီးပါ',
  step1Desc: 'အခမဲ့ မှတ်ပုံတင်ပြီး သင့်ကိုယ်ပိုင် ရည်ညွှန်းကုဒ် ချက်ချင်းရပါမည်။ အခကြေးမလိုပါ။',
  step2Title: 'အခွင့်အလမ်းများ မျှဝေပါ',
  step2Desc: 'အတည်ပြုထားသော အလုပ်ခေါ်မှုများကို ကြည့်ရှုပြီး သင့်အသိုင်းအဝိုင်းရှိ အရည်အသွေးရှိသူများနှင့် မျှဝေပါ။',
  step3Title: 'ဆုလာဘ် ရယူပါ',
  step3Desc: 'သင့်ရည်ညွှန်းသူ အလုပ်ရပြီး စမ်းသပ်ကာလ ကျော်လွန်ပါက KPay မှတစ်ဆင့် ရက် ၃၀-၆၀ အတွင်း ကျပ် ၅,၀၀,၀၀၀ အထိ ရရှိနိုင်ပါသည်။ သင့်အား ၈၀% ရရှိမည်။',
  faqTitle: 'မေးမြန်းလေ့ရှိသော မေးခွန်းများ',
  faq1Q: 'အခမဲ့ ဧကန်လား?',
  faq1A: 'ဟုတ်ကဲ့၊ အကောင့်ဖွင့်ခြင်း၊ အလုပ်ကြော်ငြာများကို ကြည့်ရှုခြင်းနှင့် ရည်ညွှန်းတင်သွင်းခြင်းအားလုံးအတွက် အခကြေးမကျသင့်ပါ။',
  faq2Q: 'ပေးချေမှု မည်မျှ မြန်မြန်လဲ?',
  faq2A: 'ရည်ညွှန်းသူ အလုပ်စတင်ပြီး စမ်းသပ်ကာလ (ပုံမှန်အားဖြင့် ၃ လ) ကျော်လွန်ပါက ၃၀-၆၀ ရက်အတွင်း KPay မှတစ်ဆင့် ပေးချေပေးပါသည်။',
  faq3Q: 'ငါ ဘယ်နှများ ရမလဲ?',
  faq3A: 'သင့်ရည်ညွှန်းကုဒ်ဖြင့် တင်သွင်းသူအားလုံးကို သင့်အကောင့်တွင် ကြည့်ရှုနိုင်ပါသည်။ အလုပ်ရှာသူ၏ တိုးတက်မှုအဆင့်ဆင့်ကိုလည်း တွေ့မြင်နိုင်ပါသည်။',
  ctaTitle: 'စတင်ရည်ညွှန်းရန် အဆင်သင့်ဖြစ်ပြီလား?',
  ctaSubtitle: 'ယနေ့ပင် အခမဲ့အကောင့် ဖန်တီးပြီး သင့်ကိုယ်ပိုင် ရည်ညွှန်းကုဒ် ရယူပါ။',
  ctaButton: 'အခမဲ့ အကောင့် ဖန်တီးပါ',
};

// Steps data with full details
const steps = [
  {
    number: '01',
    title: 'Create Account',
    titleMm: burmeseText.step1Title,
    description: 'Sign up free and receive your unique referral code instantly. No fees, no commitments.',
    descriptionMm: burmeseText.step1Desc,
    icon: Users,
    details: [
      'Quick registration with email or phone',
      'Instant referral code generation',
      'Access to all job listings immediately',
      'No credit card or payment required',
    ],
  },
  {
    number: '02',
    title: 'Share Opportunities',
    titleMm: burmeseText.step2Title,
    description: 'Browse verified job openings and share with qualified candidates in your network.',
    descriptionMm: burmeseText.step2Desc,
    icon: Globe,
    details: [
      'Browse high-reward verified positions',
      'Share jobs via link, social media, or direct message',
      'Your referral code is automatically tracked',
      'Refer multiple candidates to multiple jobs',
    ],
  },
  {
    number: '03',
    title: 'Earn Rewards',
    titleMm: burmeseText.step3Title,
    description: 'When your referral is hired and passes probation, receive up to 500,000 MMK via KPay in 30-60 days. You keep 80%.',
    descriptionMm: burmeseText.step3Desc,
    icon: Wallet,
    details: [
      'Track every referral in your dashboard',
      'Real-time status updates (Applied → Interview → Hired)',
      '80% of reward goes directly to you',
      'Fast KPay transfer within 30-60 days after probation',
    ],
  },
];

// FAQ data
const faqs = [
  {
    question: 'Is it really free?',
    questionMm: burmeseText.faq1Q,
    answer: 'Yes, creating an account, browsing job listings, and submitting referrals are all completely free. There are no hidden fees or subscription costs.',
    answerMm: burmeseText.faq1A,
  },
  {
    question: 'How fast is payment?',
    questionMm: burmeseText.faq2Q,
    answer: 'Once your referral starts work and completes probation (typically 3 months), payment is processed within 30-60 days via KPay transfer.',
    answerMm: burmeseText.faq2A,
  },
  {
    question: 'Can I track my referrals?',
    questionMm: burmeseText.faq3Q,
    answer: 'All candidates submitted with your referral code are visible in your account. You can track their progress through each stage of the hiring process.',
    answerMm: burmeseText.faq3A,
  },
];

export default function HowItWorksPage() {
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
          HERO SECTION
          ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-white">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* License Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 rounded-full mb-8 shadow-lg shadow-teal-600/20">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Licensed by Ministry of Labor, Myanmar
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
              How ReferTRM Works
            </h1>
            <p className="text-2xl md:text-3xl text-teal-600 font-medium mb-6">
              3 Simple Steps to Earn
            </p>
            <p className="text-lg text-teal-700 font-medium burmese-text mb-6">
              {burmeseText.pageTitle}
            </p>

            {/* Intro */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              ReferTRM, operated by <strong>Talent Solutions Myanmar Co.,Ltd</strong> – licensed by Ministry of Labor, Myanmar – makes referral hiring simple and rewarding.
            </p>
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto mt-3 burmese-text">
              {burmeseText.introText}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          STEPS TIMELINE
          ============================================ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 top-32 w-0.5 h-24 bg-gradient-to-b from-teal-200 to-teal-100 -translate-x-1/2" />
                )}
                
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className={`bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-900/5
                                  hover:shadow-2xl hover:border-teal-100 transition-all duration-300`}>
                      {/* Step Number */}
                      <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                        <span className="text-5xl md:text-6xl font-bold text-teal-100">
                          {step.number}
                        </span>
                        <div className={`w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center`}>
                          <step.icon className="h-8 w-8 text-teal-600" />
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h2>
                      <p className="text-teal-600 font-medium mb-4 burmese-text">
                        {step.titleMm}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-lg leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <p className="text-gray-500 leading-relaxed burmese-text">
                        {step.descriptionMm}
                      </p>

                      {/* Details List */}
                      <ul className="mt-6 space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600">
                            <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 text-teal-600" />
                            </div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 flex justify-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-teal-100 to-teal-50 
                                  flex items-center justify-center shadow-xl shadow-teal-900/10">
                      <step.icon className="h-20 w-20 md:h-28 md:w-28 text-teal-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
          ============================================ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-teal-600 font-medium burmese-text">
              {burmeseText.faqTitle}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100
                                        hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-teal-600 text-sm mb-3 burmese-text">
                  {faq.questionMm}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
                <p className="text-gray-500 text-sm mt-2 burmese-text">
                  {faq.answerMm}
                </p>
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
            Ready to Start Referring?
          </h2>
          <p className="text-teal-100 text-lg mb-2">
            {burmeseText.ctaTitle}
          </p>
          <p className="text-teal-200 mb-8 burmese-text">
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
            <Link href="/dashboard/jobs">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-12">
                Browse Jobs
              </Button>
            </Link>
          </div>

          <p className="text-teal-200/70 text-sm mt-8">
            Free forever • No credit card required • Start earning today
          </p>
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
                <li><Link href="/dashboard/jobs" className="text-sm text-gray-400 hover:text-white transition-colors">Find Jobs</Link></li>
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
