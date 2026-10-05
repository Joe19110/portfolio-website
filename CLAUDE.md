# Joelliane Anggra — Tech Portfolio Website

## Project summary

Personal portfolio for Joelliane Anggra, 3rd-year double-degree Computer Science (Binus
International) / Software Engineering (La Trobe), targeting **backend, data engineering, and
AI engineering** internships. The deepest, most current work (BINUS EDM DESA) sits at the
intersection of all three — it is the flagship story, not one label among several.

Visual tone: cute and personable on the surface, technically serious underneath. No personal
photo — the design itself represents her. Content below is the source of truth; do not invent
facts, metrics, or links not listed here.

**Tagline direction:** "I build backend systems, data infrastructure, and the AI tooling that
sits on top of them."

## Role-targeted entry points

The site has one set of real content — nothing is rewritten or hidden per audience. What
changes between links is only *what greets the visitor first*.

- Links: `joelliane.dev` (default, neutral — use for GitHub/LinkedIn/general sharing),
  `joelliane.dev/?for=backend`, `?for=data`, `?for=ai`.
- On load, read `for` from `URLSearchParams`. Look it up in `role-profiles.json`. If missing
  or unrecognized, fall back to the `default` profile. No server, no per-role build, no
  duplicate pages.
- A role profile only controls: (1) the hero tagline variant, (2) which 3–4 projects appear in
  the homepage "featured" strip and in what order, (3) which skill group renders first in the
  Skills section. It does **not** change case-study text, hide any project from the full Work
  archive, or change any detail page — every project is equally reachable and equally honest
  regardless of entry link, so a recruiter who clicks around never finds a thinner version.

`role-profiles.json` shape:
```json
{
  "default": {
    "heroTagline": "I build backend systems, data infrastructure, and the AI tooling that sits on top of them.",
    "featured": ["desa", "privasimu", "gender-income-gap", "kitchen-serve"],
    "leadSkillGroup": "Backend"
  },
  "backend": {
    "heroTagline": "I build backend systems and the APIs, auth, and data layers underneath them.",
    "featured": ["desa", "kitchen-serve", "cuanin", "privasimu"],
    "leadSkillGroup": "Backend"
  },
  "data": {
    "heroTagline": "I build data pipelines, evaluation tooling, and the infrastructure that keeps them trustworthy.",
    "featured": ["desa", "gender-income-gap", "privasimu", "stemm-lab"],
    "leadSkillGroup": "Data & AI"
  },
  "ai": {
    "heroTagline": "I build AI tooling — RAG systems, evaluation pipelines, and agents with real tool access.",
    "featured": ["desa", "privasimu", "genshin-assistant", "gender-income-gap"],
    "leadSkillGroup": "Data & AI"
  }
}
```
Project IDs above must match the `id` field in `projects.json` (one project = one object, one
source of truth, rendered identically everywhere it appears).

## Design tokens

**Color palette**
- `--bg`: `#FDFCF8` (warm off-white page background)
- `--ink`: `#1A1A1A` (near-black text, not pure black)
- `--pink`: `#F4C0D1` (primary accent / highlighter marker color)
- `--pink-ink`: `#4B1528` (text on pink)
- `--blue`: `#E6F1FB` (secondary accent, card fills)
- `--blue-ink`: `#0C447C` (text on blue)
- `--mint`: `#E1F5EE` (tertiary accent, card fills)
- `--mint-ink`: `#085041` (text on mint)
- `--sand`: `#F4F1EA` (neutral card background)
- `--line`: `#E4E1D8` (hairline borders / grid lines)

Max 3 accent colors, assigned by category meaning, not cycled randomly — e.g. pink = AI/data
work, blue = backend/infra, mint = mobile/frontend.

**Typography**
- Headlines: a friendly, confident rounded sans-serif (e.g. "Clash Display", "General Sans",
  or "Sora"), tight line-height (1.05–1.15), sentence case.
- Body/UI: "Inter" or "General Sans", 15–16px, line-height 1.6, ~70-character max line length.
- Small labels (nav, tags, eyebrows): sentence case, 11–12px, muted — avoid tracked-out
  ALL-CAPS.

