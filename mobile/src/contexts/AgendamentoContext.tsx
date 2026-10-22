import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import type { Agendamento } from "@/types";
import { addDays, todayISO } from "@/utils/date";

type Draft = {
  servicoId?: string;
  data?: string;
  horario?: string;
  agenciaId: string;
};

type AgendamentoCtx = {
  draft: Draft;
  agendamentos: Agendamento[];
  ultimo?: Agendamento;
  selecionarServico: (id: string) => void;
  selecionarDataHora: (data: string, horario: string) => void;
  confirmar: () => Agendamento | null;
  cancelar: (id: string) => void;
};

const AgendamentoContext = createContext<AgendamentoCtx | null>(null);

const AGENCIA_PADRAO = "centro";

function seed(): Agendamento[] {
  const hoje = todayISO();
  return [
    { id: "s1", servicoId: "conta", agenciaId: "centro", data: addDays(hoje, 1), horario: "10:00", status: "confirmado" },
    { id: "s2", servicoId: "emprestimos", agenciaId: "taguatinga", data: addDays(hoje, 6), horario: "14:00", status: "confirmado" },
    { id: "s3", servicoId: "investimentos", agenciaId: "centro", data: addDays(hoje, -10), horario: "09:00", status: "concluido" },
  ];
}

export function AgendamentoProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Draft>({ agenciaId: AGENCIA_PADRAO });
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(seed);
  const [ultimo, setUltimo] = useState<Agendamento>();

  // Escolher o serviço = começar um agendamento novo (limpa data/horário antigos)
  const selecionarServico = useCallback((id: string) => {
    setDraft((d) => ({ agenciaId: d.agenciaId, servicoId: id }));
  }, []);

  const selecionarDataHora = useCallback((data: string, horario: string) => {
    setDraft((d) => ({ ...d, data, horario }));
  }, []);

  const confirmar = useCallback(() => {
    if (!draft.servicoId || !draft.data || !draft.horario) return null;
    const novo: Agendamento = {
      id: String(Date.now()),
      servicoId: draft.servicoId,
      agenciaId: draft.agenciaId,
      data: draft.data,
      horario: draft.horario,
      status: "confirmado",
    };
    setAgendamentos((list) => [novo, ...list]);
    setUltimo(novo);
    return novo;
  }, [draft]);

  const cancelar = useCallback((id: string) => {
    setAgendamentos((list) =>
      list.map((a) => (a.id === id ? { ...a, status: "cancelado" } : a))
    );
  }, []);

  const value = useMemo(
    () => ({ draft, agendamentos, ultimo, selecionarServico, selecionarDataHora, confirmar, cancelar }),
    [draft, agendamentos, ultimo, selecionarServico, selecionarDataHora, confirmar, cancelar]
  );

  return <AgendamentoContext.Provider value={value}>{children}</AgendamentoContext.Provider>;
}

export function useAgendamento() {
  const ctx = useContext(AgendamentoContext);
  if (!ctx) throw new Error("useAgendamento deve ser usado dentro de <AgendamentoProvider>");
  return ctx;
}
