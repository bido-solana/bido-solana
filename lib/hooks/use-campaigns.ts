"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  type ApiCampaignStatus,
  type CampaignAnalyticsResponse,
  type CampaignRecord,
  type CampaignSummaryResponse,
  mapApiCampaignToRecord,
} from "@/lib/app-campaign-data";
import type { CampaignFormData } from "@/lib/campaign-types";
import {
  type AnalyticsPeriod,
  campaignsApi,
} from "@/lib/api/campaigns";
import { type GetAccessToken } from "@/lib/api/client";

const REFRESH_EVENT = "bido-campaigns:refresh";
const SOLANA_CHAIN =
  `solana:${process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? "devnet"}` as const;

function emitRefresh() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(REFRESH_EVENT));
  }
}

function useStableToken(): GetAccessToken {
  const { getAccessToken } = usePrivy();
  const ref = useRef(getAccessToken);
  ref.current = getAccessToken;
  return useCallback(() => ref.current(), []);
}

function useRefreshListener(handler: () => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  useEffect(() => {
    const onRefresh = () => handlerRef.current();
    window.addEventListener(REFRESH_EVENT, onRefresh);
    return () => window.removeEventListener(REFRESH_EVENT, onRefresh);
  }, []);
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Erro inesperado ao carregar campanhas.";
}

export function useCampaigns() {
  const { ready, authenticated } = usePrivy();
  const getToken = useStableToken();
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!ready) return;
    if (!authenticated) {
      setCampaigns([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const items = await campaignsApi.list(getToken);
      const records = await Promise.all(
        items.map(async (item) => {
          const analytics = await campaignsApi.analytics(getToken, item.id);
          return mapApiCampaignToRecord(item, analytics);
        }),
      );
      setCampaigns(records);
    } catch (e) {
      setError(toErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [ready, authenticated, getToken]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useRefreshListener(reload);

  return { campaigns, loading, error, reload };
}

export function useCampaign(campaignId: string) {
  const { ready, authenticated } = usePrivy();
  const getToken = useStableToken();
  const [campaign, setCampaign] = useState<CampaignRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!ready) return;
    if (!authenticated) {
      setCampaign(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const item = await campaignsApi.get(getToken, campaignId);
      const analytics = await campaignsApi.analytics(getToken, campaignId);
      setCampaign(mapApiCampaignToRecord(item, analytics));
    } catch (e) {
      setCampaign(null);
      setError(toErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [ready, authenticated, getToken, campaignId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useRefreshListener(reload);

  return { campaign, loading, error, reload };
}

export function useCampaignSummary() {
  const { ready, authenticated } = usePrivy();
  const getToken = useStableToken();
  const [summary, setSummary] = useState<CampaignSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!ready) return;
    if (!authenticated) {
      setSummary(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setSummary(await campaignsApi.summary(getToken));
    } catch (e) {
      setError(toErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [ready, authenticated, getToken]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useRefreshListener(reload);

  return { summary, loading, error, reload };
}

export function useCampaignAnalytics(
  campaignId: string,
  period: AnalyticsPeriod,
) {
  const { ready, authenticated } = usePrivy();
  const getToken = useStableToken();
  const [analytics, setAnalytics] = useState<CampaignAnalyticsResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!ready) return;
    if (!authenticated) {
      setAnalytics(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setAnalytics(await campaignsApi.analytics(getToken, campaignId, period));
    } catch (e) {
      setAnalytics(null);
      setError(toErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [ready, authenticated, getToken, campaignId, period]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useRefreshListener(reload);

  return { analytics, loading, error, reload };
}

export function useCampaignActions() {
  const getToken = useStableToken();

  const createCampaign = useCallback(
    async (form: CampaignFormData) => {
      const created = await campaignsApi.create(getToken, form);
      emitRefresh();
      return created;
    },
    [getToken],
  );

  const editCampaign = useCallback(
    async (id: string, form: CampaignFormData) => {
      const updated = await campaignsApi.update(getToken, id, form);
      emitRefresh();
      return updated;
    },
    [getToken],
  );

  const removeCampaign = useCallback(
    async (id: string) => {
      await campaignsApi.remove(getToken, id);
      emitRefresh();
    },
    [getToken],
  );

  const pauseCampaign = useCallback(
    async (id: string, currentStatus: ApiCampaignStatus) => {
      const updated =
        currentStatus === "paused"
          ? await campaignsApi.resume(getToken, id)
          : await campaignsApi.pause(getToken, id);
      emitRefresh();
      return updated;
    },
    [getToken],
  );

  const prepareCampaignFunding = useCallback(
    (id: string, feePayer?: string) =>
      campaignsApi.prepareFunding(getToken, id, feePayer),
    [getToken],
  );

  const prepareCampaignInitialization = useCallback(
    (id: string, feePayer?: string) =>
      campaignsApi.prepareInit(getToken, id, feePayer),
    [getToken],
  );

  const confirmCampaignFunding = useCallback(
    async (id: string, txHash: string) => {
      const updated = await campaignsApi.confirmFunding(getToken, id, txHash);
      emitRefresh();
      return updated;
    },
    [getToken],
  );

  const relayCampaignFunding = useCallback(
    (id: string, signedTxBase64: string, signerAddress: string) =>
      campaignsApi.relayFunding(getToken, id, signedTxBase64, signerAddress),
    [getToken],
  );

  const confirmCampaignInitialization = useCallback(
    async (id: string, txHash: string) => {
      const updated = await campaignsApi.confirmInit(getToken, id, txHash);
      emitRefresh();
      return updated;
    },
    [getToken],
  );

  return useMemo(
    () => ({
      createCampaign,
      editCampaign,
      pauseCampaign,
      removeCampaign,
      prepareCampaignInitialization,
      confirmCampaignInitialization,
      prepareCampaignFunding,
      relayCampaignFunding,
      confirmCampaignFunding,
      solanaChain: SOLANA_CHAIN,
    }),
    [
      confirmCampaignFunding,
      confirmCampaignInitialization,
      createCampaign,
      editCampaign,
      pauseCampaign,
      prepareCampaignFunding,
      prepareCampaignInitialization,
      relayCampaignFunding,
      removeCampaign,
    ],
  );
}

export function campaignToForm(campaign: CampaignRecord): CampaignFormData {
  return {
    brandName: campaign.name,
    offerText: campaign.summary,
    destinationUrl: campaign.destinationUrl,
    location: campaign.geo || "Global",
    intentCategory: campaign.intentCategory,
    totalBudget: campaign.monthlyBudget,
    queryBid: campaign.maxBidPerDecision || 0.5,
  };
}
