import { spring } from "remotion";

// Zachte spring zonder doorschieten, voor alle in-animaties
export const zachteSpring = (frame: number, fps: number, vertraging = 0) =>
  spring({
    frame: frame - vertraging,
    fps,
    config: { damping: 200, mass: 0.8 },
  });

// Iets speelsere spring met een klein beetje veer, voor het logo-icoon
export const groeiSpring = (frame: number, fps: number, vertraging = 0) =>
  spring({
    frame: frame - vertraging,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
