import type { Metadata } from "next";
import { JetBrains_Mono, Nunito } from "next/font/google";
import "./globals.css";
import PrivyAppProvider from "@/components/providers/privy-provider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bido — Intent Auctions for the Agent Economy",
  description: "Real-time intent auctions for the agent economy, powered by Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PrivyAppProvider>{children}</PrivyAppProvider>
      </body>
    </html>
  );
}
