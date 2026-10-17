import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { kleuren, logo } from "../brand";
import { groeiSpring, zachteSpring } from "./Animatie";

export type IntroProps = {
  readonly achtergrond: "wit" | "groenDonker";
};

// Midden van het icoon binnen het logobestand (zie scripts/logo-varianten.py)
const ICOON_MIDDEN = "89.73% 37.76%";

export const Intro: React.FC<IntroProps> = ({ achtergrond }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const opDonker = achtergrond === "groenDonker";
  const variant = opDonker ? "wit" : "transparant";

  const breedte = Math.min(width * 0.78, 1100);
  const hoogte = breedte / logo.verhouding.metSlogan;

  // Het icoon groeit eerst, daarna verschijnt het woordmerk van links naar rechts
  const groei = groeiSpring(frame, fps, 0);
  const onthul = zachteSpring(frame, fps, 10);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: opDonker ? kleuren.groenDonker : kleuren.wit,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: breedte,
          height: hoogte,
          translate: `0px ${height > width ? -60 : 0}px`,
        }}
      >
        <Img
          src={staticFile(`intro/logo-${variant}-woordmerk.png`)}
          style={{
            position: "absolute",
            inset: 0,
            width: breedte,
            height: hoogte,
            clipPath: `inset(0 ${interpolate(onthul, [0, 1], [100, 0])}% 0 0)`,
            opacity: onthul,
          }}
        />
        <Img
          src={staticFile(`intro/logo-${variant}-icoon.png`)}
          style={{
            position: "absolute",
            inset: 0,
            width: breedte,
            height: hoogte,
            transformOrigin: ICOON_MIDDEN,
            scale: Math.max(groei, 0),
            rotate: `${interpolate(groei, [0, 1], [-12, 0])}deg`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
