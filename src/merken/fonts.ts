import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Lettertypes van Google Fonts, lokaal opgeslagen in public/fonts/ zodat het renderen
// niet van het netwerk afhangt (Chromium in de cloud vertrouwt de proxy niet).
export const laadFont = (familie: string, bestand: string, gewichten: string[]) => {
  for (const gewicht of gewichten) {
    loadFont({ family: familie, url: staticFile(bestand), weight: gewicht, format: "woff2" });
  }
};
