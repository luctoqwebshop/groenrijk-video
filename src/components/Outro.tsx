import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { bedrijf, fonts, kleuren, logo, radius, schaduw, useFormaat } from "../brand";
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
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { verticaal, zone } = useFormaat();

  const logoBreedte = verticaal ? 760 : 820;
  const s = (vertraging: number) => zachteSpring(frame, fps, vertraging);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: kleuren.groenDonker,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: verticaal ? 36 : 24,
        paddingTop: zone.boven,
        paddingBottom: zone.onder,
        paddingLeft: zone.links,
        paddingRight: zone.rechts,
        fontFamily: fonts.nunito,
        color: kleuren.wit,
        textAlign: "center",
      }}
    >
      <Img
        src={logo.witZonderSlogan}
        style={{
          width: logoBreedte,
          height: logoBreedte / logo.verhouding.zonderSlogan,
          ...opkomst(s(0), 16),
          scale: interpolate(s(0), [0, 1], [0.94, 1]),
        }}
      />
      <div
        style={{
          fontFamily: fonts.caveat,
          fontWeight: 700,
          fontSize: verticaal ? 104 : 96,
          lineHeight: 1,
          color: kleuren.groenLimoen,
          marginTop: verticaal ? -8 : -12,
          ...opkomst(s(8)),
        }}
      >
        {bedrijf.slogan}
      </div>
      <div
        style={{
          fontWeight: 700,
          fontSize: verticaal ? 44 : 38,
          lineHeight: 1.35,
          marginTop: verticaal ? 28 : 12,
          ...opkomst(s(16)),
        }}
      >
        {bedrijf.naam}
        <br />
        {bedrijf.adres}
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
          backgroundColor: kleuren.groenLimoen,
          color: kleuren.groenDonker,
          fontWeight: 800,
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
