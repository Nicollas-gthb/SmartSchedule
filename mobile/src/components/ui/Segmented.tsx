import { Pressable, Text, View } from "react-native";

type Props<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

export function Segmented<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View className="mb-4 flex-row gap-3">
      {options.map((o) => {
        const ativo = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            className={`h-11 flex-1 items-center justify-center rounded-xl ${ativo ? "bg-primary" : "bg-soft"}`}
          >
            <Text className={`font-semibold ${ativo ? "text-on-primary" : "text-muted"}`}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
