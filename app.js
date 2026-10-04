/* ============================================================
   Joelliane Anggra — Portfolio
   Client-side rendering + role-param routing. No backend.
   ============================================================ */

const prefersReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Skill groups (source of truth for Skills section) ---------- */
const SKILL_GROUPS = [
  { name: 'Languages', accent: '', items: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'Backend', accent: 'blue', items: ['Node.js', 'Express.js', 'Laravel (PHP)', 'FastAPI', 'REST API design'] },
  { name: 'Frontend', accent: 'mint', items: ['React', 'React Native', 'HTML/CSS', 'Tailwind', 'Redux', 'Zustand'] },
  { name: 'Data & AI', accent: 'pink', items: ['PostgreSQL', 'MongoDB', 'SQLite', 'Firebase', 'RAG', 'Pinecone', 'pgvector', 'RAGAS', 'Langfuse', 'MCP (Model Context Protocol)', 'n8n'] },
  { name: 'Cloud & DevOps', accent: 'blue', items: ['Docker', 'CI/CD (GitHub Actions)', 'Vercel', 'GCP', 'Azure DevOps'] },
  { name: 'Tools', accent: '', items: ['Git/GitHub', 'Postman', 'Figma', 'VS Code', 'Expo'] },
];

const DESA_STACK = ['Python (FastAPI)', 'React', 'Docker', 'n8n', 'Pinecone', 'pgvector', 'RAGAS', 'Langfuse', 'MCP', 'RustFS'];

const MARQUEE_TEXT = 'building things, one commit at a time';

const state = { projects: [], profiles: null, profile: null };

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const el = (tag, cls) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

/* ---------- Role routing ---------- */
function resolveProfile(profiles) {
  const forParam = new URLSearchParams(window.location.search).get('for');
  if (forParam && profiles[forParam]) return profiles[forParam];
  return profiles.default;
}

/* ---------- Project card ---------- */
function projectCard(p) {
  const btn = el('button', `card proj proj--${p.accent}`);
  btn.type = 'button';
  btn.setAttribute('aria-label', `View details for ${p.name}`);

  const top = el('div', 'proj__top');
  const name = el('span', 'proj__name');
  name.textContent = p.name + (p.subtitle ? '' : '');
  top.appendChild(name);
  if (p.status === 'in-progress') {
    const badge = el('span', 'proj__badge');
    badge.textContent = 'in progress';
    top.appendChild(badge);
  }
  btn.appendChild(top);

  const tagRow = el('div', 'pill-row');
  p.tags.forEach((t) => {
    const pill = el('span', `pill pill--${p.accent}`);
    pill.textContent = t;
    tagRow.appendChild(pill);
  });
  btn.appendChild(tagRow);

  const summary = el('p', 'proj__summary');
  summary.textContent = p.summary;
  btn.appendChild(summary);

  const tech = el('div', 'proj__tech');
  p.techTags.slice(0, 5).forEach((t) => {
    const pill = el('span', 'pill');
    pill.textContent = t;
    tech.appendChild(pill);
  });
  btn.appendChild(tech);

  const link = el('span', 'proj__link');
  link.textContent = 'View project →';
  btn.appendChild(link);

  btn.addEventListener('click', () => openModal(p));
  return btn;
}

/* ---------- Featured strip (role-driven) ---------- */
function renderFeatured() {
  const grid = $('#featured-grid');
  grid.innerHTML = '';
  const ids = state.profile.featured;
  ids.forEach((id) => {
    if (id === 'desa') {
      grid.appendChild(desaFeaturedCard());
      return;
    }
    const p = state.projects.find((x) => x.id === id);
    if (p) grid.appendChild(projectCard(p));
  });
}

function desaFeaturedCard() {
  const a = el('a', 'card proj proj--pink');
  a.href = '#desa';
  a.style.textDecoration = 'none';

  const top = el('div', 'proj__top');
  const name = el('span', 'proj__name');
  name.textContent = 'BINUS EDM DESA';
  const badge = el('span', 'proj__badge');
  badge.textContent = 'flagship';
  badge.style.background = 'var(--pink)';
  badge.style.color = 'var(--pink-ink)';
  top.append(name, badge);
  a.appendChild(top);

  const tagRow = el('div', 'pill-row');
  ['Backend', 'Data Engineering', 'AI Engineering'].forEach((t) => {
    const pill = el('span', 'pill pill--pink');
    pill.textContent = t;
    tagRow.appendChild(pill);
  });
  a.appendChild(tagRow);

  const summary = el('p', 'proj__summary');
  summary.textContent = 'An internal platform centralizing the data engineering team\u2019s workflow, with an AI chatbot that has live tool access to pipeline infrastructure.';
  a.appendChild(summary);

  const link = el('span', 'proj__link');
  link.textContent = 'Read the full case study →';
  a.appendChild(link);
  return a;
}

/* ---------- Work grid (all projects, honest + complete) ---------- */
function renderWork() {
  const grid = $('#work-grid');
  grid.innerHTML = '';
  state.projects.forEach((p) => grid.appendChild(projectCard(p)));
}

/* ---------- Skills (lead group first) ---------- */
function renderSkills() {
  const grid = $('#skills-grid');
  grid.innerHTML = '';
  const lead = state.profile.leadSkillGroup;
  const ordered = [...SKILL_GROUPS].sort((a, b) => {
    if (a.name === lead) return -1;
    if (b.name === lead) return 1;
    return 0;
  });
  ordered.forEach((group) => {
    const card = el('div', 'card skill-group');
    const h = el('h3');
    h.textContent = group.name;
    card.appendChild(h);
    const row = el('div', 'pill-row');
    group.items.forEach((item) => {
      const pill = el('span', group.accent ? `pill pill--${group.accent}` : 'pill');
      pill.textContent = item;
      row.appendChild(pill);
    });
    card.appendChild(row);
    grid.appendChild(card);
  });
}

