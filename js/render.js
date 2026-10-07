/* ============================================================
   render.js — all DOM builders: project cards, featured strip,
   work grid, skills, DESA stack, hero tagline, now-card,
   experience timeline, education, awards, and the detail modal.
   ============================================================ */

import { $, $$, el, esc } from './utils.js';
import {
  SKILL_GROUPS, DESA_STACK, NOW_ITEMS,
  EXPERIENCE, EDUCATION, CERTIFICATIONS, AWARDS, LANGUAGES, state,
} from './data.js';

/* ---------- Project card ---------- */
export function projectCard(p) {
  const btn = el('button', `card proj proj--${p.accent}`);
  btn.type = 'button';
  btn.setAttribute('aria-label', `View details for ${p.name}`);

  const top = el('div', 'proj__top');
  const name = el('span', 'proj__name');
  name.textContent = p.name;
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
  link.textContent = 'View project \u2192';
  btn.appendChild(link);

  btn.addEventListener('click', () => openModal(p));
  return btn;
}

function desaFeaturedCard() {
  const a = el('a', 'card proj proj--pink');
  a.href = '#desa';
  a.style.textDecoration = 'none';

  const top = el('div', 'proj__top');
  const name = el('span', 'proj__name');
  name.textContent = 'BINUS EDM DESA';
  const badge = el('span', 'proj__spark');
  badge.textContent = '\u2726';
  badge.setAttribute('aria-label', 'Highlighted project');
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
  link.textContent = 'Read the full case study \u2192';
  a.appendChild(link);
  return a;
}

/* ---------- Featured strip (role-driven) ---------- */
export function renderFeatured() {
  const grid = $('#featured-grid');
  grid.innerHTML = '';
  state.profile.featured.forEach((id) => {
    if (id === 'desa') {
      grid.appendChild(desaFeaturedCard());
      return;
    }
    const p = state.projects.find((x) => x.id === id);
    if (p) grid.appendChild(projectCard(p));
  });
}

/* ---------- Work grid (flagship first, then all projects) ---------- */
export function renderWork() {
  const grid = $('#work-grid');
  grid.innerHTML = '';
  // DESA leads the archive as a card that links to its flagship section
  // (keeps one source of truth — no duplicated case-study content in a modal)
  grid.appendChild(desaFeaturedCard());
  state.projects.forEach((p) => grid.appendChild(projectCard(p)));
}

/* ---------- Skills (datasheet rows; lead group first + highlighted) ---------- */
export function renderSkills() {
  const sheet = $('#skills-sheet');
  if (!sheet) return;
  sheet.innerHTML = '';
  const lead = state.profile.leadSkillGroup;
  const ordered = [...SKILL_GROUPS].sort((a, b) => {
    if (a.name === lead) return -1;
    if (b.name === lead) return 1;
    return 0;
  });
  ordered.forEach((group) => {
    const row = el('div', 'skillsheet__row');

    const dt = el('dt', 'skillsheet__label');
    dt.textContent = group.name;

    const dd = el('dd', 'skillsheet__items');
    group.items.forEach((item) => {
      const pill = el('span', group.accent ? `pill pill--${group.accent}` : 'pill');
      pill.textContent = item;
      dd.appendChild(pill);
    });

    row.append(dt, dd);
    sheet.appendChild(row);
  });
}

/* ---------- DESA stack pills (idempotent: clears first) ---------- */
export function renderDesaStack() {
  const row = $('#desa-stack');
  if (!row) return;
  row.innerHTML = '';
  DESA_STACK.forEach((t) => {
    const pill = el('span', 'pill');
    pill.textContent = t;
    row.appendChild(pill);
  });
}

/* ---------- "Currently" card (About) ---------- */
export function renderNowCard() {
  const list = $('#now-list');
  if (!list) return;
  list.innerHTML = '';
  NOW_ITEMS.forEach((item) => {
    const li = el('li');
    const k = el('span', 'now-card__k');
    k.textContent = item.k;
    li.appendChild(k);
    li.appendChild(document.createTextNode(item.v));
    list.appendChild(li);
  });
}

