import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useMerk } from "../merken";
import { groeiSpring, zachteSpring } from "./Animatie";

export type IntroProps = {
  // Leeg = de standaard van het merk
  readonly achtergrond?: "licht" | "primair";
};

// Midden van het GroenRijk-icoon binnen het logobestand (zie scripts/logo-varianten.py)
const ICOON_MIDDEN = "89.73% 37.76%";

export const Intro: React.FC<IntroProps> = ({ achtergrond }) => {
  const frame = useCurrentFrame();
  const m = useMerk();
  const { fps, width, height } = useVideoConfig();
  const opDonker = (achtergrond ?? m.introAchtergrond) === "primair";

  const breedte = Math.min(width * 0.78, 1100);
  const hoogte = breedte / m.logo.verhouding;
  const groei = groeiSpring(frame, fps, 0);
  const onthul = zachteSpring(frame, fps, 10);

  return (
    <AbsoluteFill
      style={{
        // Licht = wit
        backgroundColor: opDonker ? m.kleuren.primair : m.kleuren.opPrimair,
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
        {m.id === "groenrijk" ? (
          <>
            {/* Het blad groeit eerst, daarna verschijnt het woordmerk van links naar rechts */}
            <Img
              src={staticFile(`intro/logo-${opDonker ? "wit" : "transparant"}-woordmerk.png`)}
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
              src={staticFile(`intro/logo-${opDonker ? "wit" : "transparant"}-icoon.png`)}
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
          </>
        ) : (
          // Overige merken: het logo veert in beeld
          <Img
            src={opDonker ? m.logo.opDonker : m.logo.opLicht}
            style={{
              position: "absolute",
              inset: 0,
              width: breedte,
              height: hoogte,
              opacity: onthul,
              scale: Math.max(interpolate(groei, [0, 1], [0.6, 1]), 0),
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
