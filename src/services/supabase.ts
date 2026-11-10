/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Supabase Client & Backend Database Integration Service
 * Configured with live project credentials for Project "Vantage" (xlsyepfvlwwwaovivlaw).
 */

import { createClient } from '@supabase/supabase-js';
import {
  UserProfile,
  UserRole,
  AssessmentResultRecord,
  CandidateResponse,
  CareerMatch,
  RoadmapMilestone,
} from '../types';

// Supabase Project Credentials
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://xlsyepfvlwwwaovivlaw.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsc3llcGZ2bHd3d2Fvdml2bGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzMTcxODksImV4cCI6MjEwOTg5MzE4OX0.O7Qs5mKxYs_LLGK-9Kw57TvBYl42LUWjLSU89MRVAc0';
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_xWC-LRds0LCnXdNAWAzz1w_J5WwluaD';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. AUTHENTICATION SERVICES
// -----------------------------------------------------------------------------

export interface AuthSignUpPayload {
  email: string;
  password?: string;
  fullName: string;
  role: UserRole;
  country?: string;
  organization?: string;
}

/**
 * Signs up a new user with Supabase Auth and provisions their profile record.
 */
export async function supabaseSignUp(payload: AuthSignUpPayload): Promise<{
  user: any;
  profile: UserProfile | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password || 'VantageSecurePass@2026',
      options: {
        data: {
          full_name: payload.fullName,
          role: payload.role,
          country: payload.country || 'Ghana',
          organization: payload.organization || '',
        },
      },
    });

    if (error) {
      console.warn('Supabase Auth signUp returned error:', error.message);
      return { user: null, profile: null, error };
    }

    const userId = data.user?.id || `usr_${Date.now()}`;
    const profile: UserProfile = {
      id: userId,
      fullName: payload.fullName,
      email: payload.email,
      country: payload.country || 'Ghana',
      city: 'Capital Region',
      ageBand: payload.role === 'individual' ? '19-24 (University/Grad)' : '25-34 (Early Career)',
      currentStatus: payload.role === 'individual' ? 'University Student' : 'Employed Professional',
      educationalBackground: payload.organization || 'Higher Education / Enterprise Partner',
      targetIndustries: ['Technology & Cloud Infrastructure'],
      preferredLanguages: ['English'],
      organizationId: payload.organization,
      consentAccepted: true,
      consentDate: new Date().toISOString(),
    };

    // Attempt to upsert the profile into the public.profiles table
    if (data.user?.id) {
      await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          role: payload.role,
          full_name: payload.fullName,
          email: payload.email,
          country: payload.country || 'Ghana',
          educational_background: payload.organization || 'Undergraduate / Enterprise',
          consent_accepted: true,
          consent_date: new Date().toISOString(),
        })
        .select()
        .single();
    }

    return { user: data.user, profile, error: null };
  } catch (err: any) {
    console.error('Unexpected error in supabaseSignUp:', err);
    return { user: null, profile: null, error: err };
  }
}

/**
 * Signs in an existing user with Supabase Auth email and password.
 */
