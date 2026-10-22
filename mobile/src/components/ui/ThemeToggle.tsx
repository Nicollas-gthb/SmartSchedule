import { Pressable, PressableProps } from "react-native";
import { useColorScheme } from "nativewind";
import { Moon, Sun } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeColors } from "@/hooks/useThemeColors";

export function ThemeToggle({ className = "", ...rest }: PressableProps & { className?: string }) {
    const { colorScheme, setColorScheme } = useColorScheme();
    const { foreground } = useThemeColors();
    const isDark = colorScheme === "dark";
    const Icon = isDark ? Sun : Moon;

    function toggle() {
        const next = isDark ? "light" : "dark";
        setColorScheme(next);
        AsyncStorage.setItem("theme", next);
    }

    return (
        <Pressable
            onPress={toggle}
            hitSlop={8}
            className={`h-10 w-10 items-center justify-center rounded-full border border-border bg-surface active:opacity-70 ${className}`}
            {...rest}
        >
            <Icon size={20} color={foreground} />
        </Pressable>
    );
}