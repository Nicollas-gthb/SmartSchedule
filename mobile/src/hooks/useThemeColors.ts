import { useColorScheme } from "nativewind";
import { getColor } from "@/theme";

export function useThemeColors() {

    const { colorScheme } = useColorScheme()
    const scheme = colorScheme ?? "light"
    return (
        {
            foreground: getColor(scheme, "foreground"),
            muted: getColor(scheme, "muted"),
            primary: getColor(scheme, "primary"),
            background: getColor(scheme, "background"),
            surface: getColor(scheme, "surface"),
            border: getColor(scheme, "border"),
            danger: getColor(scheme, "danger")
        }
    )
}