import type { ComponentType } from "react";
import { Callout, CardGrid, CardLink, CodeBlock, H1, H2, H3, P, Step, Steps, UL } from "@/components/docs/blocks";

export type DocSectionId = "skill" | "sdk";

export interface DocPageMeta {
  slug: string;
  title: string;
  description?: string;
  component: ComponentType;
}

export interface DocGroup {
  label: string | null;
  pages: DocPageMeta[];
}

export interface DocSection {
  id: DocSectionId;
  label: string;
  description?: string;
  comingSoon?: boolean;
  groups: DocGroup[];
}

function SkillGetStartedPage() {
  return (
    <>
      <H1>Get started</H1>
      <P>
        A skill da Bido é a forma mais rápida de integrar contexto patrocinado ao seu agente. Em poucos minutos seu
        produto já consegue monetizar queries com intenção comercial.
      </P>

      <Callout type="tip" title="Dica">
        Comece por <code>Installation</code>. Você consegue integrar a skill da Bido em menos de 5 minutos.
      </Callout>

      <H2>Get started</H2>
      <P>Tudo que você precisa para dar os primeiros passos.</P>

      <CardGrid>
        <CardLink
          href="/docs/skill/installation"
          title="Installation"
          description="Configure a skill da Bido no seu ambiente."
        />
        <CardLink
          href="/docs/skill/first-project"
          title="First integration"
          description="Faça sua primeira integração funcional."
        />
      </CardGrid>

      <H2>Core capabilities</H2>
      <P>Aprenda os recursos centrais que tornam a integração da Bido útil no seu agente.</P>

      <CardGrid>
        <CardLink
          href="/docs/skill/core-concepts"
          title="Core concepts"
          description="Entenda como Skills funcionam por dentro."
        />
        <CardLink
          href="/docs/skill/authentication"
          title="Authentication"
          description="Gerencie credenciais e segurança."
        />
      </CardGrid>
    </>
  );
}

function SkillInstallationPage() {
  return (
    <>
      <H1>Installation</H1>
      <P>Instale a skill da Bido em segundos com um único comando.</P>

      <H2>Pré-requisitos</H2>
      <P>Você precisa de Node.js 18+, uma conta na Bido e um agente compatível com skills.</P>

      <H2>Instalar via CLI</H2>
      <CodeBlock language="bash">{`npx @bido/skill init`}</CodeBlock>

      <Callout type="info">
        O comando instala a integração e cria o arquivo <code>bido.config.ts</code> na raiz do projeto.
      </Callout>

      <H2>Verificar instalação</H2>
      <CodeBlock language="bash">{`npx @bido/skill --version`}</CodeBlock>
    </>
  );
}

function SkillAuthenticationPage() {
  return (
    <>
      <H1>Authentication</H1>
      <P>Configure as credenciais da integração para que seu agente consiga acessar os endpoints da Bido.</P>

      <H2>API Key</H2>
      <P>Gere uma chave no painel da Bido e exporte como variável de ambiente:</P>
      <CodeBlock language="bash">{`export BIDO_API_KEY=sk_live_xxxxxxxx`}</CodeBlock>

      <Callout type="warning" title="Nunca exponha sua chave">
        Não comite a chave no Git. Use <code>.env.local</code> ou um gerenciador de segredos.
      </Callout>

      <H2>Escopos</H2>
      <P>Você pode restringir o que a integração acessa via escopos:</P>
      <CodeBlock language="ts">{`{
  scopes: ["catalog:read", "recommendations:write"]
}`}</CodeBlock>
    </>
  );
}

function SkillFirstProjectPage() {
  return (
    <>
      <H1>Your first integration</H1>
      <P>Vamos conectar a skill da Bido ao seu agente com uma integração mínima e funcional.</P>

      <H2>Passo a passo</H2>
      <Steps>
        <Step title="Inicialize a integração">Execute <code>npx @bido/skill init my-agent</code>.</Step>
        <Step title="Configure a Bido">
          Edite <code>bido.config.ts</code> com as credenciais, contexto e regras da integração.
        </Step>
        <Step title="Ative no agente">Rode <code>npx @bido/skill deploy</code> para publicar a configuração.
        </Step>
      </Steps>

      <H2>Exemplo completo</H2>
      <CodeBlock language="ts">{`import { defineSkill } from "@bido/skill";

export default defineSkill({
  name: "bido-ads",
  description: "Integra a skill da Bido ao meu agente",
  apiBase: process.env.BIDO_API_BASE,
  wallet: process.env.BIDO_SOLANA_WALLET,
});`}</CodeBlock>
    </>
  );
}

