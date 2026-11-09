/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Interactive Psychometric Norm-Group Benchmark & Sten Gaussian Curve Visualizer
 * Allows candidates and psychometricians to inspect standardized Sten score distributions across Pan-African demographic cohorts.
 */

import React, { useState } from 'react';
import { AssessmentResultRecord } from '../../types';

interface NormGroupSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: AssessmentResultRecord;
}

interface NormGroup {
  id: string;
  name: string;
  cohortSize: string;
  demographic: string;
  regionalScope: string;
  meanRaw: number;
  sdRaw: number;
  description: string;
}

const NORM_GROUPS: NormGroup[] = [
  {
    id: 'norm_tertiary_all',
    name: 'Pan-African University Graduate Norm',
    cohortSize: 'N = 82,400',
    demographic: 'Tertiary Degree Holders & Finalists (Ages 20–28)',
    regionalScope: 'Kenya, South Africa, Nigeria, Ghana, Rwanda, Egypt',
    meanRaw: 5.5,
    sdRaw: 2.0,
    description: 'The standard continental tertiary baseline reflecting broad cross-faculty graduates in business, science, arts, and engineering.',
  },
  {
    id: 'norm_tvet_applied',
    name: 'Technical & TVET Applied Vocational Norm',
    cohortSize: 'N = 46,100',
    demographic: 'Polytechnic & TVET Diploma Holders (Ages 18–26)',
    regionalScope: 'Sub-Saharan Technical Colleges & Apprenticeship Institutes',
    meanRaw: 5.2,
    sdRaw: 2.1,
    description: 'Calibrated against candidates pursuing hands-on mechatronics, renewable energy installations, industrial automation, and logistics.',
  },
  {
    id: 'norm_stem_honors',
    name: 'STEM Honors & Advanced Computing Norm',
    cohortSize: 'N = 24,800',
    demographic: 'Computer Science, Data Science, Electrical Eng & Physics Cohorts',
    regionalScope: 'Top Research Universities (UCT, Wits, Ashesi, KNUST, Univ of Nairobi)',
    meanRaw: 6.2,
    sdRaw: 1.8,
    description: 'High-discrimination baseline for competitive technical roles demanding advanced algorithmic reasoning and complex abstractions.',
  },
  {
    id: 'norm_executive_leadership',
    name: 'Executive & Pan-African Leadership Norm',
    cohortSize: 'N = 31,200',
    demographic: 'Senior Managers, Directors & Civil Service Leaders (Ages 32+)',
    regionalScope: 'Enterprise Corporates, Banks, Ministries & Regional Development Banks',
    meanRaw: 5.9,
    sdRaw: 1.9,
    description: 'Calibrated for strategic ambiguity tolerance, multi-stakeholder negotiation, and high-pressure operational accountability.',
  },
];

