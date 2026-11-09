/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Landing FAQ Section
 * Dedicated interactive FAQ covering privacy, psychometric validity, and career matching methodology.
 */

import React, { useState } from 'react';

interface FaqItem {
  id: string;
  category: 'privacy' | 'validity' | 'matching' | 'enterprise';
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq_1',
    category: 'privacy',
    question: 'How is candidate psychometric data protected under POPIA, NDPA, and Kenyan data privacy laws?',
    answer: 'Psychometric and cognitive assessment records are treated as special personal information. Vantage enforces cryptographic AES-256 encryption at rest and strict TLS 1.3 in transit. Under South Africa’s POPIA (Section 11), Nigeria’s NDPA 2023, Kenya’s Data Protection Act 2019, and the EU GDPR, data is processed solely under explicit affirmative consent. We maintain an unconditional zero-commercial-selling policy: your personal evaluation is never sold, brokered, or used to train third-party advertising models.',
    highlight: 'POPIA & NDPA compliant with encrypted data sovereignty and zero commercial selling.',
  },
  {
    id: 'faq_2',
    category: 'privacy',
    question: 'Will my current employer, university, or third-party recruiters see my individual scores without permission?',
    answer: 'Absolutely not. Individual Career Pass assessments are 100% confidential and private to you. In institutional university settings or corporate recruitment campaigns, employers only see candidates who specifically apply to a designated campaign with explicit authorization. Furthermore, institutional dashboards strictly enforce an aggregation threshold (N ≥ 15) to guarantee individual youth anonymity in reporting.',
    highlight: 'Strict confidentiality: results are never disclosed without your prior affirmative authorization.',
  },
  {
    id: 'faq_3',
    category: 'privacy',
    question: 'Can I exercise my statutory Right to Explanation and Right to Erasure (data purging)?',
    answer: 'Yes. In accordance with GDPR Article 17/22, POPIA Section 24, and NDPA regulations, candidates can request instant machine-readable JSON data exports, full mathematical explanations of recommendation criteria, or permanent cryptographic purging of their entire psychometric record directly from the platform settings or via privacy@vantage-talent.org.',
  },
  {
    id: 'faq_4',
    category: 'validity',
    question: 'How can a 25-minute assessment be as scientifically valid as traditional 3-to-4 hour tests?',
    answer: 'Legacy corporate testing relied on Classical Test Theory (CTT) item-summation, which required excessive questions to achieve statistical reliability but caused severe cognitive fatigue and random straightlining after 40 minutes. Vantage utilizes modern 2-Parameter Logistic (2PL) Item Response Theory (IRT). By selecting items with maximized discrimination parameters (a) and calibrated difficulty thresholds (b), our 25-minute battery achieves internal consistency reliability of Cronbach’s α = 0.86 to 0.91—matching or exceeding 3-hour tests without test fatigue.',
    highlight: '2PL Item Response Theory delivers Cronbach’s α > 0.85 without testing exhaustion.',
  },
  {
    id: 'faq_5',
    category: 'validity',
    question: 'What are Sten scores (1 to 10) and how are they calibrated to African demographic norms?',
    answer: 'Standard Ten (Sten) scores divide a normal distribution into 10 standard units with a mean of 5.5 and a standard deviation of 2.0. Unlike raw test scores, Sten scores are non-stigmatizing and relative to representative normative groups. Vantage norm tables are specifically calibrated against Pan-African tertiary, secondary, and early-career cohorts across Anglophone, Francophone, and Swahili-speaking demographics, avoiding Western cultural bias.',
  },
  {
    id: 'faq_6',
    category: 'validity',
    question: 'How does Vantage eliminate cultural, linguistic, and gender bias in question batteries?',
    answer: 'We execute automated Differential Item Functioning (DIF) audits utilizing the Mantel-Haenszel Delta statistic and Multi-Group Confirmatory Factor Analysis (MGCFA). Items exhibiting differential probability of endorsement across linguistic or gender subgroups of identical underlying aptitude (MH Delta > 1.5) are automatically quarantined from scoring algorithms pending expert psychometric panel review.',
    highlight: 'Continuous statistical DIF monitoring ensures absolute measurement invariance.',
  },
  {
    id: 'faq_7',
    category: 'matching',
    question: 'How does the Occupational Matching Engine calculate congruence percentages?',
    answer: 'Our engine applies a multi-attribute utility calculation combining: (1) Holland RIASEC hexagonal distance calculus across the vocational circumplex, (2) Five-Factor Euclidean disposition vector fitting, (3) GCAT cognitive fluid reasoning complexity floors, and (4) Real-time labor market growth tiers. This produces an explainable congruence percentage (e.g. 94% fit) with traceable psychometric evidence.',
    highlight: 'Multi-attribute mathematical congruence replacing opaque black-box AI algorithms.',
  },
  {
    id: 'faq_8',
    category: 'matching',
    question: 'Where do the salary ranges and regional economic demand figures originate?',
    answer: 'All occupations are standardized under the International Standard Classification of Occupations (ISCO-08). Compensation benchmarks are calibrated to local enterprise and multinational wage indices across four primary currencies: South African Rand (ZAR), Kenyan Shillings (KES), Nigerian Naira (NGN), and US Dollars (USD). Labor demand tiers are updated continuously via regional economic telemetry and industrial hiring indices.',
  },
  {
    id: 'faq_9',
    category: 'enterprise',
    question: 'How do universities and enterprise HR teams deploy Vantage at scale?',
    answer: 'Universities and corporate HR deploy the Institutional Talent Console to dispatch bulk candidate campaigns with customized cut-off Sten requirements, analyze departmental skills-gap deficit heatmaps, and integrate directly with Learning Management Systems (Moodle, Canvas, Blackboard via LTI 1.3) or HRIS platforms (Workday, BambooHR).',
    highlight: 'Native LMS/HRIS integrations and bulk testing campaigns with custom cut-off gates.',
  },
  {
    id: 'faq_10',
    category: 'enterprise',
    question: 'Can government ministries and national TVET authorities deploy sovereign instances?',
    answer: 'Yes. Under B2G National Deployment Agreements, Vantage provides in-country sovereign cloud hosting (e.g. Konza Technopolis in Kenya, local Azure/AWS regions in South Africa, Galaxy Backbone in Nigeria) or air-gapped on-premise installations to satisfy national state security and data localization laws.',
  },
];

