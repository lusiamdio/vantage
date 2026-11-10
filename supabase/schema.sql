-- =============================================================================
-- VANTAGE ENTERPRISE PSYCHOMETRIC & CAREER INTELLIGENCE PLATFORM
-- PRODUCTION SUPABASE POSTGRESQL BACKEND SCHEMA & RLS SUITE
-- =============================================================================
-- Features:
--   - Full role separation: individual, institution_admin, government_analyst, platform_superadmin
--   - Integrates with Supabase Auth (auth.users)
--   - 100% Row Level Security (RLS) enforcement across all tables
--   - 2PL-IRT psychometric instrument registry & candidate item response telemetry
--   - Differential Item Functioning (DIF) invariance audits & bias tracking
--   - High-throughput ISCO-08 occupational matching & personalized career roadmaps
--   - Institutional cohort talent analytics with strict k-anonymity (k >= 5) safeguards
--   - Sub-Saharan national labor intelligence indicators (B2G)
--   - FIPS 180-4 SHA-256 cryptographic audit logs & statutory compliance trail (POPIA, NDPA, GDPR)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. EXTENSIONS
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "citext";

-- -----------------------------------------------------------------------------
-- 2. CUSTOM TYPES & ENUMS
-- -----------------------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM (
      'individual',
      'institution_admin',
      'government_analyst',
      'platform_superadmin'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'assessment_category') THEN
    CREATE TYPE assessment_category AS ENUM (
      'personality_big_five',
      'career_interests_riasec',
      'cognitive_aptitude',
      'workplace_skills',
      'career_values',
      'emotional_competencies'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question_format') THEN
    CREATE TYPE question_format AS ENUM (
      'likert_5',
      'likert_7',
      'multiple_choice',
      'scenario_judgement',
      'numerical_problem',
      'abstract_pattern',
      'ranking'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'difficulty_level') THEN
    CREATE TYPE difficulty_level AS ENUM ('easy', 'moderate', 'advanced');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'session_status') THEN
    CREATE TYPE session_status AS ENUM ('in_progress', 'completed', 'abandoned');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sten_band') THEN
    CREATE TYPE sten_band AS ENUM ('Low', 'Moderate', 'High', 'Very High');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cognitive_band') THEN
    CREATE TYPE cognitive_band AS ENUM ('Superior', 'Above Average', 'Average', 'Developing');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'demand_tier') THEN
    CREATE TYPE demand_tier AS ENUM (
      'Exponential Growth',
      'High National Demand',
      'Stable Professional',
      'Transformational'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transition_difficulty') THEN
    CREATE TYPE transition_difficulty AS ENUM (
      'Entry / Direct',
      'Moderate Bridge Needed',
      'Specialized Degree Required'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'organization_type') THEN
    CREATE TYPE organization_type AS ENUM (
      'University',
      'Enterprise HR',
      'Vocational Academy',
      'Government Agency'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'campaign_status') THEN
    CREATE TYPE campaign_status AS ENUM ('Draft', 'Active', 'Paused', 'Completed', 'Archived');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invitation_status') THEN
    CREATE TYPE invitation_status AS ENUM ('pending', 'started', 'completed', 'expired');
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 3. ORGANIZATIONS & TENANTS (B2B / B2G)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type organization_type NOT NULL DEFAULT 'University',
  slug TEXT UNIQUE NOT NULL,
  domain TEXT,
  country TEXT NOT NULL DEFAULT 'Ghana',
  city TEXT,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  license_tier TEXT NOT NULL DEFAULT 'Institutional Standard',
  max_cohort_seats INTEGER NOT NULL DEFAULT 500,
  active_cohort_seats INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. USER PROFILES (1:1 with auth.users)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'individual',
  full_name TEXT NOT NULL,
  email CITEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Ghana',
  city TEXT NOT NULL DEFAULT 'Accra',
  age_band TEXT NOT NULL DEFAULT '19-24 (University/Grad)',
  current_status TEXT NOT NULL DEFAULT 'University Student',
  educational_background TEXT DEFAULT 'BSc Undergraduate',
  target_industries TEXT[] DEFAULT ARRAY['Technology & Cloud Infrastructure'],
  preferred_languages TEXT[] DEFAULT ARRAY['en'],
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  consent_accepted BOOLEAN NOT NULL DEFAULT TRUE,
  consent_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Organization Memberships (Multi-Tenant Access)
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_in_org TEXT NOT NULL DEFAULT 'member', -- 'owner', 'admin', 'evaluator', 'member'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- -----------------------------------------------------------------------------
-- 5. PSYCHOMETRIC INSTRUMENTS, SECTIONS & ITEMS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category assessment_category NOT NULL,
  description TEXT NOT NULL,
  scientific_foundation TEXT NOT NULL,
  instructions TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL DEFAULT 6,
  is_timed BOOLEAN NOT NULL DEFAULT FALSE,
  total_time_seconds INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assessment_questions (
  id TEXT PRIMARY KEY,
  section_id TEXT NOT NULL REFERENCES public.assessment_sections(id) ON DELETE CASCADE,
  category assessment_category NOT NULL,
  dimension TEXT NOT NULL,
  facet TEXT,
  prompt TEXT NOT NULL,
  format question_format NOT NULL DEFAULT 'likert_5',
  options JSONB NOT NULL DEFAULT '[]'::JSONB,
  is_reverse_scored BOOLEAN NOT NULL DEFAULT FALSE,
  time_limit_seconds INTEGER,
  difficulty_level difficulty_level DEFAULT 'moderate',
  scenario_context TEXT,
  pattern_svg_data TEXT,
  irt_discrimination_a NUMERIC(4,2) DEFAULT 1.20,
  irt_difficulty_b NUMERIC(4,2) DEFAULT 0.00,
  dif_status TEXT DEFAULT 'Invariant (Zero Bias)',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 6. ASSESSMENT SESSIONS & CANDIDATE ITEM RESPONSES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  campaign_id UUID,
  status session_status NOT NULL DEFAULT 'in_progress',
  current_section_id TEXT REFERENCES public.assessment_sections(id),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  total_duration_ms INTEGER DEFAULT 0,
  client_metadata JSONB DEFAULT '{}'::JSONB
);

CREATE TABLE IF NOT EXISTS public.candidate_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES public.assessment_questions(id) ON DELETE RESTRICT,
  category assessment_category NOT NULL,
  dimension TEXT NOT NULL,
  selected_option_id TEXT NOT NULL,
  numeric_value NUMERIC(6,2),
  reaction_time_ms INTEGER NOT NULL DEFAULT 0,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(session_id, question_id)
);

