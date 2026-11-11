/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Occupational Matching Engine & Career Recommendations View
 * Dedicated full webpage for occupational matching, ISCO-08 taxonomy, and congruence algorithms.
 */

import React, { useState } from 'react';
import { CareerMatch, AssessmentResultRecord, UserProfile } from '../../types';
import { CareerDetailModal } from './CareerDetailModal';
import { CareerComparisonModal } from './CareerComparisonModal';

interface CareerRecommendationsViewProps {
  careers: CareerMatch[];
  results: AssessmentResultRecord;
  userProfile?: UserProfile | null;
  onSelectCareerForRoadmap: (career: CareerMatch) => void;
  onNavigateToRoadmap: () => void;
}

export const CareerRecommendationsView: React.FC<CareerRecommendationsViewProps> = ({
  careers,
  results,
  userProfile,
  onSelectCareerForRoadmap,
  onNavigateToRoadmap,
}) => {
  const [activeTab, setActiveTab] = useState<'matches' | 'architecture'>('matches');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedDemandTier, setSelectedDemandTier] = useState<string>('all');
  const [activeModalCareer, setActiveModalCareer] = useState<CareerMatch | null>(null);
  const [acquiredSkills, setAcquiredSkills] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>(
    careers.slice(0, 2).map((c) => c.id)
  );

  const industries = Array.from(new Set(careers.map((c) => c.industry)));
  const demandTiers = Array.from(new Set(careers.map((c) => c.demandTier)));

  const skillBoostOptions = [
    'Cloud Architecture & Distributed Systems',
    'Financial Modeling & Risk Analytics',
    'Renewable Grid & Solar Engineering',
    'Agile Product Delivery & PMP',
    'Python, SQL & Health Informatics',
  ];

  const toggleSkill = (skill: string) => {
    if (acquiredSkills.includes(skill)) {
      setAcquiredSkills(acquiredSkills.filter((s) => s !== skill));
    } else {
      setAcquiredSkills([...acquiredSkills, skill]);
    }
  };

  const calculateDynamicScore = (baseScore: number) => {
    // Each acquired skill boosts the score by 3%, max capped at 99%
    const boost = acquiredSkills.length * 3;
    return Math.min(baseScore + boost, 99);
  };

  const filteredCareers = careers.filter((c) => {
    if (selectedIndustry !== 'all' && c.industry !== selectedIndustry) return false;
    if (selectedDemandTier !== 'all' && c.demandTier !== selectedDemandTier) return false;
    return true;
  });

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-10 space-y-8">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 bg-slate-900/60 p-6 sm:p-8 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-wider mb-1">
            <span>Core Module 02</span>
            <span aria-hidden="true">·</span>
            <span>ISCO-08 & Holland Hexagonal Matching</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Occupational Matching Engine
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Multi-attribute congruence calculation evaluating your measured Holland vocational code (<span className="text-teal-400 font-mono font-bold">{results.riasec.hollandCode}</span>), Five-Factor behavioral tendencies, and GCAT cognitive learning percentile against verified economic demand profiles.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab(activeTab === 'matches' ? 'architecture' : 'matches')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-teal-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-200 hover:text-white'
            }`}
          >
            {activeTab === 'architecture' ? '← View Live Matches' : 'How the Engine Works'}
          </button>
          <button
            onClick={onNavigateToRoadmap}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            View Career Roadmap →
          </button>
        </div>
      </div>

      {/* Engine Architecture Deep-Dive Tab */}
      {activeTab === 'architecture' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
              <span className="text-xs font-mono text-teal-400 font-bold block">MATHEMATICAL MODEL 01</span>
              <h2 className="text-lg font-bold text-white">Holland Hexagonal Distance Calculus</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We compute geometric distance across the RIASEC circumplex. Adjacent codes yield higher baseline congruence than polar opposites. Weighted multi-rank weighting produces the final congruence coefficient.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold block">MATHEMATICAL MODEL 02</span>
              <h2 className="text-lg font-bold text-white">Five-Factor Euclidean Fit Vector</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Each ISCO-08 occupational archetype possesses an empirical target Sten range. The engine computes normalized Euclidean distance across personality dimensions, ensuring candidate dispositions thrive.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold block">MATHEMATICAL MODEL 03</span>
              <h2 className="text-lg font-bold text-white">GCAT Cognitive Complexity Thresholds</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Roles requiring high abstract modeling or quantitative deduction enforce cognitive percentile suitability floors. Candidates meeting complexity floors receive accelerated readiness multipliers.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl space-y-3">
              <span className="text-xs font-mono text-violet-400 font-bold block">MATHEMATICAL MODEL 04</span>
              <h2 className="text-lg font-bold text-white">Harmonic Trajectory & Triadic Vector</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Synthesizes Inception Momentum, Structural Fortitude, and Sovereign Mastery to calculate an Inherent Potential Quotient (IPQ), forecasting educational mastery timelines and 5-year career ascent velocity.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-8 sm:p-10 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-white">ISCO-08 Classification & African Labor Market Calibration</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              Unlike generic career tests that recommend outdated or non-existent Western roles, Vantage maps all occupations directly to the International Standard Classification of Occupations (ISCO-08). Furthermore, each role includes regional compensation bands across four currencies (USD, ZAR, KES, NGN), accredited Pan-African university hubs, and international professional credentials.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
              <div className="p-4 bg-slate-950/70 rounded-xl space-y-1">
                <span className="text-teal-400 font-mono font-bold block">KENYA HUB</span>
                <strong className="text-white block">Silicon Savannah Tech & Agtech</strong>
                <p className="text-slate-400">Calibrated to Nairobi tech corridors, geothermal energy expansion, and regional fintech switches.</p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl space-y-1">
                <span className="text-cyan-400 font-mono font-bold block">SOUTH AFRICA HUB</span>
                <strong className="text-white block">Financial Services & Clean Grid</strong>
                <p className="text-slate-400">Calibrated to Sandton banking, Cape Town software hubs, and national renewable IPP projects.</p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl space-y-1">
                <span className="text-emerald-400 font-mono font-bold block">NIGERIA HUB</span>
                <strong className="text-white block">Digital Economy & Supply Chain</strong>
                <p className="text-slate-400">Calibrated to Lagos consumer tech, FMCG supply chain networks, and energy engineering.</p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl space-y-1">
                <span className="text-purple-400 font-mono font-bold block">RWANDA & PAN-AFRICA</span>
                <strong className="text-white block">Kigali Innovation City & AfCFTA</strong>
                <p className="text-slate-400">Calibrated to cross-border continental trade logistics, biomedical data, and international NGOs.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Interactive Skills Retooling Simulator */}
          <div className="bg-slate-900 rounded-2xl p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold uppercase block">
                  Interactive Skills Retooling Simulator
                </span>
                <p className="text-xs text-slate-300">
                  Select certifications or skills you plan to acquire to simulate real-time occupational congruence surges:
                </p>
              </div>
              {acquiredSkills.length > 0 && (
                <span className="text-xs text-teal-400 font-mono font-semibold">
                  +{acquiredSkills.length * 3}% Congruence Boost Active
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {skillBoostOptions.map((skill) => {
                const isSelected = acquiredSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-teal-400 text-slate-950 font-semibold shadow-sm'
                        : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-900/70 p-4 rounded-xl text-xs w-full">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Industry:</span>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="bg-slate-950 text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
              >
                <option value="all">All Industries ({careers.length})</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Growth Tier:</span>
              <select
                value={selectedDemandTier}
                onChange={(e) => setSelectedDemandTier(e.target.value)}
                className="bg-slate-950 text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
              >
                <option value="all">All Market Tiers</option>
                {demandTiers.map((dt) => (
                  <option key={dt} value={dt}>
                    {dt}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-teal-300 font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <span>⚖️ Compare Careers</span>
              <span className="px-1.5 py-0.2 bg-teal-400/20 text-teal-300 rounded text-[10px] font-mono">
                {selectedForComparison.length}
              </span>
            </button>

            <div className="text-slate-500 ml-auto hidden sm:block">
              Showing {filteredCareers.length} matching occupations
            </div>
          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {filteredCareers.map((career) => {
              const dynamicScore = calculateDynamicScore(career.overallMatchScore);

              return (
                <div
                  key={career.id}
                  className="bg-slate-900 rounded-2xl p-7 flex flex-col justify-between hover:bg-slate-850 transition-all shadow-sm group"
                >
                  <div>
                    {/* Meta header */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>ISCO-08: {career.iscoCode}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-teal-400">{career.demandTier}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Match</span>
                        <span className="text-base font-bold text-teal-400 font-mono tabular-nums">
                          {dynamicScore}%
                        </span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                      {career.title}
                    </h2>

                    <span className="text-xs text-slate-400 block mb-3 font-medium">
                      {career.industry}
                    </span>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                      {career.jobDescription}
                    </p>

                    {/* Score breakdown strip */}
                    <div className="grid grid-cols-4 gap-2 p-3 bg-slate-950/70 rounded-xl text-[11px] mb-4 text-center">
                      <div>
                        <span className="text-slate-500 block">RIASEC</span>
                        <span className="text-slate-200 font-mono font-medium">{career.riasecCongruencePct}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Personality</span>
                        <span className="text-slate-200 font-mono font-medium">{career.personalityFitPct}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Cognitive</span>
                        <span className="text-slate-200 font-mono font-medium">{career.cognitiveSuitabilityPct}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Skills</span>
                        <span className="text-teal-400 font-mono font-medium">
                          {Math.min(career.skillsReadinessPct + acquiredSkills.length * 5, 99)}%
                        </span>
                      </div>
                    </div>

                    {/* Predictive Trajectory & Harmonic Congruence Indicator */}
                    {career.predictiveForecast && (
                      <div className="mb-4 p-3 bg-teal-950/20 rounded-xl space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-teal-300 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                            Educational Success Forecast
                          </span>
                          <span className="font-mono text-teal-300 font-bold">
                            {career.predictiveForecast.educationalSuccessProbability}% Probable
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Mastery Horizon: ~{career.predictiveForecast.projectedMasteryMonths} mo</span>
                          <span>Harmonic Resonance: {career.predictiveForecast.harmonicResonanceScore}%</span>
                        </div>
                      </div>
                    )}

                    {/* Compensation preview */}
                    <div className="text-xs text-slate-400 mb-4">
                      <span>Entry Benchmark: </span>
                      <span className="text-white font-mono font-semibold">{career.salaryEstimates.usd}</span>
                      <span className="text-slate-500"> ({career.salaryEstimates.zar})</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (selectedForComparison.includes(career.id)) {
                            setSelectedForComparison(selectedForComparison.filter((id) => id !== career.id));
                          } else {
                            setSelectedForComparison([...selectedForComparison.slice(0, 2), career.id]);
                          }
                        }}
                        className={`px-3 py-1.5 text-[11px] rounded-lg transition-colors font-medium flex items-center gap-1.5 ${
                          selectedForComparison.includes(career.id)
                            ? 'bg-teal-400 text-slate-950 font-bold'
                            : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{selectedForComparison.includes(career.id) ? '✓ In Compare' : '+ Compare'}</span>
                      </button>

                      <button
                        onClick={() => setActiveModalCareer(career)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-lg transition-colors"
                      >
                        Deep Dive
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectCareerForRoadmap(career)}
                      className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors shadow-sm"
                    >
                      Select for Roadmap
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Detail Modal */}
      <CareerDetailModal
        career={activeModalCareer}
        onClose={() => setActiveModalCareer(null)}
        results={results}
        userProfile={userProfile}
        onAddToRoadmap={(car) => onSelectCareerForRoadmap(car)}
      />

      {/* Comparison Modal */}
      <CareerComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        availableCareers={careers}
        initialCareerIds={selectedForComparison}
        onSelectCareerForRoadmap={(car) => {
          onSelectCareerForRoadmap(car);
          setIsComparisonOpen(false);
        }}
      />
    </div>
  );
};
