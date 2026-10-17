import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts, kleuren, labelTop, radius, schaduw, tekstGrootte, useFormaat } from "../brand";
import { zachteSpring } from "./Animatie";

export type StapLabelProps = {
  readonly nummer: number;
  readonly tekst: string;
};

// Donkergroen tekstvak met het stapnummer in een limoen rondje.
// Staat bovenin het beeld, zodat de ondertiteling onderin vrij blijft.
export const StapLabel: React.FC<StapLabelProps> = ({ nummer, tekst }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { verticaal, zone, formaat } = useFormaat();
  const g = tekstGrootte[formaat];

  const erin = zachteSpring(frame, fps, 0);
  const eruit = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rondje = verticaal ? 92 : 80;

  return (
    <div
      style={{
        position: "absolute",
        top: labelTop(verticaal),
        left: zone.links,
        maxWidth: verticaal ? 1080 - zone.links - zone.rechts : 1100,
        display: "flex",
        alignItems: "center",
        gap: 24,
        backgroundColor: kleuren.groenDonker,
        borderRadius: radius.groot,
        boxShadow: schaduw.zacht,
        padding: verticaal ? "22px 36px 22px 22px" : "18px 34px 18px 18px",
        opacity: erin * eruit,
        translate: `${interpolate(erin, [0, 1], [-60, 0])}px 0px`,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: rondje,
          height: rondje,
          borderRadius: rondje / 2,
          backgroundColor: kleuren.groenLimoen,
          color: kleuren.groenDonker,
          fontFamily: fonts.nunito,
          fontWeight: 800,
          fontSize: rondje * 0.56,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          scale: zachteSpring(frame, fps, 4),
        }}
      >
        {nummer}
      </div>
      <div
        style={{
          fontFamily: fonts.nunito,
          fontWeight: 800,
          fontSize: g.label,
          lineHeight: 1.2,
          color: kleuren.wit,
        }}
      >
        <span style={{ color: kleuren.groenLimoen }}>Stap {nummer}: </span>
        {tekst}
      </div>
    </div>
  );
};
