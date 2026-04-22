import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/components/providers/i18n-provider";
import PrivyAppProvider from "@/components/providers/privy-provider";

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
      className="h-full antialiased"
    >
      <body className="min-h-full">
        <I18nProvider>
          <PrivyAppProvider>{children}</PrivyAppProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
