/* ============================================================
   data.js — static content constants + shared mutable state.
   The single source of truth for skills, DESA stack, "currently"
   items, and marquee text. Project/role data lives in JSON files.
   ============================================================ */

export const SKILL_GROUPS = [
  { name: 'Languages', accent: '', items: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'Backend', accent: 'blue', items: ['Node.js', 'Express.js', 'Laravel (PHP)', 'FastAPI', 'REST API design'] },
  { name: 'Frontend', accent: 'mint', items: ['React', 'React Native', 'HTML/CSS', 'Tailwind', 'Redux', 'Zustand'] },
  { name: 'Data & AI', accent: 'pink', items: ['PostgreSQL', 'MongoDB', 'SQLite', 'Firebase', 'RAG', 'Pinecone', 'pgvector', 'RAGAS', 'Langfuse', 'MCP (Model Context Protocol)', 'n8n'] },
  { name: 'Cloud & DevOps', accent: 'blue', items: ['Docker', 'CI/CD (GitHub Actions)', 'Vercel', 'GCP', 'Azure DevOps'] },
  { name: 'Tools', accent: '', items: ['Git/GitHub', 'Postman', 'Figma', 'VS Code', 'Expo'] },
];

export const DESA_STACK = ['Python (FastAPI)', 'React', 'Docker', 'n8n', 'Pinecone', 'pgvector', 'RAGAS', 'Langfuse', 'MCP', 'RustFS'];

export const NOW_ITEMS = [
  { k: 'Building', v: 'Data engineering & AI tooling @ Binus IT Division' },
  { k: 'Studying', v: 'CS (Binus International) × Software Engineering (La Trobe), 3rd year' },
  { k: 'Exploring', v: 'RAG evaluation, MCP tooling, pipeline observability' },
];

/* ------------------------------------------------------------
   SNAPS — community / event photos shown as a polaroid scatter
   in About. `src` points to assets/experience/*; if the file is
   missing, a colored placeholder with the caption is shown instead.
   `accent` sets the placeholder colour + card stripe.
   ------------------------------------------------------------ */
export const SNAPS = [
  { src: 'assets/experience/gdgoc-gemma.jpg', caption: 'gdgoc gemma workshop', accent: 'pink' },
  { src: 'assets/experience/robogals-onboarding.jpg', caption: 'robogals onboarding', accent: 'mint' },
  { src: 'assets/experience/aiesec-boothing.jpg', caption: 'aiesec boothing', accent: 'blue' },
  { src: 'assets/experience/shecodes-onboarding.jpg', caption: 'shecodes onboarding', accent: 'pink' },
  { src: 'assets/experience/binus-fl-group.jpg', caption: 'freshman leaders', accent: 'blue' },
  { src: 'assets/experience/binus-it-data-engineers.jpg', caption: 'it div data engineers', accent: 'pink' },
];

/* ------------------------------------------------------------
   EXPERIENCE — reverse-chronological timeline.
   Each entry is an organization. Single-role orgs have one
   object in `roles`; multi-role orgs (BINUS, Robogals) nest
   several, matching how they read on LinkedIn.
   accent keys category meaning (not random):
     blue = engineering / data   pink = AI / data
     mint = teaching / community / ops
   Dates verbatim from LinkedIn (see CLAUDE.md open item re: future dates).
   ------------------------------------------------------------ */
