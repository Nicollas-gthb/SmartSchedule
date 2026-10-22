import { Text, View } from "react-native";
import { router } from "expo-router";
import { Button, Card, Screen, ThemeToggle } from "@/components/ui";

export default function Mais() {
  return (
    <Screen>
      <Text className="mb-4 text-2xl font-bold text-foreground">Mais</Text>

      <Card className="mb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-base font-semibold text-foreground">Aparência</Text>
          <Text className="text-xs text-muted">Alternar entre tema claro e escuro</Text>
        </View>
        <ThemeToggle />
      </Card>

      <Button title="Sair" variant="secondary" onPress={() => router.replace("/login")} />
    </Screen>
  );
}
