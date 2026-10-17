import type { VideoConfig } from "./types";

export const OVERGANG = 12;
export const HOOK_DUUR = 3;
export const INTRO_DUUR = 1.5;
export const OUTRO_DUUR = 3.5;

// Alle tijden van de video in frames, afgeleid uit de configuratie
export const maakTijdlijn = (config: VideoConfig, fps: number) => {
  const hook = Math.round(HOOK_DUUR * fps);
  const intro = Math.round(INTRO_DUUR * fps);
  const outro = Math.round(OUTRO_DUUR * fps);
  const fragmenten = config.fragmenten.map((f) => ({
    ...f,
    frames: Math.round((f.tot - f.van) * fps),
  }));
  const inhoud = fragmenten.reduce((som, f) => som + f.frames, 0);

  // Startframes van elke scène in de uiteindelijke video (overgangen overlappen)
  const introStart = hook - OVERGANG;
  const inhoudStart = introStart + intro - OVERGANG;
  const outroStart = inhoudStart + inhoud - OVERGANG;
  const totaal = outroStart + outro;

  // Zet een moment in het bronbestand om naar een frame binnen de inhoud-scène
  const bronNaarInhoud = (seconde: number): number | null => {
    let opgeteld = 0;
    for (const f of fragmenten) {
      if (seconde >= f.van && seconde < f.tot) {
        return opgeteld + Math.round((seconde - f.van) * fps);
      }
      opgeteld += f.frames;
    }
    return null;
  };

  // Momenten waarop gesproken wordt, in frames van de hele video (voor ducking)
  const spraak = config.captions
    .map((c) => {
      const start = bronNaarInhoud(c.startMs / 1000);
      const eind = bronNaarInhoud(Math.max(c.startMs, c.endMs - 1) / 1000);
      return start === null || eind === null
        ? null
        : { start: inhoudStart + start, eind: inhoudStart + eind };
    })
    .filter((s): s is { start: number; eind: number } => s !== null);

  return { hook, intro, outro, fragmenten, inhoud, introStart, inhoudStart, outroStart, totaal, bronNaarInhoud, spraak };
};
