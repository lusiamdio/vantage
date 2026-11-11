/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Professional Psychometric Career Report
 * Printable executive report adhering to International Test Commission (ITC) guidelines.
 */

import React from 'react';
import { AssessmentResultRecord, CareerMatch, UserProfile } from '../../types';
import { generateHarmonicPredictiveProfile } from '../../services/predictiveEngine';

interface ProfessionalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: AssessmentResultRecord;
  targetCareer: CareerMatch;
  userProfile?: UserProfile | null;
}

export const ProfessionalReportModal: React.FC<ProfessionalReportModalProps> = ({
  isOpen,
  onClose,
  results,
  targetCareer,
  userProfile,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 my-6 max-h-[95vh] overflow-y-auto print:max-h-none print:p-0 print:shadow-none">
        {/* Print Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Official Assessment Intelligence Document
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
            >
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800 text-lg px-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Report Document Header */}
        <div className="pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">
                Vantage Career Intelligence Ecosystem
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                Psychometric Assessment & Career Intelligence Report
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Standardized Evaluation of Personality, Interests, Cognitive Aptitude & Occupational Alignment
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 font-mono">
              <div>REPORT ID: {results.id.toUpperCase()}</div>
              <div>DATE: {new Date(results.completedAt).toLocaleDateString()}</div>
              <div>NORM: Sub-Saharan Pan-African Tertiary</div>
            </div>
          </div>
        </div>

        {/* Section 1: Candidate Profile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-100/70 rounded-xl mb-8 text-xs">
          <div>
            <span className="text-slate-500 block">Candidate Name</span>
            <strong className="text-slate-900 font-semibold">{userProfile?.fullName || 'Assessed Candidate'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Country & Region</span>
            <strong className="text-slate-900 font-semibold">{userProfile?.country || 'Pan-African Cohort'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Status / Level</span>
            <strong className="text-slate-900 font-semibold">{userProfile?.currentStatus || 'University Student'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Holland Vocational Code</span>
            <strong className="text-teal-700 font-mono text-sm font-bold">{results.riasec.hollandCode}</strong>
          </div>
        </div>

        {/* Section 2: Executive Summary */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1">
            01. Executive Psychometric Synthesis
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            The candidate demonstrates an exceptional vocational affinity for analytical and structured environments (Holland RIASEC: <strong className="font-mono">{results.riasec.hollandCode}</strong>). General cognitive aptitude places in the <strong className="font-mono">{results.cognitive.overallPercentile}th percentile</strong>, signifying superior capacity for rapid technical learning, data-driven reasoning, and abstract troubleshooting. Five-Factor personality calibration highlights disciplined goal execution (Conscientiousness: <strong className="font-mono">Sten {results.bigFive.conscientiousness.sten}/10</strong>) and intellectual curiosity (Openness: <strong className="font-mono">Sten {results.bigFive.openness.sten}/10</strong>).
          </p>
        </div>

        {/* Section 3: Five-Factor Personality Breakdown */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1">
            02. Five-Factor Personality Profile (Costa & McCrae Model)
          </h2>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-500 bg-slate-100/60">
                <th className="py-2.5 px-3 font-medium rounded-l-lg">Dimension</th>
                <th className="py-2.5 px-3 font-medium">Sten Score (1-10)</th>
                <th className="py-2.5 px-3 font-medium">Percentile Rank</th>
                <th className="py-2.5 px-3 font-medium rounded-r-lg">Norm Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-medium text-slate-900">Openness to Experience</td>
                <td className="py-2.5 px-3 font-mono text-slate-800">{results.bigFive.openness.sten} / 10</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">{results.bigFive.openness.percentile}th %tile</td>
                <td className="py-2.5 px-3 text-slate-700">{results.bigFive.openness.level}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-medium text-slate-900">Conscientiousness</td>
                <td className="py-2.5 px-3 font-mono text-slate-800">{results.bigFive.conscientiousness.sten} / 10</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">{results.bigFive.conscientiousness.percentile}th %tile</td>
                <td className="py-2.5 px-3 text-slate-700">{results.bigFive.conscientiousness.level}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-medium text-slate-900">Extraversion</td>
                <td className="py-2.5 px-3 font-mono text-slate-800">{results.bigFive.extraversion.sten} / 10</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">{results.bigFive.extraversion.percentile}th %tile</td>
                <td className="py-2.5 px-3 text-slate-700">{results.bigFive.extraversion.level}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-medium text-slate-900">Agreeableness</td>
                <td className="py-2.5 px-3 font-mono text-slate-800">{results.bigFive.agreeableness.sten} / 10</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">{results.bigFive.agreeableness.percentile}th %tile</td>
                <td className="py-2.5 px-3 text-slate-700">{results.bigFive.agreeableness.level}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-medium text-slate-900">Emotional Stability</td>
                <td className="py-2.5 px-3 font-mono text-slate-800">{results.bigFive.emotionalStability.sten} / 10</td>
                <td className="py-2.5 px-3 font-mono text-slate-600">{results.bigFive.emotionalStability.percentile}th %tile</td>
                <td className="py-2.5 px-3 text-slate-700">{results.bigFive.emotionalStability.level}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: Cognitive Aptitude Battery */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1">
            03. General Cognitive Aptitude Battery (GCAT)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-100/70 rounded-xl">
              <span className="text-slate-500 block">Numerical Reasoning</span>
              <strong className="text-slate-900 font-mono text-sm">{results.cognitive.numerical.accuracyPct}%</strong>
              <span className="text-slate-500 block mt-0.5">Speed: {results.cognitive.numerical.speedIndex}s avg</span>
            </div>
            <div className="p-4 bg-slate-100/70 rounded-xl">
              <span className="text-slate-500 block">Verbal Syllogisms</span>
              <strong className="text-slate-900 font-mono text-sm">{results.cognitive.verbal.accuracyPct}%</strong>
              <span className="text-slate-500 block mt-0.5">Speed: {results.cognitive.verbal.speedIndex}s avg</span>
            </div>
            <div className="p-4 bg-slate-100/70 rounded-xl">
              <span className="text-slate-500 block">Abstract Patterns</span>
              <strong className="text-slate-900 font-mono text-sm">{results.cognitive.abstractPattern.accuracyPct}%</strong>
              <span className="text-slate-500 block mt-0.5">Speed: {results.cognitive.abstractPattern.speedIndex}s avg</span>
            </div>
            <div className="p-4 bg-slate-100/70 rounded-xl">
              <span className="text-slate-500 block">Logical Constraints</span>
              <strong className="text-slate-900 font-mono text-sm">{results.cognitive.logicalDeduction.accuracyPct}%</strong>
              <span className="text-slate-500 block mt-0.5">Speed: {results.cognitive.logicalDeduction.speedIndex}s avg</span>
            </div>
          </div>
        </div>

        {/* Section 5: Target Career Alignment */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1">
            04. Recommended Occupational Pathway & Labor Intelligence
          </h2>
          <div className="p-5 bg-slate-100/70 rounded-xl text-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-slate-950">{targetCareer.title}</span>
              <span className="font-mono text-teal-800 font-bold text-sm">{targetCareer.overallMatchScore}% Congruence</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{targetCareer.jobDescription}</p>
            <div className="pt-2 grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block">Regional African Demand:</span>
                <strong className="text-slate-800">{targetCareer.demandTier}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Estimated Regional Compensation:</span>
                <strong className="text-slate-800 font-mono">{targetCareer.salaryEstimates.usd} ({targetCareer.salaryEstimates.zar})</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Longitudinal Educational & Career Success Forecasting */}
        {(() => {
          const forecast = results.harmonicForecast || generateHarmonicPredictiveProfile(results, userProfile || undefined);
          return (
            <div className="mb-8 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1">
                  05. Longitudinal Educational & Career Trajectory Forecast
                </h2>
                <span className="text-xs font-mono font-bold text-teal-800">
                  IPQ: {forecast.inherentPotentialQuotient}/100
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                <div className="p-3.5 bg-slate-100 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">Inception Momentum</span>
                  <strong className="text-slate-900 font-mono text-sm">{forecast.triadicResonance.inceptionMomentum}%</strong>
                  <span className="text-slate-500 block text-[10px] mt-0.5">Autonomy & Initiation</span>
                </div>
                <div className="p-3.5 bg-slate-100 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">Structural Fortitude</span>
                  <strong className="text-slate-900 font-mono text-sm">{forecast.triadicResonance.structuralFortitude}%</strong>
                  <span className="text-slate-500 block text-[10px] mt-0.5">Cognitive Grit & Stability</span>
                </div>
                <div className="p-3.5 bg-slate-100 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">Sovereign Mastery</span>
                  <strong className="text-slate-900 font-mono text-sm">{forecast.triadicResonance.sovereignMastery}%</strong>
                  <span className="text-slate-500 block text-[10px] mt-0.5">Strategic Command</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-teal-50/60 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">Academic Completion Probability</strong>
                    <span className="font-mono text-teal-800 font-bold">{forecast.educationalForecast.successProbability}%</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Optimal Learning Modality: <strong className="text-slate-800">{forecast.educationalForecast.optimalLearningCadence}</strong>. Projected mastery horizon: ~{forecast.educationalForecast.projectedMasteryMonths} months.
                  </p>
                </div>

                <div className="p-4 bg-teal-50/60 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">5-Year Career Ascent Velocity</strong>
                    <span className="font-mono text-teal-800 font-bold">{forecast.careerForecast.fiveYearAscentProbability}%</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Cadence: <strong className="text-slate-800">{forecast.careerForecast.cyclicalTimingPhase}</strong>. Trajectory: {forecast.careerForecast.longitudinalVelocity}.
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Section 7: Governance & Disclaimers */}
        <div className="p-5 bg-slate-100 rounded-xl text-[11px] text-slate-600 leading-relaxed">
          <strong className="text-slate-900 block mb-1">Psychometric Governance & Statutory Disclaimers:</strong>
          This report translates psychometric assessment evidence into career guidance and development planning. It does NOT constitute a clinical psychological or psychiatric diagnosis. Under South Africa’s Employment Equity Act & POPIA, Kenya’s Data Protection Act, and Nigeria’s NDPA, psychometric assessments must not be utilized as the sole deterministic basis for employment selection, student exclusion, or adverse educational determinations.
        </div>
      </div>
    </div>
  );
};
