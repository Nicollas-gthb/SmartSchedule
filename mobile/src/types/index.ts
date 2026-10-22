import type { LucideIcon } from "lucide-react-native";

export type Servico = {
  id: string;
  nome: string;
  descricao: string;
  icone: LucideIcon; // quando vier da API, mapear por id/nome
};

export type Agencia = {
  id: string;
  nome: string;
  endereco: string;
};

export type StatusAgendamento = "confirmado" | "cancelado" | "concluido";

export type Agendamento = {
  id: string;
  servicoId: string;
  agenciaId: string;
  data: string; // ISO "YYYY-MM-DD"
  horario: string; // "HH:mm"
  status: StatusAgendamento;
};
