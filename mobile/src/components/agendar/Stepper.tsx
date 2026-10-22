import { Text, View } from "react-native";

const STEPS = ["Serviço", "Data e hora", "Confirmação", "Concluído"];

// current: 0..3
export function Stepper({ current }: { current: number }) {
  return (
    <View className="mb-6 mt-2 flex-row">
      {STEPS.map((label, i) => {
        const reached = i <= current;
        const isCurrent = i === current;
        const leftFilled = i > 0 && i <= current;
        const rightFilled = i < STEPS.length - 1 && i < current;

        return (
          <View key={label} className="flex-1 items-center">
            <View className="w-full flex-row items-center">
              <View className={`h-0.5 flex-1 ${i === 0 ? "bg-transparent" : leftFilled ? "bg-primary" : "bg-border"}`} />
              <View
                className={`h-7 w-7 items-center justify-center rounded-full border ${
                  reached ? "border-primary bg-primary" : "border-border bg-surface"
                }`}
              >
                <Text className={`text-xs font-semibold ${reached ? "text-on-primary" : "text-muted"}`}>
                  {i + 1}
                </Text>
              </View>
              <View
                className={`h-0.5 flex-1 ${
                  i === STEPS.length - 1 ? "bg-transparent" : rightFilled ? "bg-primary" : "bg-border"
                }`}
              />
            </View>
            <Text className={`mt-1 text-xs ${isCurrent ? "font-semibold text-primary" : "text-muted"}`}>
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