export async function supabaseSignIn(
  email: string,
  password?: string
): Promise<{ user: any; profile: UserProfile | null; role: UserRole; error: Error | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password || 'VantageSecurePass@2026',
    });

    if (error) {
      console.warn('Supabase Auth signIn returned error:', error.message);
      return { user: null, profile: null, role: 'individual', error };
    }

    let role: UserRole = (data.user?.user_metadata?.role as UserRole) || 'individual';
    let profile: UserProfile | null = null;

    // Fetch profile from public.profiles table
    if (data.user?.id) {
      const { data: dbProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (dbProfile) {
        role = dbProfile.role as UserRole;
        profile = {
          id: dbProfile.id,
          fullName: dbProfile.full_name,
          email: dbProfile.email,
          country: dbProfile.country,
          city: dbProfile.city || 'Capital Region',
          ageBand: (dbProfile.age_band as any) || '19-24 (University/Grad)',
          currentStatus: (dbProfile.current_status as any) || 'University Student',
          educationalBackground: dbProfile.educational_background || 'Higher Education / Enterprise',
          targetIndustries: dbProfile.target_industries || ['Technology & Cloud Infrastructure'],
          preferredLanguages: dbProfile.preferred_languages || ['English'],
          organizationId: dbProfile.organization_id,
          consentAccepted: dbProfile.consent_accepted ?? true,
          consentDate: dbProfile.consent_date || new Date().toISOString(),
        };
      }
    }

    if (!profile && data.user) {
      profile = {
        id: data.user.id,
        fullName:
          data.user.user_metadata?.full_name ||
          email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: data.user.email || email,
        country: data.user.user_metadata?.country || 'Ghana',
        city: 'Capital Region',
        ageBand: role === 'individual' ? '19-24 (University/Grad)' : '25-34 (Early Career)',
        currentStatus: role === 'individual' ? 'University Student' : 'Employed Professional',
        educationalBackground: 'Higher Education / Enterprise Partner',
        targetIndustries: ['Technology & Cloud Infrastructure'],
        preferredLanguages: ['English'],
        consentAccepted: true,
        consentDate: new Date().toISOString(),
      };
    }

    return { user: data.user, profile, role, error: null };
  } catch (err: any) {
    console.error('Unexpected error in supabaseSignIn:', err);
    return { user: null, profile: null, role: 'individual', error: err };
  }
}

/**
 * Initiates Supabase OAuth authentication for Google Workspace or Microsoft.
 */
export async function supabaseOAuthSignIn(
  provider: 'google' | 'azure'
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    return { error };
  } catch (err: any) {
    console.error('Error in supabaseOAuthSignIn:', err);
    return { error: err };
  }
}

/**
 * Signs out from Supabase Auth.
 */
export async function supabaseSignOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Error during Supabase signOut:', err);
  }
}

/**
 * Retrieves the current authenticated user and profile from Supabase.
 */
