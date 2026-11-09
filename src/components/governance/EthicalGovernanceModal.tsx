/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Ethical AI & Psychometric Governance Modal
 */

import React from 'react';

interface EthicalGovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicalGovernanceModal: React.FC<EthicalGovernanceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl text-left my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Ethical AI & Psychometric Governance Charter
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Statutory compliance, bias prevention, and algorithmic transparency principles.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-lg p-1"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
          <div className="bg-slate-950/50 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2">
              1. Non-Deterministic Decision Principle
            </h3>
            <p className="text-slate-400">
              In accordance with international psychometric best practices and labor laws (e.g. South Africa’s Employment Equity Act Section 8), psychometric scores and AI career matches must NEVER serve as the sole deterministic basis for hiring, promotion, school admission, or exclusionary decisions. Assessments represent developmental indicators, not medical or clinical evaluations.
            </p>
          </div>

          <div className="bg-slate-950/50 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2">
              2. Algorithmic Invariance & DIF Monitoring
            </h3>
            <p className="text-slate-400">
              Vantage executes automated Differential Item Functioning (DIF) audits to detect and eliminate cultural, linguistic, and gender biases across Pan-African demographics. Any assessment item exhibiting statistically significant differential functioning (Mantel-Haenszel Delta &gt; 1.5) is immediately removed from normative scoring pending expert panel adjudication.
            </p>
          </div>

          <div className="bg-slate-950/50 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2">
              3. Data Sovereignty & Statutory Privacy
            </h3>
            <p className="text-slate-400">
              Psychometric assessment data is treated as special personal information. The platform complies with:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">
              <li><strong>South Africa POPIA:</strong> Explicit candidate consent, purpose specification, and right-to-erasure.</li>
              <li><strong>Nigeria Data Protection Act (NDPA 2023):</strong> Data minimization, encryption at rest, and lawful processing.</li>
              <li><strong>Kenya Data Protection Act (2019):</strong> Data localization adherence and cross-border transfer protections.</li>
              <li><strong>GDPR (EU):</strong> Right to explanation of automated recommendations and transparency.</li>
            </ul>
          </div>

          <div className="bg-slate-950/50 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2">
              4. Minor & Youth Safeguarding
            </h3>
            <p className="text-slate-400">
              For secondary school learners aged 16–18, onboarding workflows require parental/guardian or institutional oversight where required by local statute. Aggregated institutional dashboards strictly enforce a minimum group threshold (N ≥ 15) to prevent re-identification of individual youth responses.
            </p>
          </div>

          <div className="bg-slate-950/50 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2">
              5. Explainable AI (XAI)
            </h3>
            <p className="text-slate-400">
              All AI-generated career insights are strictly traceable to empirical psychometric test evidence and verified occupational classifications (ISCO-08, O*NET). Large Language Models are prohibited from fabricating psychological scores or making unsupported clinical claims.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-6 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors shadow-sm"
          >
            I Acknowledge & Understand
          </button>
        </div>
      </div>
    </div>
  );
};
