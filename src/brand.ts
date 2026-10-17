import { loadFont } from "@remotion/fonts";
import { staticFile, useVideoConfig } from "remotion";

// Huisstijl GroenRijk. Gebruik in de rest van het project nergens losse hex-codes.
export const kleuren = {
  groenDonker: "#005634",
  groenLimoen: "#91BE06",
  wit: "#FFFFFF",
  creme: "#F7F5EC",
  tekstDonker: "#1F2A22",
} as const;

// Donkergroen met transparantie, voor vlakken over video
export const groenDonkerTransparant = (dekking: number) =>
  `rgba(0, 86, 52, ${dekking})`;

export const schaduw = {
  zacht: "0 12px 32px rgba(31, 42, 34, 0.22)",
  tekst: "0 2px 10px rgba(31, 42, 34, 0.45)",
} as const;

export const radius = {
  klein: 16,
  groot: 24,
} as const;

// Nunito en Caveat van Google Fonts, lokaal opgeslagen in public/fonts/ zodat het renderen
// niet van het netwerk afhangt. Nunito is een variabel lettertype (700 en 800 uit één bestand).
const NUNITO = "Nunito";
const CAVEAT = "Caveat";
for (const gewicht of ["700", "800"]) {
  loadFont({
    family: NUNITO,
    url: staticFile("fonts/Nunito-latin.woff2"),
    weight: gewicht,
    format: "woff2",
  });
}
loadFont({
  family: CAVEAT,
  url: staticFile("fonts/Caveat-latin.woff2"),
  weight: "700",
  format: "woff2",
});

export const fonts = {
  // Koppen: 800 (ExtraBold), ondertitels en labels: 700 (Bold)
  nunito: NUNITO,
  // Alleen voor de slogan en korte accenten zoals "Tip!"
  caveat: CAVEAT,
} as const;

export const logo = {
  // Kleurenlogo met slogan, transparant, voor lichte achtergronden
  kleur: staticFile("logo-groenrijk-transparant.png"),
  kleurZonderSlogan: staticFile("logo-groenrijk-transparant-zonder-slogan.png"),
  // Donkergroen vervangen door wit, voor donkergroene achtergronden en video
  wit: staticFile("logo-groenrijk-wit.png"),
  witZonderSlogan: staticFile("logo-groenrijk-wit-zonder-slogan.png"),
  // Alleen de cirkel met het blad
  icoon: staticFile("logo-icoon.png"),
  // Verhoudingen (breedte / hoogte) van de bestanden, om vervorming te voorkomen
  verhouding: {
    metSlogan: 915 / 241,
    zonderSlogan: 915 / 182,
    icoon: 1,
  },
} as const;

export const sfx = {
  pop: staticFile("sfx/pop.wav"),
  whoosh: staticFile("sfx/whoosh.wav"),
  ding: staticFile("sfx/ding.wav"),
  groei: staticFile("sfx/groei.wav"),
  tik: staticFile("sfx/tik.wav"),
  belletjes: staticFile("sfx/belletjes.wav"),
  ritselen: staticFile("sfx/ritselen.wav"),
} as const;

export const sfxVolume = {
  pop: 0.3,
  whoosh: 0.25,
  ding: 0.3,
  groei: 0.3,
  tik: 0.25,
  belletjes: 0.3,
  ambient: 0.12,
} as const;

export const bedrijf = {
  naam: "GroenRijk Tilburg",
  adres: "Stokhasseltlaan 39, Tilburg-Noord",
  slogan: "Weet wat er leeft",
} as const;

export type Formaat = "verticaal" | "horizontaal";

// Veilige zones in pixels. Tekst blijft binnen deze marges.
export const veiligeZone = {
  verticaal: { boven: 250, onder: 350, links: 80, rechts: 120 },
  horizontaal: { boven: 60, onder: 70, links: 96, rechts: 96 },
} as const;

export const useFormaat = () => {
  const { width, height } = useVideoConfig();
  const formaat: Formaat = height > width ? "verticaal" : "horizontaal";
  return {
    formaat,
    verticaal: formaat === "verticaal",
    zone: veiligeZone[formaat],
    // Schaalfactor t.o.v. 1080 px breed (verticaal) of 1920 px breed (horizontaal)
    schaal: formaat === "verticaal" ? width / 1080 : width / 1920,
  };
};

// Bovenkant van labels: onder het watermerk, zodat ze elkaar niet raken
export const labelTop = (verticaal: boolean) =>
  veiligeZone[verticaal ? "verticaal" : "horizontaal"].boven + (verticaal ? 100 : 90);

// Tekstgroottes per formaat
export const tekstGrootte = {
  verticaal: { kop: 96, ondertitel: 68, label: 52, klein: 40 },
  horizontaal: { kop: 92, ondertitel: 52, label: 44, klein: 34 },
} as const;
