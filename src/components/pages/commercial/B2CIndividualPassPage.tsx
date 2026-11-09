/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage B2C Individual Career Pass Commercial Page
 * Full dedicated commercial webpage for individual learners, graduates, and professionals.
 */

import React, { useState } from 'react';

interface B2CIndividualPassPageProps {
  onNavigate: (view: string) => void;
  onStartAssessment: () => void;
}

type CurrencyCode = 'USD' | 'ZAR' | 'KES' | 'NGN' | 'EUR' | 'GBP';

export const B2CIndividualPassPage: React.FC<B2CIndividualPassPageProps> = ({
  onNavigate,
  onStartAssessment,
}) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const priceMultipliers: Record<CurrencyCode, { symbol: string; rate: number; price: number }> = {
    USD: { symbol: '$', rate: 1, price: 29 },
    ZAR: { symbol: 'R', rate: 18.5, price: 535 },
    KES: { symbol: 'KSh ', rate: 130, price: 3770 },
    NGN: { symbol: '₦', rate: 1550, price: 44950 },
    EUR: { symbol: '€', rate: 0.92, price: 27 },
    GBP: { symbol: '£', rate: 0.78, price: 23 },
  };

  const currentPrice = priceMultipliers[currency];

  const faqs = [
    {
      q: 'How long does the assessment take to complete?',
      a: 'The full battery requires approximately 20–25 minutes. It includes personality preferences, career interest choices, and timed cognitive problem-solving scenarios. You can pause and resume at any time.',
    },
    {
      q: 'How are career matches calculated?',
      a: 'Our engine computes multi-attribute congruence matching your Holland 3-letter code and cognitive percentile against over 120 ISCO-08 occupational profiles calibrated specifically to African and international labor market demand.',
    },
    {
      q: 'Will my current employer or university see my results?',
      a: 'No. Individual Career Pass results are 100% private to you. They are never shared with or sold to third-party employers without your explicit prior authorization.',
    },
    {
      q: 'Can I download an official report for job applications or bursaries?',
      a: 'Yes. Upon completion, you receive an official, printable ITC-compliant PDF Executive Report containing your full Sten scores, percentile ranks, and verified psychometric synthesis.',
    },
  ];

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">
          Home
        </button>
        <span aria-hidden="true">/</span>
        <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
          Commercial Models
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-teal-400 font-medium">B2C Individual Career Pass</span>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
            <span>B2C Candidate Pass</span>
            <span aria-hidden="true">·</span>
            <span>One-Time Fee · Lifetime Access</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Professional Psychometric Career Intelligence Pass
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Stop guessing your degree choices, job transitions, and workplace strengths. Gain scientific certainty with a 25-minute validated psychometric assessment calibrated to high-growth African and global economies.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartAssessment}
              className="px-8 py-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 active:scale-[0.98]"
            >
              Get Assessed Now ({currentPrice.symbol}{currentPrice.price.toLocaleString()}) →
            </button>
            <button
              onClick={() => onNavigate('careers')}
              className="px-6 py-4 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-850 rounded-xl transition-all"
            >
              Explore Occupational Database
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
            <span>✓ 25-Min Battery</span>
            <span aria-hidden="true">·</span>
            <span>✓ Instant PDF Report</span>
            <span aria-hidden="true">·</span>
            <span>✓ 100% Private & Confidential</span>
          </div>
        </div>

        {/* Pricing Card with Currency Switcher */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-teal-400 font-bold">Standard Single License</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg">
              {(['USD', 'ZAR', 'KES', 'NGN', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-[11px] font-mono rounded ${
                    currency === c ? 'bg-teal-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-4xl font-extrabold text-white font-mono tabular-nums">
              {currentPrice.symbol}{currentPrice.price.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">One-time payment · No subscription or recurring fees</p>
          </div>

          <div className="space-y-3 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Full Five-Factor (Costa & McCrae) Personality Profile</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Holland RIASEC Vocational Profile & 3-Letter Code</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Timed GCAT General Cognitive Aptitude Battery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Top 10 High-Congruence African & Global Careers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Multi-Currency Compensation Benchmarks (USD, ZAR, KES, NGN)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Official Printable ITC-Compliant PDF Executive Report</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Personalized 4-Phase Career Milestone Development Roadmap</span>
            </div>
          </div>

          <button
            onClick={onStartAssessment}
            className="w-full py-3.5 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors text-center shadow-md"
          >
            Launch Assessment Now
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            Supported Payments: M-Pesa, Paystack, Flutterwave, Ozow, Cards.
          </p>
        </div>
      </div>

      {/* Deliverables Breakdown */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="text-2xl font-bold text-white">What You Receive in Your Dossier</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Scientifically validated psychometric insights translated into practical career direction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-teal-400 font-bold block">PART 01</span>
            <h3 className="text-base font-bold text-white">Five-Factor Personality Profile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardized Sten scores (1-10) across Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability calibrated to Sub-Saharan norms.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-cyan-400 font-bold block">PART 02</span>
            <h3 className="text-base font-bold text-white">Holland RIASEC Vocational Profile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover your primary, secondary, and tertiary interest archetypes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) mapped to occupational environments.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-bold block">PART 03</span>
            <h3 className="text-base font-bold text-white">GCAT Cognitive Percentile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Timed evaluation of numerical problem-solving, verbal deductive logic, and abstract pattern reasoning measuring cognitive learning speed and complexity handling.
            </p>
          </div>
        </div>
      </div>

      {/* Candidate FAQs */}
      <div className="bg-slate-900 p-8 sm:p-10 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="p-5 bg-slate-950/70 rounded-xl space-y-2 text-xs">
              <strong className="text-white text-sm block">{faq.q}</strong>
              <p className="text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
