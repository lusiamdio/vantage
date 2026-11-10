/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage B2G National Deployment Agreements Commercial Page
 * Full dedicated commercial webpage for ministries of labour, education, and public sector agencies.
 */

import React, { useState } from 'react';

interface B2GNationalDeploymentPageProps {
  onNavigate: (view: string) => void;
  onOpenGovernmentConsole: () => void;
}

export const B2GNationalDeploymentPage: React.FC<B2GNationalDeploymentPageProps> = ({
  onNavigate,
  onOpenGovernmentConsole,
}) => {
  const [govMinistry, setGovMinistry] = useState('');
  const [govCountry, setGovCountry] = useState('Kenya');
  const [govContactName, setGovContactName] = useState('');
  const [govEmail, setGovEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleGovSubmit = (e: React.FormEvent) => {
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
        <span className="text-teal-400 font-medium">B2G National Deployment Agreements</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
          <span>Public Sector Infrastructure</span>
          <span aria-hidden="true">·</span>
          <span>Sovereign Labor Market Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          National Workforce Deployment & Public Sector Frameworks
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          National governments face unprecedented youth demographic expansion and rapid structural shifts in technology, green energy, and industrialization. Vantage provides sovereign, enterprise-grade digital infrastructure for Ministries of Labour, Ministries of Education, and TVET Authorities to assess millions of citizens and direct public resources where economies need them most.
        </p>
      </div>

      {/* Three Pillars of Public Sector Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
          <span className="text-xs font-mono text-teal-400 font-bold block">PILLAR 01</span>
          <h2 className="text-lg font-bold text-white">Youth Demographic Profiling at Scale</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Scalable assessment capacity capable of handling tens of thousands of concurrent youth evaluations across secondary schools, vocational colleges, and national employment service centers.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
          <span className="text-xs font-mono text-cyan-400 font-bold block">PILLAR 02</span>
          <h2 className="text-lg font-bold text-white">Labor Demand vs. Aspiration Modeling</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Real-time econometric matching comparing youth vocational aspirations against actual economic labor openings to prevent systemic graduate unemployment and severe STEM/vocational shortfalls.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
          <span className="text-xs font-mono text-emerald-400 font-bold block">PILLAR 03</span>
          <h2 className="text-lg font-bold text-white">Evidence-Based TVET Retooling</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Transform macro labor survey data into actionable curriculum modernization mandates for national vocational training authorities and university accreditation boards.
          </p>
        </div>
      </div>

      {/* Deployment & Sovereign Cloud Options */}
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Public Sector Architecture & Sovereign Hosting Models
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Built to satisfy the highest state security standards, data localization mandates, and procurement regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300">
          <div className="space-y-4">
            <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
              <strong className="text-white text-sm block">In-Country Sovereign Cloud Hosting</strong>
              <p className="text-slate-400 leading-relaxed">
                Deployed within accredited national cloud datacenters (e.g. Kenya Konza Technopolis, South Africa Microsoft Azure/AWS local regions, Nigeria Galaxy Backbone) ensuring citizen data never leaves territorial borders.
              </p>
            </div>

            <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
              <strong className="text-white text-sm block">On-Premise Air-Gapped Options</strong>
              <p className="text-slate-400 leading-relaxed">
                For national security agencies and ministries requiring complete offline isolation, Vantage provides containerized on-premise deployments with localized scoring engines.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
              <strong className="text-white text-sm block">Multilateral Development Financing Alignment</strong>
              <p className="text-slate-400 leading-relaxed">
                Structured for technical co-financing and grants from the World Bank (e.g. Kenya Youth Employment and Opportunities Project - KYEOP, Nigeria IDEAS Project), African Development Bank (AfDB), and European Union development funds.
              </p>
            </div>

            <div className="p-5 bg-slate-950/70 rounded-xl space-y-2">
              <strong className="text-white text-sm block">National Capacity Building & Knowledge Transfer</strong>
              <p className="text-slate-400 leading-relaxed">
                Comprehensive training and certification programs for ministry statisticians, occupational psychologists, and employment officers to operate and maintain the platform independently.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Demonstration Button */}
      <div className="bg-slate-900 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono text-teal-400 uppercase font-bold block mb-1">Interactive Simulation</span>
          <h3 className="text-lg font-bold text-white">
            Inspect the National Workforce Intelligence Console
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed mt-1">
            Review simulated demographic telemetry, regional distribution heatmaps, and priority shortage occupations for Kenya, South Africa, and Nigeria.
          </p>
        </div>

        <button
          onClick={onOpenGovernmentConsole}
          className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          Open National Console (B2G) →
        </button>
      </div>

      {/* Government Consultation Inquiry Form */}
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
            Government Affairs & Partnerships
          </span>
          <h2 className="text-2xl font-bold text-white">Request Public Sector Briefing & Feasibility Study</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Our Senior Public Sector Advisory Group will arrange a ministerial briefing and technical feasibility presentation.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-teal-950/40 rounded-xl text-teal-200 text-xs sm:text-sm space-y-2">
            <strong className="text-white font-bold block text-base">Inquiry Logged with Government Advisory Desk</strong>
            <p>Our Director of Government Affairs will contact your office directly via official diplomatic/institutional channels.</p>
          </div>
        ) : (
          <form onSubmit={handleGovSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Name & Title</label>
                <input
                  type="text"
                  required
                  value={govContactName}
                  onChange={(e) => setGovContactName(e.target.value)}
                  placeholder="e.g. Director of TVET / Permanent Secretary"
                  className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Ministry / Authority / Agency</label>
                <input
                  type="text"
                  required
                  value={govMinistry}
                  onChange={(e) => setGovMinistry(e.target.value)}
                  placeholder="e.g. Ministry of Labour & Social Protection"
                  className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Government Email</label>
                <input
                  type="email"
                  required
                  value={govEmail}
                  onChange={(e) => setGovEmail(e.target.value)}
                  placeholder="contact@labour.go.ke"
                  className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Country Jurisdiction</label>
                <select
                  value={govCountry}
                  onChange={(e) => setGovCountry(e.target.value)}
                  className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                >
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Pan-African / Regional Bloc">Pan-African / Regional Bloc (AU / EAC / ECOWAS)</option>
                  <option value="Multilateral Development Bank">Multilateral Development Agency (World Bank / AfDB)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-sm"
              >
                Schedule Ministerial Feasibility Briefing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
