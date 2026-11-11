/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Commercial Pricing & Licensing Engine
 * Multi-currency support across B2C, B2B Institutions, and B2G Government contracts.
 */

import React, { useState } from 'react';

interface PricingTiersViewProps {
  onSelectPlan: (planName: string) => void;
  onNavigate?: (view: string) => void;
}

type CurrencyCode = 'USD' | 'ZAR' | 'KES' | 'NGN' | 'EUR' | 'GBP';

export const PricingTiersView: React.FC<PricingTiersViewProps> = ({ onSelectPlan, onNavigate }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Rates relative to USD base
  const priceMultipliers: Record<CurrencyCode, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    ZAR: { symbol: 'R', rate: 18.5 },
    KES: { symbol: 'KSh ', rate: 130 },
    NGN: { symbol: '₦', rate: 1550 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
  };

  const formatPrice = (usdBase: number) => {
    if (usdBase === 0) return 'Free';
    const { symbol, rate } = priceMultipliers[currency];
    const val = Math.round(usdBase * rate);
    return `${symbol}${val.toLocaleString()}`;
  };

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block mb-2">
          Enterprise Licensing & Commercial Models
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Flexible Deployment for Learners, Universities & Governments
        </h1>
        <p className="text-sm text-slate-400 mt-3 leading-relaxed">
          Transparent multi-currency pricing designed for African institutions and international workforce development agencies.
        </p>

        {/* Currency Switcher */}
        <div className="flex items-center justify-center gap-2 mt-6 p-1.5 bg-slate-900 rounded-xl inline-flex">
          {(['USD', 'ZAR', 'KES', 'NGN', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors font-mono ${
                currency === c
                  ? 'bg-teal-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* TIER 1: B2C INDIVIDUAL */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                B2C Individual
              </span>
              <span className="text-xs text-slate-500 font-mono">Personal License</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Professional Career Pass
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              For university students, graduates, and professionals seeking scientific career validation and roadmaps.
            </p>

            <div className="mb-6 pb-6">
              <div className="text-3xl font-extrabold text-teal-400 font-mono tracking-tight mb-1">
                FREE
              </div>
              <span className="text-xs text-slate-400">100% Free Lifetime Access · No payment or credit card required</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Full Five-Factor (Big Five) Personality Battery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Holland RIASEC Vocational Profile & 3-letter code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Timed GCAT Cognitive Aptitude Battery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Top 10 High-Congruence African & Global Careers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Downloadable Executive Assessment PDF Report</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Interactive Personal Career Development Roadmap</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('B2C Individual Career Pass')}
            className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors text-center shadow-md"
          >
            Start Personal Assessment
          </button>
        </div>

        {/* TIER 2: B2B INSTITUTIONAL */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider rounded-full">
            Most Popular for Universities
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                B2B Enterprise
              </span>
              <span className="text-xs text-slate-500 font-mono">Academic & Corporate</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Institutional Talent Console
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              For universities, colleges, corporate HR departments, and recruitment agencies managing large cohorts.
            </p>

            <div className="mb-6 pb-6">
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {formatPrice(3500)}
              </div>
              <span className="text-xs text-slate-500">Per annum · Includes up to 1,000 candidates</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Everything in Individual Career Pass</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Institutional Analytics & Cohort Benchmarking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Faculty & Department Skills-Gap Deficit Heatmaps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Bulk Assessment Dispatch & Custom Cut-off Rules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Minimum group-size privacy threshold (POPIA/NDPA)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>REST API & LMS (Moodle/Canvas) Integration Access</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('institutional_payment');
              } else {
                onSelectPlan('B2B Institutional Talent Console');
              }
            }}
            className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors text-center shadow-md"
          >
            Deploy Institutional License
          </button>
        </div>

        {/* TIER 3: B2G PUBLIC SECTOR */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                B2G Public Sector
              </span>
              <span className="text-xs text-slate-500 font-mono">Government & NGOs</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              National Workforce Intelligence
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              For Ministries of Labour, Ministries of Education, national youth funds, and international development agencies.
            </p>

            <div className="mb-6 pb-6">
              <div className="text-2xl font-bold text-white font-mono">
                Custom Government Contract
              </div>
              <span className="text-xs text-slate-500">National or provincial deployment scale</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>National Skills Intelligence & Geographic Mapping</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Youth Career Aspiration vs Labor Demand Modeling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Provincial & District TVET Retooling Advisories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>On-premise or Sovereign Cloud Multi-Tenant Hosting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Dedicated Psychometrician & Data Science Support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('government_consultation');
              } else {
                onSelectPlan('B2G National Workforce Intelligence');
              }
            }}
            className="w-full py-3 px-4 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-lg transition-colors text-center"
          >
            Request Government Consultation
          </button>
        </div>
      </div>

      {/* Payment Provider & Data Sovereignty Row */}
      <div className="pt-8 text-center text-xs text-slate-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-medium">
          <span>Supported Integrations:</span>
          <span>M-Pesa</span>
          <span aria-hidden="true">·</span>
          <span>Paystack</span>
          <span aria-hidden="true">·</span>
          <span>Flutterwave</span>
          <span aria-hidden="true">·</span>
          <span>Ozow / EFT</span>
          <span aria-hidden="true">·</span>
          <span>Stripe</span>
        </div>
        <p>
          All commercial transactions comply with local banking regulations and PCI-DSS Level 1 standards.
        </p>
      </div>
    </div>
  );
};
