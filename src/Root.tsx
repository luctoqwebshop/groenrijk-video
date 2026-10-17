import { CalculateMetadataFunction, Composition, Folder } from "remotion";
import { GroenRijkVideo, type GroenRijkVideoProps } from "./videos/GroenRijkVideo";
import { maakTijdlijn } from "./videos/tijdlijn";
import { twinklePole } from "./videos/twinkle-pole";
import { voorbeeld } from "./videos/voorbeeld";
import { voorbeeldOutlet } from "./videos/voorbeeld-outlet";

const metLengte: CalculateMetadataFunction<GroenRijkVideoProps> = ({ props }) => ({
  durationInFrames: maakTijdlijn(props.config, 30).totaal,
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Voorbeeld-Outlet">
        <Composition
          id="Voorbeeld-Outlet-Verticaal"
          component={GroenRijkVideo}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ config: voorbeeldOutlet }}
          calculateMetadata={metLengte}
        />
        <Composition
          id="Voorbeeld-Outlet-Horizontaal"
          component={GroenRijkVideo}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ config: voorbeeldOutlet }}
          calculateMetadata={metLengte}
        />
      </Folder>
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
