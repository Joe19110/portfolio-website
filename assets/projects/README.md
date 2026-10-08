# Project screenshots

Drop project images here. They appear **only inside the project detail modal**
(the cards stay clean). Missing files degrade gracefully — a broken image removes
itself, and if none load the gallery block disappears entirely. Nothing breaks.

Filenames are referenced in `projects.json` → each project's `images[]` array.

| Filename                                | Project / caption                      |
|-----------------------------------------|----------------------------------------|
| `privasimu-certificate.jpg`             | Privasimu — internship certificate (opens in lightbox popup) |
| `gender-income-mase.png`                | Gender Income Gap — MASE comparison    |
| `gender-income-forecast.png`            | Gender Income Gap — 2024–2026 forecast |
| `kitchen-serve-portal.png`              | Kitchen Serve+ — staff portal          |
| `kitchen-serve-chat.png`                | Kitchen Serve+ — chat + AI chatbot     |
| `cuanin-task.png`                       | Cuanin — task lifecycle screen         |
| `cuanin-escrow.png`                     | Cuanin — escrow payment flow           |
| `stemm-lab-home.png`                    | STEMM Lab — activity home              |
| `stemm-lab-activity.png`                | STEMM Lab — sensor activity            |
| `catch-n-collect-game.png`              | Catch n' Collect — gameplay            |
| `catch-n-collect-stickerbook.png`       | Catch n' Collect — stickerbook         |

## Notes
- **BINUS EDM DESA** and **Privasimu** have NO screenshots on purpose — both are
  confidentiality-bound. DESA shows only its architecture diagram; Privasimu links to
  an internship certificate instead (set the URL in `projects.json`).
- **Genshin assistant** is in progress — no images until it's built.
- Tiles render at a 4:3 aspect ratio with `object-fit: cover`, so any size lines up.
- Prefer compressed PNG/JPG/WebP under ~300 KB each. Add/rename entries in `projects.json`.
- Only post screenshots you have the right to show (no client data / internal URLs).
