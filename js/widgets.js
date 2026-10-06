/* ============================================================
   widgets.js — self-contained interactive widgets:
   terminal typewriter, marquee ticker, nav hamburger toggle.
   ============================================================ */

import { $, $$, esc, prefersReduced } from './utils.js';
import { MARQUEE_ITEMS, SKILL_GROUPS, EXPERIENCE } from './data.js';

/* ============================================================
   Interactive terminal
   - Types out an intro (whoami), then reveals a live input line.
   - Visitors can run a small set of commands.
   ============================================================ */

const INTRO_CMD = 'whoami';
const INTRO_LINES = [
  'Joelliane Anggra',
  'cs \u00d7 software engineering \u00b7 binus intl / la trobe',
  'focus: <span class="k">backend</span> \u00b7 <span class="k">data engineering</span> \u00b7 <span class="k">ai engineering</span>',
  '',
  'type <span class="k">help</span> to see what you can do \u2192',
];

/* command registry — each returns an array of HTML line strings */
const COMMANDS = {
  help: () => [
    'available commands:',
    '  <span class="k">help</span>        this list',
    '  <span class="k">whoami</span>      who is this',
    '  <span class="k">about</span>       the short version',
    '  <span class="k">ls</span>          list projects',
    '  <span class="k">skills</span>      tools i reach for',
    '  <span class="k">experience</span>  where i\u2019ve worked',
    '  <span class="k">contact</span>     how to reach me',
    '  <span class="k">clear</span>       clear the screen',
    '',
    'tip: \u2191 / \u2193 cycle history, Tab autocompletes.',
  ],
  whoami: () => [
    'Joelliane Anggra',
    'cs \u00d7 software engineering \u00b7 binus intl / la trobe',
    'focus: <span class="k">backend</span> \u00b7 <span class="k">data engineering</span> \u00b7 <span class="k">ai engineering</span>',
  ],
  about: () => [
    'third-year cs & software engineering student.',
    'i like building things meant to be used, not just graded —',
    'backend systems, data pipelines, and the ai tooling on top.',
    '',
    'scroll down to #about for the longer version.',
  ],
  ls: () => {
    const names = [
      'binus-edm-desa  <span class="dim">(flagship)</span>',
      'privasimu', 'gender-income-gap', 'kitchen-serve+',
      'cuanin', 'stemm-lab', 'genshin-assistant <span class="dim">(wip)</span>',
      'catch-n-collect',
    ];
    return ['projects/', ...names.map((n) => `  ${n}`), '', 'open #work to explore them.'];
  },
  skills: () => {
    const out = ['skills/'];
    SKILL_GROUPS.forEach((g) => {
      out.push(`  <span class="k">${esc(g.name)}</span>: ${esc(g.items.join(', '))}`);
    });
    return out;
  },
  experience: () => {
    const work = EXPERIENCE.filter((e) => e.kind === 'work').map((e) => e.org);
    const org = EXPERIENCE.filter((e) => e.kind === 'org').map((e) => e.org);
    return [
      '<span class="k">work &amp; teaching</span>',
      ...work.map((o) => `  ${esc(o)}`),
      '',
      '<span class="k">organizations</span>',
      ...org.map((o) => `  ${esc(o)}`),
      '',
      'full timeline at #experience.',
    ];
  },
  contact: () => [
    'email    joelliane@gmail.com',
    'linkedin in/joelliane-anggra',
    'github   Joe19110',
    '',
    'or just scroll to #contact.',
  ],
  clear: () => null, // handled specially
};

const COMMAND_NAMES = Object.keys(COMMANDS);

function printBlock(log, promptText, lines) {
  const frag = document.createDocumentFragment();
  if (promptText !== null) {
    const cmdLine = document.createElement('p');
    cmdLine.className = 'terminal__line';
    cmdLine.innerHTML = `<span class="terminal__prompt">joelliane@portfolio:~$</span> ${esc(promptText)}`;
    frag.appendChild(cmdLine);
  }
  (lines || []).forEach((ln) => {
    const p = document.createElement('p');
    p.className = 'terminal__resp';
    p.innerHTML = ln === '' ? '&nbsp;' : ln;
    frag.appendChild(p);
  });
  log.appendChild(frag);
}

function runCommand(raw, ctx) {
  const cmd = raw.trim().toLowerCase();
  const { log, body } = ctx;

  if (cmd === '') {
    printBlock(log, '', null);
  } else if (cmd === 'clear') {
    log.innerHTML = '';
    // also remove the typewriter intro (prompt line + its output) so the
    // screen is genuinely blank — not a bare "whoami" with nothing under it
    const introLine = $('#intro-line');
    if (introLine) introLine.remove();
    const introOut = $('#terminal-out');
    if (introOut) introOut.innerHTML = '';
  } else if (COMMANDS[cmd]) {
    printBlock(log, raw.trim(), COMMANDS[cmd]());
  } else {
    printBlock(log, raw.trim(), [
      `command not found: ${esc(cmd)}`,
      'type <span class="k">help</span> for the list.',
    ]);
  }
  body.scrollTop = body.scrollHeight;
}

