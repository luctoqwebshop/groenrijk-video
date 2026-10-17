import { voorbeeld } from "./voorbeeld";
import type { VideoConfig } from "./types";

// Testvideo in de stijl van Tuincentrum Outlet (testbeeld en nepondertitels)
export const voorbeeldOutlet: VideoConfig = {
  ...voorbeeld,
  merk: "outlet",
  hook: "Topmerken voor *outletprijzen*",
  overlays: [
    { soort: "stap", bronSeconde: 3.0, duur: 2.4, nummer: 1, tekst: "Kies je loungeset" },
    { soort: "tip", bronSeconde: 7.0, duur: 2.6, accent: "Tip!", tekst: "Op = op" },
    { soort: "product", bronSeconde: 9.6, duur: 1.8, naam: "Loungeset", prijs: "€ 0,00" },
  ],
  outro: { callToAction: "Bestel nu online" },
};
