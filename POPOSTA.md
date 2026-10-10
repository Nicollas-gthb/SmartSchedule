# Proposta de Projeto — Janaína
### Agendamento Inteligente de Atendimento Bancário
**Disciplina:** Residência Porto Digital 2026.2 · **Cliente:** Banco do Brasil

---

## 1. Visão Geral

A Janaína é uma solução de agendamento inteligente de atendimento bancário presencial. O cliente escolhe a agência e o horário mais convenientes; após a confirmação, o sistema apresenta — de forma opcional e não intrusiva — alternativas de autoatendimento digital para a demanda solicitada e, quando o atendimento presencial é realmente necessário, orienta previamente sobre a documentação exigida.

O nome faz referência à música "Janaína", da banda Biquini Cavadão, que retrata o cotidiano de alguém consumido por filas, burocracias e esperas desnecessárias — exatamente o problema que a solução ataca.

### Natureza do projeto
Este é um **projeto acadêmico de demonstração**, desenvolvido para a disciplina de Residência Porto Digital (set–dez 2026). Não haverá conexão com dados reais de clientes ou sistemas do Banco do Brasil — toda a base de dados (agências, horários, usuários) será simulada. O objetivo é ilustrar a abordagem e validar o conceito; uma eventual implementação real partiria de um novo projeto, não da continuidade deste código.

---

## 2. Objetivos

**Para o cliente**
- Reduzir tempo de espera em filas
- Dar previsibilidade e comodidade ao atendimento
- Facilitar a busca pela agência mais próxima/conveniente
- Oferecer, quando cabível, resolução imediata via autoatendimento
- Orientar previamente sobre documentos necessários

**Para o banco**
- Melhor distribuição de demanda entre agências
- Redução de filas e picos de atendimento
- Aumento do uso de canais digitais
- Maior eficiência operacional
- Melhoria na satisfação do cliente

---

## 3. Escopo do MVP

### Dentro do escopo
1. Busca de agência por geolocalização do dispositivo ou endereço informado, com resultados ordenados por proximidade e disponibilidade de horário
2. Agendamento de atendimento presencial (escolha de agência + horário)
3. Fluxo de **cancelamento e reagendamento**, mantendo o cliente no controle da decisão
4. Tela pós-agendamento sugerindo alternativa de autoatendimento (via motor de regras simples, sem IA nesta fase)
5. Exibição da lista de documentos necessários quando o atendimento presencial for confirmado como necessário
6. Interface administrativa para **agentes bancários**, incluindo:
   - Cadastro/edição da lista de documentos exigidos por tipo de operação
   - Gestão de agências e horários disponíveis (dados mockados)
7. Notificações (lembrete de agendamento, confirmação, cancelamento)

### Fora do escopo (por ora)
- Integração com sistemas reais do Banco do Brasil ou dados reais de clientes
- Agente de IA para sugestão de autoatendimento — **planejado para uma fase futura**, uma vez que o projeto já esteja funcional com o motor de regras
- Autenticação real (SSO/login do BB) — será usado um esquema de autenticação simulado (JWT com papéis `cliente` e `atendente`)
- Roteamento/navegação até a agência (apenas distância estimada)

---

## 4. Personas e Fluxos

### Persona 1 — Cliente
**Fluxo principal:**
1. Abre o app → permite geolocalização ou digita um endereço
2. Visualiza lista de agências ordenadas por proximidade e horários disponíveis
3. Escolhe agência, serviço desejado e horário
4. Confirma o agendamento
5. **Após a confirmação**, o sistema apresenta (se aplicável) uma alternativa de autoatendimento para aquele serviço — o cliente decide livremente entre manter o agendamento ou resolver digitalmente
6. Se o atendimento presencial for mantido/necessário, o sistema exibe a lista de documentos exigidos
7. Cliente recebe notificações de lembrete e confirmação
8. Cliente pode **cancelar ou reagendar** a qualquer momento antes do horário marcado

**Por que a sugestão só aparece depois da confirmação:** evita a sensação de que o banco está tentando afastar o cliente do atendimento humano. O cliente permanece no controle.

### Persona 2 — Agente/Atendente bancário
**Fluxo principal:**
1. Acessa o painel administrativo (web)
2. Cadastra ou edita a lista de documentos exigidos por tipo de operação
3. Gerencia agências e grades de horário disponíveis (dados simulados)
4. Acompanha volume de agendamentos por agência (visão gerencial simples, se houver tempo no cronograma)

---

## 5. Modelagem de Dados (entidades principais)

| Entidade | Principais atributos | Relacionamentos |
|---|---|---|
| `Usuario` | id, nome, papel (cliente/atendente), credenciais | 1—N com `Agendamento` |
| `Agencia` | id, nome, latitude, longitude, endereço | 1—N com `HorarioDisponivel` |
| `HorarioDisponivel` | id, agencia_id, data/hora, status (livre/ocupado) | N—1 com `Agencia`; 1—1 com `Agendamento` |
| `TipoServico` | id, nome, requer_presencial (bool) | 1—N com `DocumentoRequisito`; 1—1 com `AlternativaAutoatendimento` |
| `Agendamento` | id, usuario_id, agencia_id, horario_id, tipo_servico_id, status (agendado/cancelado/concluído) | referencia `Usuario`, `Agencia`, `HorarioDisponivel`, `TipoServico` |
| `DocumentoRequisito` | id, tipo_servico_id, descrição | N—1 com `TipoServico` |
| `AlternativaAutoatendimento` | id, tipo_servico_id, descrição, link/instrução | 1—1 com `TipoServico` |

