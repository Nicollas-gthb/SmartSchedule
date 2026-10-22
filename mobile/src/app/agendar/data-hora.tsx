import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Button } from "@/components/ui";
import { Calendar } from "@/components/agendar/Calendar";
import { FlowScreen } from "@/components/agendar/FlowScreen";
import { useAgendamento } from "@/contexts/AgendamentoContext";
import { horarios } from "@/data/mock";
import { formatBR } from "@/utils/date";

export default function DataHora() {
  const { draft, selecionarDataHora } = useAgendamento();
  const [data, setData] = useState<string | undefined>(draft.data);
  const [horario, setHorario] = useState<string | undefined>(draft.horario);

  // Acesso direto sem escolher serviço → volta para o início do fluxo
  if (!draft.servicoId) return <Redirect href="/agendar/servico" />;

  function continuar() {
    if (!data || !horario) return;
    selecionarDataHora(data, horario);
    router.push("/agendar/confirmacao");
  }

  return (
    <FlowScreen
      title="Agendar atendimento"
      step={1}
      footer={<Button title="Continuar" disabled={!data || !horario} onPress={continuar} />}
    >
      <Text className="mb-4 text-2xl font-bold text-foreground">Escolha a data e o horário</Text>

      <Calendar
        value={data}
        onChange={(iso) => {
          setData(iso);
          setHorario(undefined);
        }}
      />

      <Text className="mb-3 mt-6 text-sm font-semibold text-foreground">
        {data ? `Horários disponíveis (${formatBR(data)})` : "Selecione uma data para ver os horários"}
      </Text>

      {data ? (
        <View className="flex-row flex-wrap justify-between">
          {horarios.map((h) => {
            const ativo = h === horario;
            return (
              <Pressable
                key={h}
                onPress={() => setHorario(h)}
                className={`mb-3 h-11 w-[31%] items-center justify-center rounded-xl border ${
                  ativo ? "border-primary bg-primary" : "border-border bg-surface"
                }`}
              >
                <Text className={`font-medium ${ativo ? "text-on-primary" : "text-primary"}`}>{h}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </FlowScreen>
  );
}
