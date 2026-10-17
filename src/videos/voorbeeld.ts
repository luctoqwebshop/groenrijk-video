import captions from "../captions/voorbeeld.json";
import { fragmenten } from "../edits/voorbeeld";
import type { VideoConfig } from "./types";

// Testvideo om de huisstijl te controleren. Gebruikt een gegenereerd testbeeld en nepondertitels.
export const voorbeeld: VideoConfig = {
  bron: "raw/voorbeeld-testbeeld.mp4",
  hook: "Zo houd je je *olijfboom* de hele winter mooi 🌿",
  introAchtergrond: "wit",
  fragmenten,
  captions,
  overlays: [
    { soort: "stap", bronSeconde: 3.0, duur: 2.4, nummer: 1, tekst: "Kies een zonnige plek" },
    { soort: "tip", bronSeconde: 7.0, duur: 2.6, accent: "Tip!", tekst: "Weinig water in de winter" },
    { soort: "product", bronSeconde: 9.6, duur: 1.8, naam: "Olijfboom in pot", prijs: "€ 0,00" },
  ],
  outro: { callToAction: "Kom langs voor persoonlijk advies!" },
  focus: { verticaal: "50% 40%", horizontaal: "50% 40%" },
  ambient: true,
};
