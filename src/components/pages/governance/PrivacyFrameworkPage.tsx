/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage POPIA, NDPA & GDPR Privacy Framework Page
 * Full dedicated webpage on statutory privacy, data sovereignty, and candidate protections.
 */

import React from 'react';

interface PrivacyFrameworkPageProps {
  onNavigate: (view: string) => void;
}

export const PrivacyFrameworkPage: React.FC<PrivacyFrameworkPageProps> = ({ onNavigate }) => {
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
        <span className="text-teal-400 font-medium">POPIA, NDPA & GDPR Privacy Framework</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
          <span>Enterprise Data Sovereignty</span>
          <span aria-hidden="true">·</span>
          <span>Pan-African Statutory Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          POPIA, NDPA & GDPR Data Privacy Framework
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Psychometric assessment records represent special personal data revealing cognitive capacity, behavioral traits, and professional aspirations. Vantage is engineered from the database level up to comply with South Africa’s POPIA, Nigeria’s NDPA 2023, Kenya’s Data Protection Act, and Europe’s GDPR.
        </p>
      </div>

      {/* Statutory Law Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* POPIA (South Africa) */}
        <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-teal-400 font-bold">SOUTH AFRICA</span>
            <span className="text-xs text-slate-500 font-mono">Act No. 4 of 2013</span>
          </div>
          <h2 className="text-xl font-bold text-white">Protection of Personal Information Act (POPIA)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            POPIA classifies psychometric and psychological test outcomes under strict processing conditions. Vantage complies across all 8 Information Protection Principles:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span><strong>Explicit Candidate Consent:</strong> Section 11 mandate for prior affirmative consent before assessment generation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span><strong>Purpose Specification:</strong> Data collected solely for career guidance, developmental roadmap formulation, or authorised institutional recruitment.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span><strong>Right to Correction & Deletion:</strong> Section 24 right for candidates to request permanent cryptographic erasure of their assessment records.</span>
            </li>
          </ul>
        </div>

        {/* NDPA (Nigeria) */}
        <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 font-bold">NIGERIA</span>
            <span className="text-xs text-slate-500 font-mono">NDPA 2023 / NDPC Regulated</span>
          </div>
          <h2 className="text-xl font-bold text-white">Nigeria Data Protection Act (NDPA 2023)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The NDPA establishes statutory protections for Nigerian citizens’ personal data. Vantage enforces full compliance with the Nigeria Data Protection Commission (NDPC):
          </p>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">✓</span>
              <span><strong>Data Minimization:</strong> Only gathering psychometric responses and demographic data directly necessary to generate career insights.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">✓</span>
              <span><strong>Data Protection Impact Assessments (DPIA):</strong> Bi-annual algorithmic risk evaluations on recruitment cohort analytics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">✓</span>
              <span><strong>Cross-Border Transfer Safeguards:</strong> Section 41 adequacy protections preventing unauthorized server storage outside approved jurisdictions.</span>
            </li>
          </ul>
        </div>

        {/* Kenya DPA */}
        <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 font-bold">KENYA</span>
            <span className="text-xs text-slate-500 font-mono">DPA 2019 / ODPC</span>
          </div>
          <h2 className="text-xl font-bold text-white">Kenya Data Protection Act (2019)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Under the Office of the Data Protection Commissioner (ODPC) of Kenya, Vantage adheres to strict localization and candidate dignity safeguards:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>National TVET & Public University Safeguards:</strong> Aggregation and anonymization of public sector labor surveys.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Right to Object to Automated Profiling:</strong> Section 35 granting candidates the right not to be subject to a purely automated career determination.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Secure Data Retention:</strong> Enforcing strict 24-month inactive candidate data retirement policies unless explicit renewal is requested.</span>
            </li>
          </ul>
        </div>

        {/* EU GDPR */}
        <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-purple-400 font-bold">INTERNATIONAL</span>
            <span className="text-xs text-slate-500 font-mono">EU Regulation 2016/679</span>
          </div>
          <h2 className="text-xl font-bold text-white">General Data Protection Regulation (GDPR)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            For international candidates, diaspora applicants, and multinational employers operating in Africa:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">✓</span>
              <span><strong>Article 22 (Automated Decision-Making):</strong> Full right to human review and explanation for any AI-recommended hiring shortlist.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">✓</span>
              <span><strong>Article 17 (Right to be Forgotten):</strong> Instant, programmatic cryptographic erasure of all assessment telemetry upon user request.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">✓</span>
              <span><strong>Article 20 (Data Portability):</strong> Export your complete psychometric dossier in machine-readable JSON or standard PDF format at any time.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Security Architecture Box */}
      <div className="bg-slate-900 p-8 sm:p-10 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-white">Cryptographic & Data Security Architecture</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
          <div className="p-4 bg-slate-950/70 rounded-xl space-y-2">
            <span className="text-teal-400 font-mono font-bold block">ENCRYPTION AT REST</span>
            <strong className="text-white block">AES-256 GCM</strong>
            <p className="text-slate-400">All candidate identifiers and raw test responses are encrypted using envelope keys rotated automatically.</p>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl space-y-2">
            <span className="text-teal-400 font-mono font-bold block">TRANSIT SECURITY</span>
            <strong className="text-white block">TLS 1.3 Strict</strong>
            <p className="text-slate-400">HSTS preloaded with perfect forward secrecy across all browser client connections and API endpoints.</p>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl space-y-2">
            <span className="text-teal-400 font-mono font-bold block">ACCESS CONTROL</span>
            <strong className="text-white block">Zero Commercial Selling</strong>
            <p className="text-slate-400">Vantage will NEVER monetize candidate personal data, train external models on candidate identities, or sell data to brokers.</p>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl space-y-2">
            <span className="text-teal-400 font-mono font-bold block">AUDITABILITY</span>
            <strong className="text-white block">Immutable Audit Trails</strong>
            <p className="text-slate-400">Every record access, scoring request, and consent grant is logged in append-only cryptographic audit logs.</p>
          </div>
        </div>
      </div>

      {/* Privacy Officer Contact */}
      <div className="bg-slate-900 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            Exercise Your Statutory Privacy Rights
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Candidates can request data export, audit log inspection, or immediate record purging by contacting our Data Protection Officer at privacy@vantage-talent.org.
          </p>
        </div>

        <button
          onClick={() => onNavigate('gov_youth_safeguarding')}
          className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          View Youth Safeguarding Policy →
        </button>
      </div>
    </div>
  );
};
