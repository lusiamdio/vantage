/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Psychometric Career Intelligence Platform - Type Definitions
 */

export type UserRole = 'individual' | 'institution_admin' | 'government_analyst' | 'platform_superadmin';

export type AssessmentCategory = 
  | 'personality_big_five'
  | 'career_interests_riasec'
  | 'cognitive_aptitude'
  | 'workplace_skills'
  | 'career_values'
  | 'emotional_competencies';

export type QuestionFormat = 
  | 'likert_5'
  | 'likert_7'
  | 'multiple_choice'
  | 'scenario_judgement'
  | 'numerical_problem'
  | 'abstract_pattern'
  | 'ranking';

export interface QuestionOption {
  id: string;
  text: string;
  scoreValue?: number; // for Likert or weighted scoring
  dimensionKey?: string; // sub-dimension mapped
  isCorrect?: boolean; // for aptitude test items
  explanation?: string;
}

export interface AssessmentQuestion {
  id: string;
  sectionId: string;
  category: AssessmentCategory;
  dimension: string; // e.g., 'openness', 'investigative', 'numerical_reasoning'
  facet?: string; // e.g., 'intellectual_curiosity', 'deductive_logic'
  prompt: string;
  format: QuestionFormat;
  options: QuestionOption[];
  isReverseScored?: boolean;
  timeLimitSeconds?: number; // for timed cognitive tasks
  difficultyLevel?: 'easy' | 'moderate' | 'advanced';
  scenarioContext?: string;
  patternSvgData?: string; // for abstract/spatial reasoning tasks
}

