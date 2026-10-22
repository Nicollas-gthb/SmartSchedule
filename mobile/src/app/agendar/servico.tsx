import { useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import { ListCard, SearchInput } from "@/components/ui";
import { FlowScreen } from "@/components/agendar/FlowScreen";
import { useAgendamento } from "@/contexts/AgendamentoContext";
import { servicos } from "@/data/mock";

export default function EscolherServico() {
  const [busca, setBusca] = useState("");
  const { selecionarServico } = useAgendamento();

  const termo = busca.trim().toLowerCase();
  const lista = servicos.filter((s) => s.nome.toLowerCase().includes(termo));

  return (
    <FlowScreen title="Agendar atendimento" step={0}>
      <Text className="mb-4 text-2xl font-bold text-foreground">Qual serviço você precisa?</Text>

      <SearchInput placeholder="Buscar serviço..." value={busca} onChangeText={setBusca} />

      {lista.map((s) => (
        <ListCard
          key={s.id}
          icon={s.icone}
          title={s.nome}
          description={s.descricao}
          onPress={() => {
            selecionarServico(s.id);
            router.push("/agendar/data-hora");
          }}
        />
      ))}

      {lista.length === 0 ? (
        <Text className="mt-6 text-center text-muted">Nenhum serviço encontrado. Tente outro termo.</Text>
      ) : null}
    </FlowScreen>
  );
}
