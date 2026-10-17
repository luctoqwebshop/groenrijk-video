import captions from "../captions/twinkle-pole.json";
import { fragmenten } from "../edits/twinkle-pole";
import type { VideoConfig } from "./types";

// Nieuw merk Twinkle Pole: verlicht kerstobject voor in de vlaggenstokhouder
export const twinklePole: VideoConfig = {
  bron: "raw/twinkle-pole.mp4",
  hook: "Iets nieuws voor in je *vlaggenstokhouder*",
  merk: "groenrijk",
  introAchtergrond: "primair",
  fragmenten,
  captions,
  overlays: [
    { soort: "product", bronSeconde: 1.8, duur: 2.8, naam: "Twinkle Pole" },
    { soort: "stap", bronSeconde: 19.2, duur: 2.6, nummer: 1, tekst: "Zet hem in de vlaggenstokhouder" },
    { soort: "tip", bronSeconde: 23.2, duur: 3.0, accent: "Handig!", tekst: "8 lichtfuncties en een timer" },
    { soort: "stap", bronSeconde: 27.3, duur: 2.6, nummer: 2, tekst: "Snoer van 5 meter tot het stopcontact" },
    { soort: "product", bronSeconde: 34.4, duur: 3.0, naam: "1,10 m × 38 cm" },
  ],
  outro: { callToAction: "Nu in de winkel en online", webshop: "Tuincentrum Outlet" },
  focus: { verticaal: "62% 35%", horizontaal: "50% 20%" },
  kerst: true,
};
