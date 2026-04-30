export const devs = {
  "pt-BR": {
    badge: "Para produtos de IA",
    title: "Skills feitas pra agentes.",
    titleMuted: "Não pra você.",
    description:
      "Um comando, suas envs e o seu agente já raciocina com contexto de patrocinadores.",
    docsCta: "Ler a documentação",
    compatibility:
      "Funciona com qualquer agente compatível com a Skill Spec: Claude Agents, OpenAI Assistants, LangChain, Mastra e frameworks próprios.",
    revenueCalculator: {
      badge: "Estimativa de receita",
      title: "Quanto seu agente pode gerar?",
      description:
        "Cada query com intenção de compra é uma oportunidade de receita. Estime o que sua integração com a Bido pode render.",
      queriesLabel: "Queries comerciais / mês",
      queriesAriaLabel: "Ajustar volume de queries comerciais por mês",
      queriesColumn: "Queries",
      revenueColumn: "Receita",
      earningsPerQueryLabel: "Ganho por query comercial",
      estimatedRevenueLabel: "Receita estimada",
      perMonth: "/ mês",
      microcopy:
        "Quando existe intenção de compra, sua Skill pode transformar demanda em receita.",
      primaryCta: "Começar com Bido",
      secondaryCta: "Adicionar Skill",
    },
    terminal: {
      windowTitle: "~/my-agent — zsh",
      copyLabel: "Copiar comando de instalacao",
      copied: "Copiado",
      commandLabel: "npx skills add bido/ads",
      script: [
        { kind: "prompt", text: "npx skills add bido/ads" },
        {
          kind: "output",
          text: "→ Resolvendo skill bido/ads@latest…",
          className: "text-muted-foreground",
          delay: 450,
        },
        {
          kind: "output",
          text: "✓ Skill instalada em .agent/skills/bido-ads",
          className: "text-emerald-400",
          delay: 600,
        },
        { kind: "blank" },
        {
          kind: "output",
          text: "Esta skill requer as seguintes env vars:",
          className: "text-muted-foreground",
          delay: 350,
        },
        {
          kind: "output",
          text: "  • BIDO_API_BASE           (obrigatoria)",
          className: "text-foreground/80",
          delay: 200,
        },
        {
          kind: "output",
          text: "  • BIDO_SOLANA_WALLET      (obrigatoria — recebe os payouts)",
          className: "text-foreground/80",
          delay: 200,
        },
        { kind: "blank" },
        { kind: "prompt", text: "export BIDO_API_BASE=\"https://usebido.com/api/v1\"" },
        { kind: "prompt", text: "export BIDO_SOLANA_WALLET=7xKX…9aQp" },
        { kind: "output", text: "✓ .env atualizado", className: "text-emerald-400", delay: 350 },
        {
          kind: "output",
          text: "✓ Carteira Solana verificada on-chain",
          className: "text-emerald-400",
          delay: 400,
        },
        { kind: "blank" },
        {
          kind: "output",
          text: "● Skill ativa — seu agente já raciocina com contexto de patrocinadores.",
          className: "text-violet font-semibold",
          delay: 500,
        },
        {
          kind: "output",
          text: "↳ Payouts em USDC direto na sua wallet a cada decisão.",
          className: "text-muted-foreground",
          delay: 300,
        },
        {
          kind: "output",
          text: '↳ Try: "qual a melhor opcao de voo GRU → JFK?"',
          className: "text-muted-foreground",
          delay: 250,
        },
      ],
    },
    howItWorks: {
      badge: "Como funciona",
      title: "De uma query",
      titleAccent: "pra receita.",
      subtitle: "Cada passo acontece em milissegundos, de forma automática e sem intermediários.",
      steps: [
        {
          number: "01",
          title: "Usuário envia uma query com intenção",
          description: "Seu agente recebe normalmente. Uma mensagem como qualquer outra.",
          code: '"Quero voos de São Paulo para Nova York por até R$2.500"',
          codeType: "query"
        },
        {
          number: "02",
          title: "A Skill detecta a intenção",
          description:
            "A Bido analisa a query em tempo real e identifica intenções acionáveis — compra, signup, aprendizado, adoção, desenvolvimento ou qualquer ação valiosa para patrocinadores.",
          codeType: "none"
        },
        {
          number: "03",
          title: "Campanhas elegíveis entram no leilão",
          description:
            "Patrocinadores já configuraram campanhas com: intenção-alvo, budget, bid cap e regras de contexto. Quando a intenção aparece, apenas campanhas compatíveis participam do auction.",
          codeType: "none"
        },
        {
          number: "04",
          title: "O vencedor é definido e o budget reservado",
          description:
            "A campanha com maior bid válido vence aquele momento de intenção. O valor é reservado automaticamente antes da resposta final.",
          codeType: "none"
        },
        {
          number: "05",
          title: "O contexto do patrocinador entra no reasoning do agente",
          description:
            "Antes de responder, o agente recebe contexto qualificado do vencedor do leilão. A recomendação sai naturalmente dele — não da Bido.",
          codeLabel: "recomendação contextual",
          code: '"Encontrei voos para Nova York. A LATAM está com desconto em voos diretos esta semana."',
          codeType: "response"
        },
        {
          number: "06",
          title: "Settlement e revenue share em USDC",
          description:
            "Após entrega válida, o valor é liquidado automaticamente e distribuído entre o produto de IA e a Bido.",
          codeType: "none"
        }
      ]
    },
    faq: {
      badge: "FAQ",
      title: "Perguntas frequentes para devs",
      description:
        "O essencial para entender integração, monetização e operação da Skill da Bido no seu agente.",
      contactLead: "Não encontrou o que precisa? Fale com a gente em ",
      questions: [
        {
          id: "dev-item-1",
          title: "O que eu preciso para integrar?",
          content:
            "Você precisa instalar a Skill, configurar as env vars obrigatórias e apontar uma wallet Solana para receber os payouts. A integração foi pensada para ser rápida e compatível com os principais frameworks de agentes.",
        },
        {
          id: "dev-item-2",
          title: "Como meu agente sabe quando monetizar uma query?",
          content:
            "A Skill classifica automaticamente a intenção da mensagem. Só queries com intenção comercial real entram no fluxo de matching e monetização.",
        },
        {
          id: "dev-item-3",
          title: "Eu perco controle sobre a resposta do meu agente?",
          content:
            "Não. A Skill injeta contexto qualificado no reasoning do agente antes da resposta. O agente continua controlando a experiência — a recomendação sai naturalmente dele.",
        },
        {
          id: "dev-item-4",
          title: "Como os pagamentos funcionam?",
          content:
            "Quando uma decisão patrocinada válida acontece, o revenue share é enviado em USDC para a wallet Solana configurada por você. Sem invoice e sem ciclo de repasse manual.",
        },
        {
          id: "dev-item-5",
          title: "Com quais stacks isso funciona?",
          content:
            "A proposta é funcionar com qualquer agente compatível com a Skill Spec, incluindo Claude Agents, OpenAI Assistants, LangChain, Mastra e implementações próprias.",
        },
        {
          id: "dev-item-6",
          title: "Preciso mudar muito da arquitetura atual?",
          content:
            "Na maioria dos casos, não. A integração foi desenhada para entrar como uma camada adicional, sem exigir refactor profundo da sua aplicação ou do runtime do agente.",
        },
      ],
    },
  },
  en: {
    badge: "For AI products",
    title: "Skills built for agents.",
    titleMuted: "Not for you.",
    description:
      "One command, your env vars, and your agent is already reasoning with sponsor context.",
    docsCta: "Read the docs",
    compatibility:
      "Works with any agent compatible with the Skill Spec: Claude Agents, OpenAI Assistants, LangChain, Mastra, and custom frameworks.",
    revenueCalculator: {
      badge: "Revenue estimate",
      title: "How much can your agent generate?",
      description:
        "Every query with purchase intent is a revenue opportunity. Estimate what your Bido integration can earn.",
      queriesLabel: "Commercial queries / month",
      queriesAriaLabel: "Adjust commercial queries per month",
      queriesColumn: "Queries",
      revenueColumn: "Revenue",
      earningsPerQueryLabel: "Earnings per commercial query",
      estimatedRevenueLabel: "Estimated revenue",
      perMonth: "/ month",
      microcopy:
        "When purchase intent exists, your Skill can turn demand into revenue.",
      primaryCta: "Start with Bido",
      secondaryCta: "Add Skill",
    },
    terminal: {
      windowTitle: "~/my-agent — zsh",
      copyLabel: "Copy install command",
      copied: "Copied",
      commandLabel: "npx skills add bido/ads",
      script: [
        { kind: "prompt", text: "npx skills add bido/ads" },
        {
          kind: "output",
          text: "→ Resolving skill bido/ads@latest…",
          className: "text-muted-foreground",
          delay: 450,
        },
        {
          kind: "output",
          text: "✓ Skill installed in .agent/skills/bido-ads",
          className: "text-emerald-400",
          delay: 600,
        },
        { kind: "blank" },
        {
          kind: "output",
          text: "This skill requires the following env vars:",
          className: "text-muted-foreground",
          delay: 350,
        },
        {
          kind: "output",
          text: "  • BIDO_API_BASE           (required)",
          className: "text-foreground/80",
          delay: 200,
        },
        {
          kind: "output",
          text: "  • BIDO_SOLANA_WALLET      (required — receives payouts)",
          className: "text-foreground/80",
          delay: 200,
        },
        { kind: "blank" },
        { kind: "prompt", text: "export BIDO_API_BASE=\"https://usebido.com/api/v1\"" },
        { kind: "prompt", text: "export BIDO_SOLANA_WALLET=7xKX…9aQp" },
        { kind: "output", text: "✓ .env updated", className: "text-emerald-400", delay: 350 },
        {
          kind: "output",
          text: "✓ Solana wallet verified on-chain",
          className: "text-emerald-400",
          delay: 400,
        },
        { kind: "blank" },
        {
          kind: "output",
          text: "● Skill active — your agent is already reasoning with sponsor context.",
          className: "text-violet font-semibold",
          delay: 500,
        },
        {
          kind: "output",
          text: "↳ Payouts in USDC go directly to your wallet on every decision.",
          className: "text-muted-foreground",
          delay: 300,
        },
        {
          kind: "output",
          text: '↳ Try: "what is the best flight option from GRU to JFK?"',
          className: "text-muted-foreground",
          delay: 250,
        },
      ],
    },
    howItWorks: {
      badge: "How it works",
      title: "From a query",
      titleAccent: "to revenue.",
      subtitle: "Each step happens in milliseconds, automatically and without intermediaries.",
      steps: [
        {
          number: "01",
          title: "User sends a query with intent",
          description: "Your agent receives it normally. A message like any other.",
          code: '"I want flights from São Paulo to New York for up to R$2,500"',
          codeType: "query"
        },
        {
          number: "02",
          title: "The Skill detects the intent",
          description:
            "Bido analyzes the query in real time and identifies actionable intent — purchase, signup, learning, adoption, development, or any action valuable to sponsors.",
          codeType: "none"
        },
        {
          number: "03",
          title: "Eligible campaigns enter the auction",
          description:
            "Sponsors have already configured campaigns with target intent, budget, bid cap, and context rules. When the intent appears, only compatible campaigns enter the auction.",
          codeType: "none"
        },
        {
          number: "04",
          title: "The winner is defined and budget is reserved",
          description:
            "The campaign with the highest valid bid wins that moment of intent. The amount is automatically reserved before the final response.",
          codeType: "none"
        },
        {
          number: "05",
          title: "Sponsor context enters the agent's reasoning",
          description:
            "Before responding, the agent receives qualified context from the auction winner. The recommendation comes naturally from the agent — not from Bido.",
          codeLabel: "contextual recommendation",
          code: '"I found flights to New York. LATAM has a discount on direct flights this week."',
          codeType: "response"
        },
        {
          number: "06",
          title: "Settlement and revenue share in USDC",
          description:
            "After valid delivery, the amount is automatically settled and distributed between the AI product and Bido.",
          codeType: "none"
        }
      ]
    },
    faq: {
      badge: "FAQ",
      title: "Frequently asked questions for devs",
      description:
        "The essentials to understand integration, monetization, and operation of the Bido Skill inside your agent.",
      contactLead: "Didn't find what you need? Reach out to us at ",
      questions: [
        {
          id: "dev-item-1",
          title: "What do I need to integrate?",
          content:
            "You need to install the Skill, configure the required env vars, and point a Solana wallet to receive payouts. The integration is designed to be fast and compatible with major agent frameworks.",
        },
        {
          id: "dev-item-2",
          title: "How does my agent know when to monetize a query?",
          content:
            "The Skill automatically classifies intent. Only queries with real commercial intent enter the matching and monetization flow.",
        },
        {
          id: "dev-item-3",
          title: "Do I lose control over my agent's response?",
          content:
            "No. The Skill injects qualified context into the agent's reasoning before the response. The agent still controls the experience — the recommendation comes naturally from it.",
        },
        {
          id: "dev-item-4",
          title: "How do payouts work?",
          content:
            "When a valid sponsored decision happens, the revenue share is sent in USDC to your configured Solana wallet. No invoices and no manual payout cycle.",
        },
        {
          id: "dev-item-5",
          title: "Which stacks does this work with?",
          content:
            "The goal is to work with any agent compatible with the Skill Spec, including Claude Agents, OpenAI Assistants, LangChain, Mastra, and custom implementations.",
        },
        {
          id: "dev-item-6",
          title: "Do I need to change a lot of my current architecture?",
          content:
            "In most cases, no. The integration is designed to fit as an additional layer without requiring a deep refactor of your application or agent runtime.",
        },
      ],
    },
  },
} as const;
