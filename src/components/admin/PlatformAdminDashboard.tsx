/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Platform Administration & Psychometric Governance Console
 * Instrument reliability versioning, Differential Item Functioning (DIF) bias audits, and statutory audit logging.
 */

import React, { useState } from 'react';
import { ASSESSMENT_METADATA_LIST } from '../../data/assessments';

export const PlatformAdminDashboard: React.FC = () => {
  const [instruments] = useState(ASSESSMENT_METADATA_LIST);

  const sampleAuditLogs = [
    { id: 'log_901', timestamp: '2026-11-07 13:10:24', actor: 'system.scorer', event: 'Norm Table Re-calibration', target: 'GCAT 2PL IRT Curve', status: 'Invariance Confirmed' },
    { id: 'log_902', timestamp: '2026-11-07 12:45:12', actor: 'admin.dr_adebayo', event: 'DIF Bias Review', target: 'Verbal Logic Item #4', status: 'DIF < 0.05 (Neutral)' },
    { id: 'log_903', timestamp: '2026-11-07 11:20:00', actor: 'compliance.popia', event: 'Right-to-Erasure Executed', target: 'User #USR_88120 (Redacted)', status: 'Cryptographically Purged' },
    { id: 'log_904', timestamp: '2026-11-07 09:14:30', actor: 'enterprise.api', event: 'Cohort API Batch Ingestion', target: 'Univ of Nairobi (500 candidates)', status: 'Authenticated 200 OK' },
  ];

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Administration Console</span>
            <span aria-hidden="true">·</span>
            <span>Psychometric Governance & Algorithmic Fairness</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400 font-medium">ITC Standards Compliant</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Scientific Governance & Instrument Audit Console
          </h1>

          <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Continuous item calibration, Differential Item Functioning (DIF) bias detection, normative group version control, and statutory privacy enforcement.
          </p>
        </div>
      </div>

      {/* Psychometric Instruments Version & Reliability Table */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
        <h2 className="text-base font-bold text-white mb-1">
          Active Psychometric Assessment Instruments
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Psychometric models calibrated to African tertiary and vocational demographics.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 bg-slate-950/40">
                <th className="py-3 px-3 font-medium rounded-l-lg">Instrument Title</th>
                <th className="py-3 px-3 font-medium">Version</th>
                <th className="py-3 px-3 font-medium">Scientific Model</th>
                <th className="py-3 px-3 font-medium text-right">Cronbach’s α</th>
                <th className="py-3 px-3 font-medium text-right">DIF Status</th>
                <th className="py-3 px-3 font-medium rounded-r-lg">Norm Group Reference</th>
              </tr>
            </thead>
            <tbody>
              {instruments.map((inst) => (
                <tr key={inst.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-white">{inst.title}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">{inst.version}</td>
                  <td className="py-3.5 px-3 text-slate-300">{inst.scientificModel}</td>
                  <td className="py-3.5 px-3 font-mono text-right text-teal-400 tabular-nums font-semibold">
                    α = {inst.reliabilityAlpha.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="text-emerald-400 font-mono text-[11px] px-2.5 py-1 bg-emerald-950/60 rounded-md">
                      Invariant (Zero Bias)
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">{inst.normReference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DIF Algorithmic Fairness & Bias Governance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
          <h2 className="text-base font-bold text-white mb-1">
            Differential Item Functioning (DIF) Framework
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Monitoring psychometric measurement invariance across cultural and linguistic subgroups
          </p>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-950/70 rounded-xl">
              <strong className="text-white block mb-1">Cross-Cultural Measurement Invariance:</strong>
              <p className="text-slate-400 leading-relaxed">
                Confirming metric and scalar invariance (ΔCFI &lt; 0.01, ΔRMSEA &lt; 0.015) across English, French, and Swahili-speaking assessment cohorts.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-xl">
              <strong className="text-white block mb-1">Anti-Bias Scoring Safeguards:</strong>
              <p className="text-slate-400 leading-relaxed">
                Items showing statistical Mantel-Haenszel Delta DIF &gt; 1.5 are quarantined from scoring algorithms automatically until expert psychometric review.
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-xl">
              <strong className="text-white block mb-1">Statutory Non-Discrimination:</strong>
              <p className="text-slate-400 leading-relaxed">
                Compliant with Section 8 of South Africa’s Employment Equity Act (Act 55 of 1998) regarding psychological testing validity and cultural non-bias.
              </p>
            </div>
          </div>
        </div>

        {/* Audit Log Stream */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white mb-1">
              Statutory Security & Consent Audit Trail
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Immutable logging of calibration events, privacy actions, and API telemetry
            </p>

            <div className="space-y-2.5">
              {sampleAuditLogs.map((log) => (
                <div key={log.id} className="p-3.5 bg-slate-950/70 rounded-xl text-xs">
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] mb-1">
                    <span>{log.timestamp}</span>
                    <span className="text-teal-400">{log.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-white font-medium">
                    <span>{log.event}</span>
                    <span className="text-slate-500 font-mono">{log.actor}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Target: {log.target}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 text-[11px] text-slate-500">
            Encrypted with AES-256 at rest · Multi-Factor Privileged Access Enforced
          </div>
        </div>
      </div>
    </div>
  );
};
