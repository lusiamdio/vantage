# VANTAGE: ENTERPRISE-GRADE PSYCHOMETRIC CAREER INTELLIGENCE PLATFORM
## Technical Product Requirements Document (PRD) & Architectural Blueprint

**Version:** 1.0.0-ENTERPRISE  
**Authors:** Chief Product Officer & Enterprise Software Architect  
**Classification:** Strategic Technical Specification  
**Strategy:** Africa-First, Globally Extensible Infrastructure  

---

### 1. PRODUCT VISION AND STRATEGIC POSITIONING

#### 1.1 Core Vision
To establish an independent, sovereign digital infrastructure for career discovery, psychometric assessment, and workforce intelligence across the African continent and emerging global markets.

#### 1.2 Core Value Proposition
> *"Understand your potential. Discover your direction. Build your future."*

#### 1.3 Strategic Positioning
Most existing psychometric tools are either:
1. Fragmented, superficial online quizzes lacking scientific validity.
2. Legacy Western assessment suites (SHL, Korn Ferry, Hogan) that are cost-prohibitive, culturally biased, and misaligned with African labor-market realities (e.g., informal economies, youth demographics, green transition, Leapfrog fintech ecosystems).

Vantage positions itself as the **definitive African psychometric and talent intelligence backbone**, integrating:
- **B2C (Individual Talent):** Secondary students, university graduates, and career transitioners seeking verified vocational direction.
- **B2B (Institutions & Employers):** Universities and enterprises conducting cohort assessments, skills-gap audits, and graduate recruitment campaigns.
- **B2G (Ministries & Public Sector):** Ministries of Labour, Education, and National Youth Development funds requiring macro-economic labor analytics and curriculum reform advisories.

---

### 2. PRODUCT ARCHITECTURE & MODULAR ECOSYSTEM

```
                                  +-------------------------------------------------------------+
                                  |                     VANTAGE GATEWAY                         |
                                  |    (Role-Based Access: B2C Candidate, B2B HR, B2G Ministry) |
                                  +------------------------------+------------------------------+
                                                                 |
               +-------------------------------------------------+-------------------------------------------------+
               |                                                 |                                                 |
+--------------v---------------+                 +--------------v---------------+                 +--------------v---------------+
|          B2C MODULE          |                 |          B2B MODULE          |                 |          B2G MODULE          |
|  - Candidate Calibration     |                 |  - Cohort Talent Analytics   |                 |  - Regional Talent Heatmap   |
|  - Psychometric Test Runner  |                 |  - Skills-Gap Deficit Matrix |                 |  - Youth vs Demand Mismatch  |
|  - Holland / FFM Dashboard   |                 |  - Campaign Batch Dispatch   |                 |  - Critical Shortage Alerts  |
|  - Career Match & Roadmap    |                 |  - Anonymity Threshold (N≥15)|                 |  - TVET Reform Directives    |
|  - Downloadable PDF Report   |                 |  - Role Benchmark Filters    |                 |  - Policy Intelligence Brief|
+--------------+---------------+                 +--------------+---------------+                 +--------------+---------------+
               |                                                 |                                                 |
               +-------------------------------------------------+-------------------------------------------------+
                                                                 |
                                  +------------------------------v------------------------------+
                                  |                   CORE ENGINES & SERVICES                   |
                                  +-------------------------------------------------------------+
                                  | 1. Psychometric Scoring Service (Classical Test Theory/IRT)  |
                                  | 2. Occupational Matching Engine (Holland Hexagonal Matrix)  |
                                  | 3. Explainable AI Intelligence (Server-Side Gemini API)     |
                                  | 4. Scientific Governance & DIF Invariance Monitor           |
                                  | 5. Multi-Currency Billing Engine (Paystack, M-Pesa, Ozow)   |
                                  +-------------------------------------------------------------+
```

---

### 3. TECHNICAL ARCHITECTURE