function SkillCoreConceptsPage() {
  return (
    <>
      <H1>Core concepts</H1>
      <P>Entenda os blocos fundamentais da integração da Bido.</P>

      <H2>Catalog</H2>
      <P>O catálogo é a fonte de verdade das ofertas elegíveis. A skill da Bido consulta esse contexto em tempo real ou via cache.</P>

      <H2>Intent</H2>
      <P>O intent é a intenção do usuário. O agente classifica a query e a Bido responde com contexto patrocinado relevante.</P>

      <H2>Ranking</H2>
      <P>O ranking pode considerar múltiplos sinais:</P>
      <UL>
        <li>Relevância semântica</li>
        <li>Disponibilidade em estoque</li>
        <li>Preço e margem</li>
        <li>Histórico do usuário, quando disponível</li>
      </UL>
    </>
  );
}

function SkillTroubleshootingPage() {
  return (
    <>
      <H1>Troubleshooting</H1>
      <P>Problemas comuns e como resolvê-los.</P>

      <H2>Integração não aparece no agente</H2>
      <P>Verifique se o deploy da configuração foi concluído com sucesso:</P>
      <CodeBlock language="bash">{`npx @bido/skill status`}</CodeBlock>

      <H2>Erro de autenticação</H2>
      <Callout type="warning">
        Certifique-se de que <code>BIDO_API_KEY</code> está definido no ambiente.
      </Callout>

      <H2>Catálogo desatualizado</H2>
      <P>Force um refresh do índice:</P>
      <CodeBlock language="bash">{`npx @bido/skill reindex`}</CodeBlock>
    </>
  );
}

function SdkGetStartedPage() {
  return (
    <>
      <H1>Get started</H1>
      <P>O Bido SDK permite que você integre recomendações inteligentes em qualquer aplicação web ou mobile.</P>

      <H2>Instalação rápida</H2>
      <CodeBlock language="bash">{`npm install @bido/sdk`}</CodeBlock>

      <H2>Próximos passos</H2>
      <CardGrid>
        <CardLink href="/docs/sdk/installation" title="Installation" description="Setup completo do SDK." />
        <CardLink href="/docs/sdk/api-reference" title="API reference" description="Referência completa de métodos." />
      </CardGrid>
    </>
  );
}

function SdkInstallationPage() {
  return (
    <>
      <H1>Installation</H1>
      <P>O SDK suporta JavaScript, TypeScript e React.</P>

      <H2>npm</H2>
      <CodeBlock language="bash">{`npm install @bido/sdk`}</CodeBlock>

      <H2>pnpm</H2>
      <CodeBlock language="bash">{`pnpm add @bido/sdk`}</CodeBlock>

      <H2>bun</H2>
      <CodeBlock language="bash">{`bun add @bido/sdk`}</CodeBlock>
    </>
  );
}

function SdkAuthenticationPage() {
  return (
    <>
      <H1>Authentication</H1>
      <P>Inicialize o SDK com sua chave pública.</P>

      <CodeBlock language="ts">{`import { Bido } from "@bido/sdk";

const bido = new Bido({
  publicKey: process.env.NEXT_PUBLIC_BIDO_KEY!,
});`}</CodeBlock>

      <Callout type="info">
        A chave pública é segura para uso no front-end. Use a chave privada apenas em servidores.
      </Callout>

      <H2>Validar conexão</H2>
      <CodeBlock language="ts">{`await bido.ping(); // => { ok: true }`}</CodeBlock>
    </>
  );
}

function SdkApiReferencePage() {
  return (
    <>
      <H1>API reference</H1>
      <P>Referência completa dos métodos disponíveis no SDK.</P>

      <H2>bido.recommend()</H2>
      <P>Retorna recomendações para um intent específico.</P>

      <H3>Parâmetros</H3>
      <CodeBlock language="ts">{`bido.recommend({
  intent: string;
  limit?: number;
  filters?: Record<string, unknown>;
});`}</CodeBlock>

      <H3>Retorno</H3>
      <CodeBlock language="ts">{`Promise<{
  items: Array<{ id: string; title: string; score: number }>;
  requestId: string;
}>`}</CodeBlock>

      <H2>bido.track()</H2>
      <P>Registra eventos de interação para refinar o ranking.</P>
      <CodeBlock language="ts">{`bido.track("click", { itemId: "abc-123" });`}</CodeBlock>
    </>
  );
}

