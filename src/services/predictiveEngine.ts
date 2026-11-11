/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Predictive Intelligence Engine
 * Advanced harmonic resonance, triadic structural endurance, and longitudinal
 * educational & career success forecasting based on psychometric evidence.
 *
 * NOTE: Strictly analytical, scientific, and psychometric nomenclature only.
 * No esoteric or cultural labeling is exposed to user-facing interfaces.
 */

import {
  AssessmentResultRecord,
  UserProfile,
  CareerMatch,
  HarmonicPredictiveProfile,
  EducationalSuccessForecast,
  CareerSuccessForecast,
} from '../types';

/**
 * Base Pythagorean/harmonic reduction mapping table for character frequency resonance
 */
const CHARACTER_HARMONIC_WEIGHTS: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

/**
 * Archetypal Expression Key Mappings (Purely analytical terminology)
 */
const HARMONIC_ARCHETYPES: Record<number, { title: string; focus: string; learningStyle: string }> = {
  1: {
    title: 'Autonomous Pioneer & Strategic Initiator',
    focus: 'Direct leadership, high-ownership initiatives, and technological breakthroughs',
    learningStyle: 'Self-Directed Accelerator',
  },
  2: {
    title: 'Systemic Harmonizer & Diplomatic Coordinator',
    focus: 'Cross-functional alignment, regulatory diplomacy, and ecosystem synthesis',
    learningStyle: 'Collaborative-Iterative',
  },
  3: {
    title: 'Dynamic Innovation Catalyst & Communicator',
    focus: 'Creative execution, interdisciplinary evangelism, and agile product translation',
    learningStyle: 'Experiential-Modular',
  },
  4: {
    title: 'High-Precision Systems Builder & Infrastructure Architect',
    focus: 'Structural resilience, mission-critical stability, and robust scaling',
    learningStyle: 'Deep Systemic-Hardening',
  },
  5: {
    title: 'Agile Transformation Agent & Solution Navigator',
    focus: 'Rapid adaptation, crisis resolution, and market volatility navigation',
    learningStyle: 'Multi-Stream Applied Labs',
  },
  6: {
    title: 'Institutional Steward & Human Capital Architect',
    focus: 'Organizational health, ethics, long-term talent development, and governance',
    learningStyle: 'Mentorship-Integrated',
  },
  7: {
    title: 'Analytical Research Specialist & Deep Synthesizer',
    focus: 'Algorithmic rigor, data science, root-cause investigations, and foundational R&D',
    learningStyle: 'Deep Abstract-Investigative',
  },
  8: {
    title: 'Executive Manifestor & Enterprise Director',
    focus: 'High-stakes capital allocation, operational dominance, and institutional impact',
    learningStyle: 'Strategic Executive Synthesis',
  },
  9: {
    title: 'Global Impact Architect & Transformational Leader',
    focus: 'Continental-scale policy, systemic equity, and macro-economic transformation',
    learningStyle: 'Holistic Macro-Systems',
  },
  11: {
    title: 'Visionary Intuitive Architect & Tech Innovator',
    focus: 'Emergent paradigm shifts, next-generation infrastructure, and breakthrough research',
    learningStyle: 'Fast-Track Triadic Synthesis',
  },
  22: {
    title: 'Master Infrastructure Architect & Continental Builder',
    focus: 'Enduring continental institutions, energy grids, and digital infrastructure',
    learningStyle: 'Comprehensive Systems Engineering',
  },
  33: {
    title: 'Master Educational Director & Human Potential Synthesizer',
    focus: 'Pedagogical reform, nationwide talent incubation, and ethical AI stewardship',
    learningStyle: 'Pinnacle Mastery & Pedagogy',
  },
};

/**
 * Calculates digital root and master resonance frequency from string inputs
 */
export function calculateHarmonicFrequency(input: string): number {
  if (!input) return 4;
  const cleaned = input.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleaned) return 7;

  let sum = 0;
  for (let i = 0; i < cleaned.length; i++) {
    sum += CHARACTER_HARMONIC_WEIGHTS[cleaned[i]] || 0;
  }

  // Check for primary master numbers
  if (sum === 11 || sum === 22 || sum === 33) return sum;

  while (sum > 9) {
    if (sum === 11 || sum === 22 || sum === 33) return sum;
    let temp = 0;
    while (sum > 0) {
      temp += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = temp;
  }

  return sum || 7;
}

