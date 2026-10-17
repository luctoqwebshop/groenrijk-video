import { CalculateMetadataFunction, Composition, Folder } from "remotion";
import { GroenRijkVideo, type GroenRijkVideoProps } from "./videos/GroenRijkVideo";
import { maakTijdlijn } from "./videos/tijdlijn";
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
    </>
  );
};
