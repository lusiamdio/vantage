/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Career Comparison & Side-by-Side Analysis Tool
 * Evaluates 2 or 3 high-growth occupations simultaneously across cognitive thresholds, salary, stress, and milestones.
 */

import React, { useState } from 'react';
import { CareerMatch } from '../../types';
import { OCCUPATIONAL_DATABASE } from '../../data/occupations';

interface CareerComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableCareers: CareerMatch[];
  initialCareerIds?: string[];
  onSelectCareerForRoadmap: (career: CareerMatch) => void;
}

type CurrencyCode = 'USD' | 'ZAR' | 'KES' | 'NGN';

export const CareerComparisonModal: React.FC<CareerComparisonModalProps> = ({
  isOpen,
  onClose,
  availableCareers,
  initialCareerIds = [],
  onSelectCareerForRoadmap,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (initialCareerIds.length >= 2) return initialCareerIds.slice(0, 3);
    const defaults = availableCareers.slice(0, 2).map((c) => c.id);
    return defaults.length > 0 ? defaults : ['occ_cloud_architect', 'occ_renewable_engineer'];
  });

  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  if (!isOpen) return null;

  // Resolve compared careers
  const comparedCareers: CareerMatch[] = selectedIds
    .map((id) => {
      const fromAvailable = availableCareers.find((c) => c.id === id);
      if (fromAvailable) return fromAvailable;
      const fromDb = OCCUPATIONAL_DATABASE.find((c) => c.id === id);
      if (fromDb) return fromDb;
      return null;
    })
    .filter(Boolean) as CareerMatch[];

  const handleToggleCareer = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // replace last
        setSelectedIds([selectedIds[0], selectedIds[1], id]);
      }
    }
  };

  const formatSalary = (c: CareerMatch) => {
    switch (currency) {
      case 'ZAR':
        return c.salaryEstimates.zar;
      case 'KES':
        return c.salaryEstimates.kes;
      case 'NGN':
        return c.salaryEstimates.ngn;
      default:
        return c.salaryEstimates.usd;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-6 space-y-6 max-h-[92vh] overflow-y-auto border-none">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-teal-400/20 text-teal-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                Multi-Attribute Congruence Matrix
              </span>
              <span className="text-xs text-slate-400">Comparing {comparedCareers.length} Careers</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Side-by-Side Career Evaluation
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div className="p-1 bg-slate-950 rounded-lg flex items-center gap-1 text-xs font-mono">
              {(['USD', 'ZAR', 'KES', 'NGN'] as CurrencyCode[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    currency === cur
                      ? 'bg-teal-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 text-sm"
              aria-label="Close comparison"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Quick Career Selector Badges */}
        <div className="p-3 bg-slate-950/70 rounded-xl space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
            Select Up to 3 Occupations to Compare
          </span>
          <div className="flex flex-wrap gap-2">
            {availableCareers.slice(0, 8).map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => handleToggleCareer(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-teal-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{c.title}</span>
                  <span className="font-mono text-[10px]">{c.overallMatchScore}%</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparedCareers.map((c, idx) => (
            <div
              key={c.id}
              className="bg-slate-950/80 rounded-2xl p-6 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              {idx === 0 && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-teal-400 text-slate-950 text-[10px] font-bold uppercase rounded-bl-xl font-mono">
                  Primary Fit
                </div>
              )}

              <div className="space-y-4">
                {/* Title & Match Badge */}
                <div>
                  <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">
                    ISCO-{c.iscoCode} · {c.industry}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                    {c.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-teal-400 font-mono">
                      {c.overallMatchScore}%
                    </span>
                    <span className="text-xs text-slate-400">Congruence Score</span>
                  </div>
                </div>

                {/* Sub-Vector Dimension Bars */}
                <div className="space-y-2 p-3 bg-slate-900/90 rounded-xl text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">RIASEC Fit ({c.riasecCode}):</span>
                    <span className="text-white font-mono">{c.riasecCongruencePct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full" style={{ width: `${c.riasecCongruencePct}%` }} />
                  </div>

                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-slate-400">Cognitive Aptitude Floor:</span>
                    <span className="text-white font-mono">{c.cognitiveSuitabilityPct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full" style={{ width: `${c.cognitiveSuitabilityPct}%` }} />
                  </div>

                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-slate-400">Personality & Stress Resilience:</span>
                    <span className="text-white font-mono">{c.personalityFitPct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full" style={{ width: `${c.personalityFitPct}%` }} />
                  </div>
                </div>

                {/* Salary Telemetry */}
                <div className="p-3 bg-slate-900/90 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    Verified {currency} Compensation
                  </span>
                  <div className="text-sm font-bold text-white font-mono">
                    {formatSalary(c)}
                  </div>
                  <span className="text-[10px] text-teal-400 font-medium block">
                    Demand: {c.demandTier}
                  </span>
                </div>

                {/* Transition Difficulty & Degree Break-Even */}
                <div className="p-3 bg-slate-900/90 rounded-xl space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    Education vs. Fast Micro-Credentials
                  </span>
                  <span className="text-slate-200 font-semibold block text-[11px]">
                    Bridge: {c.transitionDifficulty}
                  </span>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div><strong>Key Cert:</strong> {c.globalCertifications[0] || 'AWS / Microsoft / Google'}</div>
                    <div><strong>Hubs:</strong> {c.africanAcademicHubs.slice(0, 2).join(' · ')}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  onSelectCareerForRoadmap(c);
                  onClose();
                }}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-sm text-center"
              >
                Set as Primary Target & View Roadmap →
              </button>
            </div>
          ))}
        </div>

        {/* Footnote on methodology */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <span>ISCO-08 Aligned · Holland Hexagonal Euclidean Metric · Continuous Regional Labor Updates</span>
          <button
            onClick={onClose}
            className="text-teal-400 hover:text-teal-300 transition-colors mt-2 sm:mt-0 font-medium"
          >
            Done Comparing
          </button>
        </div>
      </div>
    </div>
  );
};