/* ---------- Experience timeline ---------- */
function roleBlock(role) {
  const block = el('div', 'tl-role');

  const title = el('p', 'tl-role__title');
  title.textContent = role.title;
  block.appendChild(title);

  const meta = el('p', 'tl-role__meta');
  meta.textContent = role.meta;
  block.appendChild(meta);

  if (role.summary) {
    const sum = el('p', 'tl-role__summary');
    sum.textContent = role.summary;
    block.appendChild(sum);
  }

  if (role.points && role.points.length) {
    const ul = el('ul', 'tl-role__points');
    role.points.forEach((pt) => {
      const li = el('li');
      li.textContent = pt;
      ul.appendChild(li);
    });
    block.appendChild(ul);
  }
  return block;
}

/* derive a short monogram from an org name for the logo fallback */
function monogram(orgName) {
  const stop = new Set(['in', 'of', 'the', 'university', 'society', 'division', 'jakarta', 'binus', 'international', 'student', 'roles', 'teaching']);
  const words = orgName
    .replace(/[—\-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !stop.has(w.toLowerCase()));
  const source = words.length ? words : orgName.split(/\s+/);
  return source.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

/* logo node: real image if provided, else a colored monogram chip.
   The image onerror swaps in the monogram so a missing file never breaks the layout.
   Shared by the experience timeline and the education cards. */
function logoNode(name, accent, logo, baseClass = 'tl-item__logo') {
  const wrap = el('span', `${baseClass} ${baseClass}--${accent}`);
  wrap.setAttribute('aria-hidden', 'true');
  const mono = monogram(name);

  if (logo) {
    const img = el('img', `${baseClass}-img`);
    img.src = logo;
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      wrap.classList.add('is-fallback');
      wrap.textContent = mono;
    });
    wrap.appendChild(img);
  } else {
    wrap.classList.add('is-fallback');
    wrap.textContent = mono;
  }
  return wrap;
}

function timelineItem(entry) {
  const item = el('div', `tl-item tl-item--${entry.accent}`);

  const dot = el('span', 'tl-item__dot');
  dot.setAttribute('aria-hidden', 'true');
  item.appendChild(dot);

  const content = el('div', 'tl-item__content');

  const head = el('div', 'tl-item__head');
  head.appendChild(logoNode(entry.org, entry.accent, entry.logo));

  const org = el('h3', 'tl-item__org');
  org.textContent = entry.org;
  if (entry.roles.length > 1) {
    const count = el('span', 'tl-item__count');
    count.textContent = `${entry.roles.length} roles`;
    org.appendChild(count);
  }
  head.appendChild(org);
  content.appendChild(head);

  entry.roles.forEach((role) => content.appendChild(roleBlock(role)));

  item.appendChild(content);
  return item;
}

function fillTimeline(id, entries) {
  const list = $(id);
  if (!list) return;
  list.innerHTML = '';
  entries.forEach((entry) => list.appendChild(timelineItem(entry)));
}

export function renderExperience() {
  fillTimeline('#timeline-work', EXPERIENCE.filter((e) => e.kind === 'work'));
  fillTimeline('#timeline-org', EXPERIENCE.filter((e) => e.kind === 'org'));
}

/* ---------- Education (two schools bridged by "double degree") ---------- */
function eduCard(ed) {
  const card = el('div', 'edu-card');

  const head = el('div', 'edu-card__head');
  head.appendChild(logoNode(ed.school, ed.accent || 'blue', ed.logo, 'edu-card__logo'));
  const school = el('h3', 'edu-card__school');
  school.textContent = ed.school;
  head.appendChild(school);
  card.appendChild(head);

  const degree = el('p', 'edu-card__degree');
  degree.textContent = ed.degree;
  card.appendChild(degree);

  const meta = el('p', 'edu-card__meta');
  meta.textContent = ed.meta;
  card.appendChild(meta);

  if (ed.activities) {
    const act = el('p', 'edu-card__activities');
    act.innerHTML = `<span class="edu-card__k">Activities</span>${esc(ed.activities)}`;
    card.appendChild(act);
  }
  return card;
}

