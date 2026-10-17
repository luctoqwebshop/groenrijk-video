import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  Series,
  staticFile,
  useVideoConfig,
} from "remotion";
import { kleuren, sfx, sfxVolume, useFormaat } from "../brand";
import { Captions } from "../components/Captions";
import { Hook } from "../components/Hook";
import { Intro } from "../components/Intro";
import { LangzameZoom } from "../components/LangzameZoom";
import { Outro } from "../components/Outro";
import { ProductLabel } from "../components/ProductLabel";
import { StapLabel } from "../components/StapLabel";
import { TipBadge } from "../components/TipBadge";
import { Watermerk } from "../components/Watermerk";
import { maakTijdlijn, OVERGANG } from "./tijdlijn";
import type { Overlay, VideoConfig } from "./types";

export type GroenRijkVideoProps = {
  readonly config: VideoConfig;
};

const MUZIEK_VOLUME = 0.13;
const MUZIEK_ONDER_SPRAAK = 0.055;
const DUCK_FRAMES = 8;

const OverlayElement: React.FC<{ readonly overlay: Overlay }> = ({ overlay }) => {
  switch (overlay.soort) {
    case "stap":
      return <StapLabel nummer={overlay.nummer} tekst={overlay.tekst} />;
    case "tip":
      return <TipBadge accent={overlay.accent} tekst={overlay.tekst} />;
    case "product":
      return <ProductLabel naam={overlay.naam} prijs={overlay.prijs} />;
  }
};

const overlayGeluid = (overlay: Overlay, kerst: boolean) => {
  switch (overlay.soort) {
    case "stap":
      return { src: sfx.pop, volume: sfxVolume.pop };
    case "tip":
      return kerst
        ? { src: sfx.belletjes, volume: sfxVolume.belletjes }
        : { src: sfx.ding, volume: sfxVolume.ding };
    case "product":
      return { src: sfx.tik, volume: sfxVolume.tik };
  }
};

const Inhoud: React.FC<{ readonly config: VideoConfig }> = ({ config }) => {
  const { fps } = useVideoConfig();
  const { formaat } = useFormaat();
  const tijdlijn = maakTijdlijn(config, fps);

  return (
    <AbsoluteFill style={{ backgroundColor: kleuren.groenDonker }}>
      <Series>
        {tijdlijn.fragmenten.map((f, i) => (
          <Series.Sequence key={i} name={`Fragment ${i + 1}`} durationInFrames={f.frames}>
            <LangzameZoom focus={config.focus[formaat]}>
              <OffthreadVideo
                src={staticFile(config.bron)}
                trimBefore={Math.round(f.van * fps)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: config.focus[formaat],
                }}
              />
            </LangzameZoom>
            <Captions captions={config.captions} bronStartMs={f.van * 1000} />
          </Series.Sequence>
        ))}
      </Series>
      {config.overlays.map((o, i) => {
        const start = tijdlijn.bronNaarInhoud(o.bronSeconde);
        if (start === null) {
          return null;
        }
        return (
          <Sequence key={i} name={`Overlay ${o.soort}`} from={start} durationInFrames={Math.round(o.duur * fps)}>
            <OverlayElement overlay={o} />
          </Sequence>
        );
      })}
      <Watermerk />
    </AbsoluteFill>
  );
};

export const GroenRijkVideo: React.FC<GroenRijkVideoProps> = ({ config }) => {
  const { fps } = useVideoConfig();
  const t = maakTijdlijn(config, fps);
  const overgang = linearTiming({ durationInFrames: OVERGANG });

  const muziekVolume = (frame: number) => {
    // Afstand tot de dichtstbijzijnde gesproken passage, voor een zachte ducking
    let afstand = Infinity;
    for (const s of t.spraak) {
      if (frame >= s.start && frame <= s.eind) {
        afstand = 0;
        break;
      }
      afstand = Math.min(afstand, Math.abs(frame - s.start), Math.abs(frame - s.eind));
    }
    const duck = interpolate(afstand, [0, DUCK_FRAMES], [MUZIEK_ONDER_SPRAAK, MUZIEK_VOLUME], {
      extrapolateRight: "clamp",
    });
    const fade = interpolate(frame, [0, fps, t.totaal - 1.5 * fps, t.totaal], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return duck * fade;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: kleuren.groenDonker }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={t.hook}>
          <Hook tekst={config.hook} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={overgang} />
        <TransitionSeries.Sequence name="Intro" durationInFrames={t.intro}>
          <Intro achtergrond={config.introAchtergrond} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={overgang} />
        <TransitionSeries.Sequence name="Inhoud" durationInFrames={t.inhoud}>
          <Inhoud config={config} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={overgang} />
        <TransitionSeries.Sequence name="Outro" durationInFrames={t.outro}>
          <Outro callToAction={config.outro.callToAction} webshop={config.outro.webshop} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {config.muziek ? (
        <Audio
          name="Muziek"
          src={staticFile(`muziek/${config.muziek.bestand}`)}
          trimBefore={Math.round((config.muziek.startSeconde ?? 0) * fps)}
          volume={muziekVolume}
          loop
        />
      ) : null}

      {config.ambient ? (
        <Sequence name="Ambient" durationInFrames={t.inhoudStart + OVERGANG}>
          <Audio
            src={sfx.ritselen}
            volume={(f) =>
              sfxVolume.ambient *
              interpolate(f, [0, 15, t.inhoudStart - 10, t.inhoudStart + OVERGANG], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            }
          />
        </Sequence>
      ) : null}

      <Sequence name="Groei" from={t.introStart}>
        <Audio src={sfx.groei} volume={sfxVolume.groei} />
      </Sequence>
      <Sequence name="Whoosh inhoud" from={t.inhoudStart - Math.round(OVERGANG / 2)}>
        <Audio src={sfx.whoosh} volume={sfxVolume.whoosh} />
      </Sequence>
      <Sequence name="Whoosh outro" from={t.outroStart - Math.round(OVERGANG / 2)}>
        <Audio src={sfx.whoosh} volume={sfxVolume.whoosh} />
      </Sequence>
      {config.overlays.map((o, i) => {
        const start = t.bronNaarInhoud(o.bronSeconde);
        if (start === null) {
          return null;
        }
        const geluid = overlayGeluid(o, config.kerst ?? false);
        return (
          <Sequence key={i} name={`Geluid ${o.soort}`} from={t.inhoudStart + start}>
            <Audio src={geluid.src} volume={geluid.volume} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
