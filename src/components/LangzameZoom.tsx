import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Zoomt heel langzaam van 1,0 naar 1,08 over de duur van de sequence
export const LangzameZoom: React.FC<{
  readonly children: React.ReactNode;
  // Punt waar naartoe gezoomd wordt, bijvoorbeeld "50% 35%" voor een gezicht
  readonly focus?: string;
}> = ({ children, focus = "50% 50%" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        transformOrigin: focus,
        scale: interpolate(frame, [0, durationInFrames], [1, 1.08], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
