import { useState } from "react";
import { Text } from "react-native";
import { Screen, Segmented } from "@/components/ui";
import { AgendamentoCard } from "@/components/agendar/AgendamentoCard";
import { useAgendamento } from "@/contexts/AgendamentoContext";
import { confirmDialog } from "@/utils/confirm";
import { todayISO } from "@/utils/date";
import type { Agendamento } from "@/types";

type Aba = "proximos" | "historico";

const chave = (a: Agendamento) => `${a.data} ${a.horario}`;

export default function Agendamentos() {
  const { agendamentos, cancelar } = useAgendamento();
  const [aba, setAba] = useState<Aba>("proximos");
  const hoje = todayISO();

  const ehProximo = (a: Agendamento) => a.status === "confirmado" && a.data >= hoje;
  const proximos = agendamentos.filter(ehProximo).sort((a, b) => chave(a).localeCompare(chave(b)));
  const historico = agendamentos.filter((a) => !ehProximo(a)).sort((a, b) => chave(b).localeCompare(chave(a)));
  const lista = aba === "proximos" ? proximos : historico;

  return (
    <Screen>
      <Text className="mb-4 text-2xl font-bold text-foreground">Meus agendamentos</Text>

      <Segmented
        value={aba}
        onChange={setAba}
        options={[
          { value: "proximos", label: "Próximos" },
          { value: "historico", label: "Histórico" },
        ]}
      />

      {lista.length === 0 ? (
        <Text className="mt-8 text-center text-muted">
          {aba === "proximos" ? "Você não tem atendimentos agendados." : "Nenhum atendimento no histórico."}
        </Text>
      ) : (
        lista.map((a) => (
          <AgendamentoCard
            key={a.id}
            agendamento={a}
            onCancel={
              aba === "proximos"
                ? () =>
                    confirmDialog(
                      "Cancelar agendamento",
                      "Tem certeza que deseja cancelar este atendimento?",
                      () => cancelar(a.id)
                    )
                : undefined
            }
          />
        ))
      )}
    </Screen>
  );
}
