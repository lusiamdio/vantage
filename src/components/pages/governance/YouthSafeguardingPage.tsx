/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Youth & Minor Safeguarding Policy Page
 * Full dedicated webpage on child data protection, ethical testing for learners, and institutional safeguards.
 */

import React from 'react';

interface YouthSafeguardingPageProps {
  onNavigate: (view: string) => void;
}

export const YouthSafeguardingPage: React.FC<YouthSafeguardingPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">
          Home
        </button>
        <span aria-hidden="true">/</span>
        <span>Governance & Standards</span>
        <span aria-hidden="true">/</span>
        <span className="text-teal-400 font-medium">Youth & Minor Safeguarding Policy</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
          <span>Child Protection & Ethical Testing</span>
          <span aria-hidden="true">·</span>
          <span>Learners Aged 15–18</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Youth & Minor Safeguarding Policy
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Secondary school learners exploring career directions require enhanced privacy, developmental framing, and psychological safeguards. Vantage enforces strict child protection measures ensuring testing remains an empowering, exploratory milestone rather than an exclusionary barrier.
        </p>
      </div>

      {/* Four Core Youth Safeguards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
          <span className="text-xs font-mono text-teal-400 font-bold block">SAFEGUARD 01</span>
          <h2 className="text-xl font-bold text-white">Parental & School Guardian Consent</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            For learners under 18 enrolled in secondary schools or junior colleges, Vantage mandates institutional enrollment via verified school authorities or affirmative digital parental/guardian consent. School counselors and mentors must be designated as responsible stewards before bulk assessment dispatch.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
          <span className="text-xs font-mono text-teal-400 font-bold block">SAFEGUARD 02</span>
          <h2 className="text-xl font-bold text-white">Minimum Aggregation Threshold (N ≥ 15)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To prevent re-identification of young individuals in small classes or specialized rural TVET cohorts, institutional and government dashboards strictly suppress any reporting cell where fewer than 15 learners are represented. Individual scores are strictly confidential to the learner and designated counselor.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
          <span className="text-xs font-mono text-teal-400 font-bold block">SAFEGUARD 03</span>
          <h2 className="text-xl font-bold text-white">Prohibition of High-Stakes Academic Streaming</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Vantage psychometric scores must NEVER be used by school administrations to deny learners admission into academic subjects or vocational tracks. Our results represent personal developmental guidance to broaden horizon awareness, never deterministic ceilings.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
          <span className="text-xs font-mono text-teal-400 font-bold block">SAFEGUARD 04</span>
          <h2 className="text-xl font-bold text-white">Zero Commercial Targeting or Advertising</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The Vantage platform is 100% free of advertising, third-party trackers, commercial sponsored placements, and student behavioral monetization. Learner profiles are hermetically sealed from advertising networks and recruitment commercial bidding.
          </p>
        </div>
      </div>

      {/* Psychological Safety in Question Design */}
      <div className="bg-slate-900 p-8 sm:p-10 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-white">Psychological Safety in Cognitive & Behavioral Testing</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Testing anxiety can distort results and harm learner self-efficacy. Our assessment runner incorporates evidence-based psychological comfort features:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
            <strong className="text-white block">No Negative Marking</strong>
            <p className="text-slate-400">GCAT cognitive items measure problem-solving speed and accuracy without penalizing exploratory deduction or calculated estimation.</p>
          </div>

          <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
            <strong className="text-white block">Strengths-Based Reporting</strong>
            <p className="text-slate-400">Reports emphasize vocational archetypes, emerging talent clusters, and growth pathways rather than low percentiles or deficit language.</p>
          </div>

          <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
            <strong className="text-white block">Pause & Resume Protocols</strong>
            <p className="text-slate-400">Learners facing bandwidth interruptions or cognitive fatigue can pause and resume batteries without loss of progress or scoring penalty.</p>
          </div>
        </div>
      </div>

      {/* Counselor Integration Protocol */}
      <div className="bg-slate-900 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            School & University Counselor Portal
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Educators and guidance counselors can access specialized training modules on interpreting psychometric reports and conducting constructive one-on-one student career advisory sessions.
          </p>
        </div>

        <button
          onClick={() => onNavigate('institutional')}
          className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          Institutional Console →
        </button>
      </div>
    </div>
  );
};
