# Experience / community photos (About "snaps" scatter)

These show up as the tilted polaroid scatter in the **About** section
("Out in the wild"). Until a real file exists, each card shows a colored
placeholder with its caption — nothing breaks if a photo is missing.

Filenames are referenced in `js/data.js` → the `SNAPS` array.

| Filename                      | Caption              | Accent |
|-------------------------------|----------------------|--------|
| `gdgoc-gemma.jpg`             | gdgoc gemma workshop | pink   |
| `robogals-onboarding.jpg`     | robogals onboarding  | mint   |
| `aiesec-boothing.jpg`         | aiesec boothing      | blue   |
| `shecodes-onboarding.jpg`     | shecodes onboarding  | pink   |
| `binus-fl-group.jpg`          | freshman leaders     | blue   |
| `binus-it-data-engineers.jpg` | it div data engineers| pink   |

## Notes
- Photos display in a **4:3 landscape** frame (`object-fit: cover`), so
  horizontal shots fit best. Very wide 16:9 images will crop slightly top/bottom.
- Keep each file reasonably small (compressed JPG/WebP, ideally under ~300 KB).
- To add, remove, reorder, or recaption photos, edit the `SNAPS` array in
  `js/data.js` — the filename here must match the `src` there.
- `accent` sets the card's top-stripe colour and the placeholder colour
  (pink / blue / mint).
- Only use photos you have the right to display.
