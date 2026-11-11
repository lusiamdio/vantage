/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Personal Career Development Roadmap
 * Borderless, Corner-to-Corner Layout.
 */

import React, { useState } from 'react';
import { CareerMatch, RoadmapMilestone, UserProfile } from '../../types';

interface CareerRoadmapViewProps {
  targetCareer: CareerMatch;
  userProfile?: UserProfile | null;
  onBrowseCareers: () => void;
  onOpenReport: () => void;
}

export const CareerRoadmapView: React.FC<CareerRoadmapViewProps> = ({
  targetCareer,
  userProfile,
  onBrowseCareers,
  onOpenReport,
}) => {
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([
    {
      id: 'm1',
      phase: '0-3 Months (Immediate Skills)',
      title: 'Targeted Technical Foundation & Micro-credentials',
      description: `Complete introductory coursework in ${targetCareer.essentialSkills?.[0] || 'core technical competencies'} and ${targetCareer.essentialSkills?.[1] || 'domain methodologies'}. Build a public Git repository showcasing a working prototype.`,
      category: 'Skill Acquisition',
      completed: true,
    },
    {
      id: 'm2',
      phase: '0-3 Months (Immediate Skills)',
      title: 'Psychometric Profile Alignment & Mentorship Onboarding',
      description: 'Connect with a senior industry mentor registered through African professional bodies (e.g. IEEE Africa, CILT, or National Engineering councils).',
      category: 'Mentorship',
      completed: false,
    },
    {
      id: 'm3',
      phase: '3-12 Months (Accreditation)',
      title: 'Formal Professional Certification Examination',
      description: `Prepare for and pass ${targetCareer.globalCertifications?.[0] || 'the primary industry accreditation credential'}.`,
      category: 'Certification',
      completed: false,
    },
    {
      id: 'm4',
      phase: '3-12 Months (Accreditation)',
      title: 'Applied Industrial Residency or Fellowship',
      description: 'Undertake a 6-month hands-on fellowship or commercial apprenticeship focused on enterprise architecture and scalable deployments.',
      category: 'Project / Internship',
      completed: false,
    },
    {
      id: 'm5',
      phase: '1-2 Years (Practical Mastery)',
      title: 'Lead Production Rollout in Regional African Market',
      description: `Execute a multi-stakeholder deployment adhering to regional data sovereignity (POPIA/NDPA) and infrastructure requirements in ${userProfile?.country || 'Sub-Saharan Africa'}.`,
      category: 'Project / Internship',
      completed: false,
    },
    {
      id: 'm6',
      phase: '2-5 Years (Leadership & Impact)',
      title: 'Executive Technical & Strategic Leadership',
      description: 'Scale engineering or product teams, participate in national policy consultations, and sponsor junior development cohorts.',
      category: 'Academic / Degree',
      completed: false,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newPhase, setNewPhase] = useState<RoadmapMilestone['phase']>('0-3 Months (Immediate Skills)');

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newM: RoadmapMilestone = {
      id: `m_${Date.now()}`,
      phase: newPhase,
      title: newTitle.trim(),
      description: 'User-defined strategic action milestone.',
      category: 'Skill Acquisition',
      completed: false,
    };

    setMilestones([...milestones, newM]);
    setNewTitle('');
  };

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPct = Math.round((completedCount / milestones.length) * 100);

  const phases: RoadmapMilestone['phase'][] = [
    '0-3 Months (Immediate Skills)',
    '3-12 Months (Accreditation)',
    '1-2 Years (Practical Mastery)',
    '2-5 Years (Leadership & Impact)',
  ];

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl w-full">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Target Occupational Track</span>
            <span aria-hidden="true">·</span>
            <span>ISCO {targetCareer.iscoCode}</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400 font-medium">{targetCareer.demandTier}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            {targetCareer.title}
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Personalized Career Progression Roadmap tailored for {userProfile?.fullName || 'the Candidate'}. Track completion of critical skills, university credits, and professional certifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBrowseCareers}
            className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Switch Target Track
          </button>
          <button
            onClick={onOpenReport}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Export Career Report
          </button>
        </div>
      </div>

      {/* Progress & Predictive Trajectory Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Execution Velocity
            </span>
            <div className="text-xl font-bold text-white font-mono tabular-nums mb-4">
              {completedCount} of {milestones.length} Milestones Achieved ({progressPct}%)
            </div>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
            <div
              className="bg-teal-400 h-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Predictive Trajectory & Harmonic Cadence Card */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                Predictive Success Trajectory
              </span>
              {targetCareer.predictiveForecast && (
                <span className="text-xs font-mono font-bold text-teal-300">
                  {targetCareer.predictiveForecast.educationalSuccessProbability}% Completion Likelihood
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {targetCareer.predictiveForecast?.growthCatalyst ||
                `Harmonic convergence indicates an accelerated trajectory toward ${targetCareer.title}.`}
            </p>
          </div>

          <div className="pt-3 grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="p-2.5 bg-slate-950/60 rounded-lg">
              <span className="text-[10px] text-slate-500 block uppercase">Mastery Horizon</span>
              <strong className="text-white font-mono">
                ~{targetCareer.predictiveForecast?.projectedMasteryMonths || 18} Months
              </strong>
            </div>
            <div className="p-2.5 bg-slate-950/60 rounded-lg">
              <span className="text-[10px] text-slate-500 block uppercase">Harmonic Resonance</span>
              <strong className="text-teal-400 font-mono">
                {targetCareer.predictiveForecast?.harmonicResonanceScore || 88}%
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Phased Roadmap Timeline */}
      <div className="space-y-6 w-full">
        {phases.map((phase) => {
          const phaseMilestones = milestones.filter((m) => m.phase === phase);
          if (phaseMilestones.length === 0) return null;

          return (
            <div key={phase} className="bg-slate-900/60 rounded-2xl p-6 sm:p-8 w-full">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center justify-between">
                <span>{phase}</span>
                <span className="text-xs text-slate-500 font-mono font-normal">
                  {phaseMilestones.filter((m) => m.completed).length}/{phaseMilestones.length} Done
                </span>
              </h2>

              <div className="space-y-3.5">
                {phaseMilestones.map((m) => {
                  return (
                    <div
                      key={m.id}
                      onClick={() => toggleMilestone(m.id)}
                      className={`p-5 rounded-xl transition-all cursor-pointer flex items-start gap-4 ${
                        m.completed
                          ? 'bg-slate-950/50 text-slate-500'
                          : 'bg-slate-950 text-slate-200 hover:bg-slate-950/70'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={m.completed}
                        onChange={() => {}}
                        className="mt-1 h-4 w-4 rounded text-teal-400 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-sm font-semibold ${
                              m.completed ? 'line-through text-slate-500' : 'text-white'
                            }`}
                          >
                            {m.title}
                          </span>
                          <span className="text-[11px] text-slate-500">· {m.category}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Milestone Form */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 w-full">
        <h3 className="text-sm font-semibold text-white mb-3">Add Custom Milestone</h3>
        <form onSubmit={handleAddMilestone} className="flex flex-col sm:flex-row gap-3">
          <select
            value={newPhase}
            onChange={(e) => setNewPhase(e.target.value as any)}
            className="bg-slate-950 text-xs text-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-400"
          >
            {phases.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Complete AWS Certified Solutions Architect exam"
            className="flex-1 bg-slate-950 text-xs text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-400"
          />

          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Add Milestone
          </button>
        </form>
      </div>
    </div>
  );
};
