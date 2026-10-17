import type { Caption } from "@remotion/captions";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { radius, schaduw, tekstGrootte, useFormaat } from "../brand";
import { useMerk } from "../merken";
import { zachteSpring } from "./Animatie";

type Groep = {
  readonly woorden: Caption[];
  readonly startMs: number;
  readonly endMs: number;
};

const MAX_WOORDEN = 5;
const MIN_WOORDEN = 3;
const PAUZE_MS = 500;

// Deelt de woorden op in groepjes van 3 tot 5 woorden.
// Een nieuwe groep begint na een pauze, of na een zin met genoeg woorden.
export const maakGroepen = (captions: Caption[]): Groep[] => {
  const groepen: Caption[][] = [];
  let huidig: Caption[] = [];
  for (const c of captions) {
    const vorige = huidig[huidig.length - 1];
    const pauze = vorige ? c.startMs - vorige.endMs > PAUZE_MS : false;
    const zinEinde = vorige ? /[.?!,]$/.test(vorige.text.trim()) : false;
    if (
      huidig.length > 0 &&
      (huidig.length >= MAX_WOORDEN || pauze || (zinEinde && huidig.length >= MIN_WOORDEN))
    ) {
      groepen.push(huidig);
      huidig = [];
    }
    huidig.push(c);
  }
  if (huidig.length > 0) {
    groepen.push(huidig);
  }
  return groepen.map((woorden) => ({
    woorden,
    startMs: woorden[0].startMs,
    endMs: woorden[woorden.length - 1].endMs,
  }));
};

export type CaptionsProps = {
  // Woorden met tijden in milliseconden t.o.v. het begin van het bronbestand
  readonly captions: Caption[];
  // Welk moment in het bronbestand (ms) bij frame 0 van deze sequence hoort
  readonly bronStartMs: number;
};

export const Captions: React.FC<CaptionsProps> = ({ captions, bronStartMs }) => {
  const m = useMerk();
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const { verticaal, zone, formaat } = useFormaat();
  const nuMs = bronStartMs + (frame / fps) * 1000;

  const groepen = maakGroepen(captions);
  const index = groepen.findIndex(
    (g, i) =>
      nuMs >= g.startMs &&
      nuMs < Math.min(g.endMs + 400, groepen[i + 1]?.startMs ?? Infinity),
  );
  if (index === -1) {
    return null;
  }
  const groep = groepen[index];
  const startFrame = ((groep.startMs - bronStartMs) / 1000) * fps;
  const pop = zachteSpring(frame, fps, startFrame);

  return (
    <div
      style={{
        position: "absolute",
        left: zone.links,
        right: zone.rechts,
        bottom: zone.onder + (verticaal ? 20 : 10),
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: verticaal ? width - zone.links - zone.rechts : 1400,
          backgroundColor: m.primairTransparant(0.82),
          borderRadius: radius.klein + 4,
          boxShadow: schaduw.zacht,
          padding: verticaal ? "16px 30px 20px" : "12px 28px 16px",
          fontFamily: m.fonts.tekst,
          fontWeight: m.fonts.tekstGewicht,
          fontSize: tekstGrootte[formaat].ondertitel,
          lineHeight: 1.2,
          textAlign: "center",
          color: m.kleuren.opPrimair,
          opacity: interpolate(pop, [0, 1], [0, 1]),
          scale: interpolate(pop, [0, 1], [0.9, 1]),
        }}
      >
        {groep.woorden.map((w, i) => {
          const actief = nuMs >= w.startMs && nuMs < (groep.woorden[i + 1]?.startMs ?? w.endMs + 400);
          return (
            <span
              key={`${w.startMs}-${i}`}
              style={{ color: actief ? m.kleuren.accent : m.kleuren.opPrimair, whiteSpace: "pre-wrap" }}
            >
              {i === 0 ? w.text.trimStart() : w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