**Layout**
- Max content width ~1120px, centered.
- Hero sits on a faint graph-paper grid background (light `--line` gridlines, ~24px cells),
  with a thin colored marquee strip beneath it. Everything below the hero is plain `--bg`.
- One repeated card shape (16px radius) for currently-items, project cards, skill groups,
  leadership entries.
- Vertical rhythm: 80–120px between major sections desktop, 48–64px mobile.

**Signature playful details (pick 3–4, not all)**
- Small rotated sticker/emoji chip near the hero.
- Marquee ticker strip under the hero.
- Tech tags as hairline-border pill chips, filled only when tied to a category color.
- "Currently online" status dot beside her name in the nav.
- Terminal widget typing out `joelliane@portfolio:~$ whoami`.
- Project cards lift slightly on hover and reveal role/contribution tags.

Avoid: full dark hacker-terminal theme, glassmorphism, 3D graphics, gradient-mesh
backgrounds, skill percentage bars, stock illustrations, fake metrics, a 50-logo tech wall,
numbered markers on anything that isn't a true sequence.

## Visual reference implementation

The sections above describe the look in prose, which leaves room to drift toward generic
defaults. This section pins it down literally. Where this section and the prose above
conflict, this section wins.

**Reference image:** `/design/reference.png` in the repo root (attached separately) shows the
intended hero + currently block + project card treatment. Before building anything, look at
this image. It is the target, not a suggestion — match its proportions, spacing, and the
weight of the grid background, not just its color values.

