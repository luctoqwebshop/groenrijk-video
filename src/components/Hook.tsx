import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { tekstGrootte, useFormaat } from "../brand";
import { useMerk } from "../merken";
import { zachteSpring } from "./Animatie";

export type HookProps = {
  // De openingszin. Zet het belangrijkste woord tussen *sterretjes*, dat wordt limoen.
  readonly tekst: string;
};

// Splitst "Zo houd je je *olijfboom* mooi" in woorden met een accentvlag
const woorden = (tekst: string) =>
  tekst
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ({ woord: w.replace(/\*/g, ""), accent: w.includes("*") }));

export const Hook: React.FC<HookProps> = ({ tekst }) => {
  const m = useMerk();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { verticaal, zone } = useFormaat();
  const grootte = verticaal ? tekstGrootte.verticaal.kop : 104;
  const lijst = woorden(tekst);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: m.kleuren.primair,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: zone.boven,
        paddingBottom: zone.onder,
        paddingLeft: zone.links,
        paddingRight: zone.rechts,
      }}
    >
      <div
        style={{
          fontFamily: m.fonts.kop,
          fontWeight: m.fonts.kopGewicht,
          fontSize: grootte,
          lineHeight: 1.15,
          color: m.kleuren.opPrimair,
          textAlign: "center",
          maxWidth: verticaal ? 860 : 1500,
          textWrap: "balance",
        }}
      >
        {lijst.map(({ woord, accent }, i) => {
          const p = zachteSpring(frame, fps, 4 + i * 3);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "0.25em",
                color: accent ? m.kleuren.accent : m.kleuren.opPrimair,
                opacity: p,
                translate: `0px ${interpolate(p, [0, 1], [28, 0])}px`,
              }}
            >
              {woord}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
