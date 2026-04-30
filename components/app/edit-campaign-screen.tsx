"use client";

import { campaignToForm, useCampaign } from "@/lib/hooks/use-campaigns";
import { NewCampaignScreen } from "@/components/app/new-campaign-screen";
import { OrbitalLoader } from "@/components/ui/orbital-loader";
import { useI18n } from "@/components/providers/i18n-provider";

export function EditCampaignScreen({ campaignId }: { campaignId: string }) {
  const { messages } = useI18n();
  const { campaign, loading, error } = useCampaign(campaignId);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-border bg-card px-5 py-16">
        <OrbitalLoader message={messages.app.campaignDetail.loadingCampaign} />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="rounded-2xl border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
        {error ?? messages.app.campaignDetail.campaignNotFound}
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
