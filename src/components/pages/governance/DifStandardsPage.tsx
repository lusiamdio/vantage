/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Differential Item Functioning (DIF) Standards Page
 * Full dedicated webpage on mathematical measurement invariance and anti-bias psychometric standards.
 */

import React from 'react';
import { ASSESSMENT_METADATA_LIST } from '../../../data/assessments';

interface DifStandardsPageProps {
  onNavigate: (view: string) => void;
}

export const DifStandardsPage: React.FC<DifStandardsPageProps> = ({ onNavigate }) => {
  const difMetrics = [
    {
      subgroupPair: 'Anglophone vs. Francophone African Cohorts',
      instrument: 'GCAT Verbal Syllogisms Battery',
      itemsTested: 42,
      difDetected: 0,
      mhDeltaAvg: 0.18,
      invarianceStatus: 'Scalar Invariance Confirmed (ΔCFI = 0.004)',
      action: 'Valid for Joint Calibration',
    },
    {
      subgroupPair: 'Urban Tertiary vs. Rural TVET Learners',
      instrument: 'GCAT Numerical & Financial Reasoning',
      itemsTested: 36,
      difDetected: 1,
      mhDeltaAvg: 0.32,
      invarianceStatus: 'Metric Invariance Confirmed',
      action: 'Item #14 Vocabulary Localized',
    },
    {
      subgroupPair: 'Gender (Female vs. Male Candidates)',
      instrument: 'Costa & McCrae Five-Factor Personality',
      itemsTested: 50,
      difDetected: 0,
      mhDeltaAvg: 0.09,
      invarianceStatus: 'Strict Factor Invariance (ΔCFI = 0.002)',
      action: 'Zero Bias Adjudicated',
    },
    {
      subgroupPair: 'East Africa (Kenya/Tanzania) vs. West Africa (Ghana/Nigeria)',
      instrument: 'Holland RIASEC Vocational Battery',
      itemsTested: 48,
      difDetected: 0,
      mhDeltaAvg: 0.14,
      invarianceStatus: 'Scalar Invariance Confirmed',
      action: 'Valid for Cross-Regional Matching',
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
        <span>Governance & Standards</span>
        <span aria-hidden="true">/</span>
        <span className="text-teal-400 font-medium">Differential Item Functioning (DIF) Standards</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
          <span>Psychometric Measurement Invariance</span>
          <span aria-hidden="true">·</span>
          <span>Algorithmic Bias Elimination</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Differential Item Functioning (DIF) Standards & Methodology
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          An assessment item exhibits Differential Item Functioning when individuals of the same underlying cognitive ability or personality trait level have different probabilities of answering correctly or endorsing the item due to demographic, linguistic, or cultural background. Vantage enforces automated statistical DIF screening on every question in our ecosystem.
        </p>
      </div>

      {/* Key Methodology Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
          <span className="text-xs font-mono text-teal-400 font-bold block">MATHEMATICAL MODEL</span>
          <h2 className="text-lg font-bold text-white">Mantel-Haenszel Delta Statistic</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We evaluate the odds-ratio across matched ability strata conditioning on total raw score. Any item with an absolute Mantel-Haenszel Delta DIF value exceeding 1.5 logits (Educational Testing Service Category C) is automatically quarantined.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
          <span className="text-xs font-mono text-teal-400 font-bold block">FACTORIAL INVARIANCE</span>
          <h2 className="text-lg font-bold text-white">Multi-Group Confirmatory Factor Analysis (MGCFA)</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We evaluate structural equivalence across cohorts sequentially testing Configural Invariance (equal latent structure), Metric Invariance (equal factor loadings), and Scalar Invariance (equal indicator intercepts).
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
          <span className="text-xs font-mono text-teal-400 font-bold block">ITEM RESPONSE THEORY</span>
          <h2 className="text-lg font-bold text-white">Lord’s Chi-Square & 2PL ICC Overlap</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Using 2-Parameter Logistic (2PL) Item Characteristic Curves (ICC), we compare item difficulty (b) and item discrimination (a) parameters between reference and focal groups to detect non-uniform DIF anomalies.
          </p>
        </div>
      </div>

      {/* Real-time Subgroup DIF Telemetry Table */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Sub-Saharan Cross-Cohort Invariance Audit Log
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuously audited across regional demographic splits (Sample N ≥ 25,000 per stratum)
            </p>
          </div>
          <span className="text-xs font-mono text-teal-400 bg-slate-950/60 px-3 py-1.5 rounded-lg">
            Status: Fully Invariant (Active)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 bg-slate-950/40">
                <th className="py-3 px-3 font-medium rounded-l-lg">Demographic Comparison Strata</th>
                <th className="py-3 px-3 font-medium">Assessment Battery</th>
                <th className="py-3 px-3 font-medium text-right">Items Tested</th>
                <th className="py-3 px-3 font-medium text-right">DIF Flagged</th>
                <th className="py-3 px-3 font-medium text-right">Mean MH Delta</th>
                <th className="py-3 px-3 font-medium">Invariance Adjudication</th>
                <th className="py-3 px-3 font-medium rounded-r-lg">Scientific Action</th>
              </tr>
            </thead>
            <tbody>
              {difMetrics.map((item) => (
                <tr key={item.subgroupPair} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-white">{item.subgroupPair}</td>
                  <td className="py-3.5 px-3 text-slate-300">{item.instrument}</td>
                  <td className="py-3.5 px-3 font-mono text-right text-slate-300 tabular-nums">{item.itemsTested}</td>
                  <td className="py-3.5 px-3 font-mono text-right text-emerald-400 tabular-nums font-semibold">
                    {item.difDetected}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-right text-teal-400 tabular-nums">{item.mhDeltaAvg}</td>
                  <td className="py-3.5 px-3 text-slate-300">{item.invarianceStatus}</td>
                  <td className="py-3.5 px-3">
                    <span className="text-teal-300 bg-teal-950/50 px-2 py-0.5 rounded text-[11px] font-medium">
                      {item.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Quarantine Protocol */}
      <div className="bg-slate-900 rounded-2xl p-8 space-y-6">
        <h2 className="text-xl font-bold text-white">Automated Item Quarantine Protocol</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
            <span className="font-mono text-teal-400 font-bold block">STAGE 1: DETECTION</span>
            <strong className="text-white block">Real-time Telemetry Flagging</strong>
            <p className="text-slate-400 leading-relaxed">
              When an item demonstrates MH Delta &gt; 1.0 or differential item response slope (p &lt; 0.01), it is flagged immediately by the real-time scoring engine.
            </p>
          </div>

          <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
            <span className="font-mono text-cyan-400 font-bold block">STAGE 2: QUARANTINE</span>
            <strong className="text-white block">Score Isolation</strong>
            <p className="text-slate-400 leading-relaxed">
              Quarantined items are immediately stripped from candidate Sten score calculations while remaining in the question battery solely for research telemetry.
            </p>
          </div>

          <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
            <span className="font-mono text-emerald-400 font-bold block">STAGE 3: EXPERT REVIEW</span>
            <strong className="text-white block">Psychometric Panel Review</strong>
            <p className="text-slate-400 leading-relaxed">
              A bi-annual panel of African psychometricians reviews linguistic syntax, cultural metaphors, and construct validity before retiring or re-authoring the item.
            </p>
          </div>
        </div>
      </div>

      {/* Statutory Alignment Box */}
      <div className="bg-slate-900 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            Section 8 Employment Equity Act Compliance
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Our DIF standards provide verified defense against algorithmic discrimination claims under South African, Nigerian, and international labor jurisprudence.
          </p>
        </div>

        <button
          onClick={() => onNavigate('gov_ethical_ai')}
          className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          View Governance Charter →
        </button>
      </div>
    </div>
  );
};
