import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { labelTop, radius, schaduw, tekstGrootte, useFormaat } from "../brand";
import { useMerk } from "../merken";
import { zachteSpring } from "./Animatie";

export type ProductLabelProps = {
  readonly naam: string;
  // Alleen invullen als de prijs is opgegeven, bijvoorbeeld "€ 24,99"
  readonly prijs?: string;
};

export const ProductLabel: React.FC<ProductLabelProps> = ({ naam, prijs }) => {
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
        top: labelTop(verticaal),
        left: zone.links,
        display: "flex",
        alignItems: "stretch",
        borderRadius: radius.groot,
        overflow: "hidden",
        boxShadow: schaduw.zacht,
        fontFamily: m.fonts.kop,
        fontWeight: m.fonts.kopGewicht,
        fontSize: g.label,
        opacity: erin * eruit,
        translate: `${interpolate(erin, [0, 1], [-60, 0])}px 0px`,
      }}
    >
      <div
        style={{
          backgroundColor: m.kleuren.opPrimair,
          color: m.kleuren.primair,
          padding: verticaal ? "22px 32px" : "18px 30px",
          borderLeft: `12px solid ${m.kleuren.primair}`,
        }}
      >
        {naam}
      </div>
      {prijs ? (
        <div
          style={{
            backgroundColor: m.kleuren.accent,
            color: m.kleuren.opAccent,
            padding: verticaal ? "22px 30px" : "18px 28px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {prijs}
        </div>
      ) : null}
    </div>
  );
};
