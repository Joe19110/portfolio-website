# Organization & workplace logos

Drop logo image files here to replace the monogram fallbacks in the Experience timeline.

The site looks for these exact filenames (referenced in `js/data.js` → `EXPERIENCE[].logo`).
If a file is missing, the timeline shows a colored monogram chip instead — nothing breaks.

| Filename          | Organization                     |
|-------------------|----------------------------------|
| `binus-it.png`    | Bina Nusantara IT Division       |
| `privasimu.png`   | Privasimu                        |
| `binus.png`       | BINUS University (timeline roles)|
| `binusinter.png`  | BINUS University International (Education) |
| `aiesec.png`      | AIESEC at BINUS                  |
| `robogals.png`    | Robogals Jakarta                 |
| `gdgoc.png`       | GDGOC at BINUS                   |
| `himti.png`       | HIMTI BINUS University           |
| `shecodes.png`    | SheCodes Society                 |
| `latrobe.png`     | La Trobe University (Education)  |

## Tips
- Square-ish images work best (they render in a 40×40 rounded box, `object-fit: contain`).
- PNG with transparent background is ideal; SVG also works (update the extension in `data.js`).
- Keep each file reasonably small (under ~100 KB) so the page stays fast.
- Only use logos you have the right to display.
