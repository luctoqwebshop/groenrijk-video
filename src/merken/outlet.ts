import { staticFile } from "remotion";
import { laadFont } from "./fonts";
import type { Merk } from "./types";

laadFont("Montserrat", "fonts/Montserrat-latin.woff2", ["700", "800", "900"]);

// Tuincentrum Outlet. Blauw komt uit het logo (public/merken/outlet/logo-origineel.jpg).
// VOORLOPIG: accentkleur, slogan en webadres nog bevestigen met de gebruiker / website.
export const outlet: Merk = {
  id: "outlet",
  naam: "Tuincentrum Outlet",
  adresRegel: "tuincentrumoutlet.com",
  slogan: "",
  kleuren: {
    primair: "#2F65B0",
    accent: "#FFD23F",
    opPrimair: "#FFFFFF",
    opAccent: "#1B3F75",
    licht: "#FFFFFF",
    tekstDonker: "#1B2A40",
  },
  primairTransparant: (dekking) => `rgba(47, 101, 176, ${dekking})`,
  fonts: {
    kop: "Montserrat",
    kopGewicht: 900,
    tekst: "Montserrat",
    tekstGewicht: 800,
    accent: "Montserrat",
    accentGewicht: 900,
  },
  logo: {
    opLicht: staticFile("merken/outlet/logo-op-licht.png"),
    opDonker: staticFile("merken/outlet/logo-op-donker.png"),
    zonderSlogan: staticFile("merken/outlet/logo-op-donker.png"),
    verhouding: 411 / 122,
    zonderSloganVerhouding: 411 / 122,
  },
  introAchtergrond: "primair",
};