export function renderEducation() {
  const wrap = $('#education-grid');
  if (!wrap) return;
  wrap.innerHTML = '';

  EDUCATION.forEach((ed, i) => {
    wrap.appendChild(eduCard(ed));
    // insert the connecting "double degree" bridge between the two cards
    if (i === 0 && EDUCATION.length > 1) {
      const bridge = el('div', 'edu-bridge');
      bridge.setAttribute('aria-hidden', 'true');
      const chip = el('span', 'edu-bridge__chip');
      chip.textContent = 'double degree';
      bridge.appendChild(chip);
      wrap.appendChild(bridge);
    }
  });
}

/* ---------- Beyond the code: compact awards / certs / languages ---------- */
function badgeItem({ icon, iconAccent, name, meta, onClick }) {
  const li = el('li', 'badge');
  // if clickable, the inner is a real button for keyboard + screen-reader support
  const inner = onClick ? el('button', 'badge__inner') : el('span', 'badge__inner');
  if (onClick) {
    inner.type = 'button';
    li.classList.add('badge--clickable');
    inner.addEventListener('click', onClick);
    inner.setAttribute('aria-label', `${name} — view details`);
  }

  const ic = el('span', `badge__icon badge__icon--${iconAccent || 'blue'}`);
  ic.setAttribute('aria-hidden', 'true');
  ic.textContent = icon;

  const body = el('span', 'badge__body');
  const n = el('span', 'badge__name');
  n.textContent = name;
  body.appendChild(n);
  if (meta) {
    const m = el('span', 'badge__meta');
    m.textContent = meta;
    body.appendChild(m);
  }

  inner.append(ic, body);
  if (onClick) {
    const hint = el('span', 'badge__hint');
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = '\u2192';
    inner.appendChild(hint);
  }
  li.appendChild(inner);
  return li;
}

export function renderAwards() {
  const awardsEl = $('#awards-list');
  if (awardsEl) {
    awardsEl.innerHTML = '';
    AWARDS.forEach((a) => {
      awardsEl.appendChild(badgeItem({
        icon: '\u2605', // star
        iconAccent: a.accent,
        name: a.name,
        meta: a.issuer,
        onClick: () => openInfoModal({ title: a.name, meta: a.issuer, body: a.desc, accent: a.accent }),
      }));
    });
  }

  const certEl = $('#cert-list');
  if (certEl) {
    certEl.innerHTML = '';
    CERTIFICATIONS.forEach((c) => {
      certEl.appendChild(badgeItem({
        icon: '\u25C6', // diamond
        iconAccent: 'pink',
        name: c.name,
        meta: `${c.issuer} \u00b7 ${c.meta}`,
      }));
    });
  }

  const langEl = $('#lang-list');
  if (langEl) {
    langEl.innerHTML = '';
    LANGUAGES.forEach((l) => {
      const li = el('li', 'lang-chip');
      li.innerHTML = `${esc(l.name)} <span class="lang-chip__lvl">${esc(l.level)}</span>`;
      langEl.appendChild(li);
    });
  }
}

/* ---------- Hero tagline (highlight "I build") ---------- */
export function renderHeroTagline() {
  const h = $('#hero-headline');
  const tagline = state.profile.heroTagline;
  if (tagline.startsWith('I build')) {
    h.innerHTML = `<span class="highlight">I build</span>${esc(tagline.slice(7))}`;
  } else {
    h.textContent = tagline;
  }
}

/* ---------- Gallery (modal only; degrades to nothing if files missing) ---------- */
/* Returns markup for a gallery; images are hidden individually on load error,
   and the whole block removes itself if every image fails. */