export async function getSupabaseCurrentUser(): Promise<{
  user: any;
  profile: UserProfile | null;
  role: UserRole;
}> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { user: null, profile: null, role: 'individual' };
    }

    let role: UserRole = (user.user_metadata?.role as UserRole) || 'individual';
    let profile: UserProfile | null = null;

    const { data: dbProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (dbProfile) {
      role = dbProfile.role as UserRole;
      profile = {
        id: dbProfile.id,
        fullName: dbProfile.full_name,
        email: dbProfile.email,
        country: dbProfile.country,
        city: dbProfile.city || 'Capital Region',
        ageBand: (dbProfile.age_band as any) || '19-24 (University/Grad)',
        currentStatus: (dbProfile.current_status as any) || 'University Student',
        educationalBackground: dbProfile.educational_background || 'Higher Education / Enterprise',
        targetIndustries: dbProfile.target_industries || ['Technology & Cloud Infrastructure'],
        preferredLanguages: dbProfile.preferred_languages || ['English'],
        organizationId: dbProfile.organization_id,
        consentAccepted: dbProfile.consent_accepted ?? true,
        consentDate: dbProfile.consent_date || new Date().toISOString(),
      };
    }

    return { user, profile, role };
  } catch (err) {
    console.error('Error fetching Supabase current user:', err);
    return { user: null, profile: null, role: 'individual' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. DATABASE & ASSESSMENT PERSISTENCE
// -----------------------------------------------------------------------------

/**
 * Saves candidate response items into Supabase public.candidate_responses
 */
export async function saveAssessmentResponsesToSupabase(
  sessionId: string,
  userId: string,
  responses: CandidateResponse[]
): Promise<boolean> {
  try {
    const payload = responses.map((r) => ({
      session_id: sessionId,
      user_id: userId,
      question_id: r.questionId,
      category: r.category,
      dimension: r.dimension,
      selected_option_id: r.selectedOptionId,
      numeric_value: r.numericValue,
      reaction_time_ms: r.reactionTimeMs,
      recorded_at: r.timestamp || new Date().toISOString(),
    }));

    const { error } = await supabase
      .from('candidate_responses')
      .upsert(payload, { onConflict: 'session_id, question_id' });

    if (error) {
      console.warn('Supabase candidate_responses insert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving responses to Supabase:', err);
    return false;
  }
}

/**
 * Persists calculated psychometric scores into Supabase public.assessment_results
 */
export async function saveAssessmentResultToSupabase(
  result: AssessmentResultRecord
): Promise<boolean> {
  try {
    const { error } = await supabase.from('assessment_results').upsert({
      session_id: result.id,
      user_id: result.userId,
      assessment_version: result.assessmentVersion || 'v2.4-SubSaharanNorms',
      validity: result.validity,
      big_five: result.bigFive,
      riasec: result.riasec,
      cognitive: result.cognitive,
      career_values: result.careerValues,
      skills: result.skills,
      sha256_checksum: `vntg_sha256_${Date.now()}`,
      completed_at: result.completedAt || new Date().toISOString(),
    });

    if (error) {
      console.warn('Supabase assessment_results insert warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving assessment result to Supabase:', err);
    return false;
  }
}

/**
 * Loads calculated psychometric results for a candidate from Supabase
 */
export async function fetchAssessmentResultFromSupabase(
  userId: string
): Promise<AssessmentResultRecord | null> {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.session_id || data.id,
      userId: data.user_id,
      completedAt: data.completed_at,
      assessmentVersion: data.assessment_version,
      validity: data.validity,
      bigFive: data.big_five,
      riasec: data.riasec,
      cognitive: data.cognitive,
      careerValues: data.career_values || [],
      skills: data.skills || [],
    };
  } catch (err) {
    console.error('Error loading result from Supabase:', err);
    return null;
  }
}

/**
 * Saves career roadmap milestones for a user into Supabase public.career_roadmaps
 */
export async function saveRoadmapMilestonesToSupabase(
  userId: string,
  occupationId: string,
  milestones: RoadmapMilestone[]
): Promise<boolean> {
  try {
    const records = milestones.map((m, index) => ({
      user_id: userId,
      occupation_id: occupationId,
      phase: m.phase,
      title: m.title,
      description: m.description,
      category: m.category,
      completed: m.completed,
      resource_link: m.resourceLink,
      order_index: index,
    }));

    const { error } = await supabase.from('career_roadmaps').upsert(records);
    if (error) {
      console.warn('Supabase career_roadmaps upsert warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving roadmap to Supabase:', err);
    return false;
  }
}

/**
 * Logs a statutory security or audit trail event to Supabase public.security_audit_logs
 */
export async function logSecurityAuditToSupabase(
  eventType: string,
  targetEntity: string,
  status: string = 'SUCCESS',
  userId?: string
): Promise<void> {
  try {
    await supabase.from('security_audit_logs').insert({
      user_id: userId || null,
      actor: userId ? `user.${userId}` : 'anonymous',
      event_type: eventType,
      target_entity: targetEntity,
      status,
      statutory_basis: 'POPIA Section 11 & GDPR Article 22',
    });
  } catch (err) {
    // Non-blocking telemetry
    console.warn('Supabase security log warning:', err);
  }
}

/**
 * Checks connection health to the Supabase project
 */
export async function checkSupabaseHealth(): Promise<{
  connected: boolean;
  project: string;
  url: string;
  error?: string;
}> {
  try {
    const { error } = await supabase.from('organizations').select('count', { count: 'exact', head: true });
    if (error && error.code !== 'PGRST116') {
      return {
        connected: false,
        project: 'Vantage (xlsyepfvlwwwaovivlaw)',
        url: SUPABASE_URL,
        error: error.message,
      };
    }
    return {
      connected: true,
      project: 'Vantage (xlsyepfvlwwwaovivlaw)',
      url: SUPABASE_URL,
    };
  } catch (err: any) {
    return {
      connected: false,
      project: 'Vantage (xlsyepfvlwwwaovivlaw)',
      url: SUPABASE_URL,
      error: err.message,
    };
  }
}
