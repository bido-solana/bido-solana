export const terminal = {
  "pt-BR": {
    title: "Veja como você entra na decisão",
    description: "Em vez de um banner ignorado, seu contexto entra no reasoning do agente no momento exato da decisão.",
    windowTitle: "bido - reasoning ao vivo",
    promptLabel: "usuário",
    thinkingLabel: "ia",
    promptText: "Qual a melhor opção de voo GRU para JFK na próxima semana?",
    steps: [
      "analisando intenção de busca…",
      "buscando contexto de voos GRU → JFK…",
      "verificando patrocinadores ativos via Bido…",
      "rodando leilão (CPD US$ 0.50)…",
    ],
    systemLine: "✓ Aerolux Fly venceu o BID  ·  CPD US$ 0.47",
    answerTitle: "Resposta da IA",
    answerText:
      "Encontrei 4 opcoes de voos diretos GRU → JFK na proxima semana. A mais vantajosa agora e a Aerolux Fly:",
    flightNote: "Voo direto · 10% de desconto neste mes",
  },
  en: {
    title: "See how you enter the decision",
    description: "Instead of an ignored banner, your context enters the agent's reasoning at the exact moment of decision.",
    windowTitle: "bido - live reasoning",
    promptLabel: "user",
    thinkingLabel: "ai",
    promptText: "What's the best flight option from GRU to JFK next week?",
    steps: [
      "analyzing search intent…",
      "pulling context for GRU → JFK flights…",
      "checking active sponsors via Bido…",
      "running auction (CPD US$ 0.50)…",
    ],
    systemLine: "✓ Aerolux Fly won the BID  ·  CPD US$ 0.47",
    answerTitle: "AI answer",
    answerText:
      "I found 4 direct flight options from GRU to JFK next week. The best option right now is Aerolux Fly:",
    flightNote: "Direct flight · 10% discount this month",
  },
} as const;
