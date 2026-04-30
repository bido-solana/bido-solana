"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MetricChart } from "@/components/dashboard/metric-chart";
import { MiniStatChart } from "@/components/dashboard/mini-stat-chart";
import { useI18n } from "@/components/providers/i18n-provider";
import { useCampaigns, useCampaignSummary } from "@/lib/hooks/use-campaigns";
import {
  AnimatedLoadingSkeleton,
  ShimmerBlock,
} from "@/components/ui/animated-loading-skeleton";

function shortCampaignLabel(name: string) {
  return name.replace(/\s(?:Brasil|Brazil)$/i, "").split(" ").slice(0, 2).join(" ");
}

export function AppOverviewScreen() {
  const { formatCurrency, messages } = useI18n();
  const { campaigns, loading, error } = useCampaigns();
  const { summary, loading: summaryLoading, error: summaryError } = useCampaignSummary();
  const costPerDecision = campaigns.length
    ? campaigns.reduce((sum, campaign) => sum + campaign.maxBidPerDecision, 0) / campaigns.length
    : 0;
  const auctionWinRate = summary?.avgWinRate ?? 0;
  const costPerDecisionItems = campaigns.map((campaign) => ({
    label: shortCampaignLabel(campaign.name),
    value: campaign.maxBidPerDecision,
  }));
  const winRateItems = campaigns.map((campaign) => ({
    label: shortCampaignLabel(campaign.name),
    value: campaign.winRate,
  }));

  return (
    <>
      <DashboardHeader />

      {error || summaryError ? (
        <div className="mb-5 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error ?? summaryError}
        </div>
      ) : null}

      {loading || summaryLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="mb-5">
            <MetricChart campaigns={campaigns} />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <MiniStatChart
              label={messages.app.dashboard.costPerDecision}
              value={formatCurrency(costPerDecision)}
              color="#6366f1"
              items={costPerDecisionItems}
              formatter={(current) => formatCurrency(current)}
            />
            <MiniStatChart
              label={messages.app.dashboard.auctionWinRate}
              value={`${auctionWinRate.toFixed(1)}%`}
              color="#10b981"
              items={winRateItems}
              formatter={(current) => `${current.toFixed(1)}%`}
            />
          </div>
        </>
      )}
    </>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <AnimatedLoadingSkeleton
        className="mb-5"
        numCards={1}
        gridClassName="grid grid-cols-1 gap-4"
        cardClassName="h-72"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <ShimmerBlock className="mb-3 h-3 w-32 rounded" />
            <ShimmerBlock className="mb-4 h-8 w-24 rounded" />
            <ShimmerBlock className="h-24 w-full rounded-md" />
          </div>
        ))}
      </div>
    </>
  );
}
