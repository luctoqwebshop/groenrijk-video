import captions from "../captions/twinkle-pole-outlet.json";
import { fragmenten } from "../edits/twinkle-pole-outlet";
import type { VideoConfig } from "./types";

// Twinkle Pole in de stijl van Tuincentrum Outlet: verlicht kerstobject voor in de vlaggenstokhouder
export const twinklePoleOutlet: VideoConfig = {
  bron: "raw/twinkle-pole-outlet.mp4",
  hook: "Zo *straalt* je gevel met kerst",
  merk: "outlet",
  introAchtergrond: "primair",
  fragmenten,
  captions,
  overlays: [
    { soort: "product", bronSeconde: 1.8, duur: 2.8, naam: "Twinkle Pole" },
    { soort: "stap", bronSeconde: 19.2, duur: 2.6, nummer: 1, tekst: "Zet hem in de vlaggenstokhouder" },
    { soort: "tip", bronSeconde: 23.2, duur: 3.0, accent: "Handig!", tekst: "8 lichtfuncties en een timer" },
    { soort: "stap", bronSeconde: 27.3, duur: 2.6, nummer: 2, tekst: "Snoer van 5 meter" },
    { soort: "product", bronSeconde: 34.4, duur: 3.0, naam: "1,10 m × 38 cm" },
  ],
  outro: { callToAction: "Bestel nu online" },
  focus: { verticaal: "62% 35%", horizontaal: "50% 20%" },
  kerst: true,
};
