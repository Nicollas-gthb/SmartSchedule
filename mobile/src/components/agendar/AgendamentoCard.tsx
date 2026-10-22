import { Text, View } from "react-native";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react-native";
import { Button, Card, StatusBadge } from "@/components/ui";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getAgencia, getServico } from "@/data/mock";
import type { Agendamento } from "@/types";
import { formatBR } from "@/utils/date";

type Props = {
  agendamento: Agendamento;
  onCancel?: () => void; // se vier, mostra o botão "Cancelar agendamento"
};

export function AgendamentoCard({ agendamento, onCancel }: Props) {
  const { primary, muted } = useThemeColors();
  const servico = getServico(agendamento.servicoId);
  const agencia = getAgencia(agendamento.agenciaId);
  if (!servico) return null;
  const Icon = servico.icone;

  return (
    <Card className="mb-4">
      <View className="mb-3 flex-row items-center justify-between">
        <StatusBadge status={agendamento.status} />
        <ChevronRight size={18} color={muted} />
      </View>

      <View className="mb-3 flex-row items-center">
        <Icon size={24} color={primary} />
        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold text-foreground">{servico.nome}</Text>
          <Text className="text-xs text-muted">{servico.descricao}</Text>
        </View>
      </View>

      <View className="mb-2 flex-row items-center">
        <CalendarDays size={18} color={primary} />
        <Text className="ml-3 text-sm text-foreground">
          {formatBR(agendamento.data)} às {agendamento.horario}
        </Text>
      </View>
      <View className="flex-row items-center">
        <MapPin size={18} color={primary} />
        <Text className="ml-3 flex-1 text-sm text-foreground">{agencia?.nome}</Text>
      </View>

      {onCancel ? (
        <Button title="Cancelar agendamento" variant="soft" className="mt-4" onPress={onCancel} />
      ) : null}
    </Card>
  );
}
