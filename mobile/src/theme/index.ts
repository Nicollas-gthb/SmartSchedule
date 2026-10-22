import { vars } from "nativewind";

// Canais RGB separados por espaço (formato exigido pelo Tailwind p/ opacidade).
// Tokens novos: soft, success, brand, accent, onAccent.
export const palette = {
  light: {
    background: "246 248 252",
    surface: "255 255 255",
    border: "219 227 243",
    foreground: "13 31 84",
    muted: "100 112 140",
    primary: "0 56 168",
    onPrimary: "255 255 255",
    soft: "232 240 255",
    success: "34 170 90",
    danger: "220 38 38",
    brand: "0 56 168",
    accent: "252 252 48",
    onAccent: "13 31 84",
  },
  dark: {
    background: "10 16 38",
    surface: "20 29 58",
    border: "42 56 98",
    foreground: "237 242 255",
    muted: "146 160 196",
    primary: "104 148 255",
    onPrimary: "10 16 38",
    soft: "26 40 88",
    success: "74 210 130",
    danger: "248 113 113",
    brand: "0 56 168",
    accent: "252 252 48",
    onAccent: "13 31 84",
  },
} as const;

export type Scheme = keyof typeof palette;
export type Token = keyof typeof palette.light;

function toVars(colors: Record<string, string>) {
  return vars(
    Object.fromEntries(Object.entries(colors).map(([k, v]) => [`--${k}`, v]))
  );
}

export const themes = {
  light: toVars(palette.light),
  dark: toVars(palette.dark),
};

// Para ícones e placeholderTextColor (precisam de cor em JS)
export function getColor(scheme: Scheme, name: Token) {
  return `rgb(${palette[scheme][name].split(" ").join(",")})`;
}
