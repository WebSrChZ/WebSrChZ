import linkedinCover from '../../assets/linkedin-cover.png';
import srchzHubImg from '../assets/images/project_srchz_hub_1795599287453.jpg';
import itsPowerImg from '../assets/images/project_its_power_1795599291512.jpg';
import musicalBioImg from '../assets/images/project_musical_bio_1795599290131.jpg';
import ultrassomImg from '../assets/images/project_ultrassom_n2_1795599291842.jpg';

export type ProjectCategory =
  | 'All Works'
  | 'Strategy & Web'
  | 'SaaS & Systems'
  | 'Engineering & NDT'
  | 'Creative';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All Works'>;
  year: string;
  url: string;
  urlLabel: string;
  image: string;
  imageAlt: string;
  summary: string;
  architectureNote: string;
  deliverables: string[];
  stack: string[];
  featured?: boolean;
  hasSoundPathTool?: boolean;
}

export interface PracticeArea {
  index: string;
  title: string;
  scope: string;
  description: string;
  capabilities: string[];
}

export interface CareerEntry {
  period: string;
  organization: string;
  role: string;
  detail: string;
}

export interface MethodPhase {
  step: string;
  title: string;
  headline: string;
  description: string;
  output: string;
}

export const PROFILE = {
  brand: 'SrChZ',
  fullName: 'Rafael Henrique Cordeiro Santos',
  aliases: 'WebSrChZ ("Web Chaos") · SrChZ ("Chaos")',
  title: 'Solutions Strategist',
  tagline: 'Called in to fix what no one else can crack — whatever the field.',
  motto: 'Perception, Strategy & Execution — Solving what most people overlook.',
  company: 'SrChZ Technologies',
  cnpj: 'CNPJ 68.371.698/0001-95',
  personality: 'INTJ-A — The Architect',
  education: 'Computer Engineering + Psychoanalysis (UNINTER)',
  languages: 'PT (native) · EN (C2 — EF SET) · JP (B1)',
  location: 'Remote · Worldwide',
  email: 'rafael@srchz-technologies.com.br',
  coverImage: linkedinCover,
  epigraph:
    'Faith is the assured expectation of what is hoped for, the evident demonstration of realities that are not seen.',
  epigraphSource: 'Hebrews 11:1',
};

export const CREDENTIALS = [
  {
    value: '68.371.698',
    unit: 'CNPJ Registered',
    label: 'SrChZ Technologies — Incorporated 2026',
  },
  {
    value: '3',
    unit: 'Languages',
    label: 'Portuguese Native · English C2 · Japanese B1',
  },
  {
    value: '4',
    unit: 'Core Domains',
    label: 'Strategy, Tech, Visual & Industrial NDT',
  },
  {
    value: '2,934',
    unit: 'Curated Tracks',
    label: 'Interactive Musical Biography Archive',
  },
];

export const METHOD_PHASES: MethodPhase[] = [
  {
    step: '01',
    title: 'Perception',
    headline: 'Read the pattern beneath the noise.',
    description:
      'Every complex or stalled operation follows an underlying structure. Before touching tools or code, I dissect the operational mechanism, isolate bottlenecks, and separate symptoms from root causes.',
    output: 'Root-cause diagnosis · System map · Bottleneck audit',
  },
  {
    step: '02',
    title: 'Strategy',
    headline: 'Compare scenarios and architect the clearest path.',
    description:
      'Whether positioning a brand, structuring a client SaaS portal, or calibrating an ultrasonic inspection procedure, I evaluate trade-offs across technical, commercial, and human constraints.',
    output: 'Decision matrix · Technical & brand blueprint · Scope alignment',
  },
  {
    step: '03',
    title: 'Execution',
    headline: 'Deliver complete systems with aesthetic discipline.',
    description:
      'Strategy without implementation stays theoretical. I carry solutions from architecture to production deployment — websites, portals, automations, audiovisual narrative, or field engineering documentation.',
    output: 'Production software · Visual assets · Deployed operational system',
  },
];

