import { Img, interpolate, useCurrentFrame } from "remotion";
import { logo, useFormaat } from "../brand";

// Klein logo rechtsboven over het videobeeld, binnen de veilige zone
export const Watermerk: React.FC = () => {
  const frame = useCurrentFrame();
  const { verticaal, zone } = useFormaat();
  const breedte = verticaal ? 260 : 240;

  return (
    <Img
      src={logo.witZonderSlogan}
      style={{
        position: "absolute",
        top: zone.boven,
        right: zone.rechts,
        width: breedte,
        height: breedte / logo.verhouding.zonderSlogan,
        opacity: interpolate(frame, [0, 15], [0, 0.7], {
          extrapolateRight: "clamp",
        }),
        filter: "drop-shadow(0 2px 6px rgba(31, 42, 34, 0.5))",
      }}
    />
  );
};