function galleryMarkup(images, accent, aspect) {
  if (!images || !images.length) return '';
  // aspect: 'landscape' (default) | 'portrait' | 'square' — sets tile shape
  const ratio = ['portrait', 'square', 'landscape'].includes(aspect) ? aspect : 'landscape';
  const tiles = images.map((img, idx) => `
    <figure class="gallery__item gallery__item--${accent}">
      <button class="gallery__btn" type="button" data-full="${esc(img.src)}" data-caption="${esc(img.caption || '')}" aria-label="View larger: ${esc(img.caption || 'image')}">
        <img class="gallery__img" src="${esc(img.src)}" alt="${esc(img.caption || '')}" loading="lazy" data-gidx="${idx}">
      </button>
      ${img.caption ? `<figcaption class="gallery__cap">${esc(img.caption)}</figcaption>` : ''}
    </figure>`).join('');
  return `<div class="gallery gallery--${ratio}" data-gallery>${tiles}</div>`;
}

/* Attach error handling + lightbox after the gallery HTML is inserted. */
function wireGallery(container) {
  const gallery = container.querySelector('[data-gallery]');
  if (!gallery) return;

  const items = [...gallery.querySelectorAll('.gallery__item')];
  let remaining = items.length;

  items.forEach((item) => {
    const img = item.querySelector('.gallery__img');
    if (!img) return;
    const markBroken = () => {
      item.remove();
      remaining -= 1;
      if (remaining <= 0) gallery.remove(); // nothing loaded → remove the whole block
    };
    if (img.complete && img.naturalWidth === 0) {
      markBroken();
    } else {
      img.addEventListener('error', markBroken);
    }
  });

  gallery.querySelectorAll('.gallery__btn').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(btn.dataset.full, btn.dataset.caption));
  });
}

/* ---------- Lightbox ---------- */
let lbLastFocused = null;
function openLightbox(src, caption) {
  let lb = $('#lightbox');
  if (!lb) {
    lb = el('div', 'lightbox');
    lb.id = 'lightbox';
    lb.innerHTML = `
      <div class="lightbox__backdrop" data-lb-close></div>
      <figure class="lightbox__panel">
        <button class="lightbox__close" data-lb-close aria-label="Close image">×</button>
        <img class="lightbox__img" alt="">
        <figcaption class="lightbox__cap"></figcaption>
      </figure>`;
    document.body.appendChild(lb);
    lb.querySelectorAll('[data-lb-close]').forEach((b) => b.addEventListener('click', closeLightbox));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lb && !lb.hidden) closeLightbox();
    });
  }
  lbLastFocused = document.activeElement;
  lb.querySelector('.lightbox__img').src = src;
  lb.querySelector('.lightbox__img').alt = caption || '';
  const cap = lb.querySelector('.lightbox__cap');
  cap.textContent = caption || '';
  cap.style.display = caption ? '' : 'none';
  lb.hidden = false;
  lb.querySelector('.lightbox__close').focus();
}
function closeLightbox() {
  const lb = $('#lightbox');
  if (!lb) return;
  lb.hidden = true;
  if (lbLastFocused && lbLastFocused.focus) lbLastFocused.focus();
}

/* ---------- Modal ---------- */
let lastFocused = null;

function showModal(html) {
  const content = $('#modal-content');
  content.innerHTML = html;
  wireGallery(content);
  const modal = $('#modal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('.modal__panel').focus();
}

/* Lightweight info popup — reuses the modal shell. Used by award badges. */
export function openInfoModal({ title, meta, body, accent }) {
  lastFocused = document.activeElement;
  const parts = [];
  parts.push(`<h2 id="modal-title">${esc(title)}</h2>`);
  if (meta) parts.push(`<p class="modal__eyebrow modal__eyebrow--${accent || 'blue'}">${esc(meta)}</p>`);
  if (body) parts.push(`<p>${esc(body)}</p>`);
  showModal(parts.join(''));
}

export function openModal(p) {
  lastFocused = document.activeElement;
  const parts = [];
  parts.push(`<h2 id="modal-title">${esc(p.name)}</h2>`);
  if (p.subtitle) parts.push(`<p class="proj__summary"><em>${esc(p.subtitle)}</em></p>`);

  // gallery sits right under the title
  parts.push(galleryMarkup(p.images, p.accent, p.aspect));

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

  showModal(parts.join(''));
}

export function closeModal() {
  const modal = $('#modal');
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

export function wireModal() {
  $$('[data-close]').forEach((b) => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#modal').hidden) closeModal();
  });
}
