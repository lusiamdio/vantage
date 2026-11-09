/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Career Detail & Deep Intelligence Modal
 * Detailed occupational profile with multi-currency salaries, African university hubs, global certs, and explainable AI insights.
 */

import React, { useState } from 'react';
import { CareerMatch, AssessmentResultRecord, UserProfile } from '../../types';
import { fetchAiCareerIntelligence } from '../../services/recommendationEngine';

interface CareerDetailModalProps {
  career: CareerMatch | null;
  onClose: () => void;
  results: AssessmentResultRecord;
  userProfile?: UserProfile | null;
  onAddToRoadmap?: (career: CareerMatch) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose,
  results,
  userProfile,
  onAddToRoadmap,
}) => {
  const [currency, setCurrency] = useState<'usd' | 'zar' | 'kes' | 'ngn'>('usd');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!career) return null;

  const handleGenerateAiIntelligence = async () => {
    setLoadingAi(true);
    const data = await fetchAiCareerIntelligence(career.title, results, userProfile || undefined);
    setAiAnalysis(data);
    setLoadingAi(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl text-left my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span>ISCO-08 Code: {career.iscoCode}</span>
              <span aria-hidden="true">·</span>
              <span>{career.industry}</span>
              <span aria-hidden="true">·</span>
              <span className="text-teal-400 font-medium">{career.demandTier}</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {career.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-2xl font-bold text-teal-400 font-mono tabular-nums">
                {career.overallMatchScore}%
              </span>
              <span className="text-xs text-slate-400 block">Overall Congruence</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors text-lg p-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="py-4 space-y-6">
          {/* Summary & Currency Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-white">Occupational Scope</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {career.jobDescription}
              </p>

              <div className="p-4 bg-slate-950/70 rounded-xl text-xs">
                <span className="font-semibold text-slate-200 block mb-1">
                  Psychometric Evidence Fit:
                </span>
                <p className="text-slate-400 leading-relaxed">
                  {career.psychometricEvidenceExplanation}
                </p>
              </div>
            </div>

            {/* Compensation & Currency */}
            <div className="bg-slate-950/70 p-5 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block mb-2">
                  Labor Market Compensation
                </span>
                <div className="flex items-center gap-1 mb-3">
                  {(['usd', 'zar', 'kes', 'ngn'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-1 text-xs uppercase font-mono rounded transition-colors ${
                        currency === c
                          ? 'bg-teal-400 text-slate-950 font-semibold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="text-base font-bold text-white font-mono tabular-nums">
                  {career.salaryEstimates[currency]}
                </div>
                <span className="text-xs text-slate-500 mt-1 block">
                  Calibrated to local enterprise & multinational wage indices.
                </span>
              </div>

              <div className="mt-4 pt-3 text-xs text-slate-400">
                Career Path: <strong className="text-slate-200 block mt-0.5">{career.growthPathway}</strong>
              </div>
            </div>
          </div>

          {/* Key Responsibilities & Essential Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Core Responsibilities
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {career.keyResponsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-400">·</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Essential Technical Competencies
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {career.essentialSkills.map((sk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400">·</span>
                    <span>{sk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* African Academic Hubs & Global Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Leading African Academic Institutions
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {career.africanAcademicHubs.map((hub, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono">0{idx + 1}.</span>
                    <span>{hub}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Accredited Global Certifications
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {career.globalCertifications.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Career Intelligence Deep-Dive Section */}
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Explainable AI Career Intelligence Evaluation
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Synthesizes your Holland RIASEC code, cognitive scores, and regional economic trends.
                </p>
              </div>

              <button
                onClick={handleGenerateAiIntelligence}
                disabled={loadingAi}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                {loadingAi ? 'Synthesizing Psychometric Fit...' : 'Run Deep AI Analysis'}
              </button>
            </div>

            {aiAnalysis && (
              <div className="bg-slate-950/80 p-5 rounded-xl space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block mb-1">Traceable Evidence Fit:</span>
                  <p className="text-slate-200 leading-relaxed">{aiAnalysis.traceableFitExplanation}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-slate-400 font-medium block mb-1">African Market Drivers:</span>
                    <p className="text-slate-300">{aiAnalysis.africanMarketOutlook?.economicDrivers || 'Expanding regional digital trade and industrial decentralization.'}</p>
                    <span className="text-slate-500 mt-1 block">Key Hubs: {aiAnalysis.africanMarketOutlook?.topHubs?.join(', ')}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block mb-1">Recommended Phase 1 Milestone:</span>
                    <p className="text-slate-300">
                      {aiAnalysis.actionableRoadmap?.[0]?.milestone || 'Acquire foundational certifications and build capstone projects.'}
                    </p>
                  </div>
                </div>

                <div className="text-slate-500 italic text-[11px] pt-2">
                  {aiAnalysis.disclaimer}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          {onAddToRoadmap && (
            <button
              onClick={() => {
                onAddToRoadmap(career);
                onClose();
              }}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors"
            >
              Set as Primary Career Direction
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
