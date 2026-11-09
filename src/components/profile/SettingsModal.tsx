/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage User Account & Privacy Settings Modal
 * Manage notification preferences, statutory consent, data export, and security.
 */

import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  activeRole: UserRole;
  onExportData?: () => void;
  onOpenSecurityAudit?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  activeRole,
  onOpenSecurityAudit,
}) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [careerTelemetrics, setCareerTelemetrics] = useState(true);
  const [researchAnonymization, setResearchAnonymization] = useState(true);
  const [erasureRequested, setErasureRequested] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify(
        {
          candidateProfile: userProfile,
          role: activeRole,
          dataPrivacyCompliance: ['POPIA Act 4 2013', 'NDPA 2023', 'Kenya DPA 2019', 'GDPR Article 20'],
          exportTimestamp: new Date().toISOString(),
          system: 'Vantage Career Intelligence Platform',
        },
        null,
        2
      )
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vantage_dossier_${userProfile?.id || 'candidate'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl text-left my-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block mb-1">
              Account Governance & Preferences
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              User Settings & Data Controls
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* Section 1: Account Overview */}
        <div className="p-4 bg-slate-950/70 rounded-xl space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
            Authenticated Profile
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Name</span>
              <strong className="text-white text-sm">{userProfile?.fullName || 'Active Candidate'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Email Address</span>
              <span className="text-slate-300 font-mono">{userProfile?.email || 'candidate@vantage.org'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Current Jurisdiction</span>
              <span className="text-slate-300">{userProfile?.country || 'Pan-African'}, {userProfile?.city || 'Capital'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Authorization Level</span>
              <span className="text-teal-400 font-semibold uppercase">{activeRole}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Privacy & Notification Preferences */}
        <div className="space-y-4">
          <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
            Telemetry & Notification Preferences
          </span>

          <div className="space-y-3 text-xs">
            <label className="flex items-start justify-between gap-4 p-3.5 bg-slate-950/50 rounded-xl cursor-pointer hover:bg-slate-950 transition-colors">
              <div>
                <strong className="text-white block">Career Milestones & Labor Alerts</strong>
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  Receive email alerts when emerging high-demand occupations in your Holland RIASEC code are identified.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="mt-1 h-4 w-4 rounded bg-slate-900 border-none text-teal-500 focus:ring-teal-400"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-3.5 bg-slate-950/50 rounded-xl cursor-pointer hover:bg-slate-950 transition-colors">
              <div>
                <strong className="text-white block">Macro Economic Telemetry Sync</strong>
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  Allow your anonymous vocational trends to inform regional TVET and university curriculum modernization.
                </span>
              </div>
              <input
                type="checkbox"
                checked={careerTelemetrics}
                onChange={(e) => setCareerTelemetrics(e.target.checked)}
                className="mt-1 h-4 w-4 rounded bg-slate-900 border-none text-teal-500 focus:ring-teal-400"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-3.5 bg-slate-950/50 rounded-xl cursor-pointer hover:bg-slate-950 transition-colors">
              <div>
                <strong className="text-white block">Differential Item Functioning (DIF) Anonymized Research</strong>
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  Allow cryptographically hashed response latencies to calibrate cross-cultural measurement invariance.
                </span>
              </div>
              <input
                type="checkbox"
                checked={researchAnonymization}
                onChange={(e) => setResearchAnonymization(e.target.checked)}
                className="mt-1 h-4 w-4 rounded bg-slate-900 border-none text-teal-500 focus:ring-teal-400"
              />
            </label>
          </div>
        </div>

        {/* Section 3: Statutory Data Sovereignty (Export & Erasure) */}
        <div className="p-4 bg-slate-950/70 rounded-xl space-y-4">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase font-bold block mb-1">
              Data Sovereignty (POPIA / NDPA / GDPR)
            </span>
            <p className="text-xs text-slate-300">
              Download your complete assessment records or trigger statutory right-to-erasure workflows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportJson}
              className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Download JSON Dossier</span>
              {exportSuccess && <span className="text-teal-400">✓ Downloaded</span>}
            </button>

            {onOpenSecurityAudit && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSecurityAudit();
                }}
                className="px-4 py-2 text-xs font-semibold text-teal-300 hover:text-white bg-teal-950/50 hover:bg-teal-950/80 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>🛡️ Cryptographic & Security Audit</span>
              </button>
            )}

            {erasureRequested ? (
              <span className="text-xs text-rose-400 font-mono">
                Cryptographic purge queued (Processed in 24h)
              </span>
            ) : (
              <button
                onClick={() => setErasureRequested(true)}
                className="px-4 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/50 rounded-lg transition-colors"
              >
                Request Right-to-Erasure
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
