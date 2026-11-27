// Your projects for the WORK page.
// To add images: put files in /public/work/ and set `image: "/work/your-file.jpg"`.
// To link a tile: set `url`. A page on this site ("/work/your-project") opens in place;
// an outside address ("https://...") opens in a new tab.
// For animation or video: set `video: "/work/your-file.mp4"` (it plays silently on a loop).
//   Keep `image` too if you like: it shows while the video loads.
// Until a project has an image or video, a black placeholder box is shown in its place.
//
// Layout: a regular grid of equal 16:9 tiles (4 per row on desktop, 3 on tablets, 2 on phones),
// in the order listed below. Each tile shows its number, title and label over the image on hover.

export const categories = ["BRANDING", "ARCHITECTURE", "GRAPHIC DESIGN", "FILM", "OTHER"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  category: Category;
  /** Optional wording shown under the title instead of the category (the filter still uses `category`). */
  label?: string;
  year: string;
  image?: string;
  /** Optional crop position for the tile preview (CSS object-position), e.g. "50% 80%" to show more of the bottom. */
  objectPosition?: string;
  video?: string;
  url?: string;
};

export const projects: Project[] = [
  { slug: "dusk-til-dawn", title: "DUSK ‘TIL DAWN", category: "BRANDING", label: "VISUAL DIRECTION, BRANDING, PACKAGING", year: "2026", image: "/work/dusk-til-dawn/tile-preview.jpg", url: "/work/dusk-til-dawn" },
  { slug: "soft-and-hard", title: "SOFT AND HARD", category: "GRAPHIC DESIGN", label: "TYPEFACE DESIGN", year: "2026", image: "/work/soft-and-hard/posters.jpg", url: "/work/soft-and-hard" },
  { slug: "glitch-technology-festival", title: "GLITCH TECHNOLOGY FESTIVAL", category: "BRANDING", label: "VISUAL DIRECTION, BRANDING, PRODUCT DESIGN", year: "2026", image: "/work/glitch/p03-preview.jpg", url: "/work/glitch-technology-festival" },
  { slug: "produce-r", title: "PRODUCE.R", category: "BRANDING", label: "CREATIVE DIRECTION, BRANDING, CAMPAIGN, PRODUCT DESIGN", year: "2024–NOW", image: "/work/produce-r/preview.jpg", url: "/work/produce-r" },
  { slug: "partial-wholes", title: "PARTIAL WHOLES", category: "ARCHITECTURE", label: "ARCHITECTURE DESIGN", year: "2026", image: "/work/partial-wholes/p01.jpg", objectPosition: "50% 80%", url: "/work/partial-wholes" },
];
