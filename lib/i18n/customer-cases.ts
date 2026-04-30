export const customerCases = {
  "pt-BR": {
    caseStudyLabel: "Caso de uso",
    contentsLabel: "Conteúdo",
    agentAnswersLabel: "Resposta do agente",
    oneLinerLabel: "Resumo",
    items: [
      {
        slug: "solana",
        name: "Solana",
        title: "Solana",
        breadcrumbLabel: "Solana × Bido",
        description:
          "Como a Bido pode transformar agentes de coding com IA em um canal de distribuição de alta intenção para produtos e protocolos da Solana.",
        imageSrc: "/solana-logo.png",
        imageAlt: "Logo da Solana",
        heroDescription:
          "Como a Bido pode colocar produtos da Solana dentro do momento em que agentes ajudam builders a decidir a stack",
        heroBadge: "Tese de distribuição",
        heroStats: [
          {
            title: "Camada de decisão",
            description: "Influência dentro da resposta do agente, não depois que a recomendação já aconteceu.",
          },
          {
            title: "Busca → Reasoning",
            description: "A próxima disputa não é ranking de busca. É a escolha do protocolo no reasoning.",
          },
          {
            title: "Pagamento por integração",
            description: "Protocolos pagam por uso qualificado quando builders realmente escolhem integrar.",
          },
        ],
        meta: {
          title: "Protocolos Solana × Bido — Case Study",
          description:
            "Como a Bido pode transformar agentes de coding com IA em um canal de distribuição de alta intenção para produtos e protocolos da Solana.",
        },
        sections: [
          {
            id: "at-a-glance",
            label: "Visão geral",
            kind: "overview",
            eyebrow: "Visão geral",
            title: "A oportunidade é simples: ganhar distribuição exatamente quando o agente ajuda um builder a escolher o que integrar na Solana.",
            quote:
              "O novo campo de batalha não é só documentação ou awareness. É o momento em que o agente escolhe o stack pelo builder.",
            aside: [
              {
                label: "Ecossistema",
                content:
                  "A Solana é uma L1 de alto throughput com uma stack profunda de RPCs, agregadores de swap, wallets, infraestrutura NFT e provedores de pagamento competindo por adoção de developers.",
                href: "https://solana.com",
                hrefLabel: "Visitar Solana",
              },
              {
                label: "Categoria",
                content: "Distribuição para developers dentro de agentes de coding com IA",
              },
              {
                label: "Superfície",
                content: "Cursor, Claude Code e outros agentes de coding",
              },
            ],
            body: [
              "Com Cursor, Claude Code e outros agentes, o fluxo de construção já mudou. O developer não começa mais a jornada abrindo dez abas. Ele começa pedindo para o agente montar a solução.",
              "É aí que nasce o problema de distribuição: o agente sabe implementar, mas ainda precisa decidir qual produto encaixa melhor em cada etapa da stack.",
              "Na Solana isso fica ainda mais evidente porque o ecossistema é rico demais para depender só de memória de marca. Um builder pode precisar de Kora para abstração de taxas, Solana Pay para pagamentos, ConnectorKit para conexão de wallet, CommerceKit para checkout, ou até Cloak para fluxos de privacidade e compliance.",
              "Hoje, muitos desses produtos ainda são pouco compreendidos no momento de implementação. O problema não é só descoberta, é clareza de caso de uso. A tese da Bido é fazer o produto certo aparecer no exato momento em que aquela decisão técnica precisa ser tomada.",
            ],
          },
          {
            id: "context",
            label: "O problema de discovery no AI coding",
            kind: "problems",
            eyebrow: "Contexto",
            title: "A IA acelerou a implementação. O discovery de produtos ainda ficou preso no modelo antigo.",
            cards: [
              {
                title: "Discovery ruim",
                description: "A escolha recai em familiaridade de marca, não em fit técnico para aquele caso de uso específico.",
              },
              {
                title: "Fluxo quebrado",
                description: "O builder sai do editor para pesquisar docs, exemplos, comparações e integrações na mão.",
              },
              {
                title: "Sem distribuição",
                description: "Produtos competem por awareness, quando deveriam competir por decisão dentro do fluxo do agente.",
              },
            ],
          },
          {
            id: "use-case-1",
            label: "Descoberta por intenção dentro do agente",
            kind: "diagram",
            eyebrow: "Use case",
            title: "A Bido transforma intenção técnica em distribuição qualificada dentro do reasoning do agente.",
            body: [
              "Em vez de empurrar tráfego para uma landing ou torcer para o developer lembrar de um nome, a Bido participa da decisão quando o agente identifica intenção técnica real.",
              "Se o pedido envolve pagamentos, a decisão pode favorecer algo como Solana Pay ou CommerceKit. Se o fluxo pede wallet connection, ConnectorKit passa a disputar esse contexto. Se a necessidade for privacidade operacional, Cloak entra com uma proposta concreta de private transfers, shielded swaps e compliance auditável.",
              "Isso não é banner, não é placement vazio e não é um RAG genérico. É distribuição baseada em intenção, aplicada direto na camada de decisão do agente.",
            ],
            diagram: {
              heading: "Influencie a camada de decisão de agentes de coding com IA",
              sourceLabel: "Intenção do developer",
              items: [
                "Provedores de RPC",
                "Agregadores de swap",
                "Wallets & auth",
                "NFT & compression",
                "Payment rails",
                "Privacy & compliance",
                "Indexadores",
              ],
              outputLabel: "Candidato qualificado na resposta do agente",
            },
          },
          {
            id: "use-case-2",
            label: "Exemplo real: privacidade e compliance com Cloak",
            kind: "sequence",
            eyebrow: "Use case",
            title: "Um pedido de implementação sensível vira uma recomendação acionável de privacidade sem o builder sair do editor.",
            sequence: [
              {
                label: "Prompt do developer",
                code: "Crie um fluxo de payroll privado na Solana onde valores e destinatários fiquem ocultos, mas o financeiro consiga auditar quando necessário.",
              },
              {
                label: "Agente detecta intenção",
                code: `{
"chain": "solana",
"intent": "private_payroll_and_compliance",
"language": "typescript",
"requirements": ["privacy", "auditability", "solana"]
}`,
              },
              {
                label: "Bido retorna candidatos qualificados",
                code: `{
"qualified_candidates": [
  {
    "name": "Cloak",
    "reason": "Private transfers, payroll flows and auditability via viewing keys on Solana",
    "category": "privacy_infrastructure"
  }
]
}`,
              },
            ],
            agentAnswer:
              "Para esse fluxo, Cloak faz mais sentido porque oferece private transfers e payroll com auditabilidade quando necessário. A integração pode usar o SDK para fluxos shielded, enquanto o time financeiro acessa trilhas específicas via viewing keys em vez de expor tudo publicamente.",
          },
          {
            id: "metrics",
            label: "Métricas que importam",
            kind: "metrics",
            eyebrow: "Métricas",
            title: "Se a distribuição acontece dentro do reasoning, as métricas também precisam mudar.",
            metrics: [
              {
                name: "Qualified appearances",
                description: "Quantas vezes um protocolo aparece em um contexto técnico válido.",
              },
              {
                name: "Integration rate",
                description: "Com que frequência o builder realmente usa o protocolo sugerido no código.",
              },
              {
                name: "Time-to-integration",
                description: "O tempo entre a recomendação e o uso real na implementação.",
              },
              {
                name: "Decision coverage",
                description: "A parcela das escolhas técnicas em que a Bido participa do fluxo de reasoning.",
              },
              {
                name: "Cost per integration",
                description: "Quanto o protocolo paga por integração real e qualificada.",
              },
              {
                name: "Share of stack",
                description: "Com que frequência o protocolo aparece ao longo da stack completa escolhida pelo builder.",
              },
            ],
          },
          {
            id: "impact",
            label: "Impacto da Bido",
            kind: "impact",
            eyebrow: "Impacto",
            title: "O impacto mais relevante não é só aparecer mais. É aparecer com mais contexto, mais intenção e mais chance de virar integração real.",
            impacts: [
              {
                kpi: "Mais consideração qualificada",
                label: "Produtos passam a entrar na shortlist do agente quando a escolha técnica ainda está em aberto.",
              },
              {
                kpi: "Ciclo menor até integração",
                label: "Builders podem ir de descoberta a implementação sem quebrar o fluxo para pesquisar fora do editor.",
              },
              {
                kpi: "Aquisição mais defensável",
                label: "Produtos deixam de depender só de brand awareness e passam a disputar decisão dentro do reasoning do agente.",
              },
            ],
            oneLiner:
              "Na prática, a Bido pode transformar produtos da Solana em escolhas mais presentes, mais relevantes e mais acionáveis no exato momento em que o agent decide a stack do builder.",
          },
        ],
      },
    ],
  },
  en: {
    caseStudyLabel: "Case study",
    contentsLabel: "Contents",
    agentAnswersLabel: "Agent answers",
    oneLinerLabel: "One-liner",
    items: [
      {
        slug: "solana",
        name: "Solana",
        title: "Solana",
        breadcrumbLabel: "Solana × Bido",
        description:
          "How Bido can turn AI coding agents into a high-intent distribution channel for Solana products and protocols.",
        imageSrc: "/solana-logo.png",
        imageAlt: "Solana logo",
        heroDescription:
          "How Bido can place Solana products inside the exact moment agents help builders choose their stack",
        heroBadge: "Distribution thesis",
        heroStats: [
          {
            title: "Decision layer",
            description: "Influence inside the agent response, not after the recommendation has already been made.",
          },
          {
            title: "Search → Reasoning",
            description: "The next battlefield is not search ranking. It is reasoning-time protocol choice.",
          },
          {
            title: "Pay per integration",
            description: "Protocols pay for qualified usage when builders actually choose them in-flow.",
          },
        ],
        meta: {
          title: "Solana Protocols × Bido — Customer Story",
          description:
            "How Bido can turn AI coding agents into a high-intent distribution channel for Solana products and protocols.",
        },
        sections: [
          {
            id: "at-a-glance",
            label: "At a glance",
            kind: "overview",
            eyebrow: "At a glance",
            title: "The opportunity is simple: win distribution at the exact moment an agent helps a builder choose what to integrate on Solana.",
            quote:
              "The new battleground is not just docs or awareness. It is the moment the agent chooses the stack for the builder.",
            aside: [
              {
                label: "Ecosystem",
                content:
                  "Solana is a high-throughput L1 with a deep stack of RPCs, swap aggregators, wallets, NFT infra, and payment providers all competing for developer adoption.",
                href: "https://solana.com",
                hrefLabel: "Visit Solana",
              },
              {
                label: "Category",
                content: "Developer distribution for AI coding agents",
              },
              {
                label: "Surface",
                content: "Cursor, Claude Code, and other coding agents",
              },
            ],
            body: [
              "With Cursor, Claude Code, and similar agents, the build flow has already changed. Developers no longer start by opening ten tabs. They start by asking the agent to assemble the solution.",
              "That creates a new distribution problem: the agent knows how to implement, but it still has to decide which product best fits each layer of the stack.",
              "On Solana this is especially visible because the ecosystem is too rich to rely on memory alone. A builder may need Kora for fee abstraction, Solana Pay for payments, ConnectorKit for wallet connection, CommerceKit for checkout, or Cloak for privacy-sensitive flows and auditable compliance.",
              "Today many of those products are still poorly understood at implementation time. The problem is not only discovery, it is use-case clarity. Bido's thesis is to make the right product appear at the exact moment that technical decision needs to be made.",
            ],
          },
          {
            id: "context",
            label: "The discovery problem in AI coding",
            kind: "problems",
            eyebrow: "Context",
            title: "AI accelerated implementation. Product discovery is still stuck in the old model.",
            cards: [
              {
                title: "Bad discovery",
                description: "Technical choices still default to brand familiarity instead of true context-aware fit.",
              },
              {
                title: "Broken flow",
                description: "Developers leave the editor to research protocols, docs, examples, and comparisons manually.",
              },
              {
                title: "No distribution",
                description: "Products compete for awareness when they should be competing for the decision inside the agent workflow.",
              },
            ],
          },
          {
            id: "use-case-1",
            label: "Intent-based discovery inside the agent",
            kind: "diagram",
            eyebrow: "Use case",
            title: "Bido turns technical intent into qualified distribution inside the agent's reasoning loop.",
            body: [
              "Instead of pushing traffic to a landing page or hoping the developer remembers a brand, Bido participates when the agent detects real technical intent.",
              "If the prompt is about payments, products like Solana Pay or CommerceKit can compete for that context. If the flow needs wallet connection, ConnectorKit becomes relevant. If the requirement is operational privacy, Cloak can show up with a concrete answer around private transfers, shielded swaps, and auditable compliance.",
              "This is not a banner, not empty placement, and not a generic RAG layer. It is intent-based distribution applied directly at the agent's decision layer.",
            ],
            diagram: {
              heading: "Influence the decision layer of AI coding agents",
              sourceLabel: "Developer intent",
              items: [
                "RPC providers",
                "Swap aggregators",
                "Wallets & auth",
                "NFT & compression",
                "Payment rails",
                "Privacy & compliance",
                "Indexers",
              ],
              outputLabel: "Qualified candidate in the agent reply",
            },
          },
          {
            id: "use-case-2",
            label: "Real example: privacy and compliance with Cloak",
            kind: "sequence",
            eyebrow: "Use case",
            title: "A privacy-sensitive implementation request becomes an actionable recommendation without forcing the builder out of the editor.",
            sequence: [
              {
                label: "Developer prompt",
                code: "Build a private payroll flow on Solana where amounts and recipients stay hidden, but finance can audit when needed.",
              },
              {
                label: "Agent detects intent",
                code: `{
"chain": "solana",
"intent": "private_payroll_and_compliance",
"language": "typescript",
"requirements": ["privacy", "auditability", "solana"]
}`,
              },
              {
                label: "Bido returns qualified candidates",
                code: `{
"qualified_candidates": [
  {
    "name": "Cloak",
    "reason": "Private transfers, payroll flows, and auditability via viewing keys on Solana",
    "category": "privacy_infrastructure"
  }
]
}`,
              },
            ],
            agentAnswer:
              "For this flow, Cloak is the better fit because it offers private transfers and payroll while remaining auditable when needed. The integration can use the SDK for shielded flows, while the finance team accesses specific reporting paths through viewing keys instead of exposing everything publicly.",
          },
          {
            id: "metrics",
            label: "Metrics that matter",
            kind: "metrics",
            eyebrow: "Metrics",
            title: "If distribution happens inside reasoning, the metrics need to change too.",
            metrics: [
              {
                name: "Qualified appearances",
                description: "How many times a protocol appears in a valid technical context.",
              },
              {
                name: "Integration rate",
                description: "How often the builder actually uses the suggested protocol in code.",
              },
              {
                name: "Time-to-integration",
                description: "The time between recommendation and real usage in implementation.",
              },
              {
                name: "Decision coverage",
                description: "The share of technical choices where Bido participates in the reasoning flow.",
              },
              {
                name: "Cost per integration",
                description: "What the protocol pays per real, qualified integration.",
              },
              {
                name: "Share of stack",
                description: "How often the protocol appears across the builder's full stack of choices.",
              },
            ],
          },
          {
            id: "impact",
            label: "Bido's impact",
            kind: "impact",
            eyebrow: "Impact",
            title: "The most meaningful impact is not just showing up more. It is showing up with more context, more intent, and a higher chance of becoming a real integration.",
            impacts: [
              {
                kpi: "More qualified consideration",
                label: "Products enter the agent shortlist while the technical choice is still open.",
              },
              {
                kpi: "Shorter path to integration",
                label: "Builders can move from discovery to implementation without breaking flow to research externally.",
              },
              {
                kpi: "More defensible acquisition",
                label: "Products rely less on generic awareness and compete directly inside the agent's reasoning loop.",
              },
            ],
            oneLiner:
              "In practice, Bido can make Solana products more present, more relevant, and more actionable at the exact moment an agent helps a builder decide the stack.",
          },
        ],
      },
    ],
  },
} as const;