/* ---------- DESA stack pills ---------- */
function renderDesaStack() {
  const row = $('#desa-stack');
  DESA_STACK.forEach((t) => {
    const pill = el('span', 'pill');
    pill.textContent = t;
    row.appendChild(pill);
  });
}

/* ---------- Hero tagline (highlight "I build") ---------- */
function renderHeroTagline() {
  const h = $('#hero-headline');
  const tagline = state.profile.heroTagline;
  if (tagline.startsWith('I build')) {
    h.innerHTML = `<span class="highlight">I build</span>${esc(tagline.slice(7))}`;
  } else {
    h.textContent = tagline;
  }
}

/* ---------- Modal ---------- */
let lastFocused = null;
function openModal(p) {
  lastFocused = document.activeElement;
  const content = $('#modal-content');
  const parts = [];
  parts.push(`<h2 id="modal-title">${esc(p.name)}</h2>`);
  if (p.subtitle) parts.push(`<p class="proj__summary"><em>${esc(p.subtitle)}</em></p>`);

  parts.push('<div class="pill-row">');
  p.tags.forEach((t) => parts.push(`<span class="pill pill--${p.accent}">${esc(t)}</span>`));
  parts.push('</div>');

  parts.push(`<p class="flagship__meta"><strong>Role:</strong> ${esc(p.role)}</p>`);
  parts.push(`<p class="flagship__meta"><strong>Type:</strong> ${esc(p.type)}</p>`);

  parts.push('<h3>Overview</h3>');
  parts.push(`<p>${esc(p.overview)}</p>`);

  if (p.contributions && p.contributions.length) {
    parts.push('<h3>What I built</h3><ul>');
    p.contributions.forEach((c) => parts.push(`<li>${esc(c)}</li>`));
    parts.push('</ul>');
  } else if (p.status === 'in-progress') {
    parts.push('<p><em>This project is in progress. A full write-up will land here once it\u2019s built.</em></p>');
  }

  parts.push('<h3>Stack</h3><div class="pill-row">');
  p.stack.forEach((s) => parts.push(`<span class="pill">${esc(s)}</span>`));
  parts.push('</div>');

  if (p.links && p.links.length) {
    parts.push('<h3>Links</h3><div class="modal__links">');
    p.links.forEach((l) => parts.push(
      `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`
    ));
    parts.push('</div>');
  }

  content.innerHTML = parts.join('');
  const modal = $('#modal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('.modal__panel').focus();
}

function closeModal() {
  const modal = $('#modal');
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

function wireModal() {
  $$('[data-close]').forEach((b) => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#modal').hidden) closeModal();
  });
}

/* ---------- Terminal typing ---------- */
function runTerminal() {
  const target = $('#typed');
  const out = $('#terminal-out');
  const cmd = 'whoami';
  const lines = [
    'Joelliane Anggra',
    'cs \u00d7 software engineering \u00b7 binus intl / la trobe',
    'focus: <span class="k">backend</span> \u00b7 <span class="k">data engineering</span> \u00b7 <span class="k">ai engineering</span>',
  ];
  if (prefersReduced) {
    target.textContent = cmd;
    out.innerHTML = lines.join('\n');
    return;
  }
  let i = 0;
  const type = () => {
    if (i <= cmd.length) {
      target.textContent = cmd.slice(0, i);
      i++;
      setTimeout(type, 90);
    } else {
      let li = 0;
      const printLine = () => {
        if (li < lines.length) {
          out.innerHTML += (li ? '\n' : '') + lines[li];
          li++;
          setTimeout(printLine, 320);
        }
      };
      setTimeout(printLine, 300);
    }
  };
  setTimeout(type, 500);
}

/* ---------- Marquee ---------- */
function renderMarquee() {
  const track = $('#marquee-track');
  const unit = ` ${MARQUEE_TEXT} `;
  const seam = Array(6).fill(`<span>${esc(unit)}\u2726</span>`).join('');
  // Duplicate twice back-to-back for a seamless -50% loop.
  track.innerHTML = seam + seam;
}

/* ---------- Nav toggle ---------- */
function wireNav() {
  const toggle = $('.nav__toggle');
  const links = $('#nav-links');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- Init ---------- */
async function init() {
  $('#year').textContent = new Date().getFullYear();
  renderMarquee();
  renderDesaStack();
  wireModal();
  wireNav();
  runTerminal();

  try {
    const [projects, profiles] = await Promise.all([
      loadJSON('projects.json'),
      loadJSON('role-profiles.json'),
    ]);
    state.projects = projects;
    state.profiles = profiles;
    state.profile = resolveProfile(profiles);

    renderHeroTagline();
    renderFeatured();
    renderWork();
    renderSkills();
  } catch (err) {
    console.error(err);
    // Fallback: render skills with default lead group so the page is still useful.
    state.profile = { heroTagline: $('#hero-headline').textContent, featured: [], leadSkillGroup: 'Backend' };
    renderSkills();
    const grid = $('#work-grid');
    if (grid) grid.innerHTML = '<p>Could not load project data. Please run this site from a local server (e.g. <code>python -m http.server</code>) rather than opening the file directly.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);