export const EXPERIENCE = [
  {
    org: 'Bina Nusantara IT Division',
    kind: 'work',
    accent: 'blue',
    logo: 'assets/logos/binus-it.png',
    roles: [{
      title: 'Associate Member Data Engineer',
      meta: 'Mar 2026 – Present · Jakarta · On-site',
      summary: 'The role behind the BINUS EDM DESA flagship above.',
      points: [
        'Built and maintained data engineering pipelines (Python, SQL, PostgreSQL) to process and transform structured datasets.',
        'Developed ETL workflows to extract, clean, transform, and load data across sources.',
        'Integrated vector databases and RAG workflows for pipeline error intelligence.',
        'Worked with Langfuse and RAGAS to evaluate LLM retrieval quality and monitor AI pipeline performance.',
      ],
    }],
  },
  {
    org: 'Privasimu',
    kind: 'work',
    accent: 'pink',
    logo: 'assets/logos/privasimu.png',
    roles: [{
      title: 'IT Support Intern',
      meta: 'Internship · Sep 2025 – May 2026 · Jakarta · Hybrid',
      summary: 'The internship behind the Privasimu project above.',
      points: [
        'Shipped production React interfaces for Kartinilove.ai and Privasimu from approved Figma designs.',
        'Built responsive, accessible UI across mobile, tablet, and desktop.',
        'Integrated frontend with backend databases via REST APIs on real production data.',
        'Implemented CMS-driven features with Strapi; contributed to chatbot features and early AI integrations.',
        'Supported client-facing work for Privasimu\u2019s enterprise partners (BCA, BRI, KAI, Bluebird).',
      ],
    }],
  },
  {
    org: 'AIESEC at BINUS',
    kind: 'org',
    accent: 'mint',
    logo: 'assets/logos/aiesec.png',
    roles: [{
      title: 'Customer Experience, Global Volunteer',
      meta: 'Full-time · Feb 2026 – Present · Jakarta · Hybrid',
      points: [
        'Managed participant communication and engagement across the Global Volunteer journey.',
        'Coordinated follow-ups with prospective volunteers and improved response tracking across the recruitment pipeline.',
        'Collaborated cross-functionally to resolve participant issues and act on recurring feedback.',
      ],
    }],
  },
  {
    org: 'BINUS University',
    kind: 'work',
    accent: 'blue',
    logo: 'assets/logos/binus.png',
    roles: [{
      title: 'Team Promotion',
      meta: 'Part-time · Oct 2025 – Present · On-site',
      points: [
        'Supported event operations as operator, usher, and logistics staff.',
        'Conducted sales calls for lead generation; managed customer comms over WhatsApp.',
        'Handled data entry and record keeping; supported marketing campaigns and events.',
      ],
    }],
  },
  {
    org: 'Robogals Jakarta',
    kind: 'org',
    accent: 'mint',
    logo: 'assets/logos/robogals.png',
    roles: [
      {
        title: 'Vice President',
        meta: 'Aug 2025 – Aug 2026 · On-site',
        points: [
          'Supported the President in chapter operations and alignment with org goals.',
          'Led cross-functional teams to plan and run STEM-outreach workshops and events for young women.',
          'Managed internal comms and delivery; represented the org with external partners.',
        ],
      },
      {
        title: 'Training Manager',
        meta: 'Oct 2024 – Aug 2025 · Hybrid',
        points: [
          'Ran interactive STEM teaching sessions encouraging female students toward computer science.',
          'Helped deliver the Kiwihosting workshop introducing web-hosting basics.',
        ],
      },
    ],
  },
  {
    org: 'GDGOC at BINUS',
    kind: 'org',
    accent: 'pink',
    logo: 'assets/logos/gdgoc.png',
    roles: [{
      title: 'Technical Developer',
      meta: 'Nov 2024 – Aug 2025 · Jakarta · Hybrid',
      points: [
        'Supported planning and delivery of technical events including the Gemma Workshop.',
        'Learned and taught end-to-end workshop material — a note-taking web app integrated with Gemma AI.',
        'Built and demoed a working frontend showcasing generative-AI integration.',
        'Gave real-time guidance to participants; collaborated with a 10+ person core team.',
      ],
    }],
  },
  {
    org: 'BINUS University — Teaching',
    kind: 'work',
    accent: 'blue',
    logo: 'assets/logos/binus.png',
    roles: [
      {
        title: 'Teaching Assistant — Database Technology',
        meta: 'Sep 2025 – Jan 2026 · On-site',
        points: [
          'Ran weekly 100-minute lab sessions over 13 weeks for ~21 students.',
          'Supported learning on ERDs, normalization, and practical database design.',
          'Guided hands-on lab exercises; conducted assessments and gave feedback.',
        ],
      },
      {
        title: 'Mentor',
        meta: 'Feb 2025 – Jan 2026 · On-site',
        points: [
          'Led small-group calculus mentoring for underclassmen.',
          'Organized sessions, gave personalized support, and helped prepare students for exams.',
        ],
      },
    ],
  },
  {
    org: 'BINUS University — Student roles',
    kind: 'org',
    accent: 'blue',
    logo: 'assets/logos/binus.png',
    roles: [
      {
        title: 'Freshmen Partner',
        meta: 'Sep 2025 – Aug 2026 · On-site',
        points: [
          'Facilitated weekly sessions across two semesters on academic readiness and personal development.',
          'Mentored freshmen through their transition; helped run an SDG-aligned campaign project.',
        ],
      },
      {
        title: 'Freshman Leader',
        meta: 'Seasonal · Aug 2025 – Sep 2025 · Hybrid',
        points: [
          'Guided incoming students through their first two weeks.',
          'Coordinated student mobility and daily Freshman Year Program activities.',
        ],
      },
    ],
  },
  {
    org: 'HIMTI BINUS University',
    kind: 'org',
    accent: 'mint',
    logo: 'assets/logos/himti.png',
    roles: [{
      title: 'Activist, HIMTI Care',
      meta: 'Mar 2025 – Apr 2026 · Jakarta · Hybrid',
      points: [
        'Contributed to planning community-care and well-being initiatives for HIMTI members.',
        'Helped conceptualize programs around mental health, stress relief, and team bonding.',
      ],
    }],
  },
  {
    org: 'SheCodes Society',
    kind: 'org',
    accent: 'mint',
    logo: 'assets/logos/shecodes.png',
    roles: [{
      title: 'Admin',
      meta: 'Feb 2025 – Jun 2025 · Jakarta · Hybrid',
      points: [
        'Supported behind-the-scenes operations (Google Classroom, group comms) for programs empowering women in STEM.',
        'Helped organize events including Kartini Day 2025 — a panel on gender inclusivity in tech, plus AI-innovation workshops.',
      ],
    }],
  },
];