function SdkExamplesPage() {
  return (
    <>
      <H1>Examples</H1>
      <P>Exemplos práticos de uso do SDK em diferentes contextos.</P>

      <H2>React Hook</H2>
      <CodeBlock language="tsx">{`import { useEffect, useState } from "react";
import { bido } from "./bido";

export function useRecommendations(intent: string) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    bido.recommend({ intent }).then((result) => setItems(result.items));
  }, [intent]);

  return items;
}`}</CodeBlock>

      <H2>Next.js Server Action</H2>
      <CodeBlock language="ts">{`"use server";
import { bido } from "@/lib/bido";

export async function getRecs(intent: string) {
  return bido.recommend({ intent, limit: 10 });
}`}</CodeBlock>

      <H2>Tracking de cliques</H2>
      <CodeBlock language="tsx">{`<button onClick={() => bido.track("click", { itemId })}>
  Comprar
</button>`}</CodeBlock>
    </>
  );
}

export const DOC_SECTIONS: DocSection[] = [
  {
    id: "skill",
    label: "Skill",
    description: "Integre a skill da Bido para monetizar decisões dentro do seu agente.",
    groups: [
      {
        label: "Get started",
        pages: [
          {
            slug: "get-started",
            title: "Get started",
            description: "Tudo que você precisa para integrar a skill da Bido em menos de 5 minutos.",
            component: SkillGetStartedPage,
          },
          {
            slug: "installation",
            title: "Installation",
            description: "Instale a Skill em segundos.",
            component: SkillInstallationPage,
          },
          {
            slug: "authentication",
            title: "Authentication",
            description: "Configure as credenciais da integração da Bido.",
            component: SkillAuthenticationPage,
          },
          {
            slug: "first-project",
            title: "Your first integration",
            description: "Faça sua primeira integração funcional com a Bido.",
            component: SkillFirstProjectPage,
          },
        ],
      },
      {
        label: "Guides",
        pages: [
          {
            slug: "core-concepts",
            title: "Core concepts",
            description: "Entenda como a integração da Bido funciona por dentro.",
            component: SkillCoreConceptsPage,
          },
          {
            slug: "troubleshooting",
            title: "Troubleshooting",
            description: "Resolva problemas comuns.",
            component: SkillTroubleshootingPage,
          },
        ],
      },
    ],
  },
  {
    id: "sdk",
    label: "SDK",
    description: "Integre o Bido SDK em qualquer aplicação.",
    comingSoon: true,
    groups: [
      {
        label: "Get started",
        pages: [
          {
            slug: "get-started",
            title: "Get started",
            description: "Comece a usar o SDK em poucos minutos.",
            component: SdkGetStartedPage,
          },
          {
            slug: "installation",
            title: "Installation",
            description: "Instale o SDK no seu projeto.",
            component: SdkInstallationPage,
          },
          {
            slug: "authentication",
            title: "Authentication",
            description: "Autentique requisições do SDK.",
            component: SdkAuthenticationPage,
          },
        ],
      },
      {
        label: "Reference",
        pages: [
          {
            slug: "api-reference",
            title: "API reference",
            description: "Referência completa de métodos do SDK.",
            component: SdkApiReferencePage,
          },
          {
            slug: "examples",
            title: "Examples",
            description: "Exemplos práticos de uso.",
            component: SdkExamplesPage,
          },
        ],
      },
    ],
  },
];

export function getSection(id: string) {
  return DOC_SECTIONS.find((section) => section.id === id);
}

export function getPage(sectionId: string, slug: string) {
  const section = getSection(sectionId);
  if (!section) {
    return undefined;
  }

  for (const group of section.groups) {
    const page = group.pages.find((item) => item.slug === slug);
    if (page) {
      return { section, group, page };
    }
  }

  return undefined;
}

export function getFirstPage(sectionId: string) {
  const section = getSection(sectionId);
  return section?.groups[0]?.pages[0];
}

export function getAdjacentPages(sectionId: string, slug: string) {
  const section = getSection(sectionId);
  if (!section) {
    return { prev: undefined, next: undefined };
  }

  const flatPages = section.groups.flatMap((group) => group.pages);
  const index = flatPages.findIndex((page) => page.slug === slug);

  return {
    prev: index > 0 ? flatPages[index - 1] : undefined,
    next: index >= 0 && index < flatPages.length - 1 ? flatPages[index + 1] : undefined,
  };
}