**Fonts — exact, no substitution:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```
```css
--font-display: 'Sora', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
```
If `Sora` fails to load for any reason, fall back to `system-ui` — never silently substitute
a different decorative font.

**Hero grid-paper background:**
```css
.hero {
  background-color: var(--bg);
  background-image:
    linear-gradient(0deg, transparent 23px, var(--line) 24px),
    linear-gradient(90deg, transparent 23px, var(--line) 24px);
  background-size: 24px 24px;
}
@media (max-width: 640px) {
  .hero { background-size: 16px 16px; }
}
```

**Marquee ticker strip:**
```css
.marquee {
  background: var(--pink);
  color: var(--pink-ink);
  overflow: hidden;
  white-space: nowrap;
  padding: 6px 0;
  font-size: 11px;
}
.marquee__track {
  display: inline-block;
  animation: marquee 18s linear infinite;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
```
Duplicate the ticker text twice back to back inside `.marquee__track` so the loop has no
visible seam.

**Pill tag (tech tags, category labels):**
```css
.pill {
  display: inline-block;
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 999px;
  border: 0.5px solid var(--line);
  background: #fff;
}
.pill--pink { background: var(--pink); color: var(--pink-ink); border: none; }
.pill--blue { background: var(--blue); color: var(--blue-ink); border: none; }
.pill--mint { background: var(--mint); color: var(--mint-ink); border: none; }
```

**Card shape (currently-items, project cards, skill groups):**
```css
.card {
  background: var(--sand);
  border-radius: 16px;
  padding: 18px;
  transition: transform 0.15s ease;
}
.card:hover { transform: translateY(-3px); }
@media (prefers-reduced-motion: reduce) {
  .card:hover { transform: none; }
}
```

**Highlighter-marked headline phrase:**
```css
.highlight {
  background: var(--pink);
  padding: 1px 7px;
  border-radius: 6px;
}
```
Wrap only the short phrase called out per page (e.g. "I build"), never the full headline.

**Build-order checkpoint:** build the nav and Hero section first, using the tokens and
snippets above, and stop. Compare the result against `/design/reference.png` before
continuing — check grid density, card roundness, pill shape, and type scale specifically.
Only proceed to About / Work / Skills / Contact once the hero matches, since every later
section reuses the same card, pill, and type treatment — drift here compounds across every
page that follows.

## Site structure / navigation

Flat nav: **Home · Work · About · Skills · Contact**
Small status dot beside name/logo in nav.

## Page 1 — Hero

- Name + program line: "Joelliane Anggra — Computer Science × Software Engineering"
- Headline: role-profile's `heroTagline` (see routing section), with a short phrase
  highlighter-marked in pink — not the whole sentence.
- Supporting line: "Currently building data engineering and AI tooling as part of the BINUS
  IT Division."
- One considered visual element beside the headline (pick one: terminal widget, "currently
  building" card, or workspace illustration) — not all three stacked.
- Primary CTA: "View my work" → anchors to Work.
- Marquee strip under the hero, e.g. "building things, one commit at a time" repeated.

## Page 2 — About

Use this text close to verbatim (it's already in her voice):

> I'm a third-year Computer Science and Software Engineering student who likes building
> things that are meant to be used, not just graded. I've worked on a mobile platform for
> STEM education, AI-powered features during my internship, and a physics-based claw machine
> game. They're different problems, but in each one the part I care about most is the same:
> taking an idea and figuring out how to make it actually work.
>
> In practice, that means a lot of debugging. On Cuanin, that was tracking down why an escrow
> refund wasn't routing back to the right user. On STEMM Lab, it was figuring out why the app
> crashed when someone tapped a button too fast. I learn more from fixing problems like these
> than from the parts of a project that go smoothly the first time. That's part of why I try
> to design things with an actual user flow in mind — payments, login states, edge cases —
> instead of just building toward a spec.
>
> It's also why I look for projects outside what I already know. New tools, unfamiliar
> problems, or people who approach things differently all mean more of that same kind of
> problem-solving, which is the part I've realized I actually want more of.

No further rewriting needed here — render as given, split into the three paragraphs above.

## Page 3 — Flagship project: BINUS EDM DESA

Standalone, full-detail section — not folded into the general project grid.

- **Tags:** Backend · Data Engineering · AI Engineering
- **Role:** Associate Member Data Engineer, BINUS IT Division
- **Type:** Internal tool, in active rollout — full data engineering team migrating onto it
  as their primary workflow tool

**Overview:** An internal platform centralizing the data engineering team's workflow —
pipeline failures, data quality issues, access requests, schema changes, source onboarding —
replacing ad-hoc ticket handling with one system. Includes an AI chatbot with tool access to
live pipeline infrastructure.

**What I built** (confirmed personal work — use direct "I built / I implemented" language
throughout, no hedging):
- Built a data sanitization step and, downstream of it, an error classifier for automated
  error detection within Delman pipelines
- Linked the error-classification pipeline to Langfuse for tracing and observability
- Implemented the RAGAS evaluation pipeline for the project's RAG system
- Implemented RustFS (S3-compatible object storage) integration for pipeline archive storage
- Built complex chatbot features including command/skill-based actions, not just Q&A
- Built the FastAPI backend tying these pieces together, with MCP giving the chatbot direct
  tool access to Delman pipeline operations
- Used Docker for containerized execution and n8n for workflow automation

**Stack:** Python (FastAPI) · React · Docker · n8n · Pinecone · pgvector · RAGAS · Langfuse ·
MCP · RustFS

**Links:** No public repo or live demo — internal tool, confidentiality applies. State
plainly on the page: "Internal tool; code not public due to confidentiality. Demo video
below." Include:
- A screen-recorded demo video (e.g. the error classifier catching a bad pipeline run, or the
  chatbot executing a command/skill)
- A simplified architecture diagram with no internal URLs, server names, or proprietary logic
- The chatbot's system prompt and command/skill definitions, with a note on guardrails
- The MCP tool schema exposed to the model, with parameter descriptions
- A short explanation of the sanitization → classification pipeline logic
- RAGAS output numbers (faithfulness/retrieval metrics), if saved — *open item, confirm with
  Joelliane before publishing*

## Page 4 — Work grid (full case studies)

Order below. Each card on the grid shows: name, category tags, one-sentence summary,
contextual tech tags, "View project →". Each detail page follows the structure: Overview →
What I built/contributed (ownership-framed per rule below) → Architecture (where applicable)
→ Stack → Links.

**Ownership framing rule, apply everywhere:** default to "contributed to," "worked on," or
"as part of the team building X, I was responsible for [specific piece]" for team/internship
work. Use direct "I built / I implemented" only for pieces explicitly confirmed as personal
work (DESA items above; the Privasimu DPIA risk logic/matrix, DPIA Insight frontend, and
RAG/ISO work listed below). Project-level outcomes (adoption, client usage, business impact)
are always framed as team/company results contributed to, never owned solo.

### 1. Privasimu — Privacy Compliance & AI Platform (ROPA & DPIA)
- **Tags:** Frontend · Backend Integration · AI Engineering
- **Role on site:** Front-End Development & AI Agent Evaluation (formal title was IT Support
  Intern — use the descriptive version)
- **Type:** Internship, team project

Overview: A privacy compliance platform supporting ROPA and DPIA workflows. Work spanned
frontend architecture, API integration, compliance logic, DPIA risk visualization, and
AI-assisted compliance insight generation — including evaluating the AI outputs themselves.
Phrase client mentions as "built features used by Privasimu's enterprise clients, including
BCA, KAI, BRI Life, and Bluebird" — they are Privasimu's clients, not hers directly.

What I built:
- ROPA platform: built and modified ROPA interfaces; connected frontend to backend APIs;
  worked with compliance data spanning Indonesian PDP, GDPR, UK GDPR, Singapore PDPA, and
  CCPA-related exports; structured compliance fields (Controller Identity, Data Subject
  Rights & Compliance Status, `standards`/`required_for`)
- DPIA system & risk logic (personal work — direct language): built the DPIA Insight
  interface — questions answered → risk classified → visualized → AI mitigation guidance.
  Implemented deterministic risk classification across four answer states (Penuh / Sebagian /
  Tidak / Tidak Berlaku) and a risk matrix (Penuh/Tidak Berlaku → (1,1), Sebagian → (3,3),
  Tidak → (4,5)); built the question, heatmap, and summary views
- DPIA Insight AI (personal work): built the frontend (Next.js/TypeScript/Tailwind) for an
  AI-assisted workflow — DPIA results pass through a Laravel API into an AI/RAG layer
  grounded in privacy/security standards, returning mitigation guidance
- RAG / ISO standards (personal work): turned excerpts from ISO/IEC 27701:2025, ISO/IEC
  20889:2018, and ISO/IEC 24745:2022 into grounded, Indonesian-language mitigation guidance,
  including handling missing-knowledge cases
- AI agent evaluation (personal work): evaluated whether retrieved information supported AI
  answers and whether mitigation guidance was contextually relevant; implemented fallback
  behavior for unavailable AI/API key
- Built a feature to check and validate pasted text input *(open item — need one sentence
  from Joelliane on what this checks before publishing)*
- Shipped 5+ pages across 2 deployed platforms; contributed frontend/animations for
  KartiniLove.ai; worked with Strapi for blog/content

Not her work, do not attribute: DPIA risk-scoring model design and the AI evaluation
framework at large were team-level scope — everything not listed above defaults to
"contributed to."

Stack: Next.js · React · TypeScript · Tailwind CSS · Laravel (PHP) · PostgreSQL · RAG ·
Strapi

Links: Live — privasimu.com · Demo — youtu.be/b3HoGm2rBAo · Monthly reports — bit.ly/4uBxCpg

### 2. Gender Income Gap Forecasting (Research)
- **Tags:** Data Science · ML Research
- **Role:** Team member, research/modeling contribution
- **Type:** Research paper project

Overview: Research analyzing the U.S. gender income gap using ACS PUMS data (2014–2023),
comparing seven forecasting approaches via MASE before generating 2024–2026 projections.
Present the 2024–2026 figures as model projections, not predictions: "I compared seven
forecasting approaches and generated projections for..." never "the gap will be."

What I contributed:
- Processed and analyzed 2014–2023 ACS PUMS data; calculated the 2023 gap: $25,684
- Compared Linear Regression, Prophet, LSTM, SARIMA, ARIMA, XGBoost, and a naive baseline
- Evaluated with MASE — Linear Regression 0.369, Prophet 0.377, LSTM 1.555, SARIMA 2.313,
  ARIMA 2.414, Naive 2.415, XGBoost 2.416 (simpler models won — a good talking point for the
  page)
- Generated 2024–2026 forecasts: $25,872 · $26,380 · $26,889
- Documented methodology and findings in a research paper

Stack: Python · pandas · statsmodels · Prophet · XGBoost

Links: *(repo link — open item)*

### 3. Kitchen Serve+
- **Tags:** Backend · Full-Stack
- **Role:** Full-Stack Developer, team project
- **Type:** University group project, built for a real client (Cihen Kitchen)

Overview: A full-stack platform for Cihen Kitchen centralizing support, communication, and
operational workflows — ticketing, staff/customer portals, chat, and an AI chatbot.

What I contributed:
- Built responsive interfaces with React, Vite, Tailwind CSS; used Redux for global state
  across portal/ticket/chat interfaces
- Integrated the frontend with a Node.js/Express REST API (auth, user data, tickets,
  conversations)
- Implemented JWT authentication
- Integrated Gemini to power the in-app AI chatbot, connected to application context
- Used Cloudinary for media handling, Swagger for API docs
- Containerized with Docker; deployed on Vercel (zero-cost setup)

Worth a line in "what went wrong": the deployed server went down at one point — a real
lesson about the gap between a working local build and a maintained deployed service.

Stack: React · Vite · Tailwind CSS · Redux · Node.js · Express.js · MongoDB · JWT ·
Cloudinary · Swagger · Docker · Gemini · Vercel

Links: Live — kitchen-serve-frontend.vercel.app · GitHub — github.com/Joe19110/KitchenServe ·
Demo — youtu.be/i31Xsk1Hf-o

### 4. Cuanin
- **Tags:** Backend · Mobile · Product Thinking
- **Role:** Mobile Developer, one of two core developers
- **Type:** Hackathon entry, group project

Overview: A React Native task marketplace (Giver/Doer) built around a full task lifecycle:
create → find/accept → communicate → complete → escrow payment → rate.

What I built — lead with the task lifecycle state machine, it's the most technically
interesting part:
- Separate Giver/Doer mobile workflows and the dual-role architecture end to end
- Task lifecycle as a state machine (creation → acceptance → in-progress → completion →
  payment release → rating)
- Real-time chat tied to an active task
- Escrow-based transaction flow: payment deposited → work performed → completion confirmed →
  funds released
- Ratings/reputation tied to completed tasks
- Notification flows around task and transaction events
- Real-time state via Zustand with secure live sessions in Firestore

Stack: React Native · Expo · Firebase · Zustand

Links: GitHub — github.com/dreamsdagger/cuanin · APK —
github.com/dreamsdagger/cuanin/releases/tag/v1.0.0

### 5. STEMM Lab
- **Tags:** Mobile · Data Architecture
- **Role:** Mobile Developer — UI/UX, application development, local data architecture, team
  project
- **Type:** University group project

Overview: A React Native STEM-education app for children built around sensor-based
activities. The real story is offline-first architecture and local persistence — keep this
distinct from Cuanin's marketplace/transaction focus even though the stack overlaps.

What I contributed:
- UI/UX design and brainstorming, plus general application development
- Offline-first data flow: SQLite persistence → hydrates Zustand state → UI reads from state
  → changes persist back to SQLite
- Improved stored data from text-based to structured JSON — easier to parse, update, sync,
  and reuse

Stack: React Native · Expo · SQLite · Zustand

Links: GitHub — github.com/waengs/StemmLab · APK —
github.com/waengs/StemmLab/releases/tag/v1.0.0 · Demo — youtu.be/RCONOeSoBkA

### 6. Genshin Build & Team Comp Assistant (planned)
- **Tags:** Backend · Data Engineering · AI Engineering · Solo
- **Role:** Solo, individually owned start to finish
- **Type:** Personal project, built for genuine personal use

Overview: A RAG assistant over character build data (artifacts, weapons, team comps, talent
materials) — a real tool for a problem Joelliane actually has, not a demo exercise.
Purpose-built to be the portfolio's fully solo, individually-owned, evaluated AI/data project
with zero ownership ambiguity. Build spec lives separately in
`genshin-rag-assistant-CLAUDE.md`. Mark this card "in progress" until built; do not publish
a detail page with unbuilt features described as done.

Stack: Python (FastAPI) · Pinecone or pgvector · RAGAS · React

Links: *(add once built)*

### 7. Catch n' Collect (Pygame Claw Game)
- **Tags:** Solo project · Systems/Graphics
- **Role:** Game Developer, solo
- **Type:** University individual project

Keep this card's tone lighter — "built for fun, solo," not a flagship.

Overview: A web-playable 2D arcade game simulating a physical claw machine, with a custom
rigid-body physics engine and persistent save system.

What I built:
- Independently engineered a real-time physics environment (collision, rigid-body dynamics)
- Dynamic UI layout system for a "digital stickerbook" of collected prizes
- Optimized the game loop for browser play via Pygbag

Stack: Python · Pygame · Pymunk · Pygbag · JSON

Links: GitHub — github.com/Joe19110/CatchnCollect · Live — joe19110.itch.io/catch-n-collect ·
Demo — youtu.be/yKY3DESpirU

## Page 5 — Skills

Grouped by category, order driven by the active role profile's `leadSkillGroup` (that group
renders first; the rest keep a stable order after it). No skill bars, no percentages.

- **Languages:** Python · JavaScript · TypeScript · SQL
- **Backend:** Node.js · Express.js · Laravel (PHP) · FastAPI · REST API design
- **Frontend:** React · React Native · HTML/CSS · Tailwind · Redux · Zustand
- **Data & AI:** PostgreSQL · MongoDB · SQLite · Firebase · RAG · Pinecone · pgvector ·
  RAGAS · Langfuse · MCP (Model Context Protocol) · n8n
- **Cloud & DevOps:** Docker · CI/CD (GitHub Actions) · Vercel · GCP · Azure DevOps
- **Tools:** Git/GitHub · Postman · Figma · VS Code · Expo

## Page 6 — Experience, Leadership, Education & Awards

This page covers the non-project track record: professional experience, organizational
leadership, education, certifications, awards, and languages. These are **not** project
cards — render them as compact timeline entries / short list items, not the lifted project
cards used in Work. Keep the same ownership-framing rule as everywhere else: "contributed
to / supported / as part of the team" for group work, direct "I built / I led" only where
the role genuinely owned the piece. Do not invent metrics or outcomes beyond what's listed.

Dates are taken verbatim from LinkedIn as the source of truth. Note some are future-dated
relative to a late-2026 build — see Open items before publishing.

### Experience (professional / org work)

Render as a reverse-chronological timeline. Group the multi-role organizations (BINUS
University, Robogals) under one org header with their roles nested, matching how they read
on LinkedIn.

- **Associate Member Data Engineer** — Bina Nusantara IT Division · Mar 2026 – Present ·
  Jakarta, on-site. This is the same role behind the DESA flagship; here keep it to a short
  summary and let the Work/flagship section carry the depth. Built and maintained data
  engineering pipelines (Python, SQL, PostgreSQL) to process and transform structured
  datasets; developed ETL workflows to extract, clean, transform, and load data across
  sources; integrated vector databases and RAG workflows for pipeline error intelligence;
  worked with Langfuse and RAGAS to evaluate LLM retrieval quality and monitor AI pipeline
  performance.
- **IT Support Intern** — Privasimu · Internship · Sep 2025 – May 2026 · Jakarta, hybrid.
  Same internship as the Privasimu project in Work; this entry is the role line, the Work
  card carries the detail. Shipped production React interfaces for Kartinilove.ai and
  Privasimu from approved Figma designs; built responsive, accessible UI across mobile /
  tablet / desktop; integrated frontend with backend databases via REST APIs on real
  production data; implemented CMS-driven features with Strapi; supported client-facing
  projects for enterprise partners (BCA, BRI, KAI, Bluebird — Privasimu's clients, not hers);
  contributed to chatbot features and early-stage AI integrations.
- **Staff of Customer Experience, Global Volunteer** — AIESEC in Indonesia · Full-time ·
  Feb 2026 – Present · Jakarta, hybrid. Managed participant communication and engagement
  across the Global Volunteer journey; coordinated follow-ups with prospective volunteers and
  improved response tracking across the recruitment pipeline; monitored participant feedback
  to surface recurring concerns; collaborated cross-functionally to resolve participant
  issues.
- **BINUS University** (multiple roles) — Jakarta:
  - **Team Promotion** — Part-time · Oct 2025 – Present. Supported event operations (operator,
    usher, logistics); conducted sales calls for lead generation; managed customer comms over
    WhatsApp; handled data entry / record keeping; supported marketing campaigns and events.
  - **Freshmen Partner** — Sep 2025 – Aug 2026. Facilitated weekly sessions across two
    semesters on academic readiness, university values, and personal development; mentored
    freshmen through their transition; helped plan and run an SDG-aligned campaign project.
  - **Teaching Assistant, Database Technology (COMP6799001)** — Sep 2025 – Jan 2026. Ran
    weekly 100-minute lab sessions over 13 weeks for ~21 students; supported learning on ERDs,
    normalization, and practical database design; guided hands-on lab exercises; conducted
    assessments and gave feedback. (Good signal for the Data & AI / backend story.)
  - **Mentor** — Feb 2025 – Jan 2026. Led small-group calculus mentoring for underclassmen;
    organized sessions, gave personalized support, and helped prepare students for exams.
  - **Freshman Leader** — Seasonal · Aug 2025 – Sep 2025. Guided incoming students through
    their first two weeks; coordinated student mobility and daily FYP activities.
- **Robogals Jakarta** (multiple roles) — Jakarta:
  - **Vice President** — Aug 2025 – Aug 2026. Supported the President in chapter operations;
    led coordination of cross-functional teams to plan and run STEM-outreach workshops and
    events for young women; managed internal comms and delivery; represented the org with
    external partners; contributed to strategic planning and leadership development.
  - **Training Manager** — Oct 2024 – Aug 2025. Ran interactive STEM teaching sessions
    encouraging female students toward computer science; helped deliver the Kiwihosting
    workshop introducing web-hosting basics.
- **Technical Developer** — GDSC Binus International · Nov 2024 – Aug 2025 · Jakarta, hybrid.
  Supported planning and delivery of technical events including the Gemma Workshop; learned
  and taught end-to-end workshop material (a note-taking web app integrated with Gemma AI);
  built and demoed a working frontend showcasing generative-AI integration; gave real-time
  guidance to participants; collaborated with a 10+ person core team on content accuracy.
- **Activist, HIMTI Care** — HIMTI BINUS University · Mar 2025 – Apr 2026 · Jakarta, hybrid.
  Contributed to planning community-care and well-being initiatives for HIMTI members
  (mental health, stress relief, team bonding); programs described as in development — frame
  as contribution, not shipped outcomes.
- **Admin** — SheCodes Society · Feb 2025 – Jun 2025 · Jakarta, hybrid. Supported behind-the-
  scenes operations (Google Classroom, group comms) for programs empowering women in STEM;
  helped organize events including Kartini Day 2025 (panel on gender inclusivity in tech,
  exhibition, AI-innovation workshops).

### Education

- **BINUS University International** — Bachelor's, Computer Science · Feb 2024 – Jan 2028 ·
  GPA 3.95. Double degree with La Trobe University. Activities: Google Developer Group on
  Campus, AIESEC, Robogals, HIMTI, Student Mentor, Teaching Assistant (Database Technology),
  Freshmen Leader & Freshmen Partner for B29.
- **La Trobe University** — Bachelor's, Software Engineering · Feb 2024 – Jan 2028. Double
  degree with BINUS International.

### Licenses & certifications

- **Microsoft Certified: Azure AI Fundamentals** — Microsoft · Issued Mar 2026 · Credential
  ID a04c9899-f87f-4ab2-a680-3eb8367315e6.

### Honors & awards

- **1st Place, Creative Business Ideas Competition** — BINUS University · Feb 2025. An
  international competition jointly organized by Woosong University (South Korea), Swiss
  German University, and BINUS University. The team proposed a sensor-based Luggage Loss
  Prevention System to address baggage misplacement in travel, covering problem
  identification, technical + business solution development, and a formal pitch to academic
  and industry judges; praised for practicality, scalability, and real-world relevance. Keep
  this a one-line award entry (concept + presentation only, not implementation) — no project
  card. This is the same award referenced in the earlier short list; render it once.
- **Widia Scholarship** — BINUS University · Feb 2024. Awarded for academic achievement in
  high school; recognizes excellence, leadership potential, and the WIDIA values (Women,
  Integrity, Diversity, Innovation, Agility). Keep to one or two lines.

### Languages

- English — fluent · Indonesian — fluent · Mandarin — basic

## Page 7 — Contact

- Email: joelliane@gmail.com
- Phone: +62 859 2076 5585
- LinkedIn: linkedin.com/in/joelliane-anggra
- GitHub: github.com/Joe19110
- Casual framing: "Let's build something — interested in working together, discussing a
  project, or talking tech?"
- Playful footer line: "Built with curiosity, caffeine, and questionable amounts of
  debugging."

## Interactive feature ideas (backlog)

Candidate interactive features, ordered by effort-to-payoff. Tone must stay "cute surface,
technically serious underneath." Status tracked inline.

1. **"Ask about my projects" chatbot widget** — a small chat bubble answering questions
   like "what did she do with RAG?" grounded in the project data. Strongest pick: it *demos
   the exact skill being sold* (RAG / retrieval), not just decoration. Start fully
   client-side over the JSON; could later upgrade to a real retrieval backend. Must stay
   honest — answer only from real project data, no hallucinated claims. **Status: planned.**
2. **Live role-filter toggle** — visible Backend / Data / AI buttons that re-sort the
   featured strip and skills in-page (exposes the existing `?for=` logic as a control). Low
   effort, shows the role-aware design working. **Status: planned.**
3. **Interactive DESA architecture diagram** — make the static boxes clickable; clicking a
   node (e.g. "Error classifier") reveals what was built there. Turns the flagship into
   something explored, not just read. **Status: planned.**
4. **Project filter / search** — filter the work grid by tag (Backend, Mobile, AI) or tech.
   Standard, useful, modest effort. **Status: planned.**
5. **Interactive terminal** — extend the hero terminal so visitors can type commands
   (`help`, `ls`, `whoami`, `cat about`, `skills`, `contact`, `clear`). Playful and
   on-brand. **Status: BUILT.**

## Excluded / needs reframing before publishing

- **Angkasa** (personal music app): built on Metrolist's YouTube Music playback/source logic,
  likely involving unofficial access to YTMusic outside its API terms. Exclude from the
  public portfolio, or if included, describe only Joelliane's own layer (local library
  management, SQLite persistence, search/filtering, playlists, history, state, custom UI)
  without naming or linking the underlying playback source.
- **GitHub/docs chatbot idea**: too thin a dataset for a standalone project — keep in mind as
  a possible "ask about my projects" widget on the site itself, not a case study.
- **PT. Jaxindo** (Marketplace Admin & Inventory Manager, Aug 2023 – Jan 2024): intentionally
  omitted from the portfolio at Joelliane's request — not relevant to the backend / data /
  AI story. Do not re-add it to the Experience timeline.

## Open items (resolve before launch)

- Repo/demo link for BINUS EDM DESA stays internal — confirm the demo video and architecture
  diagram are confidentiality-safe before publishing
- One sentence from Joelliane on what Privasimu's "check pasted text" feature checks
- RAGAS output numbers from DESA, if saved anywhere
- Repo link for Gender Income Gap Forecasting
- Final decision on whether to include Angkasa in any form
- Build the Genshin assistant project (see separate spec file) before publishing its detail
  page as complete
- One architecture diagram + trade-off write-up for an existing project (e.g. Postgres vs.
  MongoDB across Privasimu vs. Kitchen Serve+) — optional stretch addition
- Confirm the experience/certification dates on Page 6. Several are future-dated relative to
  a late-2026 build (Azure AI Fundamentals "Issued Mar 2026"; DESA "Mar 2026 – Present";
  AIESEC "Feb 2026 – Present"). They're recorded verbatim from LinkedIn — verify before
  publishing so nothing reads as a typo to a recruiter.

## Technical build notes

- Responsive static site (plain HTML/CSS/JS, or React) — no backend required; content is
  static except for the client-side role-param read described above.
- Data-driven: keep `projects.json` and `role-profiles.json` as separate data files so content
  edits never touch layout code.
- Mobile-first responsive: single column below ~640px; grid-paper hero and marquee still
  render, just with a smaller cell size.
- Respect `prefers-reduced-motion` — disable hover-lift/wiggle animations when requested.
- Text on pink/blue/mint fills always uses that family's darker "-ink" token, never plain
  black or gray.
- Visible keyboard focus states on all interactive elements (nav links, project cards, role
  links, accordion toggles).
- Architecture diagrams can be simple SVG or styled HTML boxes/arrows — clear and
  top-to-bottom legible is the bar, not fancy.
