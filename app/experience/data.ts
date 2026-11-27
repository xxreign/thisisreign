export const sectionLinks = [
  { id: "education", label: "EDUCATION" },
  { id: "work", label: "WORK" },
  { id: "awards", label: "AWARDS" },
  { id: "content", label: "CONTENT" },
] as const;

export type SectionId = (typeof sectionLinks)[number]["id"];

export type ExperienceEntry = {
  title: string;
  href?: string;
  role: string;
  date?: string;
  location?: string;
  description?: string;
};

// Transcribed from the supplied reference, including its original wording.
export const education: ExperienceEntry[] = [
  { title: "SCHOOL OF VISUAL ART", role: "MASTER OF FINE ARTS DESIGN", date: "2026-2028", location: "NEW YORK CITY, NY     USA" },
  { title: "RENSSELAER POLYTECHNIC INSTITUTE", role: "BACHELOR OF ARCHITECTURE", date: "2021-2026", location: "TROY, NY     USA" },
];

export const work: ExperienceEntry[] = [
  {
    title: "PRODUCE.R", role: "Creative director", date: "2023/08 -     NOW", location: "NEW YORK CITY, NY USA",
    description: "Founded and directed an independent fashion label integrating music, performance,and visual culture.\nPublic Relations seeding to artist styling team.",
  },
  {
    title: "BOOK OF THE MONTH: VOLUME 0", href: "https://www.bookofthemonth.com/", role: "Creative directing/Content", date: "2026/04 - 2026/05", location: "NEW YORK CITY, NY USA",
    description: "Developed creative content proposal for Book of the Month: Volume 0. Conceptualized an original series and a launch campaign for Issue 13, including visual direction, content strategy, and promotional concepts.",
  },
  {
    title: "CAZA", href: "https://cazarch.com/", role: "Architectural Internship", date: "2025/06 - 2025/08", location: "BROOKLYN, NY USA",
    description: "Worked as Architectural Internship. Participated in Project Greenfield, Bacolon City Masterplan, and Transform Hospital, including 3D modeling, drawings, rendering, and client meeting.",
  },
  {
    title: "MUSINSA CREW", href: "https://global.musinsa.com/us/trending/items?gender=F&page=1&toggleCountry=us", role: "Fashion Content Creator", date: "2025/06 - 2025/08", location: "SEOUL KOREA (REMOTE)",
    description: "Selected as one of the global influencer creators for MUSINSA CREW, an ambassador program promoting MUSINSA Fashion.",
  },
  {
    title: "CENTER FOR ARCHITECTURE SCIENCE AND ECOLOGY AT RENSSELAER", href: "https://www.case.rpi.edu/", role: "Ph.D Research Assistant", date: "2024/08 - 2024/12", location: "BROOKLYN, NY USA",
    description: "Research assistant for Ph.D student’s topics of community and demand response by collecting state of the arts of existing smart devices, design and prototype a 3D printed physical smart transfer switch to help demand response program.",
  },
  {
    title: "SPOTIFY, APPLE MUSIC", role: "Artist & Producer", date: "2019/11 -     NOW",
    description: "Verified Artist and Producer with uploaded soundtrack. But please do not listen to it.",
  },
];

export const awards: ExperienceEntry[] = [
  {
    title: "2016 National Art Education Association National Convention", href: "https://www.arteducators.org/events-and-opportunities/awards-program/", role: "Art Excellence Award & Exhibition",
    description: "Art work was selected to be presented at the 2016 National Art Education Association\nNational Convention in Chicago, IL, USA from March 17 to March 19.",
  },
  {
    title: "2020 National Economics Challenge Competition", role: "Bronze Medal Winner in Macroeconomic",
    description: "Team Leader attended National Economics Challenge competition organized by Council for Economic Education.",
  },
];

export const brands: { name: string; href?: string; src: string; width: number; height?: number }[] = [
  { name: "ADLV", href: "https://www.instagram.com/adlv_official/", src: "/brands/adlv.png", width: 800 },
  { name: "MMLG", href: "https://www.instagram.com/mmlg.official/", src: "/brands/mmlg.png", width: 580 },
  { name: "LOE", href: "https://www.instagram.com/loe_cosmetics_official/", src: "/brands/loe.png", width: 510 },
  { name: "PLASTIC PRODUCT", href: "https://www.instagram.com/plastic_product/", src: "/brands/plastic-product.png", width: 1040 },
  { name: "BOTR", src: "/brands/botr.png", width: 678, height: 339 },
  { name: "PROJECT_VIA", src: "/brands/project-via.png", width: 929, height: 252 },
  { name: "NEW YORK FASHION WEEK", src: "/brands/nyfw.png", width: 891, height: 310 },
  { name: "MUSINSA GLOBAL", src: "/brands/musinsa-global.png", width: 949, height: 261 },
];
