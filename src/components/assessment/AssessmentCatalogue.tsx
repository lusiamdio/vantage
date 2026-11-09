/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Assessment Catalogue
 * Borderless, Corner-to-Corner Layout.
 */

import React from 'react';
import { ASSESSMENT_METADATA_LIST } from '../../data/assessments';
import { AssessmentCategory } from '../../types';

interface AssessmentCatalogueProps {
  onStartFullAssessment: () => void;
  onStartSpecificBattery: (category: AssessmentCategory) => void;
}

export const AssessmentCatalogue: React.FC<AssessmentCatalogueProps> = ({
  onStartFullAssessment,
  onStartSpecificBattery,
}) => {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 bg-slate-900/60 p-6 rounded-2xl">
        <div>
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
            Psychometric Battery Catalogue
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Scientifically Validated Assessment Suite
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Standardized psychometric instruments normed across Pan-African student and professional cohorts, calibrated via Item Response Theory (IRT) and Classical Test Theory (CTT).
          </p>
        </div>

        <button
          onClick={onStartFullAssessment}
          className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-md whitespace-nowrap shrink-0"
        >
          Take Full Career Battery (All 5 Modules)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {ASSESSMENT_METADATA_LIST.map((meta) => {
          return (
            <div
              key={meta.id}
              className="bg-slate-900 rounded-2xl p-7 flex flex-col justify-between hover:bg-slate-850 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span>Version {meta.version}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{meta.targetMinutes} min</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{meta.totalQuestions} items</span>
                </div>

                <h2 className="text-lg font-semibold text-white mb-2 leading-snug">
                  {meta.title}
                </h2>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {meta.tagline}
                </p>

                <div className="p-4 bg-slate-950/60 rounded-xl mb-6 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Scientific Model:</span>
                    <span className="text-slate-300 font-medium">{meta.scientificModel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Reliability Index:</span>
                    <span className="text-teal-400 font-mono">Cronbach’s α = {meta.reliabilityAlpha.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Norm Reference:</span>
                    <span className="text-slate-400">{meta.normReference}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onStartSpecificBattery(meta.category)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors text-center"
              >
                Launch Specific Module
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
