import type { Caption } from "@remotion/captions";

// Een stuk uit het ruwe materiaal dat in de video blijft (seconden in het bronbestand)
export type Fragment = {
  readonly van: number;
  readonly tot: number;
};

// Tekstelementen tijdens de inhoud. `bronSeconde` is het moment in het bronbestand,
// zodat het label meeschuift als de cuts veranderen.
export type Overlay =
  | { readonly soort: "stap"; readonly bronSeconde: number; readonly duur: number; readonly nummer: number; readonly tekst: string }
  | { readonly soort: "tip"; readonly bronSeconde: number; readonly duur: number; readonly accent: string; readonly tekst: string }
  | { readonly soort: "product"; readonly bronSeconde: number; readonly duur: number; readonly naam: string; readonly prijs?: string };

export type Muziek = {
  // Bestand in public/muziek/
  readonly bestand: string;
  // Seconde in het nummer waar de video begint
  readonly startSeconde?: number;
};

export type VideoConfig = {
  // Bestand in public/raw/ (bij voorkeur de versie met genormaliseerd geluid)
  readonly bron: string;
  readonly hook: string;
  readonly introAchtergrond: "wit" | "groenDonker";
  readonly fragmenten: Fragment[];
  readonly captions: Caption[];
  readonly overlays: Overlay[];
  readonly outro: { readonly callToAction: string; readonly webshop?: string };
  readonly muziek?: Muziek;
  // Punt in beeld dat zichtbaar moet blijven bij bijsnijden, bijvoorbeeld "50% 30%"
  readonly focus: { readonly verticaal: string; readonly horizontaal: string };
  // Zachte natuurgeluiden onder de intro
  readonly ambient?: boolean;
  // Belletjes in plaats van het "ding"
  readonly kerst?: boolean;
};
