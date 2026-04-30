"use client";

import { campaignToForm, useCampaign } from "@/lib/hooks/use-campaigns";
import { NewCampaignScreen } from "@/components/app/new-campaign-screen";
import { OrbitalLoader } from "@/components/ui/orbital-loader";

export function EditCampaignScreen({ campaignId }: { campaignId: string }) {
  const { campaign, loading, error } = useCampaign(campaignId);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-border bg-card px-5 py-16">
        <OrbitalLoader message="Carregando campanha..." />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="rounded-2xl border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
        {error ?? "Campaign not found."}
      </div>
    );
  }

  return (
    <NewCampaignScreen
      mode="edit"
      campaignId={campaign.id}
      initialForm={campaignToForm(campaign)}
    />
  );
}
