import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { labelTop, radius, schaduw, tekstGrootte, useFormaat } from "../brand";
import { useMerk } from "../merken";
import { zachteSpring } from "./Animatie";

export type TipBadgeProps = {
  // Kort handgeschreven accent, bijvoorbeeld "Tip!" of "Zo simpel!"
  readonly accent: string;
  readonly tekst: string;
};

export const TipBadge: React.FC<TipBadgeProps> = ({ accent, tekst }) => {
  const m = useMerk();
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { verticaal, zone, formaat } = useFormaat();
  const g = tekstGrootte[formaat];

  const erin = zachteSpring(frame, fps, 0);
  const eruit = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: labelTop(verticaal) + 30,
        left: zone.links,
        maxWidth: verticaal ? 1080 - zone.links - zone.rechts : 1000,
        opacity: erin * eruit,
        translate: `0px ${interpolate(erin, [0, 1], [30, 0])}px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: verticaal ? -52 : -46,
          left: 24,
          zIndex: 1,
          backgroundColor: m.kleuren.accent,
          color: m.kleuren.opAccent,
          fontFamily: m.fonts.accent,
          fontWeight: m.fonts.accentGewicht,
          fontSize: verticaal ? 72 : 64,
          lineHeight: 1,
          padding: "6px 26px 10px",
          borderRadius: radius.klein,
          rotate: "-4deg",
          scale: zachteSpring(frame, fps, 5),
          boxShadow: schaduw.zacht,
        }}
      >
        {accent}
      </div>
      <div
        style={{
          backgroundColor: m.kleuren.licht,
          color: m.kleuren.tekstDonker,
          fontFamily: m.fonts.kop,
          fontWeight: m.fonts.kopGewicht,
          fontSize: g.label,
          lineHeight: 1.25,
          borderRadius: radius.groot,
          borderLeft: `12px solid ${m.kleuren.primair}`,
          boxShadow: schaduw.zacht,
          padding: verticaal ? "46px 36px 28px" : "40px 34px 24px",
        }}
      >
        {tekst}
      </div>
    </div>
  );
};