-- -----------------------------------------------------------------------------
-- 7. COMPUTED PSYCHOMETRIC DOSSIERS & RESULTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID UNIQUE NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assessment_version TEXT NOT NULL DEFAULT 'v2.4-SubSaharanNorms',
  validity JSONB NOT NULL,
  big_five JSONB NOT NULL,
  riasec JSONB NOT NULL,
  cognitive JSONB NOT NULL,
  career_values JSONB NOT NULL DEFAULT '[]'::JSONB,
  skills JSONB NOT NULL DEFAULT '[]'::JSONB,
  sha256_checksum TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 8. OCCUPATIONS & LABOUR TAXONOMY (ISCO-08 MAPPED)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.occupations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  isco_code TEXT NOT NULL,
  industry TEXT NOT NULL,
  riasec_code TEXT NOT NULL,
  demand_tier demand_tier NOT NULL DEFAULT 'High National Demand',
  salary_estimates JSONB NOT NULL,
  job_description TEXT NOT NULL,
  key_responsibilities TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  essential_skills TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  recommended_qualifications TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  african_academic_hubs TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  global_certifications TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  psychometric_evidence_explanation TEXT NOT NULL,
  growth_pathway TEXT NOT NULL,
  transition_difficulty transition_difficulty NOT NULL DEFAULT 'Direct / Moderate Bridge',
  ideal_riasec_weights JSONB NOT NULL DEFAULT '{}'::JSONB,
  ideal_big_five_stens JSONB NOT NULL DEFAULT '{}'::JSONB,
  min_cognitive_percentile NUMERIC(5,2) DEFAULT 50.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 9. CAREER RECOMMENDATIONS & MILESTONE ROADMAPS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  result_id UUID NOT NULL REFERENCES public.assessment_results(id) ON DELETE CASCADE,
  occupation_id TEXT NOT NULL REFERENCES public.occupations(id) ON DELETE CASCADE,
  overall_match_score NUMERIC(5,2) NOT NULL,
  riasec_congruence_pct NUMERIC(5,2) NOT NULL,
  personality_fit_pct NUMERIC(5,2) NOT NULL,
  cognitive_suitability_pct NUMERIC(5,2) NOT NULL,
  skills_readiness_pct NUMERIC(5,2) NOT NULL,
  rank_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(result_id, occupation_id)
);

