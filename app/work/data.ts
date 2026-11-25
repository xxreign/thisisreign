// Your projects for the WORK page.
// To add images: put files in /public/work/ and set `image: "/work/your-file.jpg"`.
// For animation or video: set `video: "/work/your-file.mp4"` (it plays silently on a loop).
//   Keep `image` too if you like: it shows while the video loads.
// Until a project has an image, a grey placeholder tile is shown in its place.
//
// Layout (desktop, 12-column scattered grid):
//   col   — the column the tile starts in (1–12)
//   span  — how many columns wide it is
//   shift — how far it is pushed down from its row, in % of screen width (can be negative)
//   ratio — the tile's shape, width / height (e.g. "4 / 5" portrait, "16 / 10" landscape)
//   depth — how much it drifts with the mouse (bigger = floats more)

export const categories = ["ARCHITECTURE", "FASHION", "ART", "MUSIC"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: string;
  image?: string;
  video?: string;
  col: number;
  span: number;
  shift: number;
  ratio: string;
  depth: number;
};

// Placeholder list built from your Experience page. Rename, reorder or replace freely.
export const projects: Project[] = [
  { slug: "produce-r", title: "PRODUCE.R", category: "FASHION", year: "2023—NOW", col: 1, span: 4, shift: 0, ratio: "4 / 5", depth: 10 },
  { slug: "greenfield", title: "PROJECT GREENFIELD", category: "ARCHITECTURE", year: "2025", col: 6, span: 3, shift: 8, ratio: "16 / 11", depth: 18 },
  { slug: "book-of-the-month", title: "BOOK OF THE MONTH: VOL. 0", category: "FASHION", year: "2026", col: 10, span: 3, shift: 3, ratio: "3 / 4", depth: 26 },
  { slug: "masterplan", title: "CITY MASTERPLAN", category: "ARCHITECTURE", year: "2025", col: 2, span: 5, shift: -2, ratio: "16 / 10", depth: 14 },
  { slug: "rkive", title: "REIGN RKIVE", category: "ART", year: "2024", col: 8, span: 3, shift: 6, ratio: "4 / 5", depth: 22 },
  { slug: "smart-switch", title: "SMART TRANSFER SWITCH", category: "ARCHITECTURE", year: "2024", col: 1, span: 3, shift: 4, ratio: "1 / 1", depth: 12 },
  { slug: "musinsa-crew", title: "MUSINSA CREW", category: "FASHION", year: "2025", col: 5, span: 3, shift: -3, ratio: "3 / 4", depth: 28 },
  { slug: "music", title: "ARTIST & PRODUCER", category: "MUSIC", year: "2019—NOW", col: 9, span: 4, shift: 9, ratio: "1 / 1", depth: 20 },
  { slug: "transform-hospital", title: "TRANSFORM HOSPITAL", category: "ARCHITECTURE", year: "2025", col: 3, span: 6, shift: 0, ratio: "16 / 9", depth: 16 },
];
