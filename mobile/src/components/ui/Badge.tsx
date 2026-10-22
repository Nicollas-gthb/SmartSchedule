import { Text, View } from "react-native";
import type { StatusAgendamento } from "@/types";

const styles: Record<StatusAgendamento, { box: string; text: string; label: string }> = {
  confirmado: { box: "bg-soft", text: "text-primary", label: "Confirmado" },
  concluido: { box: "bg-success/15", text: "text-success", label: "Concluído" },
  cancelado: { box: "bg-danger/15", text: "text-danger", label: "Cancelado" },
};

export function StatusBadge({ status }: { status: StatusAgendamento }) {
  const s = styles[status];
  return (
    <View className={`self-start rounded-full px-3 py-1 ${s.box}`}>
      <Text className={`text-xs font-semibold ${s.text}`}>{s.label}</Text>
    </View>
  );
}