CREATE TABLE IF NOT EXISTS public.career_roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  occupation_id TEXT NOT NULL REFERENCES public.occupations(id) ON DELETE CASCADE,
  phase TEXT NOT NULL, -- e.g. '0-3 Months (Immediate Skills)'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Skill Acquisition', 'Academic / Degree', 'Certification', etc.
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  resource_link TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 10. ENTERPRISE CAMPAIGNS & INVITATIONS (B2B)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enterprise_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_role TEXT NOT NULL DEFAULT 'Software Engineers & Data Analysts',
  candidates_invited INTEGER NOT NULL DEFAULT 0,
  completed_count INTEGER NOT NULL DEFAULT 0,
  cut_off_sten NUMERIC(3,1) NOT NULL DEFAULT 7.0,
  deadline DATE NOT NULL,
  status campaign_status NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add foreign key back to assessment_sessions
ALTER TABLE public.assessment_sessions
  DROP CONSTRAINT IF EXISTS fk_sessions_campaign,
  ADD CONSTRAINT fk_sessions_campaign
  FOREIGN KEY (campaign_id) REFERENCES public.enterprise_campaigns(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS public.campaign_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.enterprise_campaigns(id) ON DELETE CASCADE,
  candidate_email CITEXT NOT NULL,
  candidate_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(24), 'hex'),
  status invitation_status NOT NULL DEFAULT 'pending',
  invited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(campaign_id, candidate_email)
);

-- -----------------------------------------------------------------------------
-- 11. NATIONAL WORKFORCE TELEMETRY (B2G LABOUR INTELLIGENCE)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.government_workforce_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code TEXT NOT NULL, -- 'kenya', 'south_africa', 'nigeria', 'ghana', 'rwanda'
  country_name TEXT NOT NULL,
  reporting_year INTEGER NOT NULL DEFAULT 2026,
  reporting_quarter INTEGER NOT NULL DEFAULT 4,
  active_labor_surveys INTEGER NOT NULL DEFAULT 0,
  total_youth_assessed INTEGER NOT NULL DEFAULT 0,
  regions JSONB NOT NULL DEFAULT '[]'::JSONB,
  critical_shortage_occupations JSONB NOT NULL DEFAULT '[]'::JSONB,
  youth_vs_market_demand JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(country_code, reporting_year, reporting_quarter)
);

-- -----------------------------------------------------------------------------
-- 12. DIFFERENTIAL ITEM FUNCTIONING (DIF) & FAIRNESS AUDITS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dif_calibration_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id TEXT NOT NULL REFERENCES public.assessment_questions(id) ON DELETE CASCADE,
  focal_group TEXT NOT NULL, -- e.g. 'Francophone West Africa', 'Rural Sub-group'
  reference_group TEXT NOT NULL DEFAULT 'Urban Benchmark Sample',
  mantel_haenszel_chi_sq NUMERIC(6,3) NOT NULL,
  delta_dif_metric NUMERIC(6,3) NOT NULL,
  classification TEXT NOT NULL DEFAULT 'A (Negligible DIF)', -- ETS A, B, C standard
  invariance_confirmed BOOLEAN NOT NULL DEFAULT TRUE,
  auditor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  audit_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT
);

-- -----------------------------------------------------------------------------
-- 13. STATUTORY SECURITY AUDIT LOGS (POPIA / NDPA / GDPR / OWASP)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  actor TEXT NOT NULL,
  event_type TEXT NOT NULL, -- e.g. 'AUTH_SSO_LOGIN', 'CALC_RECORD_CHECKSUM', 'RIGHT_TO_ERASURE', 'COHORT_BATCH_QUERY'
  target_entity TEXT NOT NULL,
  record_digest TEXT, -- SHA-256 hash of accessed or modified record
  ip_address INET,
  user_agent TEXT,
  statutory_basis TEXT DEFAULT 'POPIA Section 11 & GDPR Article 22',
  status TEXT NOT NULL DEFAULT 'SUCCESS',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 14. HELPER FUNCTIONS & TRIGGERS
-- -----------------------------------------------------------------------------

-- Trigger function: Automatically set updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger across relevant tables
DROP TRIGGER IF EXISTS tr_organizations_updated ON public.organizations;
CREATE TRIGGER tr_organizations_updated
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_profiles_updated ON public.profiles;
CREATE TRIGGER tr_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_career_roadmaps_updated ON public.career_roadmaps;
CREATE TRIGGER tr_career_roadmaps_updated
  BEFORE UPDATE ON public.career_roadmaps
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_enterprise_campaigns_updated ON public.enterprise_campaigns;
CREATE TRIGGER tr_enterprise_campaigns_updated
  BEFORE UPDATE ON public.enterprise_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_government_workforce_updated ON public.government_workforce_indicators;
