import { Tabs } from "expo-router";
import { CalendarDays, House, MapPin, Menu } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function TabsLayout() {
  const c = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.muted,
        tabBarStyle: { backgroundColor: c.surface, borderTopColor: c.border },
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Início", tabBarIcon: ({ color, size }) => <House color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="agendamentos"
        options={{ title: "Agendamentos", tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="agencias"
        options={{ title: "Agências", tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="mais"
        options={{ title: "Mais", tabBarIcon: ({ color, size }) => <Menu color={color} size={size} /> }}
      />
    </Tabs>
  );
}