interface LandingFaqSectionProps {
  onNavigate?: (view: string) => void;
}

export const LandingFaqSection: React.FC<LandingFaqSectionProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'privacy' | 'validity' | 'matching' | 'enterprise'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq_1');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="px-6 sm:px-10 lg:px-16 w-full text-left space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block">
          Knowledge Base & Transparency
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Everything you need to know about our psychometric test theory, data privacy protections under African statutory law, and career matching algorithms.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'privacy', label: 'Privacy & Sovereignty' },
            { id: 'validity', label: 'Psychometric Science' },
            { id: 'matching', label: 'Career Matching' },
            { id: 'enterprise', label: 'Institutions & Gov' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                activeCategory === cat.id
                  ? 'bg-teal-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="w-full space-y-4 max-w-5xl mx-auto">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl transition-colors ${
                isOpen ? 'bg-slate-900' : 'bg-slate-900/60 hover:bg-slate-900/80'
              } p-6`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-start justify-between gap-4 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="space-y-1 pr-4">
                  <span className="text-[10px] font-mono uppercase text-teal-400 block tracking-wider">
                    {faq.category === 'privacy' && 'Data Protection & Law'}
                    {faq.category === 'validity' && 'Psychometric Measurement'}
                    {faq.category === 'matching' && 'Matching Algorithms'}
                    {faq.category === 'enterprise' && 'Enterprise & Public Sector'}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-teal-400' : ''
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="pt-4 mt-4 border-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                  <p>{faq.answer}</p>
                  {faq.highlight && (
                    <div className="p-3 bg-slate-950/70 rounded-xl text-teal-300 text-xs font-medium">
                      💡 {faq.highlight}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Helpful links strip */}
      <div className="p-6 bg-slate-900/40 rounded-2xl max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <span>Still have statutory or technical questions?</span>
        <div className="flex items-center gap-4">
          {onNavigate && (
            <>
              <button
                onClick={() => onNavigate('gov_privacy_framework')}
                className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
              >
                Read Privacy Framework →
              </button>
              <button
                onClick={() => onNavigate('gov_dif_standards')}
                className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
              >
                Inspect DIF Standards →
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