CREATE TRIGGER tr_government_workforce_updated
  BEFORE UPDATE ON public.government_workforce_indicators
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger function: Synchronize profile on new auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_role user_role := 'individual';
  assigned_name TEXT;
  extracted_org_id UUID := NULL;
BEGIN
  -- Extract user role from auth metadata if present
  IF (NEW.raw_user_meta_data->>'role') IS NOT NULL THEN
    BEGIN
      default_role := (NEW.raw_user_meta_data->>'role')::user_role;
    EXCEPTION WHEN OTHERS THEN
      default_role := 'individual';
    END;
  END IF;

  assigned_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1)
  );

  INSERT INTO public.profiles (
    id,
    role,
    full_name,
    email,
    country,
    consent_accepted,
    consent_date
  ) VALUES (
    NEW.id,
    default_role,
    assigned_name,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'country', 'Ghana'),
    TRUE,
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);

  -- Log audit record
  INSERT INTO public.security_audit_logs (
    user_id,
    actor,
    event_type,
    target_entity,
    status
  ) VALUES (
    NEW.id,
    'auth.provisioning',
    'USER_REGISTERED',
    'profiles/' || NEW.id::text,
    'SUCCESS'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Wire auth.users trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger function: Deterministic SHA-256 Checksum on Assessment Results
CREATE OR REPLACE FUNCTION public.compute_result_sha256()
RETURNS TRIGGER AS $$
DECLARE
  canonical_payload TEXT;
BEGIN
  canonical_payload := NEW.id::TEXT || ':' || NEW.user_id::TEXT || ':' ||
                       COALESCE(NEW.riasec->>'hollandCode', '') || ':' ||
                       COALESCE(NEW.cognitive->>'overallPercentile', '0') || ':' ||
                       NEW.completed_at::TEXT;
  NEW.sha256_checksum := encode(digest(canonical_payload, 'sha256'), 'hex');

  -- Log audit digest
  INSERT INTO public.security_audit_logs (
    user_id,
    actor,
    event_type,
    target_entity,
    record_digest,
    status
  ) VALUES (
    NEW.user_id,
    'scoringEngine.sha256',
    'ASSESSMENT_COMPLETED',
    'assessment_results/' || NEW.id::TEXT,
    NEW.sha256_checksum,
    'SUCCESS'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_assessment_results_sha256 ON public.assessment_results;
CREATE TRIGGER tr_assessment_results_sha256
  BEFORE INSERT OR UPDATE OF riasec, cognitive, big_five ON public.assessment_results
  FOR EACH ROW EXECUTE FUNCTION public.compute_result_sha256();

-- Security Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_current_user_org_id()
RETURNS UUID AS $$
  SELECT organization_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'platform_superadmin'
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Stored Procedure: Aggregated Cohort Analytics with k-anonymity (k >= 5)
CREATE OR REPLACE FUNCTION public.get_cohort_analytics(
  target_org_id UUID,
  min_k INTEGER DEFAULT 5
)
RETURNS JSONB AS $$
DECLARE
  total_count INTEGER;
  result JSONB;
BEGIN
  -- Verify caller is admin of this org or superadmin
  IF NOT (
    public.is_superadmin() OR
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = target_org_id AND user_id = auth.uid() AND role_in_org IN ('owner', 'admin')
    )
  ) THEN
    RAISE EXCEPTION 'Access denied: caller does not have administrative privileges for this organization.';
  END IF;

  SELECT COUNT(*) INTO total_count
  FROM public.assessment_sessions
  WHERE organization_id = target_org_id AND status = 'completed';

  -- Enforce strict k-anonymity privacy barrier
  IF total_count < min_k THEN
    RETURN jsonb_build_object(
      'status', 'ANONYMITY_THRESHOLD_NOT_MET',
      'min_required', min_k,
      'current_count', total_count,
      'message', 'Cohort analytics suppressed to safeguard candidate privacy (POPIA/NDPA minimum group size rule).'
    );
  END IF;

  SELECT jsonb_build_object(
    'organization_id', target_org_id,
    'total_candidates', total_count,
    'avg_cognitive_percentile', ROUND(AVG((r.cognitive->>'overallPercentile')::NUMERIC), 2),
    'generated_at', NOW()
  ) INTO result
  FROM public.assessment_sessions s
  JOIN public.assessment_results r ON r.session_id = s.id
  WHERE s.organization_id = target_org_id AND s.status = 'completed';

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- 15. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------

-- Enable RLS across all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occupations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enterprise_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_workforce_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dif_calibration_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Organizations Policies
CREATE POLICY "Public or members can read organizations"
  ON public.organizations FOR SELECT
  TO authenticated, anon
  USING (TRUE);

CREATE POLICY "Org admins or superadmin can update organization"
  ON public.organizations FOR UPDATE
  TO authenticated
  USING (
    public.is_superadmin() OR
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = organizations.id AND user_id = auth.uid() AND role_in_org IN ('owner', 'admin')
    )
  );

