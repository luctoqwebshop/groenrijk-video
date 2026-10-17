import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts, kleuren, tekstGrootte, useFormaat } from "../brand";
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
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { verticaal, zone } = useFormaat();
  const grootte = verticaal ? tekstGrootte.verticaal.kop : 104;
  const lijst = woorden(tekst);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kleuren.groenDonker,
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
          fontFamily: fonts.nunito,
          fontWeight: 800,
          fontSize: grootte,
          lineHeight: 1.15,
          color: kleuren.wit,
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
                color: accent ? kleuren.groenLimoen : kleuren.wit,
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
