import { Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Check, Clock, MapPin } from "lucide-react-native";
import { Button, Card, InfoRow } from "@/components/ui";
import { FlowScreen } from "@/components/agendar/FlowScreen";
import { useAgendamento } from "@/contexts/AgendamentoContext";
import { getAgencia, getServico } from "@/data/mock";
import { formatBR } from "@/utils/date";

export default function Concluido() {
  const { ultimo } = useAgendamento();

  const servico = ultimo ? getServico(ultimo.servicoId) : undefined;
  const agencia = ultimo ? getAgencia(ultimo.agenciaId) : undefined;

  if (!ultimo || !servico) return <Redirect href="/home" />;

  return (
    <FlowScreen
      hideHeader
      footer={
        <>
          <Button title="Ver meus agendamentos" onPress={() => router.replace("/agendamentos")} />
          <Button title="Voltar para o início" variant="secondary" className="mt-3" onPress={() => router.replace("/home")} />
        </>
      }
    >
      <View className="items-center pb-6 pt-10">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-success">
          <Check size={52} color="#FFFFFF" strokeWidth={3} />
        </View>
        <Text className="mt-6 text-center text-3xl font-bold text-foreground">Agendamento realizado!</Text>
        <Text className="mt-3 text-center text-base text-muted">
          Seu atendimento foi confirmado com sucesso. Confira os detalhes abaixo e guarde esta informação.
        </Text>
      </View>

      <Card>
        <InfoRow icon={servico.icone} label="Serviço" title={servico.nome} subtitle={servico.descricao} />
        <InfoRow icon={Clock} label="Data e hora" title={`${formatBR(ultimo.data)} às ${ultimo.horario}`} />
        <InfoRow icon={MapPin} label="Agência" title={agencia?.nome ?? ""} subtitle={agencia?.endereco} last />
      </Card>
    </FlowScreen>
  );
}
