import type { Metadata } from "next";
import { DevsPage } from "@/app/devs/devs-page";

export const metadata: Metadata = {
  title: "Para devs — Bido",
  description:
    "Adicione a skill do Bido em segundos. Um comando, suas envs e seu agente ja recomenda.",
  openGraph: {
    title: "Para devs — Bido",
    description:
      "Adicione a skill do Bido em segundos. Um comando, suas envs e seu agente ja recomenda.",
  },
};

export default function DevsRoutePage() {
  return <DevsPage />;
}