function wireInput(ctx) {
  const input = $('#terminal-input');
  const line = $('#terminal-inputline');
  if (!input || !line) return;
  line.hidden = false;

  const history = [];
  let hIdx = -1;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = input.value;
      if (value.trim()) {
        history.push(value);
        hIdx = history.length;
      }
      runCommand(value, ctx);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length && hIdx > 0) { hIdx -= 1; input.value = history[hIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx < history.length - 1) { hIdx += 1; input.value = history[hIdx]; }
      else { hIdx = history.length; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const frag = input.value.trim().toLowerCase();
      const match = COMMAND_NAMES.find((c) => c.startsWith(frag) && frag);
      if (match) input.value = match;
    }
  });

  // clicking anywhere in the terminal focuses the input
  const term = $('#terminal');
  if (term) {
    term.addEventListener('click', (e) => {
      if (window.getSelection().toString()) return; // let text selection work
      input.focus();
    });
  }
}

/* ---------- Terminal entry point ---------- */
export function runTerminal() {
  const target = $('#typed');
  const out = $('#terminal-out');
  const log = $('#terminal-log');
  const body = $('#terminal-body');
  const introCaret = $('#intro-caret');
  if (!target || !out || !log || !body) return;

  const ctx = { log, body };

  const finishIntro = () => {
    if (introCaret) introCaret.remove();
    wireInput(ctx);
  };

  if (prefersReduced) {
    target.textContent = INTRO_CMD;
    out.innerHTML = INTRO_LINES.map((l) => `<span class="terminal__resp">${l === '' ? '&nbsp;' : l}</span>`).join('');
    finishIntro();
    return;
  }

  let i = 0;
  const type = () => {
    if (i <= INTRO_CMD.length) {
      target.textContent = INTRO_CMD.slice(0, i);
      i += 1;
      setTimeout(type, 90);
    } else {
      let li = 0;
      const printLine = () => {
        if (li < INTRO_LINES.length) {
          const p = document.createElement('p');
          p.className = 'terminal__resp';
          p.innerHTML = INTRO_LINES[li] === '' ? '&nbsp;' : INTRO_LINES[li];
          out.appendChild(p);
          li += 1;
          body.scrollTop = body.scrollHeight;
          setTimeout(printLine, 260);
        } else {
          finishIntro();
        }
      };
      setTimeout(printLine, 300);
    }
  };
  setTimeout(type, 500);
}

/* ---------- Marquee (duplicated back-to-back for seamless -50% loop) ---------- */
export function renderMarquee() {
  const track = $('#marquee-track');
  if (!track) return;
  // one full pass through the messages, each followed by a ✦ separator
  const pass = MARQUEE_ITEMS
    .map((msg) => `<span>&nbsp;${esc(msg)}&nbsp;\u2726</span>`)
    .join('');
  // duplicate back-to-back so the -50% CSS loop has no visible seam
  track.innerHTML = pass + pass;
}

/* ---------- Accessible tabs ----------
   Wires any [role=tablist] inside the given container id. Click + arrow-key
   navigation (Left/Right/Home/End), roving tabindex, aria-selected sync. */
export function wireTabs(containerId) {
  const root = $(containerId);
  if (!root) return;
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  if (!tabs.length) return;

  const select = (tab, focus = true) => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      const panel = $(`#${t.getAttribute('aria-controls')}`);
      if (panel) panel.hidden = !selected;
    });
    if (focus) tab.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next); }
    });
  });
}

/* ---------- Scroll-spy: highlight the nav link for the section in view ---------- */
export function wireScrollSpy() {
  const links = $$('#nav-links a');
  if (!links.length) return;

  // map each nav link to the section it targets (only in-page #anchors)
  const map = links
    .map((link) => {
      const id = (link.getAttribute('href') || '').replace('#', '');
      const section = id ? document.getElementById(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);
  if (!map.length) return;

  const setActive = (link) => {
    map.forEach(({ link: l }) => {
      const on = l === link;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
  };

  // track which observed sections are currently intersecting; highlight the topmost
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    // choose the visible section nearest the top of the viewport
    let best = null;
    map.forEach(({ section }) => {
      if (!visible.has(section)) return;
      const top = section.getBoundingClientRect().top;
      if (best === null || top < best.top) best = { section, top };
    });
    if (best) {
      const entry = map.find((m) => m.section === best.section);
      if (entry) setActive(entry.link);
    }
  }, {
    // trigger when a section crosses the upper third, under the sticky nav
    rootMargin: '-84px 0px -60% 0px',
    threshold: 0,
  });

  map.forEach(({ section }) => observer.observe(section));
}

/* ---------- Nav hamburger toggle ---------- */
export function wireNav() {
  const toggle = $('.nav__toggle');
  const links = $('#nav-links');
  if (!toggle || !links) return;

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
