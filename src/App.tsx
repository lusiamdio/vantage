/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Enterprise Psychometric Career Intelligence Platform
 * Master Orchestrator Component
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole, AssessmentResultRecord, CareerMatch, AssessmentCategory } from './types';
import { FULL_ASSESSMENT_SECTIONS } from './data/assessments';
import { OCCUPATIONAL_DATABASE } from './data/occupations';
import { calculatePsychometricScores } from './services/scoringEngine';
import { generateCareerRecommendations } from './services/recommendationEngine';
import { SupportedLanguage } from './services/i18n';
import {
  getSupabaseCurrentUser,
  supabaseSignOut,
  saveAssessmentResultToSupabase,
  fetchAssessmentResultFromSupabase,
} from './services/supabase';

// Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingView } from './components/landing/LandingView';
import { AuthModal } from './components/auth/AuthModal';
import { AuthPage } from './components/auth/AuthPage';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AssessmentCatalogue } from './components/assessment/AssessmentCatalogue';
import { AssessmentSessionRunner } from './components/assessment/AssessmentSessionRunner';
import { PsychometricResultsDashboard } from './components/results/PsychometricResultsDashboard';
import { CareerRecommendationsView } from './components/career/CareerRecommendationsView';
import { CareerRoadmapView } from './components/career/CareerRoadmapView';
import { ProfessionalReportModal } from './components/report/ProfessionalReportModal';
import { InstitutionalDashboard } from './components/institutional/InstitutionalDashboard';
import { GovernmentWorkforceDashboard } from './components/government/GovernmentWorkforceDashboard';
import { PlatformAdminDashboard } from './components/admin/PlatformAdminDashboard';
import { PricingTiersView } from './components/pricing/PricingTiersView';
import { EthicalGovernanceModal } from './components/governance/EthicalGovernanceModal';
import { SettingsModal } from './components/profile/SettingsModal';
import { CommandPaletteModal } from './components/common/CommandPaletteModal';
import { SecurityAuditorModal } from './components/security/SecurityAuditorModal';

// Dedicated Full Webpages for Footer Links
import { EthicalAiGovernancePage } from './components/pages/governance/EthicalAiGovernancePage';
import { DifStandardsPage } from './components/pages/governance/DifStandardsPage';
import { PrivacyFrameworkPage } from './components/pages/governance/PrivacyFrameworkPage';
import { YouthSafeguardingPage } from './components/pages/governance/YouthSafeguardingPage';
import { B2CIndividualPassPage } from './components/pages/commercial/B2CIndividualPassPage';
import { B2BInstitutionalLicensingPage } from './components/pages/commercial/B2BInstitutionalLicensingPage';
import { B2GNationalDeploymentPage } from './components/pages/commercial/B2GNationalDeploymentPage';