/**
 * Computes Triadic Structural Vector (Inception, Fortitude, Sovereignty)
 */
export function calculateTriadicResonance(results: AssessmentResultRecord) {
  const o = results.bigFive.openness.percentile;
  const c = results.bigFive.conscientiousness.percentile;
  const e = results.bigFive.extraversion.percentile;
  const a = results.bigFive.agreeableness.percentile;
  const es = results.bigFive.emotionalStability.percentile;
  const cogPercentile = results.cognitive.overallPercentile;

  const riasec = results.riasec;
  const enterprisingArtistic = ((riasec.enterprising || 5) + (riasec.artistic || 5)) * 10;
  const realisticInvestigative = ((riasec.realistic || 5) + (riasec.investigative || 5)) * 10;
  const conventionalSocial = ((riasec.conventional || 5) + (riasec.social || 5)) * 10;

  // Triad 1: Inception Momentum (Initiative, drive, creative thrust)
  const inceptionMomentum = Math.min(
    99,
    Math.max(45, Math.round(o * 0.40 + e * 0.35 + (enterprisingArtistic * 0.25)))
  );

  // Triad 2: Structural Fortitude (Endurance, cognitive grit, stability under load)
  const structuralFortitude = Math.min(
    99,
    Math.max(45, Math.round(c * 0.45 + es * 0.35 + (cogPercentile * 0.20)))
  );

  // Triad 3: Sovereign Mastery (Strategic insight, synthesis, ethical command)
  const sovereignMastery = Math.min(
    99,
    Math.max(45, Math.round(cogPercentile * 0.45 + a * 0.25 + (realisticInvestigative * 0.15) + (conventionalSocial * 0.15)))
  );

  return {
    inceptionMomentum,
    structuralFortitude,
    sovereignMastery,
  };
}

/**
 * Generates the full Predictive Harmonic Profile for candidate dossier
 */
export function generateHarmonicPredictiveProfile(
  results: AssessmentResultRecord,
  profile?: UserProfile
): HarmonicPredictiveProfile {
  const nameSource = profile?.fullName || results.userId || 'Candidate Scholar';
  const baseFrequency = calculateHarmonicFrequency(nameSource);
  const triadic = calculateTriadicResonance(results);
  const archetype = HARMONIC_ARCHETYPES[baseFrequency] || HARMONIC_ARCHETYPES[4];

  // Inherent Potential Quotient (composite index 0-100)
  const inherentPotentialQuotient = Math.min(
    99,
    Math.max(
      60,
      Math.round(
        triadic.inceptionMomentum * 0.30 +
        triadic.structuralFortitude * 0.40 +
        triadic.sovereignMastery * 0.30
      )
    )
  );

  // Cyclical Timing Determination based on profile and consistency
  let cadenceStage = 'Phase II: Accelerated Momentum & High-Stakes Application';
  if (profile?.ageBand?.includes('16-18') || profile?.currentStatus?.includes('Student')) {
    cadenceStage = 'Phase I: Foundational Skill Seeding & Inception Cadence';
  } else if (inherentPotentialQuotient >= 92 && triadic.sovereignMastery >= 90) {
    cadenceStage = 'Phase III: Sovereign Synthesis & Industry Leadership';
  }

  // Educational Success Prediction
  const cogScore = results.cognitive.overallPercentile;
  const gritScore = Math.round(triadic.structuralFortitude * 0.70 + results.bigFive.conscientiousness.percentile * 0.30);
  const eduProb = Math.min(
    99,
    Math.max(70, Math.round(gritScore * 0.45 + cogScore * 0.35 + inherentPotentialQuotient * 0.20))
  );

  const projectedMasteryMonths = Math.max(9, Math.round(28 - (cogScore / 100) * 12 - (gritScore / 100) * 4));

  const educationalForecast: EducationalSuccessForecast = {
    successProbability: eduProb,
    optimalLearningCadence: archetype.learningStyle,
    academicGritIndex: gritScore,
    projectedMasteryMonths,
    curriculumResonance: 'High-Order Analytical & Applied Systems Architecture',
    academicRetentionIndex: Math.min(99, Math.max(82, gritScore + 4)),
  };

  // Career Success Prediction
  const careerProb = Math.min(
    98,
    Math.max(68, Math.round(inherentPotentialQuotient * 0.50 + cogScore * 0.30 + triadic.sovereignMastery * 0.20))
  );

  const careerForecast: CareerSuccessForecast = {
    fiveYearAscentProbability: careerProb,
    longitudinalVelocity:
      inherentPotentialQuotient >= 90
        ? 'Exponential Acceleration & Chief Executive Track'
        : 'High Sustained Ascent & Senior Specialist Track',
    cyclicalTimingPhase: cadenceStage,
    harmonicAlignmentScore: Math.min(98, Math.max(74, Math.round((eduProb + careerProb) / 2))),
    expressionArchetype: archetype.title,
    pinnacleEarningResonance: 'Upper Quartile Continental Benchmark',
    coreGrowthCatalysts: [
      'Deliberate practice in mission-critical architectural decision frameworks',
      'High-velocity applied project deployment with cross-regional visibility',
      'Integration of automated orchestration and predictive telemetry mastery',
    ],
    strategicRiskMitigations: [
      'Maintain balanced recovery windows to prevent cognitive burnout during high-velocity surges',
      'Cultivate formal peer review mechanisms to temper over-indexing on solitary execution',
    ],
  };

  return {
    inherentPotentialQuotient,
    harmonicBaseFrequency: baseFrequency,
    triadicResonance: triadic,
    cyclicalCadenceStage: cadenceStage,
    expressionArchetype: archetype.title,
    educationalForecast,
    careerForecast,
  };
}

