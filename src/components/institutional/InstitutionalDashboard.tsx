/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Institutional & Enterprise Dashboard (B2B)
 * University cohort analytics, corporate talent profiling, skills-gap heatmaps, and bulk assessment campaigns.
 */

import React, { useState } from 'react';
import { SAMPLE_INSTITUTIONAL_ANALYTICS, SAMPLE_ENTERPRISE_CAMPAIGNS } from '../../data/sampleInstitutionalData';

export const InstitutionalDashboard: React.FC = () => {
  const [data] = useState(SAMPLE_INSTITUTIONAL_ANALYTICS);
  const [campaigns, setCampaigns] = useState(SAMPLE_ENTERPRISE_CAMPAIGNS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState<string>('all');
  const [simulatorSten, setSimulatorSten] = useState<number>(7.0);

  // New campaign state
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newTargetRole, setNewTargetRole] = useState('');
  const [newInvitedCount, setNewInvitedCount] = useState(250);
  const [newCutoffSten, setNewCutoffSten] = useState(7.0);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;

    const camp = {
      id: `camp_${Date.now()}`,
      name: newCampaignName.trim(),
      targetRole: newTargetRole || 'Software Engineers & Data Analysts',
      candidatesInvited: newInvitedCount,
      completed: 0,
      completionRate: 0,
      deadline: '2026-12-31',
      status: 'Active',
      cutOffSten: newCutoffSten,
    };

    setCampaigns([camp, ...campaigns]);
    setShowCreateModal(false);
    setNewCampaignName('');
    setNewTargetRole('');
  };

  // CSV Export
  const handleExportCohortCsv = () => {
    const headers = ['Faculty / Department', 'Candidate Count', 'Dominant Trait', 'Employability Readiness %'];
    const rows = data.departmentBreakdowns.map((d) => [
      `"${d.department}"`,
      d.candidateCount,
      `"${d.dominantTrait}"`,
      `${d.employabilityReadinessPct}%`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Vantage_Cohort_Analytics_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulated yield based on Sten cutoff
  const calculateSimulatedYield = (sten: number) => {
    // Normal distribution approximation: Sten 5.5 is 50th percentile
    if (sten <= 4.0) return { qualifiedCount: 1140, pct: 91 };
    if (sten <= 5.0) return { qualifiedCount: 1050, pct: 84 };
    if (sten <= 6.0) return { qualifiedCount: 860, pct: 69 };
    if (sten <= 7.0) return { qualifiedCount: 525, pct: 42 };
    if (sten <= 8.0) return { qualifiedCount: 280, pct: 22 };
    return { qualifiedCount: 112, pct: 9 };
  };

  const simulatedYield = calculateSimulatedYield(simulatorSten);

  const filteredDepartments = data.departmentBreakdowns.filter((dept) => {
    if (selectedFacultyFilter === 'all') return true;
    return dept.department.toLowerCase().includes(selectedFacultyFilter.toLowerCase());
  });

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>{data.organizationName}</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise B2B Tier</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400 font-semibold">Multi-tenant Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Institutional Talent & Cohort Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Aggregated psychometric benchmarking, departmental skill deficit identification, and bulk recruitment assessment campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportCohortCsv}
            className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 rounded-lg transition-colors whitespace-nowrap"
          >
            Export Cohort CSV ↓
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            Create Assessment Campaign
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-6 rounded-2xl">
          <span className="text-xs font-medium text-slate-400 block mb-1">
            Assessed Candidates
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
            {data.totalCandidates.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-400 mt-2 block">Active across 4 faculties</span>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <span className="text-xs font-medium text-slate-400 block mb-1">
            Battery Completion Rate
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-teal-400 font-mono tabular-nums">
            {data.completionRate}%
          </div>
          <span className="text-xs text-slate-400 mt-2 block">Avg completion time: 24 mins</span>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <span className="text-xs font-medium text-slate-400 block mb-1">
            Mean Cognitive Aptitude
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tabular-nums">
            {data.averageCognitivePercentile}th %tile
          </div>
          <span className="text-xs text-slate-400 mt-2 block">Calibrated to Sub-Saharan norms</span>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <span className="text-xs font-medium text-slate-400 block mb-1">
            Dominant Holland Cluster
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {data.topHollandCodes[0].code}
          </div>
          <span className="text-xs text-slate-400 mt-2 block">STEM & Systems Architecture</span>
        </div>
      </div>

      {/* Interactive Candidate Cut-Off Simulator Box */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase font-bold tracking-wider block mb-0.5">
              Recruitment Analytics Simulator
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Dynamic Cut-Off Sten & Yield Forecaster
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate candidate qualification pools before dispatching technical interview rounds.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/70 p-3 rounded-xl shrink-0">
            <div>
              <span className="text-[11px] text-slate-500 block">QUALIFYING POOL</span>
              <span className="text-lg font-bold text-teal-400 font-mono tabular-nums">
                {simulatedYield.qualifiedCount} candidates ({simulatedYield.pct}%)
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Sten Cut-off: {simulatorSten.toFixed(1)} / 10.0</span>
            <span>Yield: {simulatedYield.pct}% of active cohort</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="9.0"
            step="0.5"
            value={simulatorSten}
            onChange={(e) => setSimulatorSten(parseFloat(e.target.value))}
            className="w-full accent-teal-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>4.0 (Broad Vocational Intake)</span>
            <span>6.5 (Standard Graduate Bar)</span>
            <span>9.0 (Elite Technical Residency)</span>
          </div>
        </div>
      </div>

      {/* Skills Gap Analysis Table */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-white">Cohort Skills-Gap & Deficit Matrix</h2>
            <p className="text-xs text-slate-400 mt-0.5">Comparing cohort measured competency against high-growth market demand</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">Data Source: African Labor Market Intelligence 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 bg-slate-950/40">
                <th className="py-3 px-3 font-medium rounded-l-lg">Competency Domain</th>
                <th className="py-3 px-3 font-medium text-right">Industry Demand</th>
                <th className="py-3 px-3 font-medium text-right">Cohort Benchmark</th>
                <th className="py-3 px-3 font-medium text-right">Net Deficit</th>
                <th className="py-3 px-3 font-medium rounded-r-lg">Curricular Action Priority</th>
              </tr>
            </thead>
            <tbody>
              {data.skillsGapAnalysis.map((item) => (
                <tr key={item.skillName} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-3 font-medium text-white">{item.skillName}</td>
                  <td className="py-3.5 px-3 font-mono text-right text-slate-300 tabular-nums">{item.marketDemand}%</td>
                  <td className="py-3.5 px-3 font-mono text-right text-teal-400 tabular-nums">{item.cohortAverage}%</td>
                  <td className="py-3.5 px-3 font-mono text-right text-rose-400 tabular-nums font-semibold">
                    {item.deficitPct}%
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">
                    {Math.abs(item.deficitPct) > 20 ? (
                      <span className="text-rose-400 font-medium">High Urgency: Capstone lab expansion</span>
                    ) : (
                      <span className="text-slate-300">Moderate: Supplementary micro-credential</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Breakdowns & Active Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Breakdowns */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white mb-0.5">Faculty & Department Performance</h2>
              <p className="text-xs text-slate-400">Distribution across academic units</p>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-1.5 text-[11px] font-mono">
              <button
                onClick={() => setSelectedFacultyFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedFacultyFilter === 'all' ? 'bg-teal-400 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFacultyFilter('engineering')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedFacultyFilter === 'engineering' ? 'bg-teal-400 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Eng
              </button>
              <button
                onClick={() => setSelectedFacultyFilter('business')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedFacultyFilter === 'business' ? 'bg-teal-400 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Bus
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredDepartments.map((dept) => (
              <div key={dept.department} className="p-4 bg-slate-950/70 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">{dept.department}</span>
                  <span className="text-xs font-mono text-teal-400 tabular-nums">{dept.candidateCount} students</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Archetype: {dept.dominantTrait}</span>
                  <span className="font-mono text-slate-300">{dept.employabilityReadinessPct}% Employable</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-400 h-full" style={{ width: `${dept.employabilityReadinessPct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white">Bulk Assessment Campaigns</h2>
                <p className="text-xs text-slate-400">Cohorts dispatched for talent benchmarking and graduate hiring</p>
              </div>
            </div>

            <div className="space-y-3">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-4 bg-slate-950/70 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{camp.name}</span>
                    <span className="text-[11px] font-mono text-teal-400">{camp.status}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    Target: {camp.targetRole} · Cut-off Sten: {camp.cutOffSten}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>
                      {camp.completed} / {camp.candidatesInvited} completed ({camp.completionRate}%)
                    </span>
                    <span>Deadline: {camp.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 flex justify-between items-center text-xs">
            <span className="text-slate-400">Minimum Group Size Threshold: N ≥ 15 (Protects individual anonymity)</span>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
            >
              + Dispatch New Cohort
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Creating Campaign */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl text-left">
            <h3 className="text-base font-bold text-white mb-2">Create Assessment Campaign</h3>
            <p className="text-xs text-slate-400 mb-4">
              Configure bulk candidate invitations with cut-off scoring standards.
            </p>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  placeholder="e.g. 2026 Energy Engineering Graduate Intake"
                  className="w-full bg-slate-950 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Role / Track</label>
                <input
                  type="text"
                  value={newTargetRole}
                  onChange={(e) => setNewTargetRole(e.target.value)}
                  placeholder="e.g. Junior Solar Grid Engineers"
                  className="w-full bg-slate-950 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Candidate Invites</label>
                  <input
                    type="number"
                    value={newInvitedCount}
                    onChange={(e) => setNewInvitedCount(Number(e.target.value))}
                    className="w-full bg-slate-950 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Cut-Off Sten (1-10)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="10"
                    value={newCutoffSten}
                    onChange={(e) => setNewCutoffSten(Number(e.target.value))}
                    className="w-full bg-slate-950 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
