import { useColorScheme } from "nativewind";
import { getColor, palette, type Token } from "@/theme";

// Retorna TODAS as cores do tema atual em formato rgb(...), p/ ícones e props de cor.
export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";

  return Object.fromEntries(
    (Object.keys(palette[scheme]) as Token[]).map((k) => [k, getColor(scheme, k)])
  ) as Record<Token, string>;
}