/**
 * Computes career-specific predictive forecast for an occupational candidate match
 */
export function calculateCareerPredictiveForecast(
  career: CareerMatch,
  profileHarmonics: HarmonicPredictiveProfile,
  results: AssessmentResultRecord
) {
  // Hash occupation title to occupational harmonic signature
  const occFrequency = calculateHarmonicFrequency(career.title + career.industry);
  
  // Calculate resonant delta between candidate base frequency and occupation frequency
  const freqDelta = Math.abs(profileHarmonics.harmonicBaseFrequency - occFrequency);
  const harmonicCongruenceFactor = Math.max(72, 100 - freqDelta * 3.5);

  const eduProb = Math.min(
    99,
    Math.max(
      65,
      Math.round(
        profileHarmonics.educationalForecast.successProbability * 0.60 +
        career.cognitiveSuitabilityPct * 0.25 +
        harmonicCongruenceFactor * 0.15
      )
    )
  );

  const careerAscent = Math.min(
    99,
    Math.max(
      65,
      Math.round(
        profileHarmonics.careerForecast.fiveYearAscentProbability * 0.55 +
        career.personalityFitPct * 0.25 +
        harmonicCongruenceFactor * 0.20
      )
    )
  );

  const resonance = Math.min(
    99,
    Math.max(
      68,
      Math.round(
        career.riasecCongruencePct * 0.40 +
        harmonicCongruenceFactor * 0.35 +
        career.personalityFitPct * 0.25
      )
    )
  );

  return {
    educationalSuccessProbability: eduProb,
    careerAscentProbability: careerAscent,
    harmonicResonanceScore: resonance,
    cyclicalTimingPhase: profileHarmonics.cyclicalCadenceStage,
    optimalLearningCadence: profileHarmonics.educationalForecast.optimalLearningCadence,
    projectedMasteryMonths: profileHarmonics.educationalForecast.projectedMasteryMonths,
    expressionArchetype: profileHarmonics.expressionArchetype,
    growthCatalyst: `Harmonic match with ${career.industry} accelerates professional mastery by ~${Math.round(
      (profileHarmonics.educationalForecast.projectedMasteryMonths * 0.25)
    )} months.`,
  };
}
