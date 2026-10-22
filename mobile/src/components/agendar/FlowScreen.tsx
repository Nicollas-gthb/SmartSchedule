import { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Stepper } from "./Stepper";

type Props = {
  title?: string;
  step?: number; // 0..3 → mostra o stepper
  hideHeader?: boolean;
  footer?: ReactNode; // área fixa no rodapé (botões)
  children: ReactNode;
};

// Tela de fluxo (sem tab bar): cabeçalho com voltar + título, stepper, conteúdo rolável e rodapé fixo.
export function FlowScreen({ title, step, hideHeader = false, footer, children }: Props) {
  const { foreground } = useThemeColors();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {hideHeader ? null : (
        <View className="flex-row items-center px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            className="h-10 w-10 items-center justify-center"
          >
            <ArrowLeft size={22} color={foreground} />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-semibold text-foreground">{title}</Text>
          <View className="h-10 w-10" />
        </View>
      )}

      <ScrollView
        contentContainerClassName="px-6 pb-6"
        keyboardShouldPersistTaps="handled"
      >
        {step !== undefined ? <Stepper current={step} /> : null}
        {children}
      </ScrollView>

      {footer ? (
        <View className="border-t border-border bg-background px-6 pb-4 pt-3">{footer}</View>
      ) : null}
    </SafeAreaView>
  );
}
