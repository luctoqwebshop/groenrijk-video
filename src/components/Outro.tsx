import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { radius, schaduw, useFormaat } from "../brand";
import { useMerk } from "../merken";
import { zachteSpring } from "./Animatie";

export type OutroProps = {
  readonly callToAction: string;
  // Alleen invullen als de webshop relevant is, bijvoorbeeld "bbqkopen.nl"
  readonly webshop?: string;
};

const opkomst = (p: number, afstand = 24): React.CSSProperties => ({
  opacity: p,
  translate: `0px ${interpolate(p, [0, 1], [afstand, 0])}px`,
});

export const Outro: React.FC<OutroProps> = ({ callToAction, webshop }) => {
  const m = useMerk();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { verticaal, zone } = useFormaat();

  const logoBreedte = verticaal ? 760 : 820;
  const s = (vertraging: number) => zachteSpring(frame, fps, vertraging);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: m.kleuren.primair,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: verticaal ? 36 : 24,
        paddingTop: zone.boven,
        paddingBottom: zone.onder,
        paddingLeft: zone.links,
        paddingRight: zone.rechts,
        fontFamily: m.fonts.tekst,
        color: m.kleuren.opPrimair,
        textAlign: "center",
      }}
    >
      <Img
        src={m.logo.zonderSlogan}
        style={{
          width: logoBreedte,
          height: logoBreedte / m.logo.zonderSloganVerhouding,
          ...opkomst(s(0), 16),
          scale: interpolate(s(0), [0, 1], [0.94, 1]),
        }}
      />
      {m.slogan ? (
        <div
          style={{
            fontFamily: m.fonts.accent,
            fontWeight: m.fonts.accentGewicht,
            fontSize: verticaal ? 104 : 96,
            lineHeight: 1,
            color: m.kleuren.accent,
            marginTop: verticaal ? -8 : -12,
            ...opkomst(s(8)),
          }}
        >
          {m.slogan}
        </div>
      ) : null}
      <div
        style={{
          fontWeight: m.fonts.tekstGewicht,
          fontSize: verticaal ? 44 : 38,
          lineHeight: 1.35,
          marginTop: verticaal ? 28 : 12,
          ...opkomst(s(16)),
        }}
      >
        {m.naam}
        <br />
        {m.adresRegel}
        {webshop ? (
          <>
            <br />
            {webshop}
          </>
        ) : null}
      </div>
      <div
        style={{
          marginTop: verticaal ? 24 : 12,
          backgroundColor: m.kleuren.accent,
          color: m.kleuren.opAccent,
          fontWeight: m.fonts.kopGewicht,
          fontSize: verticaal ? 50 : 42,
          padding: verticaal ? "22px 44px" : "18px 40px",
          borderRadius: radius.groot * 2,
          boxShadow: schaduw.zacht,
          maxWidth: verticaal ? 880 : 1400,
          ...opkomst(s(24)),
        }}
      >
        {callToAction}
      </div>
    </AbsoluteFill>
  );
};