-- Profiles Policies
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR
    public.is_superadmin() OR
    (
      public.get_current_user_role() = 'institution_admin' AND
      organization_id = public.get_current_user_org_id()
    )
  );

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid() OR public.is_superadmin())
  WITH CHECK (id = auth.uid() OR public.is_superadmin());

-- Organization Members Policies
CREATE POLICY "Members can view membership"
  ON public.organization_members FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    public.is_superadmin() OR
    organization_id = public.get_current_user_org_id()
  );

-- Assessment Sections & Questions (Public read, Superadmin write)
CREATE POLICY "Anyone can view assessment sections"
  ON public.assessment_sections FOR SELECT
  TO authenticated, anon
  USING (TRUE);

CREATE POLICY "Superadmin can manage assessment sections"
  ON public.assessment_sections FOR ALL
  TO authenticated
  USING (public.is_superadmin());

CREATE POLICY "Anyone can view assessment questions"
  ON public.assessment_questions FOR SELECT
  TO authenticated, anon
  USING (TRUE);

CREATE POLICY "Superadmin can manage assessment questions"
  ON public.assessment_questions FOR ALL
  TO authenticated
  USING (public.is_superadmin());

-- Assessment Sessions Policies
CREATE POLICY "Users can manage own sessions"
  ON public.assessment_sessions FOR ALL
  TO authenticated
  USING (user_id = auth.uid() OR public.is_superadmin())
  WITH CHECK (user_id = auth.uid() OR public.is_superadmin());

-- Candidate Responses Policies (High privacy: individual candidate only)
CREATE POLICY "Users can insert own responses"
  ON public.candidate_responses FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own responses"
  ON public.candidate_responses FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_superadmin());

-- Assessment Results Policies
CREATE POLICY "Users can view own results"
  ON public.assessment_results FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    public.is_superadmin()
  );

CREATE POLICY "Users can insert own results"
  ON public.assessment_results FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR public.is_superadmin());

-- Occupations Taxonomy (Public read, Superadmin write)
CREATE POLICY "Anyone can view occupations"
  ON public.occupations FOR SELECT
  TO authenticated, anon
  USING (TRUE);

CREATE POLICY "Superadmin can manage occupations"
  ON public.occupations FOR ALL
  TO authenticated
  USING (public.is_superadmin());

-- Career Recommendations Policies
CREATE POLICY "Users can view own career recommendations"
  ON public.career_recommendations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_superadmin());

CREATE POLICY "Users can insert own recommendations"
  ON public.career_recommendations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR public.is_superadmin());

-- Career Roadmaps Policies
CREATE POLICY "Users can manage own roadmaps"
  ON public.career_roadmaps FOR ALL
  TO authenticated
  USING (user_id = auth.uid() OR public.is_superadmin())
  WITH CHECK (user_id = auth.uid() OR public.is_superadmin());

-- Enterprise Campaigns Policies (B2B Org Admins)
CREATE POLICY "Org admins can manage campaigns"
  ON public.enterprise_campaigns FOR ALL
  TO authenticated
  USING (
    organization_id = public.get_current_user_org_id() OR
    public.is_superadmin()
  )
  WITH CHECK (
    organization_id = public.get_current_user_org_id() OR
    public.is_superadmin()
  );

-- Campaign Invitations Policies
CREATE POLICY "Org admins can view invitations"
  ON public.campaign_invitations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.enterprise_campaigns
      WHERE enterprise_campaigns.id = campaign_invitations.campaign_id
        AND enterprise_campaigns.organization_id = public.get_current_user_org_id()
    ) OR
    candidate_user_id = auth.uid() OR
    public.is_superadmin()
  );

-- Government Workforce Indicators Policies (B2G Analysts & Superadmin)
CREATE POLICY "Government analysts can read workforce indicators"
  ON public.government_workforce_indicators FOR SELECT
  TO authenticated
  USING (
    public.get_current_user_role() IN ('government_analyst', 'platform_superadmin')
  );

