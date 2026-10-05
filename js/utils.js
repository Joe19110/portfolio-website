/* ============================================================
   utils.js — shared DOM helpers + fetch wrapper.
   No dependencies. Imported by everything else.
   ============================================================ */

export const prefersReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const el = (tag, cls) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  return node;
};

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

export async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}
