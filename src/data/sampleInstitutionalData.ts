/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Institutional Analytics & Enterprise Cohort Benchmarks
 */

import { InstitutionalCohortAnalytics } from '../types';

export const SAMPLE_INSTITUTIONAL_ANALYTICS: InstitutionalCohortAnalytics = {
  organizationName: 'Pan-African University of Technology & Innovation',
  organizationType: 'University',
  totalCandidates: 3420,
  completionRate: 94.2,
  averageCognitivePercentile: 79.4,
  topHollandCodes: [
    { code: 'IRC', count: 980, label: 'Investigative-Realistic-Conventional (STEM / Systems)' },
    { code: 'EIC', count: 840, label: 'Enterprising-Investigative-Conventional (Fintech / Product)' },
    { code: 'ISA', count: 620, label: 'Investigative-Social-Artistic (Bio-Health & UX)' },
    { code: 'RIE', count: 540, label: 'Realistic-Investigative-Enterprising (Energy & AgriTech)' },
    { code: 'ECS', count: 440, label: 'Enterprising-Conventional-Social (Commerce & Trade)' },
  ],
  skillsGapAnalysis: [
    { skillName: 'Cloud & Distributed Architecture', marketDemand: 92, cohortAverage: 71, deficitPct: -21 },
    { skillName: 'Data Science & Geospatial AI', marketDemand: 88, cohortAverage: 65, deficitPct: -23 },
    { skillName: 'Renewable Power Systems', marketDemand: 85, cohortAverage: 60, deficitPct: -25 },
    { skillName: 'Critical Problem Solving', marketDemand: 90, cohortAverage: 84, deficitPct: -6 },
    { skillName: 'Cross-Functional Leadership', marketDemand: 80, cohortAverage: 74, deficitPct: -6 },
    { skillName: 'Trade Compliance & AfCFTA Policy', marketDemand: 78, cohortAverage: 52, deficitPct: -26 },
  ],
  departmentBreakdowns: [
    {
      department: 'Faculty of Engineering & Renewable Energy',
      candidateCount: 1120,
      dominantTrait: 'Realistic / Investigative (High Conscientiousness)',
      employabilityReadinessPct: 89,
    },
    {
      department: 'School of Computer Science & AI',
      candidateCount: 1250,
      dominantTrait: 'Investigative / Conventional (High Openness)',
      employabilityReadinessPct: 93,
    },
    {
      department: 'School of Business & Financial Innovation',
      candidateCount: 650,
      dominantTrait: 'Enterprising / Social (High Extraversion)',
      employabilityReadinessPct: 86,
    },
    {
      department: 'Institute of Public Health & Epidemiology',
      candidateCount: 400,
      dominantTrait: 'Investigative / Social (High Agreeableness)',
      employabilityReadinessPct: 88,
    },
  ],
};

export const SAMPLE_ENTERPRISE_CAMPAIGNS = [
  {
    id: 'camp_001',
    name: '2025/2026 Graduate Trainee Technical Cohort',
    targetRole: 'Junior Cloud & Data Engineers',
    candidatesInvited: 500,
    completed: 462,
    completionRate: 92.4,
    deadline: '2026-12-15',
    status: 'Active',
    cutOffSten: 7.0,
  },
  {
    id: 'camp_002',
    name: 'Executive Leadership Succession Assessment',
    targetRole: 'Regional Directors & BU Heads',
    candidatesInvited: 45,
    completed: 43,
    completionRate: 95.5,
    deadline: '2026-11-30',
    status: 'Active',
    cutOffSten: 7.5,
  },
  {
    id: 'camp_003',
    name: 'Commercial Sales & Trade Expansion Team',
    targetRole: 'AfCFTA Trade Account Managers',
    candidatesInvited: 120,
    completed: 114,
    completionRate: 95.0,
    deadline: '2026-10-31',
    status: 'Completed',
    cutOffSten: 6.5,
  },
];