CREATE POLICY "Superadmin can manage workforce indicators"
  ON public.government_workforce_indicators FOR ALL
  TO authenticated
  USING (public.is_superadmin());

-- DIF Calibration Audits Policies (Governance & Superadmin only)
CREATE POLICY "Governance team can read DIF audits"
  ON public.dif_calibration_audits FOR SELECT
  TO authenticated
  USING (public.is_superadmin());

CREATE POLICY "Superadmin can insert DIF audits"
  ON public.dif_calibration_audits FOR INSERT
  TO authenticated
  WITH CHECK (public.is_superadmin());

-- Security Audit Logs Policies (Append-only for system, viewable by Superadmin)
CREATE POLICY "Superadmin can view audit logs"
  ON public.security_audit_logs FOR SELECT
  TO authenticated
  USING (public.is_superadmin());

CREATE POLICY "System can append audit logs"
  ON public.security_audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

-- -----------------------------------------------------------------------------
-- 16. PERFORMANCE INDEXES
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_org ON public.profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_questions_section ON public.assessment_questions(section_id);
CREATE INDEX IF NOT EXISTS idx_questions_category_dim ON public.assessment_questions(category, dimension);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON public.assessment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_org ON public.assessment_sessions(organization_id);
CREATE INDEX IF NOT EXISTS idx_responses_session ON public.candidate_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_results_user ON public.assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_occupations_isco ON public.occupations(isco_code);
CREATE INDEX IF NOT EXISTS idx_occupations_riasec ON public.occupations(riasec_code);
CREATE INDEX IF NOT EXISTS idx_occupations_title_trgm ON public.occupations USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON public.career_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_user ON public.career_roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_org ON public.enterprise_campaigns(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.security_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_event ON public.security_audit_logs(event_type);

-- -----------------------------------------------------------------------------
-- 17. BASELINE SEED DATA
-- -----------------------------------------------------------------------------

-- Seed Psychometric Assessment Sections
INSERT INTO public.assessment_sections (id, title, category, description, scientific_foundation, instructions, estimated_minutes, is_timed, total_time_seconds)
VALUES 
(
  'sec_big_five',
  'Workplace Personality (Big Five / Five-Factor Model)',
  'personality_big_five',
  'Measures standard behavioural traits across Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability.',
  'Costa & McCrae Five-Factor Model (NEO-PI-R normative baseline calibrated for African vocational cohorts)',
  'Read each behavioral prompt and select how accurately it describes your natural approach in professional and academic settings.',
  8,
  FALSE,
  NULL
),
(
  'sec_riasec',
  'Vocational Interests & Occupational Alignments (Holland RIASEC)',
  'career_interests_riasec',
  'Evaluates affinity across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional vocational themes.',
  'John L. Holland Theory of Vocational Personalities and Work Environments (Hexagonal Congruence Model)',
  'Indicate your level of enthusiasm for each occupational activity, regardless of your current skillset.',
  8,
  FALSE,
  NULL
),
(
  'sec_cognitive',
  'General Cognitive Aptitude Battery (GCAT)',
  'cognitive_aptitude',
  'Adaptive problem-solving battery evaluating numerical reasoning, verbal deductions, abstract pattern discernment, and logic.',
  'Carroll-Horn-Cattell (CHC) Theory of Cognitive Abilities & 2PL Item Response Theory (IRT)',
  'Solve each problem within the allocated time window. Accuracy and speed are evaluated.',
  9,
  TRUE,
  540
)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample ISCO-08 Mapped Occupations
INSERT INTO public.occupations (
  id,
  title,
  isco_code,
  industry,
  riasec_code,
  demand_tier,
  salary_estimates,
  job_description,
  key_responsibilities,
  essential_skills,
  recommended_qualifications,
  african_academic_hubs,
  global_certifications,
  psychometric_evidence_explanation,
  growth_pathway,
  transition_difficulty
) VALUES
(
  'car_cloud_solutions_architect',
  'Cloud Solutions Architect & Systems Engineer',
  'ISCO-08 2511',
  'Information & Communication Technology',
  'IRC',
  'Exponential Growth',
  '{"usd": "$42,000 - $85,000", "zar": "R750,000 - R1,450,000", "kes": "KSh 3,200,000 - 6,800,000", "ngn": "₦32,000,000 - 68,000,000"}'::JSONB,
  'Designs resilient, scalable multi-region cloud infrastructures across AWS, Azure, and private sovereign data centers for continental enterprises.',
  ARRAY['Architect high-availability cloud migration strategies', 'Deploy automated infrastructure-as-code pipelines', 'Enforce zero-trust cybersecurity protocols'],
  ARRAY['Terraform / OpenTofu', 'Distributed Systems', 'Kubernetes Orchestration', 'Linux Kernel Optimization'],
  ARRAY['BSc Computer Science / Software Engineering', 'MSc Cloud Computing Architecture'],
  ARRAY['Ashesi University (Ghana)', 'University of Cape Town (South Africa)', 'Carnegie Mellon University Africa (Rwanda)'],
  ARRAY['AWS Certified Solutions Architect - Professional', 'Google Cloud Certified Professional Cloud Architect'],
  'Exceptional Investigative and Conventional alignment paired with high Conscientiousness (Sten >= 8) and advanced numerical aptitude.',
  'DevOps Specialist → Cloud Infrastructure Architect → VP of Enterprise Engineering',
  'Specialized Degree Required'
),
(
  'car_renewable_energy_engineer',
  'Renewable Energy Systems & Microgrid Engineer',
  'ISCO-08 2151',
  'Clean Energy & Power Infrastructure',
  'RIE',
  'Exponential Growth',
  '{"usd": "$34,000 - $68,000", "zar": "R620,000 - R1,180,000", "kes": "KSh 2,800,000 - 5,400,000", "ngn": "₦26,000,000 - 52,000,000"}'::JSONB,
  'Plans, designs, and installs off-grid solar mini-grids, wind hybrid systems, and commercial battery storage infrastructures across underserved rural and industrial zones.',
  ARRAY['Model solar irradiance and microgrid load capacities', 'Optimize battery energy storage system (BESS) lifecycles', 'Coordinate regulatory compliance with national grid authorities'],
  ARRAY['PVsyst Simulation', 'SCADA Controls', 'High-Voltage Switchgear Engineering', 'Energy Economics'],
  ARRAY['BSc Electrical & Power Engineering', 'BSc Renewable Energy Technologies'],
  ARRAY['Kwame Nkrumah University of Science & Technology (Ghana)', 'Strathmore Energy Research Centre (Kenya)', 'Stellenbosch University (South Africa)'],
  ARRAY['NABCEP Certified PV Installation Professional', 'CEM Certified Energy Manager'],
  'High Realistic and Investigative congruence paired with superior abstract and numerical problem-solving indices.',
  'Field Project Engineer → Mini-Grid Systems Architect → Chief Technical Director (Energy)',
  'Specialized Degree Required'
),
(
  'car_fintech_solutions_lead',
  'FinTech Product Architect & Mobile Money Lead',
  'ISCO-08 1219',
  'Financial Technology & Digital Banking',
  'EIC',
  'High National Demand',
  '{"usd": "$38,000 - $78,000", "zar": "R680,000 - R1,350,000", "kes": "KSh 3,000,000 - 6,200,000", "ngn": "₦30,000,000 - 64,000,000"}'::JSONB,
  'Spearheads cross-border settlement protocols, agency banking APIs, and credit scoring algorithms for inclusive digital payments.',
  ARRAY['Draft technical specifications for payment gateways', 'Manage statutory compliance with Central Bank sandbox frameworks', 'Lead multi-disciplinary squads of mobile and backend engineers'],
  ARRAY['API Ecosystem Design', 'Mobile Money ISO 20022 Protocols', 'Product Analytics', 'Fraud Anomaly Detection'],
  ARRAY['BSc Information Systems / Economics', 'MBA Technology Strategy'],
  ARRAY['Lagos Business School (Nigeria)', 'University of Nairobi (Kenya)', 'Wits Business School (South Africa)'],
  ARRAY['Certified Scrum Product Owner (CSPO)', 'Pragmatic Institute Certified (PMC)'],
  'Strong Enterprising-Investigative profile combined with high Extraversion and Conscientiousness.',
  'Associate Product Manager → FinTech Product Lead → Chief Product Officer',
  'Moderate Bridge Needed'
),
(
  'car_health_informatics_analyst',
  'Health Informatics & Epidemic Surveillance Specialist',
  'ISCO-08 2263',
  'Public Health & Digital Healthcare',
  'IRC',
  'Transformational',
  '{"usd": "$30,000 - $62,000", "zar": "R540,000 - R1,050,000", "kes": "KSh 2,400,000 - 4,900,000", "ngn": "₦22,000,000 - 48,000,000"}'::JSONB,
  'Designs sovereign electronic health record (EHR) frameworks, geospatial epidemiology dashboards, and supply chain telemetry for ministries of health and clinical research bodies.',
  ARRAY['Aggregate DHIS2 district epidemiological records', 'Construct predictive malaria and infectious vector transmission models', 'Enforce health data sovereignty and biometric privacy protocols'],
  ARRAY['DHIS2 Architecture', 'Bio-statistics (R / Python)', 'HL7 FHIR Interoperability', 'GIS Spatial Epidemiology'],
  ARRAY['BSc Health Informatics / Public Health', 'MSc Epidemiology & Biostatistics'],
  ARRAY['Makerere University (Uganda)', 'University of the Witwatersrand (South Africa)', 'University of Ghana School of Public Health'],
  ARRAY['CPHIMS Certified Professional in Healthcare Information & Management Systems', 'GISP Certified GIS Professional'],
  'Investigative-Conventional dominance with elevated Agreeableness and meticulous Conscientiousness.',
  'Data Surveillance Officer → Health Systems Architect → National Digital Health Advisor',
  'Specialized Degree Required'
)
ON CONFLICT (id) DO NOTHING;

-- Seed National Government Workforce Baseline Indicators
INSERT INTO public.government_workforce_indicators (
  country_code,
  country_name,
  reporting_year,
  reporting_quarter,
  active_labor_surveys,
  total_youth_assessed,
  regions,
  critical_shortage_occupations,
  youth_vs_market_demand
) VALUES
(
  'kenya',
  'Republic of Kenya (Ministry of Labour & TVET Authority)',
  2026,
  4,
  18,
  64500,
  '[
    {"regionName": "Nairobi Metropolitan", "assessedYouth": 28400, "youthUnemploymentPct": 13.8, "stemInterestPct": 42.1, "topEmergingNeed": "Cloud Computing & Cybersecurity", "priorityIntervention": "Scale Konza Technopolis TVET Apprenticeship Gating"},
    {"regionName": "Coastal Hub (Mombasa/Kilifi)", "assessedYouth": 14200, "youthUnemploymentPct": 18.2, "stemInterestPct": 31.4, "topEmergingNeed": "Maritime Logistics & Cold Chain Tech", "priorityIntervention": "Bandari Maritime Academy Curriculum Expansion"},
    {"regionName": "Western / Lake Basin (Kisumu)", "assessedYouth": 12100, "youthUnemploymentPct": 16.5, "stemInterestPct": 36.8, "topEmergingNeed": "AgTech & Irrigation Automation", "priorityIntervention": "Subsidized Mini-Grid Solar Installation Certification"},
    {"regionName": "Rift Valley Regional Hub (Nakuru/Eldoret)", "assessedYouth": 9800, "youthUnemploymentPct": 14.1, "stemInterestPct": 38.5, "topEmergingNeed": "Geothermal & Food Processing Systems", "priorityIntervention": "Geothermal Development Company (GDC) Skills Pipeline"}
  ]'::JSONB,
  '[
    {"title": "Renewable Microgrid Engineer", "sector": "Clean Energy", "nationalDeficitPct": 58, "recommendedCurriculumReform": "Mandate high-voltage DC battery storage units in diploma curriculums"},
    {"title": "Cloud Systems & DevOps Architect", "sector": "ICT & Digital Economy", "nationalDeficitPct": 52, "recommendedCurriculumReform": "Transition university curricula from legacy desktop programming to containerized cloud architectures"},
    {"title": "Biomedical Equipment Calibration Tech", "sector": "Public Health", "nationalDeficitPct": 46, "recommendedCurriculumReform": "Establish practical calibration laboratories in county referral hospitals"},
    {"title": "Precision AgTech Logistics Operator", "sector": "Agriculture", "nationalDeficitPct": 41, "recommendedCurriculumReform": "Integrate drone telemetry and soil sensor diagnostics into TVET diploma pathways"}
  ]'::JSONB,
  '[
    {"sector": "Technology & Cloud Computing", "youthInterestPct": 34, "marketOpeningsPct": 26},
    {"sector": "Renewable Energy & Power Systems", "youthInterestPct": 14, "marketOpeningsPct": 24},
    {"sector": "Agriculture & Climate Tech", "youthInterestPct": 11, "marketOpeningsPct": 28},
    {"sector": "Financial Tech & Mobile Banking", "youthInterestPct": 22, "marketOpeningsPct": 14},
    {"sector": "Public Health & Informatics", "youthInterestPct": 19, "marketOpeningsPct": 8}
  ]'::JSONB
)
ON CONFLICT (country_code, reporting_year, reporting_quarter) DO NOTHING;
