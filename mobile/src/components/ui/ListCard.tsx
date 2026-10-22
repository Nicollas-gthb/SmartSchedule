import { Pressable, Text, View } from "react-native";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  icon: LucideIcon;
  title: string;
  description?: string;
  onPress?: () => void;
};

// Linha de lista com ícone, textos e seta (ex.: lista de serviços, agências)
export function ListCard({ icon: Icon, title, description, onPress }: Props) {
  const { primary, muted } = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      className="mb-3 flex-row items-center rounded-2xl border border-border bg-surface p-4 active:opacity-70"
    >
      <View className="mr-4">
        <Icon size={28} color={primary} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{title}</Text>
        {description ? <Text className="mt-0.5 text-xs text-muted">{description}</Text> : null}
      </View>
      <ChevronRight size={20} color={muted} />
    </Pressable>
  );
}
