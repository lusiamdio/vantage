/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage B2B Institutional & Enterprise Licensing Commercial Page
 * Full dedicated commercial webpage for universities, colleges, corporate HR, and recruitment agencies.
 */

import React, { useState } from 'react';

interface B2BInstitutionalLicensingPageProps {
  onNavigate: (view: string) => void;
  onOpenInstitutionalConsole: () => void;
}

export const B2BInstitutionalLicensingPage: React.FC<B2BInstitutionalLicensingPageProps> = ({
  onNavigate,
  onOpenInstitutionalConsole,
}) => {
  const [rfpName, setRfpName] = useState('');
  const [rfpOrg, setRfpOrg] = useState('');
  const [rfpEmail, setRfpEmail] = useState('');
  const [rfpCohortSize, setRfpCohortSize] = useState('500 - 2,000 students/year');
  const [submitted, setSubmitted] = useState(false);

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        <span className="text-teal-400 font-medium">B2B University & Corporate Licensing</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
          <span>Enterprise & Higher Education</span>
          <span aria-hidden="true">·</span>
          <span>Cohort Analytics & Recruitment Automation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Institutional Talent Intelligence & Enterprise Licensing
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Universities, colleges, and enterprise human capital teams use Vantage to assess student cohorts and recruitment candidate pools at scale. Detect faculty skill deficits, benchmark graduate employability, and execute bulk testing campaigns with customizable cut-off scoring standards.
        </p>
      </div>

      {/* Licensing Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tier 1: Departmental */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
          <div className="space-y-4">
            <span className="text-xs font-mono text-teal-400 uppercase font-bold">Department Tier</span>
            <h2 className="text-xl font-bold text-white">Academic Faculty Pass</h2>
            <div className="text-3xl font-extrabold text-white font-mono">$1,800 <span className="text-xs font-normal text-slate-400 font-sans">/ annum</span></div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ideal for single academic departments, pilot university faculties, and boutique recruitment teams.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Up to 350 candidate assessments/year</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Faculty-level skills-gap matrix</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Individual candidate PDF report exports</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>POPIA / NDPA compliant anonymity controls</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenInstitutionalConsole}
            className="mt-8 w-full py-3 px-4 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors text-center"
          >
            Launch Department Console
          </button>
        </div>

        {/* Tier 2: Campus-Wide */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider rounded-full">
            Recommended for Universities
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono text-teal-400 uppercase font-bold">Campus-Wide Tier</span>
            <h2 className="text-xl font-bold text-white">Institutional Console</h2>
            <div className="text-3xl font-extrabold text-white font-mono">$3,500 <span className="text-xs font-normal text-slate-400 font-sans">/ annum</span></div>
            <p className="text-xs text-slate-400 leading-relaxed">
              For comprehensive universities, colleges, and national graduate recruitment schemes.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Up to 1,500 candidate assessments/year</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Cross-faculty benchmarking & heatmaps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Bulk campaign manager with custom cut-off Stens</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>LMS integration (Moodle, Canvas, Blackboard)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Dedicated institutional onboarding specialist</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenInstitutionalConsole}
            className="mt-8 w-full py-3 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors text-center shadow-md"
          >
            Deploy Institutional License
          </button>
        </div>

        {/* Tier 3: Enterprise & Recruitment */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:bg-slate-850 transition-colors">
          <div className="space-y-4">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold">Enterprise Tier</span>
            <h2 className="text-xl font-bold text-white">Multinational HRIS Suite</h2>
            <div className="text-3xl font-extrabold text-white font-mono">Custom <span className="text-xs font-normal text-slate-400 font-sans">/ quote</span></div>
            <p className="text-xs text-slate-400 leading-relaxed">
              For commercial banks, telecom operators, multi-campus university systems, and global recruitment agencies.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Unlimited or 10,000+ candidates</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Full REST API & Webhook event streaming</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>Custom norm group creation & proprietary benchmarks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400">✓</span>
                <span>99.9% SLA & dedicated data science support</span>
              </li>
            </ul>
          </div>

          <a
            href="#rfp-form"
            className="mt-8 w-full py-3 px-4 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors text-center block"
          >
            Request Enterprise RFP →
          </a>
        </div>
      </div>

      {/* Integration Stack Capabilities */}
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 space-y-6">
        <h2 className="text-xl font-bold text-white">Academic & Enterprise Integration Capabilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
          <div className="p-4 bg-slate-950/70 rounded-xl space-y-2">
            <strong className="text-white block">Learning Management Systems (LMS)</strong>
            <p className="text-slate-400">Native LTI 1.3 integrations for Canvas, Moodle, and Blackboard Learn. Embed assessments directly inside student orientation modules.</p>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl space-y-2">
            <strong className="text-white block">HRIS & ATS Connectors</strong>
            <p className="text-slate-400">Integrations for Workday, Greenhouse, BambooHR, and SAP SuccessFactors for automated candidate invite dispatch and score sync.</p>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl space-y-2">
            <strong className="text-white block">Single Sign-On (SSO)</strong>
            <p className="text-slate-400">SAML 2.0 and OpenID Connect (OIDC) compatibility with university Active Directory, Google Workspace, and Microsoft Entra ID.</p>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl space-y-2">
            <strong className="text-white block">Automated Campaign Cut-offs</strong>
            <p className="text-slate-400">Set multi-metric cut-off gates (e.g. GCAT &gt; 70th percentile AND Conscientiousness Sten &gt; 6) for automated graduate candidate routing.</p>
          </div>
        </div>
      </div>

      {/* RFP Request Form */}
      <div id="rfp-form" className="bg-slate-900 rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
            Institutional Procurement
          </span>
          <h2 className="text-2xl font-bold text-white">Request University or Enterprise Quotation</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Our educational solutions team will prepare a customized proposal with regional currency invoicing (ZAR, KES, NGN, USD).
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-teal-950/40 rounded-xl text-teal-200 text-xs sm:text-sm space-y-2">
            <strong className="text-white font-bold block text-base">Request Successfully Dispatched!</strong>
            <p>Our Higher Education Solutions Architect will review your institution’s requirements and respond within 24 business hours.</p>
          </div>
        ) : (
          <form onSubmit={handleRfpSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={rfpName}
                  onChange={(e) => setRfpName(e.target.value)}
                  placeholder="e.g. Dr. Kwame Mensah"
                  className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">University / Organization</label>
                <input
                  type="text"
                  required
                  value={rfpOrg}
                  onChange={(e) => setRfpOrg(e.target.value)}
                  placeholder="e.g. University of Nairobi or Absa Group"
                  className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  value={rfpEmail}
                  onChange={(e) => setRfpEmail(e.target.value)}
                  placeholder="k.mensah@uonbi.ac.ke"
                  className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Expected Annual Cohort Size</label>
                <select
                  value={rfpCohortSize}
                  onChange={(e) => setRfpCohortSize(e.target.value)}
                  className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                >
                  <option value="100 - 500 students/year">100 - 500 students/year</option>
                  <option value="500 - 2,000 students/year">500 - 2,000 students/year</option>
                  <option value="2,000 - 10,000 students/year">2,000 - 10,000 students/year</option>
                  <option value="10,000+ students/year">10,000+ students/year (National / Multi-Campus)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-sm"
              >
                Submit Institutional RFP Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