export default function App() {
  // Navigation & Role State
  const [activeView, setActiveView] = useState<string>('landing');
  const [activeRole, setActiveRole] = useState<UserRole>('individual');

  // Candidate Profile State - Starts null so Landing Page appears first for unauthenticated visitors
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');

  // Default Baseline Assessment Results (scientifically generated)
  const defaultBaselineResults: AssessmentResultRecord = calculatePsychometricScores(
    FULL_ASSESSMENT_SECTIONS,
    [
      { questionId: 'bf_o_1', category: 'personality_big_five', dimension: 'openness', selectedOptionId: '5', numericValue: 5, reactionTimeMs: 2400, timestamp: '2026-11-07T12:00:00Z' },
      { questionId: 'bf_o_2', category: 'personality_big_five', dimension: 'openness', selectedOptionId: '4', numericValue: 4, reactionTimeMs: 2200, timestamp: '2026-11-07T12:00:10Z' },
      { questionId: 'bf_c_1', category: 'personality_big_five', dimension: 'conscientiousness', selectedOptionId: '5', numericValue: 5, reactionTimeMs: 2100, timestamp: '2026-11-07T12:00:20Z' },
      { questionId: 'bf_c_2', category: 'personality_big_five', dimension: 'conscientiousness', selectedOptionId: '5', numericValue: 5, reactionTimeMs: 1900, timestamp: '2026-11-07T12:00:30Z' },
      { questionId: 'bf_e_1', category: 'personality_big_five', dimension: 'extraversion', selectedOptionId: '4', numericValue: 4, reactionTimeMs: 2000, timestamp: '2026-11-07T12:00:40Z' },
      { questionId: 'bf_e_2', category: 'personality_big_five', dimension: 'extraversion', selectedOptionId: '4', numericValue: 4, reactionTimeMs: 2300, timestamp: '2026-11-07T12:00:50Z' },
      { questionId: 'bf_a_1', category: 'personality_big_five', dimension: 'agreeableness', selectedOptionId: '4', numericValue: 4, reactionTimeMs: 2500, timestamp: '2026-11-07T12:01:00Z' },
      { questionId: 'bf_es_1', category: 'personality_big_five', dimension: 'emotionalStability', selectedOptionId: '4', numericValue: 4, reactionTimeMs: 2100, timestamp: '2026-11-07T12:01:10Z' },
      { questionId: 'bf_es_2_rev', category: 'personality_big_five', dimension: 'emotionalStability', selectedOptionId: '1', numericValue: 5, reactionTimeMs: 2600, timestamp: '2026-11-07T12:01:20Z' },
      { questionId: 'ria_r_1', category: 'career_interests_riasec', dimension: 'realistic', selectedOptionId: '4', numericValue: 4, reactionTimeMs: 1800, timestamp: '2026-11-07T12:01:30Z' },
      { questionId: 'ria_i_1', category: 'career_interests_riasec', dimension: 'investigative', selectedOptionId: '5', numericValue: 5, reactionTimeMs: 2000, timestamp: '2026-11-07T12:01:40Z' },
      { questionId: 'ria_a_1', category: 'career_interests_riasec', dimension: 'artistic', selectedOptionId: '3', numericValue: 3, reactionTimeMs: 2200, timestamp: '2026-11-07T12:01:50Z' },
      { questionId: 'ria_s_1', category: 'career_interests_riasec', dimension: 'social', selectedOptionId: '3', numericValue: 3, reactionTimeMs: 2100, timestamp: '2026-11-07T12:02:00Z' },
      { questionId: 'ria_e_1', category: 'career_interests_riasec', dimension: 'enterprising', selectedOptionId: '4', numericValue: 4, reactionTimeMs: 2400, timestamp: '2026-11-07T12:02:10Z' },
      { questionId: 'ria_c_1', category: 'career_interests_riasec', dimension: 'conventional', selectedOptionId: '4', numericValue: 4, reactionTimeMs: 2300, timestamp: '2026-11-07T12:02:20Z' },
      { questionId: 'cog_num_1', category: 'cognitive_aptitude', dimension: 'numerical', selectedOptionId: 'opt2', numericValue: 1, reactionTimeMs: 5200, timestamp: '2026-11-07T12:02:30Z' },
      { questionId: 'cog_verb_1', category: 'cognitive_aptitude', dimension: 'verbal', selectedOptionId: 'opt2', numericValue: 1, reactionTimeMs: 4800, timestamp: '2026-11-07T12:02:40Z' },
      { questionId: 'cog_abs_1', category: 'cognitive_aptitude', dimension: 'abstractPattern', selectedOptionId: 'opt1', numericValue: 1, reactionTimeMs: 5100, timestamp: '2026-11-07T12:02:50Z' },
      { questionId: 'cog_logic_1', category: 'cognitive_aptitude', dimension: 'logicalDeduction', selectedOptionId: 'opt2', numericValue: 1, reactionTimeMs: 6400, timestamp: '2026-11-07T12:03:00Z' },
    ],
    userProfile?.id || 'usr_candidate_baseline'
  );

  const [assessmentResults, setAssessmentResults] = useState<AssessmentResultRecord>(defaultBaselineResults);
  const [activeSections, setActiveSections] = useState(FULL_ASSESSMENT_SECTIONS);

  // Recommendations and Target Career
  const careerMatches = generateCareerRecommendations(assessmentResults, userProfile || undefined);
  const [targetCareer, setTargetCareer] = useState<CareerMatch>(careerMatches[0] || OCCUPATIONAL_DATABASE[0]);

  // Modal Visibility State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isGovernanceModalOpen, setIsGovernanceModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  // Global Cmd+K / Ctrl+K keyboard shortcut listener & Supabase Session Restoration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Restore active Supabase session if authenticated
    getSupabaseCurrentUser().then(({ user, profile, role }) => {
      if (user && profile) {
        setUserProfile(profile);
        setActiveRole(role);
        fetchAssessmentResultFromSupabase(profile.id).then((savedResult) => {
          if (savedResult) {
            setAssessmentResults(savedResult);
            const updated = generateCareerRecommendations(savedResult, profile);
            if (updated.length > 0) setTargetCareer(updated[0]);
          }
        });
      }
    });

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleStartFullAssessment = () => {
    setActiveSections(FULL_ASSESSMENT_SECTIONS);
    setActiveView('session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSpecificBattery = (category: AssessmentCategory) => {
    const matched = FULL_ASSESSMENT_SECTIONS.filter((s) => s.category === category);
    if (matched.length > 0) {
      setActiveSections(matched);
      setActiveView('session');
    } else {
      setActiveSections(FULL_ASSESSMENT_SECTIONS);
      setActiveView('session');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = (newResults: AssessmentResultRecord) => {
    setAssessmentResults(newResults);
    const updatedCareers = generateCareerRecommendations(newResults, userProfile || undefined);
    if (updatedCareers.length > 0) {
      setTargetCareer(updatedCareers[0]);
    }
    // Asynchronously persist to Supabase database
    saveAssessmentResultToSupabase(newResults);

    setActiveView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRole = (role: UserRole, view: string) => {
    setActiveRole(role);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthenticate = (role: UserRole, profile: UserProfile) => {
    setActiveRole(role);
    setUserProfile(profile);

    // Route to the appropriate workspace console based on role
    switch (role) {
      case 'institution_admin':
        setActiveView('institutional');
        break;
      case 'government_analyst':
        setActiveView('government');
        break;
      case 'platform_superadmin':
        setActiveView('admin');
        break;
      default:
        setActiveView('results');
        break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Full-Page Branded Authentication Page (CodeRabbit / Linear Style)
  if (activeView === 'auth') {
    return (
      <AuthPage
        initialMode={authInitialMode}
        activeRole={activeRole}
        onAuthenticate={handleAuthenticate}
        onNavigateHome={() => {
          setActiveView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToPolicy={(pol) => {
          setActiveView(pol);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Strict Minimal Top Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userProfile={userProfile}
        activeRole={activeRole}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAuth={(mode?: 'signin' | 'signup') => {
          setAuthInitialMode(mode || 'signin');
          setActiveView('auth');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onEditProfile={() => setIsOnboardingOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLogout={() => {
          supabaseSignOut();
          setUserProfile(null);
          setActiveRole('individual');
          setActiveView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* Core View: Home Landing */}
        {activeView === 'landing' && (
          <LandingView
            onStartAssessment={handleStartFullAssessment}
            onExploreCareers={() => {
              setActiveView('careers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectRole={handleSelectRole}
            onOpenGovernance={() => {
              setActiveView('gov_ethical_ai');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigate={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Core Module 1: Psychometric Battery Catalogue */}
        {activeView === 'assessments' && (
          <AssessmentCatalogue
            onStartFullAssessment={handleStartFullAssessment}
            onStartSpecificBattery={handleStartSpecificBattery}
          />
        )}

        {/* Assessment Session Test Runner */}
        {activeView === 'session' && (
          <AssessmentSessionRunner
            sections={activeSections}
            onComplete={handleAssessmentComplete}
            onExit={() => setActiveView('assessments')}
          />
        )}

        {/* Candidate Psychometric Results & Radar Dossier */}
        {activeView === 'results' && (
          <PsychometricResultsDashboard
            results={assessmentResults}
            userProfile={userProfile}
            onNavigateToCareers={() => setActiveView('careers')}
            onNavigateToRoadmap={() => setActiveView('roadmap')}
            onOpenReport={() => setIsReportModalOpen(true)}
          />
        )}

        {/* Core Module 2: Occupational Matching Engine */}
        {activeView === 'careers' && (
          <CareerRecommendationsView
            careers={careerMatches}
            results={assessmentResults}
            userProfile={userProfile}
            onSelectCareerForRoadmap={(career) => {
              setTargetCareer(career);
              setActiveView('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToRoadmap={() => {
              setActiveView('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Candidate Milestone Roadmap */}
        {activeView === 'roadmap' && (
          <CareerRoadmapView
            targetCareer={targetCareer}
            userProfile={userProfile}
            onBrowseCareers={() => {
              setActiveView('careers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReport={() => setIsReportModalOpen(true)}
          />
        )}

        {/* Core Module 3: Institutional Talent Analytics (Role Separated) */}
        {activeView === 'institutional' && (
          userProfile && activeRole === 'institution_admin' ? (
            <InstitutionalDashboard />
          ) : (
            <div className="min-h-[75vh] flex items-center justify-center px-6 py-16 text-center">
              <div className="w-full max-w-lg bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-left border-none">
                <div className="w-12 h-12 rounded-2xl bg-teal-400/20 text-teal-300 flex items-center justify-center text-xl font-bold font-mono">
                  🏛️
                </div>
                <div>
                  <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold block mb-1">
                    Role Partitioned Workspace
                  </span>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    University & Corporate HR Access Required
                  </h2>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    The Institutional Talent Analytics Console is strictly partitioned for authorized university deans, department heads, and corporate talent directors.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Required Role:</span>
                    <span className="text-teal-400 font-bold font-mono uppercase">University & Enterprise HR (B2B)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Current Access:</span>
                    <span className="text-slate-200 font-mono">
                      {userProfile ? `Authenticated as ${activeRole}` : 'Unauthenticated Guest'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveRole('institution_admin');
                      setAuthInitialMode('signin');
                      setActiveView('auth');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors text-center"
                  >
                    Sign In as University / HR →
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('landing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-3 px-4 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 rounded-xl transition-colors text-center"
                  >
                    Return Home
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* Core Module 4: National Labor Market Intelligence (Role Separated) */}
        {activeView === 'government' && (
          userProfile && activeRole === 'government_analyst' ? (
            <GovernmentWorkforceDashboard />
          ) : (
            <div className="min-h-[75vh] flex items-center justify-center px-6 py-16 text-center">
              <div className="w-full max-w-lg bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-left border-none">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center text-xl font-bold font-mono">
                  🌍
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                    Role Partitioned Workspace
                  </span>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Government Analyst Access Required
                  </h2>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    The National Workforce Intelligence Platform is strictly partitioned for authorized Ministry of Labour, TVET, and national planning authorities.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Required Role:</span>
                    <span className="text-emerald-400 font-bold font-mono uppercase">Ministry of Labour / TVET (B2G)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Current Access:</span>
                    <span className="text-slate-200 font-mono">
                      {userProfile ? `Authenticated as ${activeRole}` : 'Unauthenticated Guest'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveRole('government_analyst');
                      setAuthInitialMode('signin');
                      setActiveView('auth');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors text-center"
                  >
                    Sign In as Ministry Analyst →
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('landing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-3 px-4 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 rounded-xl transition-colors text-center"
                  >
                    Return Home
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* Governance & Psychometrics Superadmin (Role Separated) */}
        {activeView === 'admin' && (
          userProfile && activeRole === 'platform_superadmin' ? (
            <PlatformAdminDashboard />
          ) : (
            <div className="min-h-[75vh] flex items-center justify-center px-6 py-16 text-center">
              <div className="w-full max-w-lg bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-left border-none">
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-xl font-bold font-mono">
                  ⚙️
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                    Role Partitioned Workspace
                  </span>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Psychometrics & Governance Admin Required
                  </h2>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    This administrative console controls Item Response Theory (IRT) parameter calibration, Differential Item Functioning (DIF) monitors, and test validity auditing.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Required Role:</span>
                    <span className="text-cyan-400 font-bold font-mono uppercase">Platform Superadmin & Governance</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Current Access:</span>
                    <span className="text-slate-200 font-mono">
                      {userProfile ? `Authenticated as ${activeRole}` : 'Unauthenticated Guest'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveRole('platform_superadmin');
                      setAuthInitialMode('signin');
                      setActiveView('auth');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 px-4 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors text-center"
                  >
                    Sign In as Governance Admin →
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('landing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-3 px-4 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 rounded-xl transition-colors text-center"
                  >
                    Return Home
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* General Commercial Plans Overview */}
        {activeView === 'pricing' && (
          <PricingTiersView
            onSelectPlan={(plan) => {
              if (plan.includes('Individual')) {
                setActiveView('commercial_b2c');
              } else if (plan.includes('Institutional')) {
                setActiveView('commercial_b2b');
              } else {
                setActiveView('commercial_b2g');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ─────────────────────────────────────────────────────────────
            DEDICATED FULL WEBPAGES FOR FOOTER LINKS
        ───────────────────────────────────────────────────────────── */}

        {/* Governance Link 1: Ethical AI & Psychometric Governance */}
        {activeView === 'gov_ethical_ai' && (
          <EthicalAiGovernancePage
            onNavigate={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartAssessment={handleStartFullAssessment}
          />
        )}

        {/* Governance Link 2: Differential Item Functioning (DIF) Standards */}
        {activeView === 'gov_dif_standards' && (
          <DifStandardsPage
            onNavigate={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Governance Link 3: POPIA, NDPA & GDPR Privacy Framework */}
        {activeView === 'gov_privacy_framework' && (
          <PrivacyFrameworkPage
            onNavigate={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Governance Link 4: Youth & Minor Safeguarding Policy */}
        {activeView === 'gov_youth_safeguarding' && (
          <YouthSafeguardingPage
            onNavigate={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Commercial Link 1: B2C Individual Career Pass */}
        {activeView === 'commercial_b2c' && (
          <B2CIndividualPassPage
            onNavigate={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartAssessment={handleStartFullAssessment}
          />
        )}

        {/* Commercial Link 2: B2B University & Corporate Licensing */}
        {activeView === 'commercial_b2b' && (
          <B2BInstitutionalLicensingPage
            onNavigate={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenInstitutionalConsole={() => {
              setActiveRole('institution_admin');
              setActiveView('institutional');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Commercial Link 3: B2G National Deployment Agreements */}
        {activeView === 'commercial_b2g' && (
          <B2GNationalDeploymentPage
            onNavigate={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGovernmentConsole={() => {
              setActiveRole('government_analyst');
              setActiveView('government');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Editorial Footer with Direct Links to all 11 Full Webpages */}
      <Footer
        onOpenGovernance={() => {
          setActiveView('gov_ethical_ai');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        setActiveView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* Professional Authentication & Role Switcher Panel */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        activeRole={activeRole}
        onAuthenticate={handleAuthenticate}
      />

      {/* Candidate Onboarding Calibration Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSaveProfile={(prof) => setUserProfile(prof)}
        initialProfile={userProfile}
      />

      {/* User Settings & Data Controls Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userProfile={userProfile}
        activeRole={activeRole}
        onOpenSecurityAudit={() => setIsSecurityModalOpen(true)}
      />

      {/* Official PDF / Printable Assessment Report */}
      <ProfessionalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        results={assessmentResults}
        targetCareer={targetCareer}
        userProfile={userProfile}
      />

      {/* Enterprise Security & Cryptographic Assurance Console */}
      <SecurityAuditorModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        results={assessmentResults}
      />

      {/* Optional Ethical AI Charter Modal */}
      <EthicalGovernanceModal
        isOpen={isGovernanceModalOpen}
        onClose={() => setIsGovernanceModalOpen(false)}
      />

      {/* Enterprise Command Palette (Cmd+K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectRole={handleSelectRole}
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSecurityAudit={() => setIsSecurityModalOpen(true)}
        onSelectCareerForRoadmap={(car) => {
          setTargetCareer(car);
          setActiveView('roadmap');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
