export type MerkId = "groenrijk" | "outlet";

// Alles wat per merk verschilt. Componenten gebruiken alleen deze rollen, nooit vaste kleuren.
export type Merk = {
  readonly id: MerkId;
  readonly naam: string;
  // Regel onder de naam in de outro (adres of webadres)
  readonly adresRegel: string;
  // Korte zin in het accentlettertype in de outro; leeg = niet tonen
  readonly slogan: string;
  readonly kleuren: {
    // Vlakken: hook, outro, stap-labels, ondertitelvlak
    readonly primair: string;
    // Highlights: actief woord, stapnummer, CTA-knop
    readonly accent: string;
    // Tekst op primair
    readonly opPrimair: string;
    // Tekst op accent
    readonly opAccent: string;
    // Lichte achtergrond (intro, tip-vlak)
    readonly licht: string;
    // Donkere tekst op licht
    readonly tekstDonker: string;
  };
  // Primaire kleur met transparantie, voor vlakken over video
  readonly primairTransparant: (dekking: number) => string;
  readonly fonts: {
    readonly kop: string;
    readonly kopGewicht: number;
    readonly tekst: string;
    readonly tekstGewicht: number;
    // Kort accent zoals "Tip!" en de slogan
    readonly accent: string;
    readonly accentGewicht: number;
  };
  readonly logo: {
    readonly opLicht: string;
    readonly opDonker: string;
    // Wit logo zonder slogan, voor watermerk en outro (op primair of video)
    readonly zonderSlogan: string;
    // Breedte / hoogte, om vervorming te voorkomen
    readonly verhouding: number;
    readonly zonderSloganVerhouding: number;
  };
  // Achtergrond van de intro
  readonly introAchtergrond: "licht" | "primair";
};
