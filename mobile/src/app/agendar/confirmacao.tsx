import { useState } from "react";
import { Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Clock, Info, MapPin } from "lucide-react-native";
import { Button, Card, InfoRow } from "@/components/ui";
import { FlowScreen } from "@/components/agendar/FlowScreen";
import { useAgendamento } from "@/contexts/AgendamentoContext";
import { getAgencia, getServico } from "@/data/mock";
import { useThemeColors } from "@/hooks/useThemeColors";
import { formatLong } from "@/utils/date";

export default function Confirmacao() {
  const { draft, confirmar } = useAgendamento();
  const { primary } = useThemeColors();
  const [salvando, setSalvando] = useState(false);

  const servico = draft.servicoId ? getServico(draft.servicoId) : undefined;
  const agencia = getAgencia(draft.agenciaId);

  if (!servico || !draft.data || !draft.horario) return <Redirect href="/agendar/servico" />;

  async function handleConfirmar() {
    setSalvando(true);
    // TODO: trocar pela chamada real à API (POST /agendamentos)
    await new Promise((r) => setTimeout(r, 800));
    confirmar();
    router.replace("/agendar/concluido");
  }

  return (
    <FlowScreen
      title="Agendar atendimento"
      step={2}
      footer={
        <>
          <Button title="Confirmar agendamento" loading={salvando} onPress={handleConfirmar} />
          <Button title="Voltar" variant="ghost" className="mt-1" disabled={salvando} onPress={() => router.back()} />
        </>
      }
    >
      <Text className="mb-4 text-2xl font-bold text-foreground">Confira seus dados</Text>

      <Card>
        <InfoRow icon={servico.icone} label="Serviço" title={servico.nome} subtitle={servico.descricao} />
        <InfoRow icon={MapPin} label="Agência" title={agencia?.nome ?? ""} subtitle={agencia?.endereco} />
        <InfoRow
          icon={Clock}
          label="Data e hora"
          title={formatLong(draft.data)}
          subtitle={`às ${draft.horario}`}
          last
        />
      </Card>

      <View className="mt-4 flex-row rounded-2xl bg-soft p-4">
        <Info size={20} color={primary} />
        <Text className="ml-3 flex-1 text-sm text-foreground">
          Chegue com 10 minutos de antecedência e leve um documento de identificação com foto.
        </Text>
      </View>
    </FlowScreen>
  );
}