- **Frontend:** React 19 SPA, TypeScript, Tailwind CSS v4, Recharts for psychometric radar and labor distribution charts, Canvas-Confetti for milestones, responsive design across 1440px desktop, tablet, and mobile.
- **Backend / API:** Node.js with Express and TypeScript (`tsx`), modular route handlers, server-side `@google/genai` integration with User-Agent header `'aistudio-build'`.
- **Psychometrics:** 2-Parameter Logistic Item Response Theory (2PL-IRT) model for cognitive ability scaling and Classical Test Theory (CTT) item discrimination indices.
- **Data Protection:** POPIA (South Africa), NDPA (Nigeria), Kenya DPA, and GDPR adherence.

---

### 4. DATABASE ARCHITECTURE & ENTITY RELATIONSHIP MODEL (ERD)

```
[users] 1 --- 1 [user_profiles]
[users] 1 --- * [assessment_sessions]
[organisations] 1 --- * [organisation_members]
[organisations] 1 --- * [assessment_campaigns]
[assessments] 1 --- * [assessment_sections]
[assessment_sections] 1 --- * [questions]
[questions] 1 --- * [question_options]
[assessment_sessions] 1 --- * [assessment_responses]
[assessment_sessions] 1 --- 1 [assessment_scores]
[occupations] 1 --- * [occupation_skills]
[occupations] 1 --- * [career_recommendations]
[career_recommendations] 1 --- 1 [development_plans]
[development_plans] 1 --- * [roadmap_milestones]
[users] 1 --- * [consent_records]
[system] 1 --- * [audit_logs]
```

#### SQL Schema Specification (PostgreSQL / Relational):
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('individual', 'institution_admin', 'government_analyst', 'platform_superadmin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    age_band VARCHAR(50),
    current_status VARCHAR(100),
    educational_background TEXT,
    target_industries JSONB DEFAULT '[]'::jsonb,
    consent_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    consent_date TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE assessments (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL,
    reliability_alpha NUMERIC(4,2),
    norm_reference TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE assessment_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL,
    user_id UUID REFERENCES users(id),
    big_five_scores JSONB NOT NULL,
    riasec_scores JSONB NOT NULL,
    cognitive_scores JSONB NOT NULL,
    validity_telemetry JSONB NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 5. PSYCHOMETRIC FRAMEWORK

1. **Personality:** Costa & McCrae Five-Factor Model (FFM) measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability. Standardized to a 1–10 Sten scale (Mean = 5.5, SD = 2.0).
2. **Vocational Interests:** John L. Holland's SDS RIASEC hexagonal model (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) generating primary, secondary, and tertiary codes.
3. **Cognitive Aptitude:** Carroll-Horn-Cattell (CHC) fluid and crystallized intelligence tested across numerical problem-solving, verbal deductive syllogisms, abstract matrix patterns, and logical multi-constraint problems.
4. **Validity Telemetry:** Reaction-time latency monitors and item invariance tracking detecting straightline response bias or random guessing.

---

### 6. AI CAREER INTELLIGENCE ARCHITECTURE

- **Deterministic Rule Base:** Calculates Holland Hexagonal Congruence distance, Big Five trait affinities, and cognitive percentile matching against ISCO-08 occupational records.
- **Explainable AI Layer:** Server-side Gemini 3.8 Flash model synthesizes candidate test scores with regional economic growth drivers (AfCFTA trade, fintech infrastructure, solar mini-grids) to generate personalized roadmaps.
- **Traceability Guarantee:** All AI explanations cite specific test parameters (e.g. "82nd percentile numerical reasoning" or "Investigative-Enterprising RIASEC fit").

---

### 7. SECURITY & GOVERNANCE ARCHITECTURE

- **Statutory Privacy Compliance:** POPIA (South Africa), NDPA (Nigeria), Kenya Data Protection Act, GDPR.
- **Non-Deterministic Policy:** Psychometric and AI recommendations are strictly advisory and legally barred from serving as the sole automated criterion for hiring or educational exclusion.
- **Anonymity Protections:** Institutional reporting enforces a strict threshold (N ≥ 15) to prevent individual re-identification.
- **Audit Logging:** Tamper-evident logging of calibration modifications, bias reviews, and data access.
