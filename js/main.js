/* ============================================================
   main.js — entry point. Loaded as <script type="module">.
   Wires widgets, loads data, resolves the role profile, renders.
   ============================================================ */

import { $, loadJSON } from './utils.js';
import { state, resolveProfile } from './data.js';
import {
  renderFeatured, renderWork, renderSkills, renderDesaStack,
  renderNowCard, renderExperience, renderEducation, renderAwards,
  renderHeroTagline, wireModal,
} from './render.js';
import { runTerminal, renderMarquee, wireNav, wireTabs, wireScrollSpy } from './widgets.js';

/* run a renderer in isolation so one failure can't blank the rest of the page */
function safe(label, fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[render] ${label} failed:`, err);
  }
}

async function init() {
  // If opened via file://, modules + fetch are blocked — surface it instead of a blank page.
  if (window.location.protocol === 'file:') {
    const warn = $('#file-warning');
    if (warn) warn.hidden = false;
  }

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // static widgets + content that don't need JSON
  safe('marquee', renderMarquee);
  safe('desaStack', renderDesaStack);
  safe('nowCard', renderNowCard);
  safe('experience', renderExperience);
  safe('education', renderEducation);
  safe('awards', renderAwards);
  safe('modal', wireModal);
  safe('nav', wireNav);
  safe('scrollSpy', wireScrollSpy);
  safe('terminal', runTerminal);
  safe('desaTabs', () => wireTabs('#desa-tabs'));

  try {
    const [projects, profiles] = await Promise.all([
      loadJSON('projects.json'),
      loadJSON('role-profiles.json'),
    ]);
    state.projects = projects;
    state.profiles = profiles;
    state.profile = resolveProfile(profiles);

    safe('heroTagline', renderHeroTagline);
    safe('featured', renderFeatured);
    safe('work', renderWork);
    safe('skills', renderSkills);
  } catch (err) {
    console.error(err);
    // graceful fallback so the page is still useful if JSON fails
    state.profile = {
      heroTagline: $('#hero-headline').textContent,
      featured: [],
      leadSkillGroup: 'Backend',
    };
    renderSkills();
    const grid = $('#work-grid');
    if (grid) {
      grid.innerHTML = '<p>Could not load project data. Please serve this site over HTTP (e.g. <code>npx http-server</code>) rather than opening the file directly.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
