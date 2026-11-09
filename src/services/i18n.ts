/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Pan-African Multilingual Localization Service
 * Supports English (en), French (fr), Swahili (sw), Portuguese (pt), and Arabic (ar).
 */

export type SupportedLanguage = 'en' | 'fr' | 'sw' | 'pt' | 'ar';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌍', region: 'Pan-African & International' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇮', region: 'Afrique de l’Ouest et Centrale' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', region: 'Jumuiya ya Afrika Mashariki' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇦🇴', region: 'Angola, Moçambique & Lusofonia' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬', region: 'شمال أفريقيا والمغرب العربي' },
];

export interface TranslationDictionary {
  tagline: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroSubtitle: string;
  getAssessedNow: string;
  institutionalDemo: string;
  compareCareers: string;
  searchPlaceholder: string;
  quickTestPrompt: string;
  profileEdit: string;
  settings: string;
  logout: string;
  commercialPlans: string;
  assessments: string;
  careers: string;
  institutional: string;
  government: string;
  normGroup: string;
  allRightsReserved: string;
  commandKHint: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    tagline: 'Understand your potential. Discover your direction. Build your future.',
    heroTitle1: 'Understand your potential.',
    heroTitleHighlight: 'Discover your direction.',
    heroTitle2: 'Build your future.',
    heroSubtitle: 'Stop guessing degrees, hires, and career moves. Vantage delivers scientifically calibrated psychometric evaluation, occupational matching, and workforce analytics in 25 minutes.',
    getAssessedNow: 'Get Assessed Now',
    institutionalDemo: 'Institutional & Enterprise Demo',
    compareCareers: 'Compare Careers',
    searchPlaceholder: 'Search careers, modules, or policies (Cmd+K)...',
    quickTestPrompt: 'Try 60-Second Micro-Assessment',
    profileEdit: 'Edit Profile & Calibration',
    settings: 'Settings & Data Export',
    logout: 'Log Out',
    commercialPlans: 'Commercial Plans',
    assessments: 'Psychometric Battery',
    careers: 'Occupational Matching',
    institutional: 'Institutional Talent Console',
    government: 'National Workforce Intelligence',
    normGroup: 'Normative Reference Group',
    allRightsReserved: 'All rights reserved. Calibrated for Pan-African workforce development.',
    commandKHint: 'Quick Search',
  },
  fr: {
    tagline: 'Comprenez votre potentiel. Découvrez votre voie. Bâtissez votre avenir.',
    heroTitle1: 'Comprenez votre potentiel.',
    heroTitleHighlight: 'Découvrez votre voie.',
    heroTitle2: 'Bâtissez votre avenir.',
    heroSubtitle: 'Ne devinez plus vos diplômes, recrutements et choix de carrière. Vantage offre une évaluation psychométrique scientifiquement étalonnée et des analyses du marché du travail en 25 minutes.',
    getAssessedNow: 'Commencer l’évaluation',
    institutionalDemo: 'Démonstration Institutionnelle',
    compareCareers: 'Comparer les métiers',
    searchPlaceholder: 'Rechercher métiers, modules ou chartes (Cmd+K)...',
    quickTestPrompt: 'Essai micro-évaluation 60s',
    profileEdit: 'Modifier mon profil',
    settings: 'Paramètres et export de données',
    logout: 'Se déconnecter',
    commercialPlans: 'Offres Commerciales',
    assessments: 'Batterie Psychométrique',
    careers: 'Moteur de Correspondance',
    institutional: 'Console Universitaire & RH',
    government: 'Intelligence Nationale de l’Emploi',
    normGroup: 'Groupe Normatif de Référence',
    allRightsReserved: 'Tous droits réservés. Étalonné pour le développement des talents africains.',
    commandKHint: 'Recherche Rapide',
  },
  sw: {
    tagline: 'Elewa uwezo wako. Tambua mwelekeo wako. Jenga mustakabali wako.',
    heroTitle1: 'Elewa uwezo wako.',
    heroTitleHighlight: 'Tambua mwelekeo wako.',
    heroTitle2: 'Jenga mustakabali wako.',
    heroSubtitle: 'Acha kubahatisha kuhusu masomo na taaluma. Vantage inakupa tathmini sahihi ya kisaikolojia, uwiano wa fani za kazi, na uchanganuzi wa soko la ajira kwa dakika 25.',
    getAssessedNow: 'Anza Tathmini Sasa',
    institutionalDemo: 'Onyesho la Taasisi na Vyuo',
    compareCareers: 'Linganisha Kazi',
    searchPlaceholder: 'Tafuta taaluma, moduli, au sera (Cmd+K)...',
    quickTestPrompt: 'Jaribu Mtihani wa Sekunde 60',
    profileEdit: 'Hariri Wasifu Wako',
    settings: 'Mipangilio na Data',
    logout: 'Ondoka',
    commercialPlans: 'Vifurushi vya Biashara',
    assessments: 'Vipimo vya Saikometriki',
    careers: 'Ulinganifu wa Kazi',
    institutional: 'Dashibodi ya Vyuo & HR',
    government: 'Uchambuzi wa Nguvukazi ya Taifa',
    normGroup: 'Kundi Sanifu la Marejeleo',
    allRightsReserved: 'Haki zote zimehifadhiwa. Imeundwa kwa ajili ya maendeleo ya Afrika.',
    commandKHint: 'Tafuta Haraka',
  },
  pt: {
    tagline: 'Compreenda o seu potencial. Descubra a sua direção. Construa o seu futuro.',
    heroTitle1: 'Compreenda o seu potencial.',
    heroTitleHighlight: 'Descubra a sua direção.',
    heroTitle2: 'Construa o seu futuro.',
    heroSubtitle: 'Deixe de adivinhar licenciaturas, contratações e rumos profissionais. A Vantage oferece avaliação psicométrica calibrada e dados de empregabilidade em 25 minutos.',
    getAssessedNow: 'Iniciar Avaliação',
    institutionalDemo: 'Demonstração Institucional',
    compareCareers: 'Comparar Carreiras',
    searchPlaceholder: 'Pesquisar carreiras, módulos ou políticas (Cmd+K)...',
    quickTestPrompt: 'Experimentar Micro-Teste de 60s',
    profileEdit: 'Editar Perfil',
    settings: 'Definições e Exportação',
    logout: 'Terminar Sessão',
    commercialPlans: 'Planos Comerciais',
    assessments: 'Bateria Psicométrica',
    careers: 'Motor de Correspondência',
    institutional: 'Painel Institucional e RH',
    government: 'Inteligência Nacional de Emprego',
    normGroup: 'Grupo Normativo de Referência',
    allRightsReserved: 'Todos os direitos reservados. Calibrado para o desenvolvimento de talentos em África.',
    commandKHint: 'Pesquisa Rápida',
  },
  ar: {
    tagline: 'افهم إمكاناتك. اكتشف مسارك. ابنِ مستقبلك.',
    heroTitle1: 'افهم إمكاناتك.',
    heroTitleHighlight: 'اكتشف مسارك.',
    heroTitle2: 'ابنِ مستقبلك.',
    heroSubtitle: 'توقف عن التخمين في اختيار التخصصات أو التوظيف. توفر منصة فانتاج تقييمات سيكومترية علمية دقيقة ومطابقة وظيفية شاملة في 25 دقيقة فقط.',
    getAssessedNow: 'ابدأ التقييم الآن',
    institutionalDemo: 'عرض توضيحي للمؤسسات والشركات',
    compareCareers: 'مقارنة المهن والمسارات',
    searchPlaceholder: 'ابحث عن المهن والوحدات والسياسات (Cmd+K)...',
    quickTestPrompt: 'جرّب التقييم السريع في 60 ثانية',
    profileEdit: 'تعديل الملف الشخصي',
    settings: 'الإعدادات وتصدير البيانات',
    logout: 'تسجيل الخروج',
    commercialPlans: 'الخطط والاشتراكات',
    assessments: 'مصفوفة التقييم السيكومتري',
    careers: 'محرك المطابقة المهنية',
    institutional: 'منصة الجامعات والموارد البشرية',
    government: 'ذكاء سوق العمل والتخطيط الوطني',
    normGroup: 'المجموعة المعيارية المرجعية',
    allRightsReserved: 'جميع الحقوق محفوظة. مُعاير لتنمية رأس المال البشري الأفريقي.',
    commandKHint: 'بحث سريع',
  },
};
