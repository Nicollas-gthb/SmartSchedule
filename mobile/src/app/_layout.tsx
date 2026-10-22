import "../../global.css";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AgendamentoProvider } from "@/contexts/AgendamentoContext";
import { themes } from "@/theme";

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem("theme").then((saved) => {
      if (saved === "light" || saved === "dark") setColorScheme(saved);
    });
  }, []);

  return (
    <AgendamentoProvider>
      <View style={themes[colorScheme ?? "light"]} className="flex-1">
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </AgendamentoProvider>
  );
}
