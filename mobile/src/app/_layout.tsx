import "../../global.css";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeToggle } from "@/components/ui";
import { themes } from "@/theme";

export default function RootLayout() {
    const { colorScheme, setColorScheme } = useColorScheme();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        AsyncStorage.getItem("theme").then((saved) => {
            if (saved === "light" || saved === "dark") setColorScheme(saved);
        });
    }, []);

    return (
        <View style={themes[colorScheme ?? "light"]} className="flex-1">
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Stack screenOptions={{ headerShown: false }} />

            {/* TEMPORÁRIO: só para testar paletas */}
            <ThemeToggle className="absolute right-4" style={{ top: insets.top + 8 }} />
        </View>
    );
}