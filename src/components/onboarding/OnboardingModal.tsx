/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage User Onboarding & Demographic Calibration Modal
 */

import React, { useState } from 'react';
import { UserProfile } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  initialProfile,
}) => {
  const [fullName, setFullName] = useState(initialProfile?.fullName || 'Kofi Mensah');
  const [email, setEmail] = useState(initialProfile?.email || 'kofi.mensah@alumni.ashesi.edu.gh');
  const [country, setCountry] = useState(initialProfile?.country || 'Ghana');
  const [city, setCity] = useState(initialProfile?.city || 'Accra');
  const [ageBand, setAgeBand] = useState<UserProfile['ageBand']>(
    initialProfile?.ageBand || '19-24 (University/Grad)'
  );
  const [currentStatus, setCurrentStatus] = useState<UserProfile['currentStatus']>(
    initialProfile?.currentStatus || 'University Student'
  );
  const [educationalBackground, setEducationalBackground] = useState(
    initialProfile?.educationalBackground || 'BSc Computer Science & Data Analytics'
  );
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    initialProfile?.targetIndustries || ['Technology & Cloud Infrastructure', 'Clean Energy & Infrastructure']
  );
  const [consentAccepted, setConsentAccepted] = useState(initialProfile?.consentAccepted ?? true);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const industriesList = [
    'Technology & Cloud Infrastructure',
    'Financial Technology & Digital Banking',
    'Clean Energy & Infrastructure',
    'Agriculture, Climate Tech & Food Systems',
    'Public Health & Health Informatics',
    'Trade, Supply Chain & FMCG Logistics',
    'Creative Arts & Digital Media',
    'Public Administration & Governance',
  ];

  const toggleIndustry = (ind: string) => {
    if (selectedIndustries.includes(ind)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== ind));
    } else {
      setSelectedIndustries([...selectedIndustries, ind]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted) {
      setFormError('You must review and accept the psychometric data privacy notice to proceed.');
      return;
    }
    setFormError(null);

    const profile: UserProfile = {
      id: initialProfile?.id || `usr_${Date.now()}`,
      fullName,
      email,
      country,
      city,
      ageBand,
      currentStatus,
      educationalBackground,
      targetIndustries: selectedIndustries,
      preferredLanguages: ['English'],
      consentAccepted: true,
      consentDate: new Date().toISOString(),
    };

    onSaveProfile(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl text-left my-8">
        <div className="flex items-center justify-between mb-6 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Candidate Calibration Profile
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Calibrates psychometric norm tables and occupational matching to your regional education framework.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-lg p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
                placeholder="e.g. Kofi Mensah"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
                placeholder="kofi@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Country of Residence</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
              >
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="Egypt">Egypt</option>
                <option value="International / Other">International / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">City / Region</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
                placeholder="e.g. Accra"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Age Bracket</label>
              <select
                value={ageBand}
                onChange={(e) => setAgeBand(e.target.value as any)}
                className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
              >
                <option value="16-18 (Secondary)">16-18 (Secondary / High School)</option>
                <option value="19-24 (University/Grad)">19-24 (University / Recent Graduate)</option>
                <option value="25-34 (Early Career)">25-34 (Early / Mid-Career Professional)</option>
                <option value="35+ (Experienced)">35+ (Experienced / Senior Specialist)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Current Status</label>
              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value as any)}
                className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
              >
                <option value="University Student">University Student</option>
                <option value="Graduate">Recent Graduate</option>
                <option value="Secondary Student">Secondary Learner</option>
                <option value="Employed Professional">Employed Professional</option>
                <option value="Career Changer">Career Transitioner</option>
                <option value="Entrepreneur">Founder / Entrepreneur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Educational Discipline or Qualification
            </label>
            <input
              type="text"
              value={educationalBackground}
              onChange={(e) => setEducationalBackground(e.target.value)}
              className="w-full bg-slate-950 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-400 transition-colors"
              placeholder="e.g. BSc Computer Science, Diploma in Electrical Engineering, etc."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Priority Target Industries (Select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {industriesList.map((ind) => {
                const isSelected = selectedIndustries.includes(ind);
                return (
                  <button
                    type="button"
                    key={ind}
                    onClick={() => toggleIndustry(ind)}
                    className={`text-left text-xs px-3.5 py-2.5 rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-teal-950/70 text-teal-200 ring-1 ring-teal-400/50'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-850 hover:text-white'
                    }`}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privacy & POPIA/NDPA Consent */}
          <div className="p-4 bg-slate-950/70 rounded-xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded bg-slate-900 border-none text-teal-500 focus:ring-teal-400 focus:ring-offset-slate-950"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                I authorize Vantage to process my assessment data in compliance with South Africa’s POPIA, Nigeria’s NDPA, Kenya’s Data Protection Act, and GDPR. My individual results remain confidential and will never be disclosed to third-party employers without my explicit prior authorization.
              </span>
            </label>
            {formError && (
              <div className="p-3 rounded-xl bg-rose-950/60 text-rose-300 text-xs font-medium">
                ⚠️ {formError}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors shadow-sm"
            >
              Save Profile & Begin Calibration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
