import { CalculateMetadataFunction, Composition, Folder } from "remotion";
import { GroenRijkVideo, type GroenRijkVideoProps } from "./videos/GroenRijkVideo";
import { maakTijdlijn } from "./videos/tijdlijn";
import { twinklePole } from "./videos/twinkle-pole";
import { voorbeeld } from "./videos/voorbeeld";

const metLengte: CalculateMetadataFunction<GroenRijkVideoProps> = ({ props }) => ({
  durationInFrames: maakTijdlijn(props.config, 30).totaal,
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Voorbeeld">
        <Composition
          id="Voorbeeld-Verticaal"
          component={GroenRijkVideo}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ config: voorbeeld }}
          calculateMetadata={metLengte}
        />
        <Composition
          id="Voorbeeld-Horizontaal"
          component={GroenRijkVideo}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ config: voorbeeld }}
          calculateMetadata={metLengte}
        />
      </Folder>
      <Folder name="TwinklePole">
        <Composition
          id="twinkle-pole-Verticaal"
          component={GroenRijkVideo}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ config: twinklePole }}
          calculateMetadata={metLengte}
        />
        <Composition
          id="twinkle-pole-Horizontaal"
          component={GroenRijkVideo}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ config: twinklePole }}
          calculateMetadata={metLengte}
        />
      </Folder>
    </>
  );
};
