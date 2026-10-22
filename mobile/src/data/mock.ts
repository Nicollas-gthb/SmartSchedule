import {
  CreditCard,
  HandCoins,
  ShieldCheck,
  TrendingUp,
  UserPlus,
} from "lucide-react-native";
import type { Agencia, Servico } from "@/types";

// DADOS MOCKADOS — trocar por chamadas à API depois.

export const usuario = { nome: "Nicollas" };

export const servicos: Servico[] = [
  { id: "abrir-conta", nome: "Abrir conta", descricao: "Para você que ainda não é cliente.", icone: UserPlus },
  { id: "conta", nome: "Atendimento na conta", descricao: "2ª via de cartão, saldo, extrato e mais.", icone: CreditCard },
  { id: "emprestimos", nome: "Empréstimos e financiamentos", descricao: "Consulte e contrate seu crédito.", icone: HandCoins },
  { id: "investimentos", nome: "Investimentos", descricao: "Tire suas dúvidas e faça novos aportes.", icone: TrendingUp },
  { id: "seguros", nome: "Seguro e previdência", descricao: "Proteja o seu futuro.", icone: ShieldCheck },
];

export const agencias: Agencia[] = [
  { id: "centro", nome: "Agência Centro - Brasília/DF", endereco: "SCN Quadra 2 Bloco B - Asa Norte" },
  { id: "taguatinga", nome: "Agência Taguatinga - Brasília/DF", endereco: "QNA 10 Lote 5 - Taguatinga Norte" },
];

export const horarios = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export const getServico = (id: string) => servicos.find((s) => s.id === id);
export const getAgencia = (id: string) => agencias.find((a) => a.id === id);