export interface AssessmentSection {
  id: string;
  title: string;
  category: AssessmentCategory;
  description: string;
  scientificFoundation: string; // e.g. "Costa & McCrae Five-Factor Model", "Holland Theory of Vocational Personalities"
  instructions: string;
  estimatedMinutes: number;
  isTimed: boolean;
  totalTimeSeconds?: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentMetadata {
  id: string;
  version: string;
  title: string;
  category: AssessmentCategory;
  tagline: string;
  targetMinutes: number;
  totalQuestions: number;
  scientificModel: string;
  normReference: string;
  reliabilityAlpha: number; // Cronbach's alpha
  validityEvidence: string;
}

export interface CandidateResponse {
  questionId: string;
  category: AssessmentCategory;
  dimension: string;
  selectedOptionId: string;
  numericValue?: number;
  reactionTimeMs: number;
  timestamp: string;
}

export interface BigFiveScores {
  openness: { raw: number; sten: number; percentile: number; level: 'Low' | 'Moderate' | 'High' | 'Very High' };
  conscientiousness: { raw: number; sten: number; percentile: number; level: 'Low' | 'Moderate' | 'High' | 'Very High' };
  extraversion: { raw: number; sten: number; percentile: number; level: 'Low' | 'Moderate' | 'High' | 'Very High' };
  agreeableness: { raw: number; sten: number; percentile: number; level: 'Low' | 'Moderate' | 'High' | 'Very High' };
  emotionalStability: { raw: number; sten: number; percentile: number; level: 'Low' | 'Moderate' | 'High' | 'Very High' };
}

export interface RiasecScores {
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
  primaryCode: string; // e.g. "I"
  secondaryCode: string; // e.g. "E"
  tertiaryCode: string; // e.g. "C"
  hollandCode: string; // e.g. "IEC"
  profileDescription: string;
}

export interface CognitiveSubScores {
  numerical: { score: number; maxScore: number; accuracyPct: number; speedIndex: number };
  verbal: { score: number; maxScore: number; accuracyPct: number; speedIndex: number };
  abstractPattern: { score: number; maxScore: number; accuracyPct: number; speedIndex: number };
  logicalDeduction: { score: number; maxScore: number; accuracyPct: number; speedIndex: number };
  overallPercentile: number;
  overallBand: 'Superior' | 'Above Average' | 'Average' | 'Developing';
}

export interface CareerValueItem {
  id: string;
  name: string;
  importance: number; // 0 to 100
  description: string;
}

export interface WorkplaceSkillScore {
  name: string;
  level: number; // 0 to 100
  readiness: 'Mastery' | 'Proficient' | 'Developing' | 'Gap Area';
}

export interface AssessmentValidityMetrics {
  consistencyScore: number; // 0-100%
  straightlineDetected: boolean;
  extremeResponseStyle: boolean;
  averageReactionTimeMs: number;
  status: 'valid' | 'caution' | 'invalid';
  notes: string;
}

export interface EducationalSuccessForecast {
  successProbability: number;
  optimalLearningCadence: string;
  academicGritIndex: number;
  projectedMasteryMonths: number;
  curriculumResonance: string;
  academicRetentionIndex: number;
}

export interface CareerSuccessForecast {
  fiveYearAscentProbability: number;
  longitudinalVelocity: string;
  cyclicalTimingPhase: string;
  harmonicAlignmentScore: number;
  expressionArchetype: string;
  pinnacleEarningResonance: string;
  coreGrowthCatalysts: string[];
  strategicRiskMitigations: string[];
}

export interface HarmonicPredictiveProfile {
  inherentPotentialQuotient: number;
  harmonicBaseFrequency: number;
  triadicResonance: {
    inceptionMomentum: number;
    structuralFortitude: number;
    sovereignMastery: number;
  };
  cyclicalCadenceStage: string;
  expressionArchetype: string;
  educationalForecast: EducationalSuccessForecast;
  careerForecast: CareerSuccessForecast;
}

export interface CareerMatchPredictiveForecast {
  educationalSuccessProbability: number;
  careerAscentProbability: number;
  harmonicResonanceScore: number;
  cyclicalTimingPhase: string;
  optimalLearningCadence: string;
  projectedMasteryMonths: number;
  expressionArchetype: string;
  growthCatalyst: string;
}

export interface AssessmentResultRecord {
  id: string;
  userId: string;
  completedAt: string;
  assessmentVersion: string;
  validity: AssessmentValidityMetrics;
  bigFive: BigFiveScores;
  riasec: RiasecScores;
  cognitive: CognitiveSubScores;
  careerValues: CareerValueItem[];
  skills: WorkplaceSkillScore[];
  harmonicForecast?: HarmonicPredictiveProfile;
}

export interface CareerMatch {
  id: string;
  title: string;
  iscoCode: string;
  industry: string;
  overallMatchScore: number; // 0-100%
  riasecCode: string;
  riasecCongruencePct: number;
  personalityFitPct: number;
  cognitiveSuitabilityPct: number;
  skillsReadinessPct: number;
  demandTier: 'Exponential Growth' | 'High National Demand' | 'Stable Professional' | 'Transformational';
  salaryEstimates: {
    usd: string;
    zar: string;
    kes: string;
    ngn: string;
  };
  jobDescription: string;
  keyResponsibilities: string[];
  essentialSkills: string[];
  recommendedQualifications: string[];
  africanAcademicHubs: string[];
  globalCertifications: string[];
  psychometricEvidenceExplanation: string;
  growthPathway: string;
  transitionDifficulty: 'Entry / Direct' | 'Moderate Bridge Needed' | 'Specialized Degree Required';
  predictiveForecast?: CareerMatchPredictiveForecast;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  ageBand: '16-18 (Secondary)' | '19-24 (University/Grad)' | '25-34 (Early Career)' | '35+ (Experienced)';
  currentStatus: 'Secondary Student' | 'University Student' | 'Graduate' | 'Employed Professional' | 'Career Changer' | 'Entrepreneur';
  educationalBackground: string;
  targetIndustries: string[];
  preferredLanguages: string[];
  organizationId?: string;
  consentAccepted: boolean;
  consentDate: string;
}

export interface RoadmapMilestone {
  id: string;
  phase: '0-3 Months (Immediate Skills)' | '3-12 Months (Accreditation)' | '1-2 Years (Practical Mastery)' | '2-5 Years (Leadership & Impact)';
  title: string;
  description: string;
  category: 'Skill Acquisition' | 'Academic / Degree' | 'Certification' | 'Project / Internship' | 'Mentorship';
  completed: boolean;
  resourceLink?: string;
}

export interface InstitutionalCohortAnalytics {
  organizationName: string;
  organizationType: 'University' | 'Enterprise HR' | 'Vocational Academy' | 'Government Agency';
  totalCandidates: number;
  completionRate: number;
  averageCognitivePercentile: number;
  topHollandCodes: { code: string; count: number; label: string }[];
  skillsGapAnalysis: { skillName: string; marketDemand: number; cohortAverage: number; deficitPct: number }[];
  departmentBreakdowns: {
    department: string;
    candidateCount: number;
    dominantTrait: string;
    employabilityReadinessPct: number;
  }[];
}

export interface GovernmentWorkforceMetrics {
  countryName: string;
  activeLaborSurveys: number;
  totalYouthAssessed: number;
  regions: {
    regionName: string;
    assessedYouth: number;
    youthUnemploymentPct: number;
    stemInterestPct: number;
    topEmergingNeed: string;
    priorityIntervention: string;
  }[];
  criticalShortageOccupations: {
    title: string;
    sector: string;
    nationalDeficitPct: number;
    recommendedCurriculumReform: string;
  }[];
  youthCareerAspirationVsMarketDemand: {
    sector: string;
    youthInterestPct: number;
    marketOpeningsPct: number;
  }[];
}