> Este modelo já isola a lógica de "sugestão de autoatendimento" em uma entidade própria (`AlternativaAutoatendimento`), o que facilita a futura substituição do motor de regras por um agente de IA sem alterar o restante do sistema.

---

## 6. Arquitetura Técnica

```
┌───────────────────────┐        ┌────────────────────────┐
│   App Cliente         │        │  Painel do Atendente   │
│   (React Native/Expo) │        │  (React / Next.js)     │
└──────────┬────────────┘        └────────────┬───────────┘
           │                                  │
           │            HTTPS / REST          │
           └─────────────────┬────────────────┘
                             │
                   ┌─────────▼─────────────┐
                   │   API Backend         │
                   │  (Node.js/Express)    │
                   │  - Auth (JWT)         │
                   │  - SuggestionService  │  ← ponto de extensão futuro p/ IA
                   │  - Regras de negócio  │
                   └─────────┬─────────────┘
                             │
                   ┌─────────▼─────────────┐
                   │   PostgreSQL          │
                   │   (via Prisma ORM)    │
                   └───────────────────────┘
                             │
                   ┌─────────▼─────────────┐
                   │  Serviços externos    │
                   │  - Google Maps API    │
                   │  - Push Notifications │
                   └───────────────────────┘
```

O `SuggestionService` é desenhado como um módulo isolado por trás de uma interface única. Hoje ele consulta a tabela `AlternativaAutoatendimento` (regra fixa); no futuro, pode ser substituído por uma chamada a um agente de IA sem exigir mudanças no restante da aplicação.

---

## 7. Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| App do cliente | React Native (Expo) | Um único código para Android/iOS; setup rápido; notificações nativas via `expo-notifications` |
| Geolocalização/Mapas | Google Maps API (`react-native-maps` + Geocoding API) | Cota gratuita mensal por SKU cobre tranquilamente o volume de um projeto acadêmico de curta duração; decisão final da estratégia (Google Maps vs. alternativa aberta) ainda em avaliação pelo squad |
| Painel do atendente | React (Vite) ou Next.js | Reaproveita conhecimento de front-end da equipe; consome a mesma API |
| Backend | Node.js + Express | Prototipação rápida; larga adoção; fácil de documentar |
| Banco de dados | PostgreSQL + Prisma ORM | Schema tipado, migrations simples, boa curva de aprendizado |
| Autenticação | JWT com papéis (`cliente` / `atendente`) | Sem necessidade de integração real com o BB |
| Notificações | Expo Notifications / Firebase Cloud Messaging | Cobre lembrete, confirmação e cancelamento de agendamento |
| Motor de sugestão | Tabela de regras própria (`AlternativaAutoatendimento`) | Ponto de extensão para IA futura, sem acoplar o MVP a isso agora |

---

## 8. Estratégia de Dados Simulados

Como o projeto não terá acesso a dados reais do Banco do Brasil, será necessário construir uma base mockada consistente:
- **Agências:** conjunto fixo de agências fictícias com coordenadas reais de cidades (para geolocalização funcionar de forma verossímil)
- **Horários:** grade de disponibilidade gerada por regra (ex: horário comercial, intervalos de 30 min, alguns já ocupados para simular concorrência)
- **Tipos de serviço e documentos:** lista curada manualmente pelo squad, cadastrável/editável via painel do atendente
- **Usuários:** contas de teste criadas para demonstração, sem qualquer dado real de cliente

---

## 9. Sobre o Agente de IA (fase futura)

A integração de um agente de IA para sugestão de autoatendimento **não faz parte do MVP** e será definida em uma etapa posterior, após o sistema estar funcional com o motor de regras. A arquitetura (item 6) já prevê esse ponto de extensão via `SuggestionService`.

---

## 10. Riscos e Limitações

- **Vida útil curta do projeto** (set–dez 2026): escopo deve permanecer enxuto; qualquer feature fora do MVP é risco de não entregar
- **Dados 100% simulados**: uma futura implementação real exigiria um projeto novo, com integração real aos sistemas do banco
- **Sem integração de autenticação real**: login simulado não deve ser confundido com solução de produção
- **Dependência de API externa (Google Maps)**: ainda que dentro da cota gratuita, requer conta de billing configurada — mitigar com alertas de orçamento em $0

---

## 11. Roadmap Sugerido (a ajustar ao calendário da disciplina)

| Fase | Entregas |
|---|---|
| Sprint 1 | Modelagem de dados, wireframes, setup dos projetos (app, painel, API) |
| Sprint 2 | Fluxo de busca de agência + agendamento (API + app) |
| Sprint 3 | Painel do atendente (documentos, agências, horários) |
| Sprint 4 | Sugestão de autoatendimento + fluxo de cancelamento/reagendamento |
| Sprint 5 | Notificações + polimento de UI |
| Sprint 6 | Testes, ajustes finais, preparação da apresentação |

---

*Documento vivo — atualizar conforme decisões do squad avançarem (ex: definição final da API de geolocalização, escopo do painel administrativo).*
