# Experience photos

Drop event photos / certificate scans here. They appear **only inside the
experience detail modal**, opened by the "View photos" button on timeline
entries that have images. Cards stay clean; missing files degrade gracefully.

Filenames are referenced in `js/data.js` → each `EXPERIENCE` entry's `images[]` array.

| Filename                              | Organization / caption                 |
|---------------------------------------|----------------------------------------|
| `binus-promo-team.jpg`                | BINUS Team Promotion — team            |
| `binus-promo-infosession.jpg`         | BINUS Team Promotion — info session    |
| `robogals-onboarding.jpg`             | Robogals — chapter onboarding          |
| `robogals-kiwihosting.jpg`            | Robogals — Kiwihosting workshop        |
| `gdgoc-gemma.jpg`                     | GDGOC — Gemma Workshop                 |
| `gdgoc-onboarding.jpg`                | GDGOC — team onboarding                |
| `binus-ta-lab.jpg`                    | BINUS Teaching — Database lab session  |
| `binus-mentor-certificate.jpg`        | BINUS Teaching — mentor certificate    |
| `binus-ep-session.jpg`                | BINUS Student roles — EP session       |
| `binus-fl-group.jpg`                  | BINUS Student roles — Freshman Leader  |
| `himti-committee.jpg`                 | HIMTI — committee certificate          |
| `himti-solana.jpg`                    | HIMTI — Solana event                   |
| `shecodes-onboarding.jpg`             | SheCodes — onboarding                  |
| `shecodes-kartini.jpg`                | SheCodes — Kartini Day 2025            |

## Notes
- Entries WITHOUT an `images[]` array (e.g. DESA data-engineer role, Privasimu,
  AIESEC) show no "View photos" button — that's intentional.
- Add a new org gallery by giving its `EXPERIENCE` entry an `images: [{ src, caption }]`.
- Tiles render at 4:3 with `object-fit: cover`. Compressed JPG/WebP under ~300 KB preferred.
- Only use photos you have permission to share.
