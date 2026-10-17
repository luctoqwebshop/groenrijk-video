import { staticFile } from "remotion";
import { laadFont } from "./fonts";
import type { Merk } from "./types";

laadFont("Nunito", "fonts/Nunito-latin.woff2", ["700", "800"]);
laadFont("Caveat", "fonts/Caveat-latin.woff2", ["700"]);

// Kleuren uit het officiële GroenRijk-logo
export const groenrijk: Merk = {
  id: "groenrijk",
  naam: "GroenRijk Tilburg",
  adresRegel: "Stokhasseltlaan 39, Tilburg-Noord",
  slogan: "Weet wat er leeft",
  kleuren: {
    primair: "#005634",
    accent: "#91BE06",
    opPrimair: "#FFFFFF",
    opAccent: "#005634",
    licht: "#F7F5EC",
    tekstDonker: "#1F2A22",
  },
  primairTransparant: (dekking) => `rgba(0, 86, 52, ${dekking})`,
  fonts: {
    kop: "Nunito",
    kopGewicht: 800,
    tekst: "Nunito",
    tekstGewicht: 700,
    accent: "Caveat",
    accentGewicht: 700,
  },
  logo: {
    opLicht: staticFile("logo-groenrijk-transparant.png"),
    opDonker: staticFile("logo-groenrijk-wit.png"),
    zonderSlogan: staticFile("logo-groenrijk-wit-zonder-slogan.png"),
    verhouding: 915 / 241,
    zonderSloganVerhouding: 915 / 182,
  },
  introAchtergrond: "licht",
};