export const EDUCATION = [
  {
    school: 'BINUS University International',
    degree: "Bachelor's, Computer Science",
    meta: 'Feb 2024 – Jan 2028 · GPA 3.95',
    note: 'Double degree with La Trobe University.',
    accent: 'blue',
    logo: 'assets/logos/binusinter.png',
    activities: 'GDGOC · AIESEC · Robogals · HIMTI · Student Mentor · TA (Database Technology) · Freshmen Leader & Partner (B29)',
  },
  {
    school: 'La Trobe University',
    degree: "Bachelor's, Software Engineering",
    meta: 'Feb 2024 – Jan 2028',
    note: 'Double degree with BINUS International.',
    accent: 'pink',
    logo: 'assets/logos/latrobe.png',
    activities: '',
  },
];

export const CERTIFICATIONS = [
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    meta: 'Issued Mar 2026',
  },
];

export const AWARDS = [
  {
    name: '1st Place — Creative Business Ideas Competition',
    issuer: 'BINUS University · Feb 2025',
    accent: 'pink',
    desc: 'International competition jointly organized by Woosong University (South Korea), Swiss German University, and BINUS. Our team proposed a sensor-based Luggage Loss Prevention System for baggage misplacement in travel — spanning problem identification, technical and business solution development, and a formal pitch to academic and industry judges. (Concept + presentation only.)',
  },
  {
    name: 'Widia Scholarship',
    issuer: 'BINUS University · Feb 2024',
    accent: 'blue',
    desc: 'Awarded for academic achievement in high school; recognizes excellence, leadership potential, and the WIDIA values (Women, Integrity, Diversity, Innovation, Agility).',
  },
];

export const LANGUAGES = [
  { name: 'English', level: 'Fluent' },
  { name: 'Indonesian', level: 'Fluent' },
  { name: 'Mandarin', level: 'Basic' },
];

/* marquee ticker — cycles through these messages, separated by a ✦ */
export const MARQUEE_ITEMS = [
  'building things, one commit at a time',
  'backend · data · ai engineering',
  'always open to new opportunities',
  'cs × software engineering',
  'debugging is half the fun',
];

/* shared mutable singleton — written once in main.init(), read by renderers */
export const state = { projects: [], profiles: null, profile: null };

export function resolveProfile(profiles) {
  const forParam = new URLSearchParams(window.location.search).get('for');
  if (forParam && profiles[forParam]) return profiles[forParam];
  return profiles.default;
}
