/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Psychometric Results Dashboard
 * Borderless, Corner-to-Corner Layout.
 */

import React, { useState } from 'react';
import { AssessmentResultRecord, UserProfile } from '../../types';
import { generateHarmonicPredictiveProfile } from '../../services/predictiveEngine';
import { NormGroupSelectorModal } from './NormGroupSelectorModal';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface PsychometricResultsDashboardProps {
  results: AssessmentResultRecord;
  userProfile?: UserProfile | null;
  onNavigateToCareers: () => void;
  onNavigateToRoadmap: () => void;
  onOpenReport: () => void;
}

export const PsychometricResultsDashboard: React.FC<PsychometricResultsDashboardProps> = ({
  results,
  userProfile,
  onNavigateToCareers,
  onNavigateToRoadmap,
  onOpenReport,
}) => {
  const [isNormGroupOpen, setIsNormGroupOpen] = useState(false);
  // Format data for Big Five Radar
  const bigFiveRadarData = [
    { trait: 'Openness', sten: results.bigFive.openness.sten, fullMark: 10, percentile: results.bigFive.openness.percentile },
    { trait: 'Conscientiousness', sten: results.bigFive.conscientiousness.sten, fullMark: 10, percentile: results.bigFive.conscientiousness.percentile },
    { trait: 'Extraversion', sten: results.bigFive.extraversion.sten, fullMark: 10, percentile: results.bigFive.extraversion.percentile },
    { trait: 'Agreeableness', sten: results.bigFive.agreeableness.sten, fullMark: 10, percentile: results.bigFive.agreeableness.percentile },
    { trait: 'Emotional Stability', sten: results.bigFive.emotionalStability.sten, fullMark: 10, percentile: results.bigFive.emotionalStability.percentile },
  ];

  // Format data for Holland RIASEC Bar / Hexagon
  const riasecBarData = [
    { code: 'R', name: 'Realistic', score: results.riasec.realistic },
    { code: 'I', name: 'Investigative', score: results.riasec.investigative },
    { code: 'A', name: 'Artistic', score: results.riasec.artistic },
    { code: 'S', name: 'Social', score: results.riasec.social },
    { code: 'E', name: 'Enterprising', score: results.riasec.enterprising },
    { code: 'C', name: 'Conventional', score: results.riasec.conventional },
  ];

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-10 space-y-8">
      {/* Top Banner / Summary */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Candidate: {userProfile?.fullName || 'Assessed Individual'}</span>
            <span aria-hidden="true">·</span>
            <span>Completed {new Date(results.completedAt).toLocaleDateString()}</span>
            <span aria-hidden="true">·</span>
            <span>Version {results.assessmentVersion}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Comprehensive Psychometric Intelligence Profile
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Primary Vocational Holland Code: <strong className="text-teal-400 font-mono">{results.riasec.hollandCode}</strong> ({results.riasec.profileDescription})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsNormGroupOpen(true)}
            className="px-4 py-2.5 text-xs font-semibold text-teal-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>📊 Benchmark Norm Group & Sten Curve</span>
          </button>
          <button
            onClick={onNavigateToCareers}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-sm"
          >
            View Career Recommendations
          </button>
          <button
            onClick={onNavigateToRoadmap}
            className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors"
          >
            Development Roadmap
          </button>
          <button
            onClick={onOpenReport}
            className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors"
          >
            Download Official Report
          </button>
        </div>
      </div>

      {/* Validity & Psychometric Calibration Telemetry */}
      <div className="bg-slate-900/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-300">Instrument Protocol Status:</span>
          <span className="text-emerald-400 font-medium">
            {results.validity.status.toUpperCase()} (Consistency Score: {results.validity.consistencyScore}%)
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">
            Avg Reaction Time: <span className="font-mono tabular-nums">{results.validity.averageReactionTimeMs}ms</span>
          </span>
        </div>
        <p className="text-slate-400 italic">
          {results.validity.notes}
        </p>
      </div>

      {/* Grid: Big Five Radar & Holland RIASEC Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* BIG FIVE RADAR */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white">Five-Factor Personality Matrix (FFM)</h2>
                <p className="text-xs text-slate-400">Standardized Sten scores (1-10) against Pan-African tertiary norms</p>
              </div>
            </div>

            <div className="h-64 w-full flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={bigFiveRadarData} outerRadius="75%">
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="trait" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 10]} stroke="#475569" tick={false} />
                  <Radar name="Sten Score" dataKey="sten" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-6 text-xs bg-slate-950/40 p-4 rounded-xl mt-4">
            {bigFiveRadarData.map((d) => (
              <div key={d.trait} className="flex items-center justify-between py-1">
                <span className="text-slate-300">{d.trait}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{d.percentile}th %tile</span>
                  <span className="font-mono text-teal-400 font-semibold w-12 text-right">Sten {d.sten}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOLLAND RIASEC INTERESTS */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white">Holland Vocational Interests (RIASEC)</h2>
                <p className="text-xs text-slate-400">Affinities across the 6 occupational work environments</p>
              </div>
              <span className="font-mono text-xs px-3 py-1 bg-slate-950 text-teal-400 rounded-lg">
                Code: {results.riasec.hollandCode}
              </span>
            </div>

            <div className="h-64 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riasecBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Bar dataKey="score" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-slate-950/40 rounded-xl text-xs text-slate-300 leading-relaxed mt-4">
            <span className="text-white font-medium">Vocational Interpretation:</span> Primary concentration in <strong className="text-teal-300">{results.riasec.primaryCode}</strong> and <strong className="text-teal-300">{results.riasec.secondaryCode}</strong> domains indicates high compatibility with engineering, scientific inquiry, technical systems, or commercial leadership roles.
          </div>
        </div>
      </div>

      {/* Cognitive Aptitude & Future Skills Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* COGNITIVE APTITUDE BATTERY */}
        <div className="bg-slate-900 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">General Cognitive Aptitude Battery (GCAT)</h2>
              <p className="text-xs text-slate-400">Item-Response Theory (IRT) calibrated fluid and crystallized reasoning</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-teal-400 font-mono tabular-nums">
                {results.cognitive.overallPercentile}th
              </span>
              <span className="text-xs text-slate-400 block">{results.cognitive.overallBand} Band</span>
            </div>
          </div>

          <div className="space-y-4 my-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Numerical Problem Solving</span>
                <span className="font-mono text-slate-400 tabular-nums">{results.cognitive.numerical.accuracyPct}% accuracy · {results.cognitive.numerical.speedIndex}s avg</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: `${results.cognitive.numerical.accuracyPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Verbal Syllogisms & Logic</span>
                <span className="font-mono text-slate-400 tabular-nums">{results.cognitive.verbal.accuracyPct}% accuracy · {results.cognitive.verbal.speedIndex}s avg</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-400 h-full" style={{ width: `${results.cognitive.verbal.accuracyPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Abstract Pattern Induction</span>
                <span className="font-mono text-slate-400 tabular-nums">{results.cognitive.abstractPattern.accuracyPct}% accuracy · {results.cognitive.abstractPattern.speedIndex}s avg</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: `${results.cognitive.abstractPattern.accuracyPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Deductive Multi-Constraint Reasoning</span>
                <span className="font-mono text-slate-400 tabular-nums">{results.cognitive.logicalDeduction.accuracyPct}% accuracy · {results.cognitive.logicalDeduction.speedIndex}s avg</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full" style={{ width: `${results.cognitive.logicalDeduction.accuracyPct}%` }} />
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950/40 rounded-xl text-xs text-slate-400">
            Cognitive aptitude evaluates speed of acquisition for new technological tools, complex system troubleshooting, and data analysis capacity.
          </div>
        </div>

        {/* WORKPLACE SKILLS & CAREER VALUES */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-white mb-1">Workplace Competencies & Motivators</h2>
            <p className="text-xs text-slate-400 mb-4">African Union & World Economic Forum competency benchmarks</p>

            <div className="space-y-3 mb-6">
              {results.skills.slice(0, 4).map((sk) => (
                <div key={sk.name} className="flex items-center justify-between py-2 px-3 bg-slate-950/30 rounded-lg text-xs">
                  <span className="text-slate-300">{sk.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{sk.readiness}</span>
                    <span className="font-mono text-teal-400 font-semibold tabular-nums">{sk.level}%</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Primary Career Values
            </h3>
            <div className="space-y-2">
              {results.careerValues.slice(0, 3).map((val) => (
                <div key={val.id} className="p-3 bg-slate-950/40 rounded-lg text-xs flex items-center justify-between">
                  <span className="text-slate-200">{val.name}</span>
                  <span className="font-mono text-teal-400 font-medium">{val.importance}/100</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              onClick={onNavigateToCareers}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 transition-colors"
            >
              See matching career pathways →
            </button>
          </div>
        </div>
      </div>

      {/* PREDICTIVE TRAJECTORY & LONGITUDINAL SUCCESS INTELLIGENCE */}
      {(() => {
        const forecast = results.harmonicForecast || generateHarmonicPredictiveProfile(results, userProfile || undefined);
        return (
          <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-[11px] font-mono font-semibold">
                    PREDICTIVE INTELLIGENCE ENGINE
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-400 font-mono">
                    Triadic Vector & Harmonic Resonance
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Longitudinal Educational & Career Success Forecast
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Synthesizes cognitive grit, cyclical momentum cadence, and archetypal congruence to forecast academic mastery velocity and 5-year career ascent.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-xl">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                    Inherent Potential Quotient
                  </span>
                  <span className="text-2xl font-bold text-teal-400 font-mono">
                    {forecast.inherentPotentialQuotient}/100
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-300 font-mono font-bold text-sm">
                  IPQ
                </div>
              </div>
            </div>

            {/* Triadic Structural Vector (3 Pillars) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-950/60 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">Inception Momentum</span>
                    <span className="font-mono text-teal-400 font-bold text-sm">
                      {forecast.triadicResonance.inceptionMomentum}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Propensity to initiate novel ventures, creative velocity, and proactive autonomy.
                  </p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-400 h-full rounded-full transition-all"
                    style={{ width: `${forecast.triadicResonance.inceptionMomentum}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">Structural Fortitude</span>
                    <span className="font-mono text-emerald-400 font-bold text-sm">
                      {forecast.triadicResonance.structuralFortitude}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Cognitive grit, institutional endurance, and emotional stability under high-stakes loads.
                  </p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${forecast.triadicResonance.structuralFortitude}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">Sovereign Mastery</span>
                    <span className="font-mono text-cyan-400 font-bold text-sm">
                      {forecast.triadicResonance.sovereignMastery}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Systems synthesis, ethical stewardship, strategic coordination, and leadership readiness.
                  </p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all"
                    style={{ width: `${forecast.triadicResonance.sovereignMastery}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Dual Forecast Panels: Educational & Career */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Educational Success Forecast */}
              <div className="bg-slate-950/50 p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Educational Trajectory Forecast</h3>
                    <p className="text-[11px] text-slate-400">Academic grit & curriculum retention indicators</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-teal-400 font-mono">
                      {forecast.educationalForecast.successProbability}%
                    </span>
                    <span className="block text-[10px] text-slate-400">Completion Likelihood</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1.5 px-3 bg-slate-900/60 rounded-lg">
                    <span className="text-slate-400">Optimal Learning Modality:</span>
                    <span className="font-semibold text-teal-300">{forecast.educationalForecast.optimalLearningCadence}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 bg-slate-900/60 rounded-lg">
                    <span className="text-slate-400">Projected Mastery Horizon:</span>
                    <span className="font-mono font-semibold text-white">~{forecast.educationalForecast.projectedMasteryMonths} Months</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 bg-slate-900/60 rounded-lg">
                    <span className="text-slate-400">Academic Grit & Retention Index:</span>
                    <span className="font-mono font-semibold text-emerald-400">{forecast.educationalForecast.academicRetentionIndex}/100</span>
                  </div>
                </div>
              </div>

              {/* Career Success Forecast */}
              <div className="bg-slate-950/50 p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Longitudinal Career Trajectory</h3>
                    <p className="text-[11px] text-slate-400">5-year ascent probability & cyclical cadence</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-cyan-400 font-mono">
                      {forecast.careerForecast.fiveYearAscentProbability}%
                    </span>
                    <span className="block text-[10px] text-slate-400">Ascent Probability</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1.5 px-3 bg-slate-900/60 rounded-lg">
                    <span className="text-slate-400">Expression Archetype:</span>
                    <span className="font-semibold text-white truncate max-w-[220px]" title={forecast.expressionArchetype}>
                      {forecast.expressionArchetype}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 bg-slate-900/60 rounded-lg">
                    <span className="text-slate-400">Longitudinal Velocity:</span>
                    <span className="font-semibold text-teal-300 truncate max-w-[220px]">
                      {forecast.careerForecast.longitudinalVelocity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 bg-slate-900/60 rounded-lg">
                    <span className="text-slate-400">Cyclical Timing Cadence:</span>
                    <span className="font-mono text-slate-300 truncate max-w-[220px]">
                      {forecast.careerForecast.cyclicalTimingPhase}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Norm Group Selector & Gaussian Curve Modal */}
      <NormGroupSelectorModal
        isOpen={isNormGroupOpen}
        onClose={() => setIsNormGroupOpen(false)}
        results={results}
      />
    </div>
  );
};
