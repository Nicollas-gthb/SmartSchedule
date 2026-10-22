import { Pressable, Text, View } from "react-native";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  onPress?: () => void;
};

// Card de atalho para grade 2 colunas (w-[48%] + justify-between no pai)
export function ShortcutCard({ icon: Icon, title, description, onPress }: Props) {
  const { primary, muted } = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 min-h-[150px] w-[48%] rounded-2xl border border-border bg-surface p-4 active:opacity-70"
    >
      <View className="flex-row items-start justify-between">
        <Icon size={28} color={primary} />
        <ChevronRight size={18} color={muted} />
      </View>
      <Text className="mt-3 text-base font-semibold text-foreground">{title}</Text>
      <Text className="mt-1 text-xs text-muted">{description}</Text>
    </Pressable>
  );
}
