/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Government Consultation Proposal Request Page
 * Enables ministries, public agencies, and development partners to submit
 * formal technical feasibility proposals for national workforce deployments.
 */

import React, { useState } from 'react';

interface GovernmentConsultationPageProps {
  onNavigate: (view: string) => void;
  onOpenGovernmentConsole?: () => void;
}

export const GovernmentConsultationPage: React.FC<GovernmentConsultationPageProps> = ({
  onNavigate,
  onOpenGovernmentConsole,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    officialName: '',
    officialTitle: '',
    ministryOrAgency: '',
    governmentEmail: '',
    country: 'Kenya',
    targetCohortSize: '50,000 - 250,000 Youth',
    priorityObjectives: ['Youth TVET Retooling & Skills Mapping', 'Macro Labor Supply vs Demand Forecasting'],
    projectTimeline: 'Q1-Q2 2027 Implementation',
    hostingPreference: 'Sovereign National Cloud / On-Premise',
    notes: '',
  });

  const objectiveOptions = [
    'Youth TVET Retooling & Skills Mapping',
    'Macro Labor Supply vs Demand Forecasting',
    'National STEM & Emerging Technology Capacity',
    'AfCFTA Regional Mobility & Credential Portability',
    'Secondary to Tertiary Academic Tracking',
  ];

  const handleToggleObjective = (obj: string) => {
    setFormData((prev) => {
      const exists = prev.priorityObjectives.includes(obj);
      return {
        ...prev,
        priorityObjectives: exists
          ? prev.priorityObjectives.filter((item) => item !== obj)
          : [...prev.priorityObjectives, obj],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 max-w-6xl mx-auto space-y-12 text-slate-100">
      {/* Breadcrumb / Top Return */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('landing')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>← Back to Platform Overview</span>
        </button>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold">
          PUBLIC SECTOR & GOVERNMENT AFFAIRS
        </span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4 text-left">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Request Public Sector Consultation & Feasibility Study
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Commission a customized government deployment proposal for Ministries of Labour, Ministries of Education, National TVET Authorities, and Regional Development Banks. Our advisory team coordinates ministerial briefings and sovereign data hosting architecture.
        </p>
      </div>

      {/* Main Grid: Form + Proposal Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Proposal Intake Form */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-left">
          {submitted ? (
            <div className="space-y-6 py-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl font-bold mx-auto">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Government Consultation Proposal Logged</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your formal briefing request has been registered with the Vantage Public Sector Advisory Directorate. A senior labour economist will contact your office within 24 hours.
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-2xl text-xs text-slate-400 font-mono text-left space-y-1">
                <div><span className="text-slate-500">Official:</span> {formData.officialName} ({formData.officialTitle})</div>
                <div><span className="text-slate-500">Agency:</span> {formData.ministryOrAgency}</div>
                <div><span className="text-slate-500">Country:</span> {formData.country}</div>
                <div><span className="text-slate-500">Cohort Scale:</span> {formData.targetCohortSize}</div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                {onOpenGovernmentConsole && (
                  <button
                    onClick={onOpenGovernmentConsole}
                    className="px-6 py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md"
                  >
                    Preview Live Workforce Console →
                  </button>
                )}
                <button
                  onClick={() => onNavigate('landing')}
                  className="px-6 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-all"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-teal-400 font-bold block mb-1">SECTION 01</span>
                <h3 className="text-base font-bold text-white">Government Representative Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Official Name</label>
                  <input
                    type="text"
                    required
                    value={formData.officialName}
                    onChange={(e) => setFormData({ ...formData, officialName: e.target.value })}
                    placeholder="e.g. Dr. Amina Njoroge"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Official Title / Position</label>
                  <input
                    type="text"
                    required
                    value={formData.officialTitle}
                    onChange={(e) => setFormData({ ...formData, officialTitle: e.target.value })}
                    placeholder="e.g. Permanent Secretary / Director of TVET"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Ministry, Authority or Agency</label>
                  <input
                    type="text"
                    required
                    value={formData.ministryOrAgency}
                    onChange={(e) => setFormData({ ...formData, ministryOrAgency: e.target.value })}
                    placeholder="e.g. Ministry of Labour & Social Protection"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Government Email Domain</label>
                  <input
                    type="email"
                    required
                    value={formData.governmentEmail}
                    onChange={(e) => setFormData({ ...formData, governmentEmail: e.target.value })}
                    placeholder="name@labour.gov.ke"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Country / Jurisdiction</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Pan-African Multi-Country">Pan-African Multi-Country</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Youth Cohort Scale</label>
                  <select
                    value={formData.targetCohortSize}
                    onChange={(e) => setFormData({ ...formData, targetCohortSize: e.target.value })}
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                  >
                    <option value="10,000 - 50,000 Youth">10,000 - 50,000 Youth (Provincial Pilot)</option>
                    <option value="50,000 - 250,000 Youth">50,000 - 250,000 Youth (National Rollout)</option>
                    <option value="250,000+ Youth">250,000+ Youth (Continental / Nationwide)</option>
                  </select>
                </div>
              </div>

              <div className="border-b border-slate-800 pt-3 pb-2">
                <span className="text-xs font-mono text-teal-400 font-bold block mb-1">SECTION 02</span>
                <h3 className="text-base font-bold text-white">Strategic Policy Objectives</h3>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Select Priority Pillars</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {objectiveOptions.map((obj) => {
                    const isChecked = formData.priorityObjectives.includes(obj);
                    return (
                      <button
                        type="button"
                        key={obj}
                        onClick={() => handleToggleObjective(obj)}
                        className={`p-3 rounded-xl text-xs text-left transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-teal-950/60 text-teal-200 ring-1 ring-teal-400'
                            : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{obj}</span>
                        <span className="font-mono text-xs">{isChecked ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Deployment Scope & Specific Directives (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify TVET centers, national youth funds, timeline milestones, or budgetary frameworks..."
                  className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-lg active:scale-[0.99] text-center"
              >
                Submit Official Consultation Request →
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                Submissions are treated with diplomatic confidentiality under national data protection frameworks (POPIA, NDPA, Kenya DPA).
              </p>
            </form>
          )}
        </div>

        {/* Informational Side Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 space-y-5 text-left">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold block">
              What Is Included In The Proposal
            </span>
            <h3 className="text-xl font-bold text-white">Full Feasibility Dossier</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Sovereign Cloud Architecture:</strong> Zero-data egress compliance ensuring citizen psychometric data stays within national borders.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>TVET Retooling Matrix:</strong> Curricula adjustments indexed directly to ISCO-08 occupational shortages.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Regional Currency Budgeting:</strong> Multi-year SLA structured in KES, ZAR, NGN, or USD.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Psychometric Integrity Audits:</strong> Comprehensive Differential Item Functioning (DIF) to avoid regional or language bias.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/60 rounded-3xl p-6 text-left space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold block">Direct Diplomatic Liaison</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prefer an encrypted diplomatic exchange or official bilateral call? Contact the Vantage Directorate of Public Sector Engagements directly:
            </p>
            <div className="p-3 bg-slate-950/70 rounded-xl text-xs font-mono text-teal-300">
              public-sector@vantage-talent.org
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
