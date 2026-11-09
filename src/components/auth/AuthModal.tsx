/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Enterprise Sign-In & Sign-Up Panel (CodeRabbit Style)
 * Professional dual-column authentication panel with OAuth/SSO, role provisioning, and quick demo presets.
 */

import React, { useState } from 'react';
import { UserRole, UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onAuthenticate: (role: UserRole, profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  activeRole,
  onAuthenticate,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>(activeRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('Ghana');
  const [recoverySent, setRecoverySent] = useState(false);

  if (!isOpen) return null;

  // Preset quick roles for seamless testing
  const rolePresets = [
    {
      role: 'individual' as UserRole,
      title: 'Candidate / Learner',
      badge: 'B2C',
      tagline: 'Personal psychometric profiling, career discovery & skill roadmaps',
      defaultName: 'Kofi Mensah',
      defaultEmail: 'kofi.mensah@alumni.ashesi.edu.gh',
      defaultOrg: 'Ashesi University (Graduate)',
      targetView: 'results',
    },
    {
      role: 'institution_admin' as UserRole,
      title: 'University & Enterprise HR',
      badge: 'B2B',
      tagline: 'Cohort talent analytics, skills-gap heatmaps & campaign dispatch',
      defaultName: 'Dr. Amina Diallo',
      defaultEmail: 'a.diallo@pan-african-tech.edu',
      defaultOrg: 'Pan-African University of Technology & Innovation',
      targetView: 'institutional',
    },
    {
      role: 'government_analyst' as UserRole,
      title: 'Ministry of Labour / TVET',
      badge: 'B2G',
      tagline: 'National workforce intelligence, youth demographics & policy advisories',
      defaultName: 'Hon. David Kiprono',
      defaultEmail: 'd.kiprono@labour.go.ke',
      defaultOrg: 'Kenya Ministry of Labour & TVET Authority',
      targetView: 'government',
    },
    {
      role: 'platform_superadmin' as UserRole,
      title: 'Psychometrician & Admin',
      badge: 'GOVERNANCE',
      tagline: 'Instrument calibration, DIF bias audits & statutory compliance',
      defaultName: 'Prof. T. Adebayo (C.Psychol)',
      defaultEmail: 'adebayo.governance@vantage-talent.org',
      defaultOrg: 'Vantage Psychometric Governance Board',
      targetView: 'admin',
    },
  ];

  const handleQuickDemoSign = (preset: typeof rolePresets[0]) => {
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: preset.defaultName,
      email: preset.defaultEmail,
      country: preset.role === 'government_analyst' ? 'Kenya' : 'Ghana',
      city: 'Nairobi / Accra',
      ageBand: preset.role === 'individual' ? '19-24 (University/Grad)' : '35+ (Experienced)',
      currentStatus: preset.role === 'individual' ? 'Graduate' : 'Employed Professional',
      educationalBackground: preset.defaultOrg,
      targetIndustries: ['Technology & Cloud Infrastructure', 'Clean Energy & Infrastructure'],
      preferredLanguages: ['English'],
      organizationId: preset.defaultOrg,
      consentAccepted: true,
      consentDate: new Date().toISOString(),
    };

    onAuthenticate(preset.role, profile);
    onClose();
  };

  const handleOAuthSignIn = (provider: 'github' | 'google' | 'microsoft' | 'sso') => {
    const preset = rolePresets.find((r) => r.role === selectedRole) || rolePresets[0];
    const profile: UserProfile = {
      id: `usr_oauth_${provider}_${Date.now()}`,
      fullName: provider === 'github' ? 'Dev. Kwesi Arthur' : provider === 'google' ? 'Dr. Amina Diallo' : provider === 'microsoft' ? 'Prof. Sarah Osei' : 'Hon. David Kiprono',
      email: provider === 'github' ? 'kwesi.dev@github.com' : provider === 'google' ? 'amina.diallo@gmail.com' : provider === 'microsoft' ? 's.osei@university365.edu' : 'd.kiprono@labour.go.ke',
      country: 'Ghana',
      city: 'Accra / Nairobi',
      ageBand: '25-34 (Early Career)',
      currentStatus: 'Employed Professional',
      educationalBackground: preset.defaultOrg,
      targetIndustries: ['Technology & Cloud Infrastructure'],
      preferredLanguages: ['English'],
      organizationId: preset.defaultOrg,
      consentAccepted: true,
      consentDate: new Date().toISOString(),
    };

    onAuthenticate(selectedRole, profile);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preset = rolePresets.find((r) => r.role === selectedRole) || rolePresets[0];

    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: fullName || preset.defaultName,
      email: email || preset.defaultEmail,
      country,
      city: 'Capital Region',
      ageBand: selectedRole === 'individual' ? '19-24 (University/Grad)' : '25-34 (Early Career)',
      currentStatus: selectedRole === 'individual' ? 'Graduate' : 'Employed Professional',
      educationalBackground: organization || preset.defaultOrg,
      targetIndustries: ['Technology & Cloud Infrastructure'],
      preferredLanguages: ['English'],
      organizationId: organization || preset.defaultOrg,
      consentAccepted: true,
      consentDate: new Date().toISOString(),
    };

    onAuthenticate(selectedRole, profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl shadow-2xl overflow-hidden my-6 text-left grid grid-cols-1 lg:grid-cols-12 max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-sm"
          aria-label="Close authentication panel"
        >
          ✕
        </button>

        {/* ─────────────────────────────────────────────────────────────
            LEFT COLUMN: CodeRabbit Style Enterprise Showcase Banner
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/30 p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -left-12 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full"
          />

          <div className="space-y-6 relative z-10">
            {/* Logo / Illuminated Badge */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-400 flex items-center justify-center text-slate-950 font-black text-sm">
                V
              </div>
              <span className="text-sm font-bold tracking-tight text-white">Vantage Intelligence</span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold block mb-1">
                ENTERPRISE TALENT STACK
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                Scientific career intelligence at continental scale.
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Empowering learners, universities, and ministries with validated psychometrics and real-time labor telemetry.
              </p>
            </div>

            {/* CodeRabbit Style Value Prop Bullets */}
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <span><strong>25-Minute Adaptive Battery:</strong> CTT & 2PL-IRT calibrated without fatigue.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <span><strong>ISCO-08 Matching:</strong> Multi-attribute congruence to 120+ occupations.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <span><strong>Zero-Bias DIF Standards:</strong> Full statutory compliance with SA Employment Equity Act.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <span><strong>POPIA, NDPA & GDPR:</strong> Cryptographic data sovereignty & candidate privacy.</span>
              </div>
            </div>
          </div>

          {/* Social Proof / Metric Footer */}
          <div className="pt-6 mt-6 relative z-10">
            <div className="p-3 bg-slate-950/60 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-mono font-bold">
                <span>184,500+ ASSESSMENTS</span>
                <span aria-hidden="true">·</span>
                <span>40+ UNIVERSITIES</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Trusted by leading institutions across Kenya, South Africa, Nigeria, Ghana, and Rwanda.
              </p>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT COLUMN: CodeRabbit Style Interactive Sign-in/Sign-up Card
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Header & Mode Switcher */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {authMode === 'signin' ? 'Sign In to Vantage' : 'Create Your Enterprise Account'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'signin'
                  ? 'Access your personal psychometric profile or institutional workspace.'
                  : 'Start your career intelligence journey or deploy institutional licensing.'}
              </p>
            </div>

            {/* CodeRabbit Tab Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  authMode === 'signin'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  authMode === 'signup'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* CodeRabbit Style One-Click Social/SSO OAuth Buttons */}
          <div className="space-y-2.5">
            {/* GitHub OAuth Button */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('github')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('google')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google Workspace</span>
            </button>

            {/* Microsoft Azure / Office 365 Button */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('microsoft')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              <span>Continue with Microsoft 365 / Entra ID</span>
            </button>

            {/* Enterprise SAML SSO Button */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('sso')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span>Single Sign-On (SAML / University SSO)</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Or continue with email
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Role Persona Segmented Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Select Your Access Persona
            </label>
            <div className="grid grid-cols-2 gap-2">
              {rolePresets.map((preset) => {
                const isSelected = selectedRole === preset.role;
                return (
                  <button
                    type="button"
                    key={preset.role}
                    onClick={() => setSelectedRole(preset.role)}
                    className={`p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-teal-950/70 text-teal-100 ring-1 ring-teal-400/60 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white truncate">{preset.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-teal-400 shrink-0">
                        {preset.badge}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block line-clamp-1">{preset.defaultName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Kofi Mensah or Dr. Amina Diallo"
                  className="w-full bg-slate-950 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Work or Academic Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu or name@company.com"
                className="w-full bg-slate-950 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-300">Password</label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setRecoverySent(true);
                      setTimeout(() => setRecoverySent(false), 4000);
                    }}
                    className="text-[11px] text-teal-400 hover:text-teal-300"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              {recoverySent && (
                <div className="mb-2 p-2 rounded-lg bg-teal-950/70 text-teal-300 text-[11px]">
                  ✓ Password recovery instructions dispatched to {email || 'your email address'}.
                </div>
              )}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {selectedRole !== 'individual' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Institution, Ministry or Organization Name
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Ashesi University or Ministry of Labour"
                  className="w-full bg-slate-950 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-sm text-center mt-2"
            >
              {authMode === 'signin' ? 'Sign In to Vantage' : 'Create Free Enterprise Account'}
            </button>
          </form>

          {/* Quick 1-Click Demo Presets Bar */}
          <div className="pt-4 border-none space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              Instant 1-Click Demo Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {rolePresets.map((preset) => (
                <button
                  type="button"
                  key={preset.role}
                  onClick={() => handleQuickDemoSign(preset)}
                  className="p-2.5 text-left bg-slate-950 hover:bg-slate-850 rounded-xl transition-colors text-[11px]"
                >
                  <span className="font-semibold text-white block truncate">{preset.title.split(' ')[0]}</span>
                  <span className="text-teal-400 font-mono text-[10px] block mt-0.5">Demo →</span>
                </button>
              ))}
            </div>
          </div>

          {/* Terms Footer */}
          <p className="text-[11px] text-slate-500 text-center leading-relaxed pt-2">
            By continuing, you agree to Vantage's{' '}
            <span className="text-slate-400 underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-slate-400 underline cursor-pointer">POPIA/GDPR Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
