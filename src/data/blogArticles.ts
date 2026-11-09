import blogCover1 from '../assets/images/bd913f1c-en.webp';
import blogCover2 from '../assets/images/images (13).jpg';
import blogCover3 from '../assets/images/images (12).jpg';
import blogCover4 from '../assets/images/The-Role-of-Psychometric-Testing-in-Corporate-LD-Learning-and-Development_Blog-header.webp';

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  publishedDate: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    body: string[];
    callout?: string;
  }[];
  relatedAction: {
    label: string;
    targetView: string;
  };
}

export const PLATFORM_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog_01_psychometric_precision',
    slug: 'science-of-25-minute-psychometric-precision',
    title: 'The Science of 25-Minute Precision: How Adaptive Psychometrics Outperforms 3-Hour Tests',
    subtitle: 'Overcoming test fatigue through Item Response Theory, Costa & McCrae Five-Factor calibration, and the Holland RIASEC circumplex.',
    category: 'Psychometric Science',
    coverImage: blogCover1,
    author: {
      name: 'Prof. T. Adebayo, PhD',
      role: 'Chief Psychometrician & ITC Fellow',
      avatarInitials: 'TA',
    },
    publishedDate: 'November 2026',
    readTime: '6 min read',
    summary: 'Traditional corporate psychometric batteries often take 2 to 4 hours, inducing severe cognitive fatigue, random answering, and straightlining. Vantage leverages Item Response Theory (IRT) parameter calibration to deliver laboratory-grade Sten reliability (α > 0.85) in just 25 minutes.',
    keyTakeaways: [
      'Testing fatigue after 40 minutes degrades data validity by up to 38% due to cognitive depletion.',
      '2-Parameter Logistic (2PL) Item Response Theory measures latent traits using high-discrimination items.',
      'Classical Test Theory (CTT) norming establishes representative Sub-Saharan benchmarks for urban and rural cohorts.',
      'Standardized Sten scores (1-10) offer clear, non-stigmatizing developmental indicators for career navigation.',
    ],
    contentSections: [
      {
        heading: '1. The Exhaustion Trap: Why Longer Tests Yield Worse Data',
        body: [
          'For decades, industrial psychologists operated under the assumption that more test items automatically equaled higher measurement precision. However, contemporary cognitive science has thoroughly debunked this brute-force approach.',
          'When candidates sit through 200+ personality questions or dozens of repetitive logic puzzles, fatigue sets in after approximately 35 to 45 minutes. Candidates begin "satisficing"—selecting the first acceptable answer rather than engaging in deep cognitive reflection. Straightlining (repeatedly clicking the middle or extreme options) spikes exponentially, corrupting the empirical validity of the assessment.',
        ],
        callout: 'Vantage limits the core battery to 25 minutes, maintaining candidate vigilance at peak neurological engagement.',
      },
      {
        heading: '2. Mathematical Foundations: 2PL Item Response Theory',
        body: [
          'Instead of summing raw Likert counts, Vantage applies Item Response Theory (IRT) calibration. Under the 2-Parameter Logistic (2PL) model, each question is characterized by two distinct psychometric coefficients: item difficulty (b) and item discrimination (a).',
          'High-discrimination items distinguish sharply between candidates possessing differing degrees of the underlying construct (such as Abstract Pattern Reasoning or Conscientiousness). By curating items with high information functions along the construct continuum, we achieve reliability coefficients (Cronbach’s α = 0.86 – 0.91) comparable to legacy 3-hour tests with less than a third of the item count.',
        ],
      },
      {
        heading: '3. Cultural Norming Across Pan-African Cohorts',
        body: [
          'A psychometric instrument is only as reliable as its normative reference sample. Western instruments administered in Nairobi, Lagos, or Johannesburg often reflect severe linguistic and cultural bias.',
          'Vantage normalizes Sten distributions against standardized African tertiary, secondary, and vocational demographics. This ensures that a Sten score of 7 in Analytical Fluidity represents genuine competitive excellence calibrated to real regional educational contexts.',
        ],
      },
    ],
    relatedAction: {
      label: 'Explore Assessment Battery Catalogue',
      targetView: 'assessments',
    },
  },
  {
    id: 'blog_02_labor_telemetry_matching',
    slug: 'closing-african-talent-opportunity-mismatch',
    title: 'Closing the Continental Opportunity Mismatch: Real-Time Labor Telemetry & ISCO-08 Matching',
    subtitle: 'Connecting candidate behavioral vectors to high-growth economic corridors across renewable energy, fintech, and digital logistics.',
    category: 'Labor Market Intelligence',
    coverImage: blogCover2,
    author: {
      name: 'Dr. Amina Diallo, C.Psychol',
      role: 'Director of Occupational Psychology',
      avatarInitials: 'AD',
    },
    publishedDate: 'November 2026',
    readTime: '7 min read',
    summary: 'Millions of African graduates emerge from universities qualified for yesterday’s economy while high-growth sectors face critical talent shortages. The Vantage Occupational Matching Engine bridges this divide using multi-attribute congruence and real-time labor telemetry.',
    keyTakeaways: [
      'Sub-Saharan Africa faces a 68% youth aspiration-to-market opening misalignment in traditional administrative sectors.',
      'Our engine integrates over 120 ISCO-08 occupational profiles mapped to localized compensation indices (USD, ZAR, KES, NGN).',
      'Holland RIASEC hexagonal calculus calculates geometric distance between candidate vocational interests and target environments.',
      'Coupling psychometric congruence with targeted educational capstones increases 3-year career retention by 42%.',
    ],
    contentSections: [
      {
        heading: '1. The Aspiration Paradox in African Labor Markets',
        body: [
          'National labor surveys across Kenya, South Africa, and Nigeria reveal a persistent paradox: soaring youth unemployment existing side-by-side with acute talent shortages in enterprise technology, off-grid clean energy, and agricultural value chains.',
          'Over 60% of secondary and university graduates state career aspirations concentrated in saturated clerical, legal, and general administrative fields. Meanwhile, renewable energy installers, cloud solutions architects, and health informaticians remain virtually unobtainable for regional employers.',
        ],
        callout: 'The solution is not more degrees; it is evidence-based vocational matching that reveals viable, high-demand pathways early.',
      },
      {
        heading: '2. Multi-Attribute Congruence Algorithms',
        body: [
          'Vantage does not generate career suggestions based on arbitrary keywords or simple personality tropes. Our engine calculates multi-attribute utility vectors across four empirical dimensions:',
          '1. Holland RIASEC Hexagonal Distance: Geometric Euclidean distance across the interest circumplex (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).',
          '2. Five-Factor Behavioral Fit: Matching candidate dispositions (e.g. stress tolerance, disciplined execution) against day-to-day occupational stressors.',
          '3. GCAT Cognitive Thresholds: Ensuring candidates possess the requisite fluid problem-solving capacity to master technical occupational demands.',
          '4. Regional Labor Market Demand: Weighting matches by verified employment growth rates and multinational employer hiring volumes.',
        ],
      },
      {
        heading: '3. Transparent Local Compensation & Academic Hubs',
        body: [
          'Vantage translates career recommendations into actionable reality by providing verified salary bands in local currencies (ZAR, KES, NGN, USD) and pointing candidates to leading accredited African universities and global professional certifications.',
        ],
      },
    ],
    relatedAction: {
      label: 'Inspect Occupational Matching Engine',
      targetView: 'careers',
    },
  },
  {
    id: 'blog_03_institutional_cohort_analytics',
    slug: 'how-universities-use-cohort-intelligence-for-employability',
    title: 'Inside the Institutional Console: How Universities Use Cohort Intelligence to Boost Employability',
    subtitle: 'Transitioning higher education from retrospective alumni surveys to predictive departmental skills-gap diagnostics.',
    category: 'Higher Education & Workforce',
    coverImage: blogCover3,
    author: {
      name: 'Adv. Tendai Mokoena',
      role: 'Head of Higher Education Partnerships',
      avatarInitials: 'TM',
    },
    publishedDate: 'November 2026',
    readTime: '6 min read',
    summary: 'University career centers have historically operated in the dark, relying on incomplete alumni surveys collected years after graduation. Vantage gives university leadership real-time cohort benchmarking, faculty skills-gap heatmaps, and automated testing campaigns.',
    keyTakeaways: [
      'Traditional alumni surveys suffer from sub-12% response rates and 2-year reporting lags.',
      'Departmental Skills-Gap Matrices detect curriculum deficits (e.g., cloud networking, quantitative modeling) in real time.',
      'Bulk assessment campaigns with custom cut-off Stens streamline graduate recruitment and internship placements.',
      'Mandatory aggregation thresholds (N ≥ 15) safeguard student privacy under POPIA, NDPA, and international standards.',
    ],
    contentSections: [
      {
        heading: '1. The Failure of Retrospective Career Services',
        body: [
          'For decades, university career services have operated with retrospective data. Deans and department heads would learn about graduate unemployment through news reports or alumni surveys conducted two to three years after convocation.',
          'By the time curriculum committees convened to adjust degree tracks, the economic landscape had shifted again. Higher education requires proactive, real-time diagnostic intelligence that evaluates student cohorts while they are still enrolled and capable of remediation.',
        ],
        callout: 'Cohort intelligence identifies competency deficits during the sophomore and junior years, leaving ample time for targeted curricular intervention.',
      },
      {
        heading: '2. Skills-Gap Matrices & Curricular Intervention',
        body: [
          'When an entire incoming class of engineering or business students completes Vantage, university administrators receive an aggregated Cohort Skills-Gap Matrix. This matrix compares measured student competencies directly against current labor market requisites.',
          'If a computer science cohort demonstrates outstanding abstract logic but exhibits a 24% deficit in collaborative communication and project execution, the faculty can immediately mandate agile team capstones or micro-credentials.',
        ],
      },
      {
        heading: '3. Enterprise Integration via LMS & API',
        body: [
          'Vantage integrates natively with university Learning Management Systems (Moodle, Canvas, Blackboard) via LTI 1.3 standards. Students complete assessments as part of standard orientation coursework, populating career services databases automatically while preserving confidentiality.',
        ],
      },
    ],
    relatedAction: {
      label: 'Explore Institutional Talent Console',
      targetView: 'institutional',
    },
  },
  {
    id: 'blog_04_algorithmic_fairness_dif',
    slug: 'algorithmic-invariance-and-ethical-ai-recruitment',
    title: 'Algorithmic Invariance & Ethical AI: Why We Reject Black-Box Recruitment Models',
    subtitle: 'Enforcing the Non-Deterministic Decision Principle and statistical Differential Item Functioning (DIF) across multilingual cohorts.',
    category: 'Governance & Ethics',
    coverImage: blogCover4,
    author: {
      name: 'Vantage Scientific Governance Board',
      role: 'Statutory Compliance & Fairness Directorate',
      avatarInitials: 'GB',
    },
    publishedDate: 'November 2026',
    readTime: '8 min read',
    summary: 'As hiring algorithms face worldwide regulatory scrutiny for discriminating against minorities and non-native speakers, Vantage demonstrates how explainable AI and mathematical DIF audits guarantee legal and moral fairness in workforce testing.',
    keyTakeaways: [
      'Black-box machine learning algorithms in recruitment amplify historical hiring biases without explainability.',
      'The Non-Deterministic Decision Principle prohibits any automated assessment score from serving as a sole exclusionary filter.',
      'Differential Item Functioning (DIF) detects cultural or linguistic variance using Mantel-Haenszel Delta statistics.',
      'Full compliance with Section 8 of South Africa’s Employment Equity Act, Nigeria’s NDPA, Kenya’s DPA, and GDPR Article 22.',
    ],
    contentSections: [
      {
        heading: '1. The Perils of Black-Box Recruitment AI',
        body: [
          'Recent years have seen an influx of "AI recruiting" platforms that scrape video interviews, analyze facial micro-expressions, or run opaque neural networks over resumes. Independent audits have repeatedly revealed that these systems systematically penalize candidates with regional accents, non-Western sentence structures, or non-traditional educational backgrounds.',
          'Such black-box systems violate fundamental labor rights. If an algorithm rejects a qualified applicant, neither the candidate nor the hiring manager can inspect the mathematical justification behind the rejection.',
        ],
        callout: 'Vantage strictly rejects black-box scoring. Every recommendation is traceable to empirical, peer-reviewed psychometric constructs.',
      },
      {
        heading: '2. The Non-Deterministic Decision Principle',
        body: [
          'Under our governance charter, Vantage psychometric scores are strictly classified as developmental and guidance indicators. In compliance with South Africa’s Employment Equity Act (Act 55 of 1998, Section 8), assessments must never be used as the sole automated gatekeeper for employment selection or academic exclusion.',
          'Human professionals must always remain in the loop, using assessment dossiers to inform structured interviews, mentoring roadmaps, and candidate onboarding.',
        ],
      },
      {
        heading: '3. Statistical DIF Auditing in Practice',
        body: [
          'To ensure cultural and linguistic non-bias across Africa’s diverse demographics, our scoring engine runs automated Differential Item Functioning (DIF) tests on every question.',
          'If an item in the Verbal Logic battery shows statistical variance (Mantel-Haenszel Delta > 1.5) between English and Swahili-speaking cohorts of identical overall cognitive aptitude, the item is immediately quarantined from candidate scoring until expert psychometric adjudication.',
        ],
      },
    ],
    relatedAction: {
      label: 'Read Full Governance & Standards Charter',
      targetView: 'gov_ethical_ai',
    },
  },
];
