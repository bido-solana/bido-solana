"use client";

import { useState, useEffect } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

interface WalletInfoProps {
  address: string;
}

export default function WalletInfo({ address }: WalletInfoProps) {
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const rpcUrl =
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
    const connection = new Connection(rpcUrl, "confirmed");

    connection
      .getBalance(new PublicKey(address))
      .then((lamports) => setBalance(lamports / LAMPORTS_PER_SOL))
      .catch(() => setBalance(null));
  }, [address]);

  async function copyAddress() {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? "devnet";
  const explorerUrl = `https://explorer.solana.com/address/${address}?cluster=${network}`;

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-5"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Balance */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em" }}
        >
          Balance
        </span>
        <span
          className="text-sm font-mono font-semibold"
          style={{
            color:
              balance === null
                ? "rgba(255,255,255,0.15)"
                : "rgba(255,255,255,0.8)",
          }}
        >
          {balance === null ? (
            <span className="animate-pulse">— SOL</span>
          ) : (
            `${balance.toFixed(4)} SOL`
          )}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={copyAddress}
          className="flex-1 text-xs font-medium py-2 rounded-lg transition-all duration-150 active:scale-[0.97]"
          style={{
            background: copied
              ? "rgba(34,197,94,0.1)"
              : "rgba(255,255,255,0.04)",
            border: copied
              ? "1px solid rgba(34,197,94,0.2)"
              : "1px solid rgba(255,255,255,0.07)",
            color: copied ? "#4ade80" : "rgba(255,255,255,0.45)",
          }}
        >
          {copied ? "Copied ✓" : "Copy Address"}
        </button>

        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center text-xs font-medium py-2 rounded-lg transition-all duration-150"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.45)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#c084fc";
            e.currentTarget.style.borderColor = "rgba(153,69,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.45)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          }}
        >
          Explorer ↗
        </a>
      </div>
    </div>
  );
}