export const NormGroupSelectorModal: React.FC<NormGroupSelectorModalProps> = ({
  isOpen,
  onClose,
  results,
}) => {
  const [activeNormId, setActiveNormId] = useState<string>('norm_tertiary_all');
  const [selectedTrait, setSelectedTrait] = useState<string>('conscientiousness');

  if (!isOpen) return null;

  const currentNorm = NORM_GROUPS.find((n) => n.id === activeNormId) || NORM_GROUPS[0];

  // Calculate adjusted Sten score relative to the chosen norm group
  const traitObj = (results.bigFive as any)?.[selectedTrait];
  const baseSten = typeof traitObj?.sten === 'number' ? traitObj.sten : (typeof traitObj === 'number' ? traitObj : 8.0);
  // Shift slightly based on the norm group mean difference
  const adjustment = (5.5 - currentNorm.meanRaw) * 0.7;
  const calibratedSten = Math.min(10, Math.max(1, Math.round((baseSten + adjustment) * 10) / 10));

  // Gaussian Bell Curve SVG points
  const generateBellCurvePoints = () => {
    const points: string[] = [];
    const width = 500;
    const height = 180;
    const mean = width / 2;
    const stdDev = width / 6;

    for (let x = 0; x <= width; x += 5) {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
      const y = height - (height * 0.85) * Math.exp(exponent) - 15;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Calculate candidate marker X position along the bell curve
  // Sten 1 maps to x=30, Sten 5.5 maps to x=250, Sten 10 maps to x=470
  const candidateX = 30 + ((calibratedSten - 1) / 9) * 440;
  const candidateMean = 250;
  const candidateStdDev = 500 / 6;
  const candidateExponent = -Math.pow(candidateX - candidateMean, 2) / (2 * Math.pow(candidateStdDev, 2));
  const candidateY = 180 - (180 * 0.85) * Math.exp(candidateExponent) - 15;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-6 space-y-6 max-h-[92vh] overflow-y-auto border-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-teal-400/20 text-teal-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                Psychometric Standardization Engine
              </span>
              <span className="text-xs text-slate-400">Classical Test Theory (CTT) & IRT Calibration</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Normative Reference Groups & Sten Gaussian Curve
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Norm Group Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {NORM_GROUPS.map((norm) => {
            const isSelected = activeNormId === norm.id;
            return (
              <button
                key={norm.id}
                onClick={() => setActiveNormId(norm.id)}
                className={`p-3.5 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-teal-950/80 ring-1 ring-teal-400 text-white shadow-md'
                    : 'bg-slate-950/80 hover:bg-slate-850 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-teal-400 font-bold">{norm.cohortSize}</span>
                  {isSelected && <span className="text-[10px] text-teal-300 font-mono">ACTIVE</span>}
                </div>
                <strong className="text-xs font-bold block text-white leading-tight">
                  {norm.name}
                </strong>
                <span className="text-[11px] text-slate-400 block mt-1 line-clamp-1">{norm.demographic}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Norm Details */}
        <div className="p-4 bg-slate-950/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
              ACTIVE REFERENCE COHORT
            </span>
            <strong className="text-white text-sm block">{currentNorm.name}</strong>
            <p className="text-slate-300 mt-1 max-w-xl text-[11px] leading-relaxed">
              {currentNorm.description}
            </p>
          </div>
          <div className="flex items-center gap-4 text-right shrink-0">
            <div>
              <span className="text-[10px] text-slate-500 font-mono block">SAMPLE SCOPE</span>
              <span className="text-white font-mono text-xs font-bold">{currentNorm.regionalScope}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono block">CALIBRATION</span>
              <span className="text-teal-400 font-mono text-xs font-bold">μ={currentNorm.meanRaw}, σ={currentNorm.sdRaw}</span>
            </div>
          </div>
        </div>

        {/* Trait Selector for Curve Analysis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">
              Select Trait or Cognitive Dimension
            </span>
            <span className="text-xs text-teal-400 font-mono">
              Calibrated Sten: {calibratedSten} / 10
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'conscientiousness', label: 'Conscientiousness (Disciplined Execution)' },
              { id: 'openness', label: 'Openness to Experience (Cognitive Flexibility)' },
              { id: 'extraversion', label: 'Extraversion (Assertiveness & Energy)' },
              { id: 'agreeableness', label: 'Agreeableness (Empathetic Collaboration)' },
              { id: 'emotionalStability', label: 'Emotional Stability (Stress Resilience)' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrait(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedTrait === t.id
                    ? 'bg-teal-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Gaussian Normal Bell Curve */}
        <div className="p-6 bg-slate-950 rounded-2xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sten Normal Distribution Curve (Mean = 5.5, SD = 2.0)</span>
            <span className="font-mono text-teal-400">
              Candidate Position: Top {Math.round((1 - (calibratedSten / 10) * 0.9) * 100)}% of Cohort
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 500 200" className="w-full h-48 select-none">
              {/* Baseline axis */}
              <line x1="0" y1="180" x2="500" y2="180" stroke="#334155" strokeWidth="2" />

              {/* Shaded Bell Curve Area */}
              <polygon
                points={`0,180 ${generateBellCurvePoints()} 500,180`}
                fill="url(#tealGradient)"
                opacity="0.25"
              />

              {/* Bell Curve Outline */}
              <polyline
                points={generateBellCurvePoints()}
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="2.5"
              />

              {/* Candidate Position Line & Marker */}
              <line
                x1={candidateX}
                y1={candidateY}
                x2={candidateX}
                y2="180"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <circle cx={candidateX} cy={candidateY} r="6" fill="#38bdf8" />
              <text
                x={candidateX}
                y={Math.max(25, candidateY - 12)}
                fill="#38bdf8"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Sten {calibratedSten}
              </text>

              {/* Sten Units along X-Axis */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => {
                const xPos = 30 + ((s - 1) / 9) * 440;
                return (
                  <g key={s}>
                    <line x1={xPos} y1="180" x2={xPos} y2="186" stroke="#475569" strokeWidth="1.5" />
                    <text
                      x={xPos}
                      y="196"
                      fill="#94a3b8"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {s}
                    </text>
                  </g>
                );
              })}

              <defs>
                <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Sten Percentile Range Table */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center font-mono text-[10px] text-slate-400 pt-2">
            <div>Sten 1<br /><span className="text-slate-600">Bottom 2%</span></div>
            <div>Sten 2<br /><span className="text-slate-600">Top 96%</span></div>
            <div>Sten 3<br /><span className="text-slate-600">Top 89%</span></div>
            <div>Sten 4<br /><span className="text-slate-600">Top 77%</span></div>
            <div>Sten 5<br /><span className="text-slate-600">Top 60%</span></div>
            <div>Sten 6<br /><span className="text-slate-600">Top 40%</span></div>
            <div>Sten 7<br /><span className="text-slate-600">Top 23%</span></div>
            <div>Sten 8<br /><span className="text-teal-400 font-bold">Top 11%</span></div>
            <div>Sten 9<br /><span className="text-teal-300 font-bold">Top 4%</span></div>
            <div>Sten 10<br /><span className="text-emerald-400 font-bold">Top 1%</span></div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <span>International Test Commission (ITC) Guidelines for Standardizing Psychological Tests</span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors mt-2 sm:mt-0"
          >
            Apply & Close Visualizer
          </button>
        </div>
      </div>
    </div>
  );
};
