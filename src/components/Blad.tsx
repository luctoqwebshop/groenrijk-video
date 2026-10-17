import { kleuren } from "../brand";

// Het blad uit het logo, vereenvoudigd als SVG. Voor bullets en stapiconen.
export const Blad: React.FC<{
  readonly grootte: number;
  readonly kleur?: string;
  readonly style?: React.CSSProperties;
}> = ({ grootte, kleur = kleuren.groenLimoen, style }) => (
  <svg width={grootte} height={grootte} viewBox="0 0 100 100" style={style}>
    <path
      d="M50 92 C 46 66, 30 44, 6 34 C 34 32, 52 52, 56 76 C 62 46, 78 26, 96 18 C 82 40, 66 62, 60 92 Z"
      fill={kleur}
    />
  </svg>
);
