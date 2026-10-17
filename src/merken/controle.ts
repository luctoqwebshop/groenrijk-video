import type { VideoConfig } from "../videos/types";
import type { MerkId } from "./types";

// Merken blijven strikt gescheiden: in een video van het ene merk mag niets van het andere merk staan.
const verboden: Record<MerkId, RegExp> = {
  groenrijk: /tuincentrum\s*outlet|tuincentrumoutlet|\boutlet\b/i,
  outlet: /groen\s*rijk/i,
};

// Gooit een fout als zichtbare tekst in de config naar het andere merk verwijst.
// In de ondertitels (gesproken tekst) geeft het alleen een waarschuwing: die tekst passen we niet aan,
// maar zo'n zin kan wel uit de video geknipt worden.
export const controleerMerk = (config: VideoConfig) => {
  const patroon = verboden[config.merk];
  const teksten = [
    config.hook,
    config.outro.callToAction,
    config.outro.webshop ?? "",
    ...config.overlays.map((o) =>
      o.soort === "stap" ? o.tekst : o.soort === "tip" ? `${o.accent} ${o.tekst}` : `${o.naam} ${o.prijs ?? ""}`,
    ),
  ];
  const fout = teksten.find((t) => patroon.test(t));
  if (fout) {
    throw new Error(`Merkfout (${config.merk}): "${fout}" verwijst naar een ander merk.`);
  }
  const gesproken = config.captions.map((c) => c.text).join("");
  if (patroon.test(gesproken)) {
    console.warn(`Let op (${config.merk}): in de gesproken tekst wordt een ander merk genoemd. Knip die zin eruit.`);
  }
};
