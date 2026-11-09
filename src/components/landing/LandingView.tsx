/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Enterprise Psychometric Career Intelligence Platform
 * Borderless, Corner-to-Corner Sales Landing Page.
 * Inspired by modern borderless enterprise interfaces.
 */

import React, { useState } from 'react';
import { UserRole } from '../../types';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { BlogSection } from './BlogSection';
import { LandingFaqSection } from './LandingFaqSection';
import { MicroAssessmentWidget } from './MicroAssessmentWidget';
import heroTalentTelemetryImg from '../../assets/images/blog_african_talent_telemetry_1794155952835.jpg';

interface LandingViewProps {
  onStartAssessment: () => void;
  onExploreCareers: () => void;
  onSelectRole: (role: UserRole, view: string) => void;
  onOpenGovernance: () => void;
  onNavigate?: (view: string) => void;
}

type CurrencyCode = 'USD' | 'ZAR' | 'KES' | 'NGN';

export const LandingView: React.FC<LandingViewProps> = ({
  onStartAssessment,
  onExploreCareers,
  onSelectRole,
  onOpenGovernance,
  onNavigate,
}) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const handleNavigate = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      onSelectRole('individual', view);
    }
  };

  const priceRates: Record<CurrencyCode, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    ZAR: { symbol: 'R', rate: 18.5 },
    KES: { symbol: 'KSh ', rate: 130 },
    NGN: { symbol: '₦', rate: 1550 },
  };

  const formatPrice = (usdBase: number) => {
    if (usdBase === 0) return 'Free';
    const { symbol, rate } = priceRates[currency];
    const val = Math.round(usdBase * rate);
    return `${symbol}${val.toLocaleString()}`;
  };

  const previewRadarData = [
    { trait: 'Openness', score: 8.5 },
    { trait: 'Conscientiousness', score: 9.2 },
    { trait: 'Extraversion', score: 7.4 },
    { trait: 'Agreeableness', score: 7.9 },
    { trait: 'Stability', score: 8.8 },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 text-slate-100 w-full">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO: Minimalist, Borderless, Corner-to-Corner
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 px-6 sm:px-10 lg:px-16 w-full text-center">
        {/* Subtle radial ambient highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/10 blur-[150px] rounded-full"
        />

        <div className="space-y-6 w-full max-w-5xl mx-auto">
          {/* Quiet Trust Kicker */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <span>Enterprise Talent Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span>Sub-Saharan Norm Groups</span>
            <span aria-hidden="true">·</span>
            <span>25-Minute Assessment</span>
          </div>

          {/* Proposition Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
            Understand your potential.{' '}
            <span className="text-teal-400">Discover your direction.</span>{' '}
            Build your future.
          </h1>

          {/* Direct Sales Subheadline */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Stop guessing degrees, hires, and career moves. Vantage delivers scientifically calibrated psychometric evaluation, occupational matching, and workforce analytics in 25 minutes.
          </p>

          {/* Conversion Action Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartAssessment}
              className="px-8 py-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 active:scale-[0.98]"
            >
              Get Assessed Now
            </button>
            <button
              onClick={() => handleNavigate('institutional')}
              className="px-7 py-4 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-850 rounded-xl transition-all active:scale-[0.98]"
            >
              Institutional & Enterprise Demo
            </button>
          </div>

          {/* Social Proof Strip */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span>184,500+ Assessed Candidates</span>
            <span aria-hidden="true">·</span>
            <span>94% Career Placement Congruence</span>
            <span aria-hidden="true">·</span>
            <span>40+ Partner Universities & Employers</span>
          </div>
        </div>

        {/* Hero Visual Showcase Banner (African Talent Telemetry) */}
        <div className="mt-12 w-full rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl bg-slate-900 group text-left">
          <div className="relative w-full h-72 sm:h-96 md:h-[420px] lg:h-[480px] overflow-hidden">
            <img
              src={heroTalentTelemetryImg}
              alt="Vantage Pan-African Talent Telemetry & Labor Intelligence"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="eager"
            />
            {/* Ambient vignette and gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />

            {/* Top Status Indicators */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md text-[11px] font-mono text-teal-300 font-semibold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>LIVE TELEMETRY STREAM</span>
                <span className="text-slate-500 hidden sm:inline">·</span>
                <span className="text-slate-400 hidden sm:inline">Continental Labor Indicators</span>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-300">
                <span>ISCO-08 & Holland Hexagonal Calibration</span>
              </div>
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-[10px] sm:text-xs font-mono text-teal-400 uppercase tracking-widest font-bold block">
                  Pan-African Labor Telemetry & Predictive Psychometrics
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Calibrated for Africa’s Emergent Growth Corridors
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
                  Real-time occupational demand signals across Nairobi, Johannesburg, Lagos, Kigali, and Accra, backed by normative psychometric evaluation.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 rounded-lg bg-teal-400/20 text-teal-300 font-mono text-xs font-bold backdrop-blur-sm">
                  N = 184,500+
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/85 text-white font-mono text-xs font-semibold backdrop-blur-sm">
                  94% Congruence
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Product Window Preview (Corner to Corner) */}
        <div className="mt-8 w-full bg-slate-900/90 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 gap-4 bg-slate-950/40 p-4 rounded-xl">
            <div>
              <span className="text-xs font-mono text-teal-400 block mb-1">CANDIDATE INTELLIGENCE DOSSIER</span>
              <h3 className="text-lg font-bold text-white">Five-Factor & Holland RIASEC Alignment</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3 py-1 bg-slate-900 text-slate-300 rounded-lg">
                Code: IRC (Investigative-Realistic)
              </span>
              <button
                onClick={onStartAssessment}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
              >
                Take live test →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Radar */}
            <div className="md:col-span-5 h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={previewRadarData} outerRadius="75%">
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="trait" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 10]} stroke="#475569" tick={false} />
                  <Radar name="Score" dataKey="score" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Outcomes & Top Fit */}
            <div className="md:col-span-7 space-y-3.5">
              <div className="p-4 bg-slate-950/70 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">TOP MATCHED CAREER</span>
                  <strong className="text-sm sm:text-base font-semibold text-white">Cloud & Distributed Systems Architect</strong>
                </div>
                <span className="text-base sm:text-lg font-bold text-teal-400 font-mono">94% Fit</span>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">AFRICAN LABOR MARKET DEMAND</span>
                  <strong className="text-sm sm:text-base font-semibold text-white">Exponential Growth (Nairobi, Joburg, Lagos)</strong>
                </div>
                <span className="text-xs sm:text-sm text-slate-300 font-mono">$65K - $130K</span>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">COGNITIVE APTITUDE BAND</span>
                  <strong className="text-sm sm:text-base font-semibold text-white">88th Percentile (Superior Analytical Fluidity)</strong>
                </div>
                <span className="text-xs text-teal-400 font-medium">Calibrated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          1B. 60-SECOND TASTE OF VANTAGE (Interactive Micro-Assessment)
      ───────────────────────────────────────────────────────────── */}
      <MicroAssessmentWidget
        onStartFullAssessment={onStartAssessment}
        onExploreCareers={onExploreCareers}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. THE THREE COMMERCIAL PRODUCTS (Corner-to-Corner)
      ───────────────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-16 w-full text-left">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
            Product Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            High-Impact Solutions for Individuals, Institutions & Governments
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Engineered to deliver concrete commercial and developmental return on investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* B2C Product Card */}
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
            <div className="space-y-4">
              <div className="text-xs font-mono text-teal-400 uppercase">For Individuals</div>
              <h3 className="text-xl font-bold text-white">
                Personal Career Intelligence Pass
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Take the validated 25-minute psychometric battery. Get matched to high-demand careers with local salary benchmarks, academic requirements, and a personalized 4-phase milestone roadmap.
              </p>
              <div className="pt-4 space-y-2 text-xs text-slate-400">
                <div>· Holland RIASEC & Big Five Sten scoring</div>
                <div>· Timed GCAT cognitive problem solving</div>
                <div>· Downloadable official PDF executive report</div>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('commercial_b2c')}
              className="mt-8 w-full py-3 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors text-center"
            >
              Start Personal Assessment →
            </button>
          </div>

          {/* B2B Product Card */}
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase">For Universities & HR</div>
              <h3 className="text-xl font-bold text-white">
                Institutional Talent Console
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Assess incoming cohorts and graduate candidate pools at scale. Automatically identify department skill deficits, benchmark employability, and run recruitment campaigns with cut-off scoring.
              </p>
              <div className="pt-4 space-y-2 text-xs text-slate-400">
                <div>· Cohort skills-gap deficit matrix & heatmaps</div>
                <div>· Bulk campaign invitation manager</div>
                <div>· Minimum group-size anonymity safeguards</div>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('commercial_b2b')}
              className="mt-8 w-full py-3 px-4 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors text-center"
            >
              Access Institutional Console →
            </button>
          </div>

          {/* B2G Product Card */}
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
            <div className="space-y-4">
              <div className="text-xs font-mono text-emerald-400 uppercase">For Governments & NGOs</div>
              <h3 className="text-xl font-bold text-white">
                National Workforce Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Empower Ministries of Labour and Education with macro demographic indicators, youth aspiration versus demand modeling, and regional TVET curriculum retooling advisories.
              </p>
              <div className="pt-4 space-y-2 text-xs text-slate-400">
                <div>· Sub-national talent supply/demand mapping</div>
                <div>· Critical labor shortage forecasting</div>
                <div>· Sovereign on-premise cloud infrastructure</div>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('commercial_b2g')}
              className="mt-8 w-full py-3 px-4 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors text-center"
            >
              Explore National Platform →
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HOW IT WORKS: The 3-Step Candidate Journey (Corner-to-Corner)
      ───────────────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-16 w-full text-left">
        <div className="bg-slate-900/60 rounded-2xl p-8 sm:p-12 space-y-8 w-full">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              From Assessment to Career Mastery in Three Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Engineered with Classical Test Theory (CTT) and Item Response Theory (IRT).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2.5 p-4 bg-slate-950/40 rounded-xl">
              <span className="text-xs font-mono text-teal-400 font-bold block">STEP 01</span>
              <h3 className="text-base font-bold text-white">25-Minute Assessment Battery</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Complete our calibrated Big Five personality inventory, Holland RIASEC interest assessment, and timed GCAT cognitive aptitude challenges without testing fatigue.
              </p>
            </div>

            <div className="space-y-2.5 p-4 bg-slate-950/40 rounded-xl">
              <span className="text-xs font-mono text-cyan-400 font-bold block">STEP 02</span>
              <h3 className="text-base font-bold text-white">Multi-Factor Occupational Fit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our matching engine ranks 25+ high-growth occupations using Holland hexagonal congruence, cognitive aptitude bands, and local African salary data.
              </p>
            </div>

            <div className="space-y-2.5 p-4 bg-slate-950/40 rounded-xl">
              <span className="text-xs font-mono text-emerald-400 font-bold block">STEP 03</span>
              <h3 className="text-base font-bold text-white">Actionable Milestones & Report</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Execute your personal 0–3 month, 1-year, and 3-year roadmap with top university hubs, accredited global certs, and a downloadable executive report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BLOGS: 4 Deep-Dive Articles Explaining the Whole Platform
      ───────────────────────────────────────────────────────────── */}
      <BlogSection onNavigate={handleNavigate} />

      {/* ─────────────────────────────────────────────────────────────
          5. TRANSPARENT PRICING: Direct Commercial Conversion (Corner-to-Corner)
      ───────────────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-16 w-full text-center">
        <div className="max-w-xl mx-auto mb-8">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
            Transparent Pricing
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Simple, Transparent Licensing
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Multi-currency pricing tailored to African and international institutions.
          </p>

          {/* Currency Switcher */}
          <div className="flex items-center justify-center gap-1.5 mt-5 p-1 bg-slate-900 rounded-lg inline-flex">
            {(['USD', 'ZAR', 'KES', 'NGN'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 text-xs font-semibold rounded font-mono transition-colors ${
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          {/* Card 1 */}
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-teal-400 uppercase">Individual</span>
                <span className="text-xs text-slate-500 font-mono">Personal</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Career Pass</h3>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums mb-4">
                {formatPrice(29)}
              </div>
              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                <li>✓ Full Five-Factor & RIASEC Battery</li>
                <li>✓ Timed GCAT Cognitive Aptitude</li>
                <li>✓ Top 10 Matched Career Pathways</li>
                <li>✓ Downloadable Official PDF Report</li>
              </ul>
            </div>
            <button
              onClick={() => handleNavigate('commercial_b2c')}
              className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors text-center"
            >
              Start Personal Assessment
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider rounded-full">
              Most Popular
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-teal-400 uppercase">Institutions</span>
                <span className="text-xs text-teal-300 font-mono">Popular</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Campus & HR License</h3>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums mb-4">
                {formatPrice(3500)}
                <span className="text-xs text-slate-400 font-normal"> / year</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                <li>✓ Up to 1,000 Candidate Assessments</li>
                <li>✓ Cohort Skills-Gap Analytics</li>
                <li>✓ Departmental Talent Benchmarking</li>
                <li>✓ Bulk Campaign Dispatch Tools</li>
              </ul>
            </div>
            <button
              onClick={() => handleNavigate('commercial_b2b')}
              className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors text-center"
            >
              Deploy Institutional License
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-emerald-400 uppercase">Public Sector</span>
                <span className="text-xs text-slate-500 font-mono">B2G</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Government Program</h3>
              <div className="text-2xl font-bold text-white font-mono mb-4">
                Custom SLA
              </div>
              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                <li>✓ National Youth Talent Mapping</li>
                <li>✓ Regional Labor Shortage Indicators</li>
                <li>✓ TVET Curriculum Reform Directives</li>
                <li>✓ Dedicated Psychometric Support</li>
              </ul>
            </div>
            <button
              onClick={() => handleNavigate('commercial_b2g')}
              className="w-full py-3 px-4 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors text-center"
            >
              Contact Government Sales
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. FAQ: Privacy, Psychometric Validity & Matching Methodology
      ───────────────────────────────────────────────────────────── */}
      <LandingFaqSection onNavigate={handleNavigate} />

      {/* ─────────────────────────────────────────────────────────────
          6. CLOSING CALL TO ACTION: Corner-to-Corner
      ───────────────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-16 w-full text-center">
        <div className="bg-slate-900 rounded-2xl p-10 sm:p-16 space-y-6 w-full">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Turn uncertainty into verified career clarity.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join 184,500+ assessed learners and professionals. Start your 25-minute psychometric battery today.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartAssessment}
              className="px-8 py-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Start Full Assessment Battery
            </button>
            <button
              onClick={() => handleNavigate('gov_ethical_ai')}
              className="px-6 py-4 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 rounded-xl transition-colors"
            >
              Ethical AI & Compliance Charter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
