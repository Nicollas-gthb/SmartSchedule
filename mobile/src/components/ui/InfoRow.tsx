import { ReactNode } from "react";
import { Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  icon: LucideIcon;
  label: string; // "Serviço", "Agência", "Data e hora"
  title: string;
  subtitle?: string;
  last?: boolean; // última linha do card: sem divisória
  children?: ReactNode; // ação extra (ex.: "Ver no mapa")
};

export function InfoRow({ icon: Icon, label, title, subtitle, last = false, children }: Props) {
  const { primary } = useThemeColors();

  return (
    <View className={`flex-row ${last ? "" : "mb-4 border-b border-border pb-4"}`}>
      <View className="mr-4 pt-1">
        <Icon size={26} color={primary} />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-muted">{label}</Text>
        <Text className="mt-0.5 text-base font-semibold text-foreground">{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-xs text-muted">{subtitle}</Text> : null}
        {children}
      </View>
    </View>
  );
}
