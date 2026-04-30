export const docs = {
  "pt-BR": {
    label: "Documentação",
    rootLabel: "Docs",
    tocLabel: "Nesta página",
    previousLabel: "Anterior",
    nextLabel: "Próxima",
    comingSoonBadge: "Em breve",
    comingSoonTitle: "SDK em breve",
    comingSoonDescription: [
      "A documentação completa do SDK ainda está bloqueada. Estamos finalizando os guias, exemplos e a referência de API para publicar em breve.",
    ],
    sections: {
      skill: {
        label: "Skill",
        description: "Integre a skill da Bido para monetizar decisões dentro do seu agente.",
        groups: [
          {
            label: "Primeiros passos",
            pages: [
              {
                slug: "get-started",
                title: "Primeiros passos",
                description: "Tudo o que você precisa para integrar a skill da Bido em menos de 5 minutos.",
                blocks: [
                  {
                    type: "p",
                    content: [
                      "A skill da Bido é a forma mais rápida de integrar contexto patrocinado ao seu agente. Em poucos minutos seu produto já consegue monetizar queries com intenção comercial.",
                    ],
                  },
                  {
                    type: "callout",
                    tone: "tip",
                    title: "Dica",
                    content: [
                      "Comece por ",
                      { type: "code", value: "Installation" },
                      ". Você consegue integrar a skill da Bido em menos de 5 minutos.",
                    ],
                  },
                  { type: "h2", text: "Comece por aqui" },
                  {
                    type: "p",
                    content: ["Tudo o que você precisa para dar os primeiros passos."],
                  },
                  {
                    type: "card-grid",
                    items: [
                      {
                        href: "/docs/skill/installation",
                        title: "Instalação",
                        description: "Configure a skill da Bido no seu ambiente.",
                      },
                      {
                        href: "/docs/skill/first-project",
                        title: "Sua primeira integração",
                        description: "Publique uma integração mínima e funcional.",
                      },
                    ],
                  },
                  { type: "h2", text: "Capacidades centrais" },
                  {
                    type: "p",
                    content: ["Aprenda os recursos centrais que tornam a integração da Bido útil no seu agente."],
                  },
                  {
                    type: "card-grid",
                    items: [
                      {
                        href: "/docs/skill/core-concepts",
                        title: "Conceitos centrais",
                        description: "Entenda como a integração da Bido funciona por dentro.",
                      },
                      {
                        href: "/docs/skill/authentication",
                        title: "Autenticação",
                        description: "Gerencie credenciais e segurança.",
                      },
                    ],
                  },
                ],
              },
              {
                slug: "installation",
                title: "Instalação",
                description: "Instale a skill em segundos.",
                blocks: [
                  {
                    type: "p",
                    content: ["Instale a skill da Bido em segundos com um único comando."],
                  },
                  { type: "h2", text: "Pré-requisitos" },
                  {
                    type: "p",
                    content: ["Você precisa de Node.js 18+, uma conta na Bido e um agente compatível com skills."],
                  },
                  { type: "h2", text: "Instalar via CLI" },
                  {
                    type: "code",
                    language: "bash",
                    code: "npx @bido/skill init",
                  },
                  {
                    type: "callout",
                    tone: "info",
                    content: [
                      "O comando instala a integração e cria o arquivo ",
                      { type: "code", value: "bido.config.ts" },
                      " na raiz do projeto.",
                    ],
                  },
                  { type: "h2", text: "Verificar instalação" },
                  {
                    type: "code",
                    language: "bash",
                    code: "npx @bido/skill --version",
                  },
                ],
              },
              {
                slug: "authentication",
                title: "Autenticação",
                description: "Configure as credenciais da integração da Bido.",
                blocks: [
                  {
                    type: "p",
                    content: [
                      "Configure as credenciais da integração para que seu agente consiga acessar os endpoints da Bido.",
                    ],
                  },
                  { type: "h2", text: "API key" },
                  {
                    type: "p",
                    content: ["Gere uma chave no painel da Bido e exporte como variável de ambiente:"],
                  },
                  {
                    type: "code",
                    language: "bash",
                    code: "export BIDO_API_KEY=sk_live_xxxxxxxx",
                  },
                  {
                    type: "callout",
                    tone: "warning",
                    title: "Nunca exponha sua chave",
                    content: [
                      "Não comite a chave no Git. Use ",
                      { type: "code", value: ".env.local" },
                      " ou um gerenciador de segredos.",
                    ],
                  },
                  { type: "h2", text: "Escopos" },
                  {
                    type: "p",
                    content: ["Você pode restringir o que a integração acessa via escopos:"],
                  },
                  {
                    type: "code",
                    language: "ts",
                    code: `{
scopes: ["catalog:read", "recommendations:write"]
}`,
                  },
                ],
              },
              {
                slug: "first-project",
                title: "Sua primeira integração",
                description: "Faça sua primeira integração funcional com a Bido.",
                blocks: [
                  {
                    type: "p",
                    content: ["Vamos conectar a skill da Bido ao seu agente com uma integração mínima e funcional."],
                  },
                  { type: "h2", text: "Passo a passo" },
                  {
                    type: "steps",
                    items: [
                      {
                        title: "Inicialize a integração",
                        content: ["Execute ", { type: "code", value: "npx @bido/skill init my-agent" }, "."],
                      },
                      {
                        title: "Configure a Bido",
                        content: [
                          "Edite ",
                          { type: "code", value: "bido.config.ts" },
                          " com as credenciais, o contexto e as regras da integração.",
                        ],
                      },
                      {
                        title: "Ative no agente",
                        content: [
                          "Rode ",
                          { type: "code", value: "npx @bido/skill deploy" },
                          " para publicar a configuração.",
                        ],
                      },
                    ],
                  },
                  { type: "h2", text: "Exemplo completo" },
                  {
                    type: "code",
                    language: "ts",
                    code: `import { defineSkill } from "@bido/skill";

export default defineSkill({
name: "bido-ads",
description: "Integra a skill da Bido ao meu agente",
apiBase: process.env.BIDO_API_BASE,
wallet: process.env.BIDO_SOLANA_WALLET,
});`,
                  },
                ],
              },
            ],
          },
          {
            label: "Guias",
            pages: [
              {
                slug: "core-concepts",
                title: "Conceitos centrais",
                description: "Entenda como a integração da Bido funciona por dentro.",
                blocks: [
                  {
                    type: "p",
                    content: ["Entenda os blocos fundamentais da integração da Bido."],
                  },
                  { type: "h2", text: "Catálogo" },
                  {
                    type: "p",
                    content: [
                      "O catálogo é a fonte de verdade das ofertas elegíveis. A skill da Bido consulta esse contexto em tempo real ou via cache.",
                    ],
                  },
                  { type: "h2", text: "Intent" },
                  {
                    type: "p",
                    content: [
                      "Intent é a intenção do usuário. O agente classifica a query e a Bido responde com contexto patrocinado relevante.",
                    ],
                  },
                  { type: "h2", text: "Ranking" },
                  {
                    type: "p",
                    content: ["O ranking pode considerar múltiplos sinais:"],
                  },
                  {
                    type: "ul",
                    items: [
                      ["Relevância semântica"],
                      ["Disponibilidade em estoque"],
                      ["Preço e margem"],
                      ["Histórico do usuário, quando disponível"],
                    ],
                  },
                ],
              },
              {
                slug: "troubleshooting",
                title: "Solução de problemas",
                description: "Resolva problemas comuns.",
                blocks: [
                  {
                    type: "p",
                    content: ["Problemas comuns e como resolvê-los."],
                  },
                  { type: "h2", text: "A integração não aparece no agente" },
                  {
                    type: "p",
                    content: ["Verifique se o deploy da configuração foi concluído com sucesso:"],
                  },
                  {
                    type: "code",
                    language: "bash",
                    code: "npx @bido/skill status",
                  },
                  { type: "h2", text: "Erro de autenticação" },
                  {
                    type: "callout",
                    tone: "warning",
                    content: [
                      "Certifique-se de que ",
                      { type: "code", value: "BIDO_API_KEY" },
                      " está definido no ambiente.",
                    ],
                  },
                  { type: "h2", text: "Catálogo desatualizado" },
                  {
                    type: "p",
                    content: ["Force um refresh do índice:"],
                  },
                  {
                    type: "code",
                    language: "bash",
                    code: "npx @bido/skill reindex",
                  },
                ],
              },
            ],
          },
        ],
      },
      sdk: {
        label: "SDK",
        description: "Integre o Bido SDK em qualquer aplicação.",
        comingSoon: true,
        groups: [
          {
            label: "Primeiros passos",
            pages: [
              {
                slug: "get-started",
                title: "Primeiros passos",
                description: "Comece a usar o SDK em poucos minutos.",
                blocks: [],
              },
              {
                slug: "installation",
                title: "Instalação",
                description: "Instale o SDK no seu projeto.",
                blocks: [],
              },
              {
                slug: "authentication",
                title: "Autenticação",
                description: "Autentique requisições do SDK.",
                blocks: [],
              },
            ],
          },
          {
            label: "Referência",
            pages: [
              {
                slug: "api-reference",
                title: "Referência de API",
                description: "Referência completa de métodos do SDK.",
                blocks: [],
              },
              {
                slug: "examples",
                title: "Exemplos",
                description: "Exemplos práticos de uso.",
                blocks: [],
              },
            ],
          },
        ],
      },
    },
  },
  en: {
    label: "Documentation",
    rootLabel: "Docs",
    tocLabel: "On this page",
    previousLabel: "Previous",
    nextLabel: "Next",
    comingSoonBadge: "Coming soon",
    comingSoonTitle: "SDK coming soon",
    comingSoonDescription: [
      "The full SDK documentation is still locked. We are finishing the guides, examples, and API reference before publishing it.",
    ],
    sections: {
      skill: {
        label: "Skill",
        description: "Integrate the Bido skill to monetize decisions inside your agent.",
        groups: [
          {
            label: "Get started",
            pages: [
              {
                slug: "get-started",
                title: "Get started",
                description: "Everything you need to integrate the Bido skill in less than 5 minutes.",
                blocks: [
                  {
                    type: "p",
                    content: [
                      "The Bido skill is the fastest way to inject sponsored context into your agent. In a few minutes your product can already monetize queries with commercial intent.",
                    ],
                  },
                  {
                    type: "callout",
                    tone: "tip",
                    title: "Tip",
                    content: [
                      "Start with ",
                      { type: "code", value: "Installation" },
                      ". You can integrate the Bido skill in less than 5 minutes.",
                    ],
                  },
                  { type: "h2", text: "Start here" },
                  {
                    type: "p",
                    content: ["Everything you need to get the basics in place."],
                  },
                  {
                    type: "card-grid",
                    items: [
                      {
                        href: "/docs/skill/installation",
                        title: "Installation",
                        description: "Set up the Bido skill in your environment.",
                      },
                      {
                        href: "/docs/skill/first-project",
                        title: "Your first integration",
                        description: "Ship a minimal but working integration.",
                      },
                    ],
                  },
                  { type: "h2", text: "Core capabilities" },
                  {
                    type: "p",
                    content: ["Learn the main pieces that make a Bido integration useful inside your agent."],
                  },
                  {
                    type: "card-grid",
                    items: [
                      {
                        href: "/docs/skill/core-concepts",
                        title: "Core concepts",
                        description: "Understand how the Bido integration works under the hood.",
                      },
                      {
                        href: "/docs/skill/authentication",
                        title: "Authentication",
                        description: "Manage credentials and security.",
                      },
                    ],
                  },
                ],
              },
              {
                slug: "installation",
                title: "Installation",
                description: "Install the skill in seconds.",
                blocks: [
                  {
                    type: "p",
                    content: ["Install the Bido skill in seconds with a single command."],
                  },
                  { type: "h2", text: "Prerequisites" },
                  {
                    type: "p",
                    content: ["You need Node.js 18+, a Bido account, and an agent runtime that supports skills."],
                  },
                  { type: "h2", text: "Install with the CLI" },
                  {
                    type: "code",
                    language: "bash",
                    code: "npx @bido/skill init",
                  },
                  {
                    type: "callout",
                    tone: "info",
                    content: [
                      "The command installs the integration and creates ",
                      { type: "code", value: "bido.config.ts" },
                      " at the project root.",
                    ],
                  },
                  { type: "h2", text: "Verify the installation" },
                  {
                    type: "code",
                    language: "bash",
                    code: "npx @bido/skill --version",
                  },
                ],
              },
              {
                slug: "authentication",
                title: "Authentication",
                description: "Configure credentials for the Bido integration.",
                blocks: [
                  {
                    type: "p",
                    content: [
                      "Configure the integration credentials so your agent can access Bido endpoints safely.",
                    ],
                  },
                  { type: "h2", text: "API key" },
                  {
                    type: "p",
                    content: ["Generate a key in the Bido dashboard and export it as an environment variable:"],
                  },
                  {
                    type: "code",
                    language: "bash",
                    code: "export BIDO_API_KEY=sk_live_xxxxxxxx",
                  },
                  {
                    type: "callout",
                    tone: "warning",
                    title: "Never expose your key",
                    content: [
                      "Do not commit the key to Git. Use ",
                      { type: "code", value: ".env.local" },
                      " or a secrets manager instead.",
                    ],
                  },
                  { type: "h2", text: "Scopes" },
                  {
                    type: "p",
                    content: ["You can restrict what the integration can access through scopes:"],
                  },
                  {
                    type: "code",
                    language: "ts",
                    code: `{
scopes: ["catalog:read", "recommendations:write"]
}`,
                  },
                ],
              },
              {
                slug: "first-project",
                title: "Your first integration",
                description: "Build your first working integration with Bido.",
                blocks: [
                  {
                    type: "p",
                    content: ["Let’s connect the Bido skill to your agent with a minimal but functional integration."],
                  },
                  { type: "h2", text: "Step by step" },
                  {
                    type: "steps",
                    items: [
                      {
                        title: "Initialize the integration",
                        content: ["Run ", { type: "code", value: "npx @bido/skill init my-agent" }, "."],
                      },
                      {
                        title: "Configure Bido",
                        content: [
                          "Edit ",
                          { type: "code", value: "bido.config.ts" },
                          " with your credentials, context, and integration rules.",
                        ],
                      },
                      {
                        title: "Enable it in the agent",
                        content: [
                          "Run ",
                          { type: "code", value: "npx @bido/skill deploy" },
                          " to publish the configuration.",
                        ],
                      },
                    ],
                  },
                  { type: "h2", text: "Full example" },
                  {
                    type: "code",
                    language: "ts",
                    code: `import { defineSkill } from "@bido/skill";

export default defineSkill({
name: "bido-ads",
description: "Integrates the Bido skill into my agent",
apiBase: process.env.BIDO_API_BASE,
wallet: process.env.BIDO_SOLANA_WALLET,
});`,
                  },
                ],
              },
            ],
          },
          {
            label: "Guides",
            pages: [
              {
                slug: "core-concepts",
                title: "Core concepts",
                description: "Understand how the Bido integration works under the hood.",
                blocks: [
                  {
                    type: "p",
                    content: ["Understand the core building blocks behind a Bido integration."],
                  },
                  { type: "h2", text: "Catalog" },
                  {
                    type: "p",
                    content: [
                      "The catalog is the source of truth for eligible offers. The Bido skill reads that context in real time or through cache.",
                    ],
                  },
                  { type: "h2", text: "Intent" },
                  {
                    type: "p",
                    content: [
                      "Intent is the user’s goal. The agent classifies the query and Bido answers with relevant sponsored context.",
                    ],
                  },
                  { type: "h2", text: "Ranking" },
                  {
                    type: "p",
                    content: ["Ranking can consider multiple signals:"],
                  },
                  {
                    type: "ul",
                    items: [
                      ["Semantic relevance"],
                      ["Inventory availability"],
                      ["Price and margin"],
                      ["User history, when available"],
                    ],
                  },
                ],
              },
              {
                slug: "troubleshooting",
                title: "Troubleshooting",
                description: "Resolve common issues.",
                blocks: [
                  {
                    type: "p",
                    content: ["Common issues and how to solve them."],
                  },
                  { type: "h2", text: "The integration does not show up in the agent" },
                  {
                    type: "p",
                    content: ["Check whether the configuration deploy finished successfully:"],
                  },
                  {
                    type: "code",
                    language: "bash",
                    code: "npx @bido/skill status",
                  },
                  { type: "h2", text: "Authentication error" },
                  {
                    type: "callout",
                    tone: "warning",
                    content: [
                      "Make sure ",
                      { type: "code", value: "BIDO_API_KEY" },
                      " is defined in the environment.",
                    ],
                  },
                  { type: "h2", text: "Stale catalog" },
                  {
                    type: "p",
                    content: ["Force an index refresh:"],
                  },
                  {
                    type: "code",
                    language: "bash",
                    code: "npx @bido/skill reindex",
                  },
                ],
              },
            ],
          },
        ],
      },
      sdk: {
        label: "SDK",
        description: "Integrate the Bido SDK into any application.",
        comingSoon: true,
        groups: [
          {
            label: "Get started",
            pages: [
              {
                slug: "get-started",
                title: "Get started",
                description: "Start using the SDK in a few minutes.",
                blocks: [],
              },
              {
                slug: "installation",
                title: "Installation",
                description: "Install the SDK in your project.",
                blocks: [],
              },
              {
                slug: "authentication",
                title: "Authentication",
                description: "Authenticate SDK requests.",
                blocks: [],
              },
            ],
          },
          {
            label: "Reference",
            pages: [
              {
                slug: "api-reference",
                title: "API reference",
                description: "Full method reference for the SDK.",
                blocks: [],
              },
              {
                slug: "examples",
                title: "Examples",
                description: "Practical usage examples.",
                blocks: [],
              },
            ],
          },
        ],
      },
    },
  },
} as const;
