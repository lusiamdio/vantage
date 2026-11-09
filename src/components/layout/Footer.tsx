/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Footer - Editorial & Compliant
 * Features social media icons, direct full-page links, and international standards.
 */

import React from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../services/i18n';

interface FooterProps {
  setActiveView: (view: string) => void;
  onOpenGovernance?: () => void;
  currentLanguage?: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveView,
  currentLanguage = 'en',
  onSelectLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  return (
    <footer className="bg-slate-950 py-16 text-slate-400 text-xs">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info & Social Media Links */}
          <div className="space-y-4">
            <div>
              <button
                onClick={() => {
                  setActiveView('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white font-semibold text-sm block mb-2 text-left hover:text-teal-400 transition-colors"
              >
                Vantage Platform
              </button>
              <p className="text-slate-400 leading-relaxed mb-3">
                Enterprise-grade psychometric assessment, career intelligence, and workforce analytics infrastructure with an Africa-first strategy.
              </p>
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <span>Nairobi</span>
                <span aria-hidden="true">·</span>
                <span>Johannesburg</span>
                <span aria-hidden="true">·</span>
                <span>Lagos</span>
                <span aria-hidden="true">·</span>
                <span>Kigali</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2.5">
                Connect & Research
              </span>
              <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-teal-400 flex items-center justify-center transition-colors"
                  aria-label="Vantage on LinkedIn"
                  title="LinkedIn - Enterprise & Higher Education"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-teal-400 flex items-center justify-center transition-colors"
                  aria-label="Vantage on X (formerly Twitter)"
                  title="X (Twitter) - Labor Telemetry Dispatches"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-teal-400 flex items-center justify-center transition-colors"
                  aria-label="Vantage Open Psychometrics on GitHub"
                  title="GitHub - Open Norm Models & APIs"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-teal-400 flex items-center justify-center transition-colors"
                  aria-label="Vantage Channel on YouTube"
                  title="YouTube - Psychometrics & Career Masterclasses"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Globe / International Dispatch */}
                <button
                  onClick={() => {
                    setActiveView('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-teal-400 flex items-center justify-center transition-colors"
                  aria-label="Vantage Global Network"
                  title="Vantage Global Portal"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Group 1: Core Modules */}
          <div>
            <span className="text-white font-semibold text-sm block mb-3">Core Modules</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveView('assessments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Psychometric Battery Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('careers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Occupational Matching Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('institutional');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Institutional Talent Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('government');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  National Labor Market Intelligence
                </button>
              </li>
            </ul>
          </div>

          {/* Group 2: Governance & Standards */}
          <div>
            <span className="text-white font-semibold text-sm block mb-3">Governance & Standards</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveView('gov_ethical_ai');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Ethical AI & Psychometric Governance
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('gov_dif_standards');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Differential Item Functioning (DIF) Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('gov_privacy_framework');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  POPIA, NDPA & GDPR Privacy Framework
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('gov_youth_safeguarding');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Youth & Minor Safeguarding Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Group 3: Commercial Models */}
          <div>
            <span className="text-white font-semibold text-sm block mb-3">Commercial Models</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveView('commercial_b2c');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  B2C Individual Career Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('commercial_b2b');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  B2B University & Corporate Licensing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('commercial_b2g');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  B2G National Deployment Agreements
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Editorial Bar with Social Icons & Standards */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            © {new Date().getFullYear()} Vantage Career Intelligence Platform. {t.allRightsReserved}
          </div>

          {/* Quick Footer Language Switcher */}
          {onSelectLanguage && (
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="text-slate-600">Language:</span>
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onSelectLanguage(l.code)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    currentLanguage === l.code
                      ? 'text-teal-400 font-bold bg-slate-900'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <span>ISCO-08 Standardized</span>
            <span aria-hidden="true">·</span>
            <span>2PL-IRT Calibrated</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Data Sovereignty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
