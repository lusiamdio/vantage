/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Enterprise Command Palette (Cmd+K / Ctrl+K)
 * Seamless keyboard-driven navigation across 120+ occupations, modules, policies, and workflows.
 */

import React, { useState, useEffect, useRef } from 'react';
import { OCCUPATIONAL_DATABASE } from '../../data/occupations';
import { UserRole } from '../../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  onSelectRole: (role: UserRole, view: string) => void;
  onOpenReport: () => void;
  onOpenSettings: () => void;
  onSelectCareerForRoadmap?: (career: any) => void;
  onOpenSecurityAudit?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'occupations' | 'modules' | 'governance' | 'commercial' | 'actions';
  badge: string;
  icon: string;
  action: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectRole,
  onOpenReport,
  onOpenSettings,
  onSelectCareerForRoadmap,
  onOpenSecurityAudit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Master command registry
  const staticCommands: CommandItem[] = [
    // Core Modules & Actions
    {
      id: 'act_auth',
      title: 'Sign In / Enterprise Registration',
      subtitle: 'Open dedicated authentication portal with Google, Microsoft 365, University SSO & credentials',
      category: 'actions',
      badge: 'AUTH',
      icon: '🔐',
      action: () => { onNavigate('auth'); onClose(); },
    },
    {
      id: 'act_security',
      title: 'Security & Cryptographic Audit Console',
      subtitle: 'Inspect SHA-256 digest, OWASP Top 10 mitigation & statutory compliance',
      category: 'actions',
      badge: 'SECURITY',
      icon: '🛡️',
      action: () => {
        if (onOpenSecurityAudit) onOpenSecurityAudit();
        onClose();
      },
    },
    {
      id: 'mod_landing',
      title: 'Home & Executive Overview',
      subtitle: 'Vantage landing page with scientific telemetry and platform showcase',
      category: 'modules',
      badge: 'NAV',
      icon: '🏠',
      action: () => { onNavigate('landing'); onClose(); },
    },
    {
      id: 'mod_assessments',
      title: 'Psychometric Battery Catalogue',
      subtitle: 'Browse Big Five, Holland RIASEC, and GCAT cognitive assessment units',
      category: 'modules',
      badge: 'CORE',
      icon: '🧠',
      action: () => { onNavigate('assessments'); onClose(); },
    },
    {
      id: 'mod_session',
      title: 'Launch 25-Minute Assessment Battery',
      subtitle: 'Start real-time adaptive psychometric test with keyboard shortcuts',
      category: 'actions',
      badge: 'TEST',
      icon: '⚡',
      action: () => { onNavigate('session'); onClose(); },
    },
    {
      id: 'mod_results',
      title: 'Candidate Psychometric Results Dossier',
      subtitle: 'Inspect Five-Factor radar chart, RIASEC code, and Sten distribution',
      category: 'modules',
      badge: 'RESULTS',
      icon: '📊',
      action: () => { onNavigate('results'); onClose(); },
    },
    {
      id: 'mod_careers',
      title: 'Occupational Matching Engine',
      subtitle: 'Ranked career congruence, salary telemetry, and skills retooling',
      category: 'modules',
      badge: 'MATCH',
      icon: '🎯',
      action: () => { onNavigate('careers'); onClose(); },
    },
    {
      id: 'mod_roadmap',
      title: 'Actionable Career Milestone Roadmap',
      subtitle: '0–3 month, 1-year, and 3-year milestones with university programs',
      category: 'modules',
      badge: 'PLAN',
      icon: '🗺️',
      action: () => { onNavigate('roadmap'); onClose(); },
    },
    {
      id: 'mod_institutional',
      title: 'Institutional Talent Analytics Console',
      subtitle: 'Cohort skills-gap matrix, cut-off simulator, and CSV export for universities',
      category: 'modules',
      badge: 'B2B',
      icon: '🏛️',
      action: () => { onSelectRole('institution_admin', 'institutional'); onClose(); },
    },
    {
      id: 'mod_government',
      title: 'National Workforce Intelligence Platform',
      subtitle: 'Youth talent mapping, TVET reform budget estimator, and policy briefs',
      category: 'modules',
      badge: 'B2G',
      icon: '🌍',
      action: () => { onSelectRole('government_analyst', 'government'); onClose(); },
    },
    {
      id: 'mod_admin',
      title: 'Psychometrics & Governance Admin Dashboard',
      subtitle: 'Differential Item Functioning (DIF) monitors and test calibration',
      category: 'modules',
      badge: 'ADMIN',
      icon: '⚙️',
      action: () => { onSelectRole('platform_superadmin', 'admin'); onClose(); },
    },
    {
      id: 'act_report',
      title: 'Download Official PDF Career Intelligence Report',
      subtitle: 'Generate printable executive dossier with psychometric Sten profile',
      category: 'actions',
      badge: 'EXPORT',
      icon: '📄',
      action: () => { onOpenReport(); onClose(); },
    },
    {
      id: 'act_settings',
      title: 'Data Sovereignty & Account Settings',
      subtitle: 'Export JSON dossier, configure POPIA/GDPR consent, or request erasure',
      category: 'actions',
      badge: 'PRIVACY',
      icon: '🔒',
      action: () => { onOpenSettings(); onClose(); },
    },

    // Governance & Statutory Policies
    {
      id: 'gov_ethical_ai',
      title: 'Ethical AI & Psychometric Governance Charter',
      subtitle: 'Non-deterministic decision principles and algorithmic safeguards',
      category: 'governance',
      badge: 'POLICY',
      icon: '⚖️',
      action: () => { onNavigate('gov_ethical_ai'); onClose(); },
    },
    {
      id: 'gov_dif',
      title: 'Differential Item Functioning (DIF) Standards',
      subtitle: 'Empirical measurement invariance and Mantel-Haenszel Delta stats',
      category: 'governance',
      badge: 'MATH',
      icon: '📐',
      action: () => { onNavigate('gov_dif_standards'); onClose(); },
    },
    {
      id: 'gov_privacy',
      title: 'POPIA, NDPA & GDPR Privacy Framework',
      subtitle: 'Candidate data sovereignty, AES-256 encryption, and zero selling',
      category: 'governance',
      badge: 'LEGAL',
      icon: '🛡️',
      action: () => { onNavigate('gov_privacy_framework'); onClose(); },
    },
    {
      id: 'gov_youth',
      title: 'Youth & Minor Safeguarding Policy',
      subtitle: 'Parental affirmative consent, age gates, and anti-exploitation charter',
      category: 'governance',
      badge: 'YOUTH',
      icon: '🌱',
      action: () => { onNavigate('gov_youth_safeguarding'); onClose(); },
    },

    // Commercial Offerings
    {
      id: 'comm_b2c',
      title: 'B2C Individual Career Pass',
      subtitle: 'Personal psychometric profiling, career discovery & development roadmaps',
      category: 'commercial',
      badge: 'PLANS',
      icon: '👤',
      action: () => { onNavigate('commercial_b2c'); onClose(); },
    },
    {
      id: 'comm_b2b',
      title: 'B2B University & Corporate Licensing',
      subtitle: 'Cohort talent analytics, department skills-gap matrices & LMS integration',
      category: 'commercial',
      badge: 'PLANS',
      icon: '🏢',
      action: () => { onNavigate('commercial_b2b'); onClose(); },
    },
    {
      id: 'comm_b2g',
      title: 'B2G National Deployment Agreements',
      subtitle: 'Sovereign in-country cloud instances and youth labor telemetry',
      category: 'commercial',
      badge: 'PLANS',
      icon: '🌐',
      action: () => { onNavigate('commercial_b2g'); onClose(); },
    },
  ];

  // Dynamic occupation commands from OCCUPATIONAL_DATABASE
  const occupationCommands: CommandItem[] = OCCUPATIONAL_DATABASE.map((occ) => ({
    id: `occ_${occ.id}`,
    title: occ.title,
    subtitle: `${occ.industry} · ISCO ${occ.iscoCode} · Holland: ${occ.riasecCode} · Demand: ${occ.demandTier}`,
    category: 'occupations',
    badge: 'CAREER',
    icon: '💼',
    action: () => {
      if (onSelectCareerForRoadmap) {
        onSelectCareerForRoadmap(occ);
      }
      onNavigate('careers');
      onClose();
    },
  }));

  const allCommands = [...staticCommands, ...occupationCommands];

  // Filter commands by search term
  const filteredCommands = allCommands.filter((cmd) => {
    if (!searchQuery.trim()) return cmd.category !== 'occupations'; // default top actions when empty
    const q = searchQuery.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.badge.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  }).slice(0, 16);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[80vh] border-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-950 flex items-center gap-3">
          <svg className="w-5 h-5 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, occupation, or policy document..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-transparent">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left ${
                    isSelected
                      ? 'bg-teal-950/80 text-white'
                      : 'hover:bg-slate-850 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <span className="text-lg shrink-0">{cmd.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate text-white">{cmd.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-teal-400 shrink-0">
                          {cmd.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{cmd.subtitle}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 shrink-0 hidden sm:inline">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs space-y-2">
              <p>No matches found for "{searchQuery}".</p>
              <p className="text-[11px] text-slate-500">Try searching for "cloud", "riasec", "policy", or "export".</p>
            </div>
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div className="p-2.5 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500 font-mono px-4">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>120+ Occupations & Modules Indexed</span>
        </div>
      </div>
    </div>
  );
};
