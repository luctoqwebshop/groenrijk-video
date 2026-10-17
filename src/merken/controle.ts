import type { VideoConfig } from "../videos/types";
import type { MerkId } from "./types";

// Merken blijven strikt gescheiden: in een video van het ene merk mag niets van het andere merk staan.
const verboden: Record<MerkId, RegExp> = {
  groenrijk: /tuincentrum\s*outlet|tuincentrumoutlet|\boutlet\b/i,
  outlet: /groen\s*rijk/i,
};

// Gooit een fout als zichtbare toegevoegde tekst in de config naar het andere merk verwijst.
// De gesproken tekst (ondertitels) wordt niet gecontroleerd: de ruwe video passen we niet aan voor het merk.
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
};
