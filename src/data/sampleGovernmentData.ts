/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Government Workforce & National Labor Market Intelligence Datasets
 */

import { GovernmentWorkforceMetrics } from '../types';

export const AFRICAN_COUNTRIES_WORKFORCE: Record<string, GovernmentWorkforceMetrics> = {
  kenya: {
    countryName: 'Republic of Kenya (Ministry of Labour & TVET)',
    activeLaborSurveys: 18,
    totalYouthAssessed: 184500,
    regions: [
      {
        regionName: 'Nairobi Metropolitan & Silicon Savannah',
        assessedYouth: 68000,
        youthUnemploymentPct: 14.8,
        stemInterestPct: 62.4,
        topEmergingNeed: 'Cloud Architecture & Cyber Defense',
        priorityIntervention: 'Advanced Micro-credential Subsidies & Tech Hub Incubators',
      },
      {
        regionName: 'Central & Rift Valley (Agri-Corridor)',
        assessedYouth: 44200,
        youthUnemploymentPct: 18.2,
        stemInterestPct: 41.5,
        topEmergingNeed: 'Precision AgriTech & Solar Cold Chain Engineering',
        priorityIntervention: 'TVET Modernization with Hands-On Solar & Drone Licensing',
      },
      {
        regionName: 'Western & Lake Victoria Basin',
        assessedYouth: 39500,
        youthUnemploymentPct: 21.0,
        stemInterestPct: 38.0,
        topEmergingNeed: 'Aquaculture Technology & Renewable Bioenergy',
        priorityIntervention: 'Youth Enterprise Fund Capital Grants for Clean Energy',
      },
      {
        regionName: 'Coast Region (Mombasa Maritime Gateway)',
        assessedYouth: 32800,
        youthUnemploymentPct: 22.5,
        stemInterestPct: 35.8,
        topEmergingNeed: 'Port Logistics Automation & Maritime Cold-Chain',
        priorityIntervention: 'Customs Single-Window Port Apprenticeship Framework',
      },
    ],
    criticalShortageOccupations: [
      {
        title: 'Renewable Energy & Off-Grid Solar Technicians',
        sector: 'Clean Energy & Utilities',
        nationalDeficitPct: 44.5,
        recommendedCurriculumReform: 'Align National KNQA Level 5 & 6 standards with BESS battery storage standards.',
      },
      {
        title: 'Specialized Cloud Engineers & System SREs',
        sector: 'Information & Communications Tech',
        nationalDeficitPct: 38.2,
        recommendedCurriculumReform: 'Embed industry cloud certifications into public university Computer Science syllabi.',
      },
      {
        title: 'Precision AgriTech Soil & Drone Specialists',
        sector: 'Agriculture & Food Security',
        nationalDeficitPct: 49.0,
        recommendedCurriculumReform: 'Establish regional AgriTech testing farms at Egerton & JKUAT universities.',
      },
      {
        title: 'AfCFTA Trade Logistics & Multimodal Freight Managers',
        sector: 'Trade & Logistics',
        nationalDeficitPct: 32.8,
        recommendedCurriculumReform: 'Fast-track bilateral logistics accreditation with CILT and KPA training schools.',
      },
    ],
    youthCareerAspirationVsMarketDemand: [
      { sector: 'Software & Digital Tech', youthInterestPct: 38, marketOpeningsPct: 24 },
      { sector: 'Clean Energy & Utilities', youthInterestPct: 12, marketOpeningsPct: 26 },
      { sector: 'Agriculture & AgriTech', youthInterestPct: 8, marketOpeningsPct: 28 },
      { sector: 'Health & Life Sciences', youthInterestPct: 18, marketOpeningsPct: 14 },
      { sector: 'Trade & Logistics', youthInterestPct: 10, marketOpeningsPct: 16 },
      { sector: 'Creative Arts & Media', youthInterestPct: 14, marketOpeningsPct: 6 },
    ],
  },

  south_africa: {
    countryName: 'Republic of South Africa (Department of Higher Education & Training)',
    activeLaborSurveys: 24,
    totalYouthAssessed: 245000,
    regions: [
      {
        regionName: 'Gauteng Economic Hub (Joburg & Pretoria)',
        assessedYouth: 110000,
        youthUnemploymentPct: 32.5,
        stemInterestPct: 58.0,
        topEmergingNeed: 'Fintech Security, Cloud Engineering & Data Analytics',
        priorityIntervention: 'Workplace Integrated Learning (WIL) Corporate Tax Incentives',
      },
      {
        regionName: 'Western Cape (Cape Town Tech & Agribusiness)',
        assessedYouth: 54000,
        youthUnemploymentPct: 24.1,
        stemInterestPct: 54.2,
        topEmergingNeed: 'Green Hydrogen, Solar EPC & Tech Venture Scaling',
        priorityIntervention: 'Direct Green Economy Youth Apprenticeships',
      },
      {
        regionName: 'KwaZulu-Natal (Durban Trade Corridor)',
        assessedYouth: 48000,
        youthUnemploymentPct: 38.2,
        stemInterestPct: 39.0,
        topEmergingNeed: 'Port Automation, Supply Chain & Light Manufacturing',
        priorityIntervention: 'SEZ (Special Economic Zone) Training Centers',
      },
      {
        regionName: 'Eastern Cape (Automotive & Manufacturing)',
        assessedYouth: 33000,
        youthUnemploymentPct: 44.0,
        stemInterestPct: 36.5,
        topEmergingNeed: 'Electric Vehicle (EV) Assembly & Mechatronics',
        priorityIntervention: 'Automotive Industry Transformation Fund Skills Bridge',
      },
    ],
    criticalShortageOccupations: [
      {
        title: 'Solar & Wind Renewable Grid Engineers',
        sector: 'Energy Transition (Just Transition)',
        nationalDeficitPct: 52.0,
        recommendedCurriculumReform: 'Accelerate NQF Level 6/7 Just Energy Transition retraining modules.',
      },
      {
        title: 'Cybersecurity Threat Analysts & SREs',
        sector: 'Financial Services & Banking',
        nationalDeficitPct: 41.0,
        recommendedCurriculumReform: 'Sponsor dedicated National Cyber Academy in partnership with SARB & major banks.',
      },
      {
        title: 'Biostatisticians & Health Informaticians',
        sector: 'Public Health & NHI Rollout',
        nationalDeficitPct: 36.5,
        recommendedCurriculumReform: 'Fund postgraduate bursaries for healthcare data modernization.',
      },
    ],
    youthCareerAspirationVsMarketDemand: [
      { sector: 'Software & Digital Tech', youthInterestPct: 34, marketOpeningsPct: 22 },
      { sector: 'Clean Energy & Utilities', youthInterestPct: 11, marketOpeningsPct: 30 },
      { sector: 'Agriculture & AgriTech', youthInterestPct: 7, marketOpeningsPct: 18 },
      { sector: 'Health & Life Sciences', youthInterestPct: 16, marketOpeningsPct: 15 },
      { sector: 'Trade & Logistics', youthInterestPct: 12, marketOpeningsPct: 20 },
      { sector: 'Creative Arts & Media', youthInterestPct: 20, marketOpeningsPct: 5 },
    ],
  },

  nigeria: {
    countryName: 'Federal Republic of Nigeria (Ministry of Labour & Federal Ministry of Communications)',
    activeLaborSurveys: 32,
    totalYouthAssessed: 310000,
    regions: [
      {
        regionName: 'Lagos & South-West Commercial Hub',
        assessedYouth: 145000,
        youthUnemploymentPct: 19.5,
        stemInterestPct: 68.0,
        topEmergingNeed: 'Fintech Infrastructure, Distributed Systems & Product Leadership',
        priorityIntervention: 'National Digital Economy Talent Pipeline 3MTT Scaling',
      },
      {
        regionName: 'South-South (Niger Delta Energy Transition)',
        assessedYouth: 55000,
        youthUnemploymentPct: 28.4,
        stemInterestPct: 42.0,
        topEmergingNeed: 'Offshore Renewable Engineering & Environmental Remediation',
        priorityIntervention: 'Local Content Development Training Centers',
      },
      {
        regionName: 'North-Central & FCT Abuja',
        assessedYouth: 52000,
        youthUnemploymentPct: 23.0,
        stemInterestPct: 46.0,
        topEmergingNeed: 'Public Sector Digitalization & Cross-Border Trade Policy',
        priorityIntervention: 'Civil Service Youth Digital Fellowship',
      },
      {
        regionName: 'North-West (Kano Commercial & Agribusiness Hub)',
        assessedYouth: 58000,
        youthUnemploymentPct: 31.0,
        stemInterestPct: 32.0,
        topEmergingNeed: 'Agro-processing Machinery & Solar Irrigation Engineering',
        priorityIntervention: 'Vocational Technical Apprenticeship Subsidies',
      },
    ],
    criticalShortageOccupations: [
      {
        title: 'Distributed Core Banking System Architects',
        sector: 'Fintech & Digital Banking',
        nationalDeficitPct: 48.0,
        recommendedCurriculumReform: 'Standardize enterprise payment system engineering in NUC accredited curricula.',
      },
      {
        title: 'Solar Cold Chain & Decentralized Grid Engineers',
        sector: 'Agribusiness & Power',
        nationalDeficitPct: 56.0,
        recommendedCurriculumReform: 'Deploy mobile technical labs to agricultural belts across Kaduna, Kano, and Benue.',
      },
    ],
    youthCareerAspirationVsMarketDemand: [
      { sector: 'Software & Digital Tech', youthInterestPct: 44, marketOpeningsPct: 25 },
      { sector: 'Clean Energy & Utilities', youthInterestPct: 9, marketOpeningsPct: 28 },
      { sector: 'Agriculture & AgriTech', youthInterestPct: 6, marketOpeningsPct: 24 },
      { sector: 'Health & Life Sciences', youthInterestPct: 14, marketOpeningsPct: 12 },
      { sector: 'Trade & Logistics', youthInterestPct: 11, marketOpeningsPct: 16 },
      { sector: 'Creative Arts & Media', youthInterestPct: 16, marketOpeningsPct: 5 },
    ],
  },
};
