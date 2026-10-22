import { TextInput, TextInputProps, View } from "react-native";
import { Search } from "lucide-react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export function SearchInput(props: TextInputProps) {
  const { muted } = useThemeColors();

  return (
    <View className="mb-4 h-12 flex-row items-center rounded-xl border border-border bg-surface px-3">
      <Search size={18} color={muted} />
      <TextInput
        className="ml-2 flex-1 text-base text-foreground"
        placeholderTextColor={muted}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}
