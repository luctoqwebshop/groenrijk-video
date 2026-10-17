// Gedeelde vormgeving voor alle merken. Merkkleuren, fonts en logo's staan in src/merken/.
import { staticFile, useVideoConfig } from "remotion";

export const schaduw = {
  zacht: "0 12px 32px rgba(31, 42, 34, 0.22)",
  tekst: "0 2px 10px rgba(31, 42, 34, 0.45)",
} as const;

export const radius = {
  klein: 16,
  groot: 24,
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
