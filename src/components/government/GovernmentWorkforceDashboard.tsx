/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage National Government Workforce Intelligence Console (B2G)
 * Macro labor-market indicators, youth career aspiration vs demand mismatches, and regional talent distribution.
 */

import React, { useState } from 'react';
import { AFRICAN_COUNTRIES_WORKFORCE } from '../../data/sampleGovernmentData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const GovernmentWorkforceDashboard: React.FC = () => {
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>('kenya');
  const [grantBudgetMillionUsd, setGrantBudgetMillionUsd] = useState<number>(25);
  const metrics = AFRICAN_COUNTRIES_WORKFORCE[selectedCountryKey] || AFRICAN_COUNTRIES_WORKFORCE['kenya'];

  // Prepare chart data for Youth Aspiration vs Market Demand
  const mismatchChartData = metrics.youthCareerAspirationVsMarketDemand.map((item) => ({
    sector: item.sector,
    'Youth Aspiration %': item.youthInterestPct,
    'Market Demand %': item.marketOpeningsPct,
  }));

  const handleExportBrief = () => {
    const briefContent = `VANTAGE NATIONAL WORKFORCE & SKILLS-GAP INTELLIGENCE BRIEF
Country: ${selectedCountryKey.toUpperCase()}
Generated: ${new Date().toISOString()}
Total Assessed Youth: ${metrics.totalYouthAssessed.toLocaleString()}
Active Surveys: ${metrics.activeLaborSurveys}
Regions Monitored: ${metrics.regions.length}

CRITICAL SHORTAGE OCCUPATIONS:
${metrics.criticalShortageOccupations.map((c) => `- ${c.title} (Sector: ${c.sector}): ${c.nationalDeficitPct}% National Deficit. Advisory: ${c.recommendedCurriculumReform}`).join('\n')}

REGIONAL WORKFORCE DISTRIBUTION:
${metrics.regions.map((r) => `- ${r.regionName}: ${r.assessedYouth.toLocaleString()} Youth Assessed, ${r.youthUnemploymentPct}% Unemployment, Top Need: ${r.topEmergingNeed}`).join('\n')}
`;

    const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vantage_National_Brief_${selectedCountryKey.toUpperCase()}_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Simulated TVET trainees retooled based on grant budget
  const estimatedTraineesRetooled = grantBudgetMillionUsd * 3400;
  const estimatedDeficitReductionPct = Math.min(Math.round((grantBudgetMillionUsd / 60) * 45), 45);

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Public Sector Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span>National Labor Intelligence (B2G)</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400 font-medium">POPIA / NDPA Compliant Aggregations</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            National Workforce & Skills-Gap Intelligence Console
          </h1>

          <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Real-time demographic psychometric mapping, regional talent supply/demand balancing, and evidence-based TVET/university curriculum intervention guidance.
          </p>
        </div>

        {/* Action & Country Selector */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleExportBrief}
            className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 rounded-lg transition-colors whitespace-nowrap"
          >
            Export Policy Brief ↓
          </button>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium whitespace-nowrap">Focus:</label>
            <select
              value={selectedCountryKey}
              onChange={(e) => setSelectedCountryKey(e.target.value)}
              className="bg-slate-900 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-400 font-semibold"
            >
              <option value="kenya">Kenya (Ministry of Labour & TVET)</option>
              <option value="south_africa">South Africa (DHET & SETA)</option>
              <option value="nigeria">Nigeria (Ministry of Labour & 3MTT)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl">
          <span className="text-xs font-medium text-slate-400 block mb-1">
            Total Assessed Youth & Learners
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
            {metrics.totalYouthAssessed.toLocaleString()}
          </div>
          <span className="text-xs text-teal-400 mt-2 block">
            Representing {metrics.regions.length} administrative economic zones
          </span>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <span className="text-xs font-medium text-slate-400 block mb-1">
            Active Longitudinal Labor Surveys
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tabular-nums">
            {metrics.activeLaborSurveys} Surveys
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            National Employment Service & TVET Authority
          </span>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <span className="text-xs font-medium text-slate-400 block mb-1">
            Priority Critical Shortage Roles
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-rose-400 font-mono tabular-nums">
            {metrics.criticalShortageOccupations.length} National Deficits
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            Urgent vocational retooling required
          </span>
        </div>
      </div>

      {/* TVET Intervention Grant Allocation Simulator */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase font-bold tracking-wider block mb-0.5">
              Policy Planning Model
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              TVET Retooling Grant Allocation & Impact Estimator
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate multilateral development grant impact on national occupational deficit closure.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-950/70 p-4 rounded-xl shrink-0">
            <div>
              <span className="text-[11px] text-slate-500 block">TRAINEES UPSKILLED</span>
              <span className="text-base font-bold text-teal-400 font-mono tabular-nums">
                ~{estimatedTraineesRetooled.toLocaleString()} Youth
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">DEFICIT REDUCTION</span>
              <span className="text-base font-bold text-cyan-400 font-mono tabular-nums">
                -{estimatedDeficitReductionPct}% Deficit
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Allocated Vocational Budget: ${grantBudgetMillionUsd} Million USD</span>
            <span>Est. Cost per Retooled Citizen: ~$295 USD</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={grantBudgetMillionUsd}
            onChange={(e) => setGrantBudgetMillionUsd(parseInt(e.target.value))}
            className="w-full accent-teal-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>$5M (Pilot Regional Scheme)</span>
            <span>$25M (Standard National Program)</span>
            <span>$60M (World Bank / AfDB Multi-Year Compact)</span>
          </div>
        </div>
      </div>

      {/* Critical Chart: Youth Career Aspiration vs Market Demand Mismatch */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-white">
              Youth Career Aspirations vs. Real Economic Labor Openings
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Detects systemic labor supply mismatches (e.g. oversupply in digital services vs critical deficit in renewable energy & agriculture)
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Macro Labor Survey 2025/2026</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mismatchChartData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
              <XAxis dataKey="sector" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" domain={[0, 50]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Youth Aspiration %" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Market Demand %" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Talent Distribution & Deficits Table */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
        <h2 className="text-base font-bold text-white mb-1">
          Sub-National Regional Workforce Distribution
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Granular provincial breakdowns identifying local talent density and targeted interventions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 bg-slate-950/40">
                <th className="py-3 px-3 font-medium rounded-l-lg">Province / Region</th>
                <th className="py-3 px-3 font-medium text-right">Youth Assessed</th>
                <th className="py-3 px-3 font-medium text-right">Unemployment Rate</th>
                <th className="py-3 px-3 font-medium text-right">STEM Aptitude %</th>
                <th className="py-3 px-3 font-medium">Critical Emerging Need</th>
                <th className="py-3 px-3 font-medium rounded-r-lg">Policy Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {metrics.regions.map((reg) => (
                <tr key={reg.regionName} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-white">{reg.regionName}</td>
                  <td className="py-3.5 px-3 font-mono text-right text-slate-300 tabular-nums">
                    {reg.assessedYouth.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-right text-rose-400 tabular-nums font-semibold">
                    {reg.youthUnemploymentPct}%
                  </td>
                  <td className="py-3.5 px-3 font-mono text-right text-teal-400 tabular-nums font-medium">
                    {reg.stemInterestPct}%
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">{reg.topEmergingNeed}</td>
                  <td className="py-3.5 px-3 text-slate-400">{reg.priorityIntervention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Shortage Occupations & Curricular Reform Advisory */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
        <h2 className="text-base font-bold text-white mb-1">
          National Priority Skills Shortages & Educational Curriculum Mandates
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          High-urgency occupational gaps flagged for national scholarship funding and vocational modernization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.criticalShortageOccupations.map((shortage) => (
            <div key={shortage.title} className="p-5 bg-slate-950/70 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">{shortage.title}</span>
                <span className="text-xs font-mono text-rose-400 font-semibold tabular-nums">
                  {shortage.nationalDeficitPct}% Deficit
                </span>
              </div>
              <div className="text-xs text-slate-400 mb-2 font-medium">
                Sector: {shortage.sector}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-2">
                <strong className="text-teal-400">Curriculum Advisory:</strong> {shortage.recommendedCurriculumReform}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
