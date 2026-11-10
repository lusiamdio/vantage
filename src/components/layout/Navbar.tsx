/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Top Bar Contract: [Brand title, one line] — [nav links] — [1 primary action]
 * Includes professional Profile Dropdown with Edit Profile, Settings, Switch Role, and Logout.
 */

import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, UserRole } from '../../types';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../services/i18n';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  userProfile: UserProfile | null;
  activeRole: UserRole;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onOpenCommandPalette: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onEditProfile: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  userProfile,
  activeRole,
  currentLanguage,
  onSelectLanguage,
  onOpenCommandPalette,
  onOpenAuth,
  onEditProfile,
  onOpenSettings,
  onLogout,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const getRoleLabel = () => {
    switch (activeRole) {
      case 'institution_admin':
        return 'University / HR';
      case 'government_analyst':
        return 'Ministry / Gov';
      case 'platform_superadmin':
        return 'Psychometrics Admin';
      default:
        return 'Candidate';
    }
  };

  const getUserInitials = () => {
    if (!userProfile?.fullName) return 'U';
    const parts = userProfile.fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  // Close language dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isLangOpen]);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Quick Search Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveView('landing')}
            className="text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-teal-400 transition-colors"
          >
            Vantage
          </button>

          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            title="Search careers, modules, or policies (Cmd+K)"
          >
            <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-slate-300 font-medium">{t.commandKHint}</span>
            <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-slate-950 text-slate-400 rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Strictly Role Separated) */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
          {!userProfile ? (
            <>
              <button
                onClick={() => setActiveView('landing')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'landing' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveView('assessments')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'assessments' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Assessment Battery
              </button>
              <button
                onClick={() => setActiveView('pricing')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'pricing' || activeView.startsWith('commercial_') ? 'text-teal-400 font-bold' : ''
                }`}
              >
                {t.commercialPlans}
              </button>
              <button
                onClick={() => setActiveView('gov_ethical_ai')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView.startsWith('gov_') ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Governance & Ethics
              </button>
            </>
          ) : activeRole === 'individual' ? (
            <>
              <button
                onClick={() => setActiveView('assessments')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'assessments' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Batteries
              </button>
              <button
                onClick={() => setActiveView('results')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'results' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                My Dossier
              </button>
              <button
                onClick={() => setActiveView('careers')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'careers' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Occupations
              </button>
              <button
                onClick={() => setActiveView('roadmap')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'roadmap' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Career Roadmap
              </button>
              <button
                onClick={() => setActiveView('pricing')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'pricing' || activeView.startsWith('commercial_') ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Plans
              </button>
            </>
          ) : activeRole === 'institution_admin' ? (
            <>
              <button
                onClick={() => setActiveView('institutional')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'institutional' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Cohort Analytics
              </button>
              <button
                onClick={() => setActiveView('commercial_b2b')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'commercial_b2b' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Campus Licensing
              </button>
              <button
                onClick={() => setActiveView('assessments')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'assessments' ? 'text-teal-400 font-bold' : ''
                }`}
              >
                Assessments
              </button>
            </>
          ) : activeRole === 'government_analyst' ? (
            <>
              <button
                onClick={() => setActiveView('government')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'government' ? 'text-emerald-400 font-bold' : ''
                }`}
              >
                Workforce Intelligence
              </button>
              <button
                onClick={() => setActiveView('commercial_b2g')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'commercial_b2g' ? 'text-emerald-400 font-bold' : ''
                }`}
              >
                National Agreements
              </button>
              <button
                onClick={() => setActiveView('gov_ethical_ai')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView.startsWith('gov_') ? 'text-emerald-400 font-bold' : ''
                }`}
              >
                Ethical AI Charter
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveView('admin')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'admin' ? 'text-cyan-400 font-bold' : ''
                }`}
              >
                Governance Console
              </button>
              <button
                onClick={() => setActiveView('gov_dif_standards')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'gov_dif_standards' ? 'text-cyan-400 font-bold' : ''
                }`}
              >
                DIF Standards
              </button>
              <button
                onClick={() => setActiveView('gov_privacy_framework')}
                className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
                  activeView === 'gov_privacy_framework' ? 'text-cyan-400 font-bold' : ''
                }`}
              >
                Privacy & Data
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Language Selector & Profile Dropbox */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Pan-African Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs text-slate-300 hover:text-white transition-colors font-mono"
              aria-label="Select Language"
              aria-expanded={isLangOpen}
            >
              <span>{SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.flag || '🌍'}</span>
              <span className="uppercase text-[11px] font-bold">{currentLanguage}</span>
              <svg className={`w-3 h-3 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-2xl p-2 shadow-2xl z-50 text-left space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Pan-African Languages
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left ${
                      currentLanguage === lang.code
                        ? 'bg-teal-950 text-teal-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
          {userProfile ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-850 rounded-xl transition-all whitespace-nowrap shrink-0 focus:outline-none"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-6 h-6 rounded-full bg-teal-400/20 text-teal-300 font-bold font-mono text-[11px] flex items-center justify-center">
                  {getUserInitials()}
                </div>
                <span className="truncate max-w-[120px] sm:max-w-[160px] font-semibold text-white">
                  {userProfile.fullName.split(' ')[0]}
                </span>
                <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                  ({getRoleLabel()})
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-teal-400' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Popover */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 rounded-2xl p-3 shadow-2xl z-50 text-left space-y-1">
                  {/* User info card */}
                  <div className="p-3 bg-slate-950/70 rounded-xl mb-2 space-y-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-teal-400/20 text-teal-300 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                        {getUserInitials()}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-white block truncate">
                          {userProfile.fullName}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate font-mono">
                          {userProfile.email}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Role:</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-teal-400 font-mono font-medium">
                        {getRoleLabel()}
                      </span>
                    </div>
                  </div>

                  {/* Menu Option 1: Edit Profile */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onEditProfile();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                  >
                    <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Edit Profile & Calibration</span>
                  </button>

                  {/* Menu Option 2: Settings */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                  >
                    <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings & Data Export</span>
                  </button>

                  {/* Menu Option 3: Switch Role */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                  >
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span>Switch Role / Workspace</span>
                  </button>

                  <div className="pt-1" />

                  {/* Menu Option 4: Logout */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors text-left"
                  >
                    <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
  );
};