export const PRACTICES: PracticeArea[] = [
  {
    index: '01',
    title: 'Strategy & Analysis',
    scope: 'Positioning · Growth · Root-Cause Audits',
    description:
      'Pattern reading, scenario comparison, brand positioning, and paid traffic architecture designed to turn ambiguous business friction into measurable direction.',
    capabilities: [
      'Pattern reading & bottleneck diagnosis',
      'Scenario comparison & strategic roadmaps',
      'Brand positioning & paid traffic systems',
    ],
  },
  {
    index: '02',
    title: 'Technology & Systems',
    scope: 'Web · SaaS Portals · Automation',
    description:
      'End-to-end engineering of responsive web hubs, real-time client SaaS portals, Supabase backends, and workflow integrations — carried from visual concept to enforced-HTTPS deploy.',
    capabilities: [
      'Custom web platforms & JSON-LD SEO',
      'Client-facing SaaS portals & PWAs',
      'Supabase Realtime & CI/CD automation',
    ],
  },
  {
    index: '03',
    title: 'Visual Production',
    scope: 'Direction · Video · Identity',
    description:
      'Cohesive visual systems uniting scripting, filming, precision video editing, and dark-tech brand identity so technical authority translates immediately on screen.',
    capabilities: [
      'Visual identity & editorial design systems',
      'Scripting, filming & cinematic post-production',
      'FFmpeg media pipelines & brand assets',
    ],
  },
  {
    index: '04',
    title: 'Data, AI & Engineering',
    scope: 'AI Evaluation · Prompts · Industrial NDT',
    description:
      'Rigorous analytical evaluation spanning AI model training, prompt engineering, quality assurance, and industrial Non-Destructive Testing (ultrasonic UT Level II, NR13/12/34).',
    capabilities: [
      'AI evaluation, training & quality analysis',
      'Structured prompt engineering',
      'Ultrasonic NDT inspection & technical publishing',
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'srchz-technologies',
    title: 'SrChZ Technologies — Solutions Strategist',
    subtitle: 'Umbrella Practice Hub & Lead Capture Platform',
    category: 'Strategy & Web',
    year: '2025 – 2026',
    url: 'https://www.srchz-technologies.com.br',
    urlLabel: 'srchz-technologies.com.br',
    image: srchzHubImg,
    imageAlt:
      'Dark architectural workstation with gold blueprint lines representing SrChZ Technologies hub',
    summary:
      'My umbrella company site on its own domain with enforced HTTPS. A Solutions Strategist hub routing visitors across three dedicated practices: Branding & Growth, Engenharia & END, and Tecnologia & Dados/IA.',
    architectureNote:
      'Engineered with a dark/gold architectural design language, responsive layout, structured JSON-LD SEO schema, and direct lead capture persisted into Supabase.',
    deliverables: [
      'Multi-practice routing architecture',
      'JSON-LD technical SEO & enforced HTTPS',
      'Supabase lead capture integration',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Supabase', 'JSON-LD SEO'],
    featured: true,
  },
  {
    id: 'its-power',
    title: 'ITS Power — Project Portal',
    subtitle: 'Real-Time Client SaaS & Editorial Operations',
    category: 'SaaS & Systems',
    year: '2025',
    url: 'https://www.srchz-technologies.com.br/its-power/',
    urlLabel: 'srchz-technologies.com.br/its-power',
    image: itsPowerImg,
    imageAlt:
      'Minimalist dark studio monitor showing a structured editorial timeline and project workflow',
    summary:
      'Client-facing SaaS portal built for digital content management and transparent delivery. Consolidates editorial planning, structured client review cycles, and instant status updates.',
    architectureNote:
      'Includes an interactive editorial calendar, direct feedback workflow, live notifications powered by Supabase Realtime, installable PWA manifest, and automated GitHub Actions deployment.',
    deliverables: [
      'Editorial calendar & client approval dashboard',
      'Supabase Realtime live notification stream',
      'Installable Progressive Web App & CI/CD deploy',
    ],
    stack: ['JavaScript', 'Supabase', 'Realtime', 'PWA', 'GitHub Actions'],
  },
  {
    id: 'ultrassom-nivel-2',
    title: 'Ultrassom Nível II — Guia Definitivo de Certificação',
    subtitle: 'Published Technical Monograph & UT Sound Path Hub',
    category: 'Engineering & NDT',
    year: '2025 – 2026',
    url: 'https://www.srchz-technologies.com.br/end/USN2/',
    urlLabel: 'srchz-technologies.com.br/end/USN2',
    image: ultrassomImg,
    imageAlt:
      'Industrial steel weld specimen, ultrasonic transducer probe, and matte-black hardcover engineering book',
    summary:
      'Published technical book on Ultrasonic Non-Destructive Testing (UT Level II), available on Amazon in Kindle, paperback, and hardcover editions — paired with an interactive Sound Path calculator hub.',
    architectureNote:
      'Covers acoustic wave physics, reference block calibration (DAC / TCG / DGS), weld and industrial inspection methodology, plus a fully worked certification examination.',
    deliverables: [
      'Amazon KDP publication (Kindle, paperback & hardcover)',
      'Acoustic physics, DAC / TCG / DGS calibration & solved exam',
      'Companion web hub with interactive Sound Path calculator',
    ],
    stack: ['Published Book', 'NDT', 'Ultrasonic Testing', 'Amazon KDP'],
    hasSoundPathTool: true,
  },
  {
    id: 'musical-biography',
    title: 'Musical Biography',
    subtitle: 'Interactive Sonic Archive — 2,934 Liked Songs',
    category: 'Creative',
    year: '2025',
    url: 'https://websrchz.github.io/BiografiaMusical/',
    urlLabel: 'websrchz.github.io/BiografiaMusical',
    image: musicalBioImg,
    imageAlt:
      'Matte studio headphones beside a vinyl sleeve and brushed bronze analog rotary dial in low-key lighting',
    summary:
      'An interactive biography constructed from the soundtrack that defines me — 2,934 liked songs spanning slowed + reverb, phonk, and Brazilian trap. Not about what I do, but who I am.',
    architectureNote:
      'Curated Spotify-driven narrative experience mapping personal chapters, listening aesthetics, and recurring sonic motifs across artists like LONOWN, ptasinski, riserayss, IZA, and Ana Castela.',
    deliverables: [
      'Narrative archive of 2,934 curated tracks',
      'Interactive chapter & genre curation',
      'Spotify listening integration',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Spotify'],
  },
];

export const CAREER_TIMELINE: CareerEntry[] = [
  {
    period: '2025 → Present',
    organization: 'SrChZ Technologies',
    role: 'Founder & Solutions Strategist',
    detail:
      'Web engineering, growth strategy, audiovisual production, and AI/data consulting. Formally incorporated in 2026 (CNPJ 68.371.698/0001-95).',
  },
  {
    period: '2023 → Present',
    organization: 'FGTECH',
    role: 'Non-Destructive Testing Technician (NDT)',
    detail:
      'Industrial ultrasonic testing and structural inspection under NR13, NR12, and NR34 safety and integrity regulations.',
  },
  {
    period: '2024 → 2025',
    organization: 'Atento',
    role: 'Bilingual CX Specialist · Meta Platforms',
    detail:
      'Bilingual analytical escalation, policy interpretation, and high-complexity customer experience across Meta ecosystem operations.',
  },
  {
    period: '2021 → 2022',
    organization: 'Impérium',
    role: 'Social Media Manager (Freelance)',
    detail:
      'Content positioning, visual direction, and growth management across digital channels.',
  },
  {
    period: '2019 → 2021',
    organization: 'RedeTec Play',
    role: 'Computer Technician',
    detail:
      'Hardware diagnostics, system assembly, maintenance, and technical troubleshooting — building on an early start in IT at age 14.',
  },
];

export const STACK_GROUPS = [
  {
    group: 'Web & Application Engineering',
    items: ['JavaScript', 'Node.js', 'HTML5', 'CSS3', 'PWA', 'JSON-LD SEO'],
  },
  {
    group: 'Data, Backend & Automation',
    items: ['Supabase', 'PostgreSQL', 'Python', 'Git', 'GitHub Actions'],
  },
  {
    group: 'Media & Industrial Craft',
    items: ['FFmpeg', 'Visual Direction', 'Ultrasonic NDT (UT N2)', 'DAC / TCG / DGS'],
  },
];

export const EDUCATION_CREDENTIALS = [
  {
    institution: 'UNINTER',
    credential: 'Computer Engineering + Psychoanalysis',
    note: 'Dual analytical foundation uniting systems architecture with human behavioral patterns.',
  },
  {
    institution: 'University of Sydney',
    credential: 'Design Thinking Certification',
    note: 'Structured problem framing, scenario prototyping, and user-centered iteration.',
  },
  {
    institution: 'EF SET',
    credential: 'English C2 Proficient · Trilingual',
    note: 'Native Portuguese, C2 English fluency, and B1 Japanese for international delivery.',
  },
];

export const SOUNDTRACK_PROFILE = {
  nowPlaying: 'Lembrança — MC Menor da L, MACIH',
  genres: ['slowed + reverb', 'phonk', 'Brazilian trap'],
  artists: ['LONOWN', 'ptasinski', 'riserayss', 'IZA', 'Ana Castela'],
  likedSongs: '2,934',
  archiveUrl: 'https://websrchz.github.io/BiografiaMusical/',
};

export const SOCIAL_LINKS = [
  { label: 'SrChZ Technologies', href: 'https://www.srchz-technologies.com.br' },
  { label: 'ITS Power Portal', href: 'https://www.srchz-technologies.com.br/its-power/' },
  { label: 'Musical Biography', href: 'https://websrchz.github.io/BiografiaMusical/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/websrchz' },
  { label: 'Instagram', href: 'https://instagram.com/websrchz' },
  { label: 'Email', href: 'mailto:rafael@srchz-technologies.com.br' },
];
