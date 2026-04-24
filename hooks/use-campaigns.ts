"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { authenticatedFetch } from "@/lib/api/authenticated-fetch";
import type { Campaign } from "@/lib/db/campaigns";
import type {
  CampaignCategory,
  CreateCampaignInput,
  UpdateCampaignInput,
} from "@/lib/validators/campaign";

type StatusFilter = "active" | "paused" | "finished" | undefined;

interface UseCampaignsState {
  campaigns: Campaign[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  filterByStatus: StatusFilter;
  filterByCategory: CampaignCategory | undefined;
  setFilterByStatus: (s: StatusFilter) => void;
  setFilterByCategory: (c: CampaignCategory | undefined) => void;
  refetch: () => Promise<void>;
  createCampaign: (input: CreateCampaignInput) => Promise<Campaign>;
  updateCampaign: (id: string, input: UpdateCampaignInput) => Promise<Campaign>;
  deleteCampaign: (id: string) => Promise<void>;
}

interface ListResponse {
  campaigns: Campaign[];
  total: number;
  limit: number;
  offset: number;
}

export function useCampaigns(): UseCampaignsState {
  const { ready, authenticated, getAccessToken } = usePrivy();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filterByStatus, setFilterByStatus] = useState<StatusFilter>(undefined);
  const [filterByCategory, setFilterByCategory] = useState<
    CampaignCategory | undefined
  >(undefined);

  const refetch = useCallback(async () => {
    if (!ready || !authenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterByStatus) params.set("status", filterByStatus);
      if (filterByCategory) params.set("category", filterByCategory);
      const qs = params.toString();
      const data = await authenticatedFetch<ListResponse>(
        `/api/campaigns${qs ? `?${qs}` : ""}`,
        { method: "GET" },
        getAccessToken
      );
      setCampaigns(data.campaigns);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [ready, authenticated, getAccessToken, filterByStatus, filterByCategory]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const createCampaignFn = useCallback(
    async (input: CreateCampaignInput) => {
      const created = await authenticatedFetch<Campaign>(
        "/api/campaigns",
        { method: "POST", body: JSON.stringify(input) },
        getAccessToken
      );
      setCampaigns((prev) => [created, ...prev]);
      setTotal((n) => n + 1);
      return created;
    },
    [getAccessToken]
  );

  const updateCampaignFn = useCallback(
    async (id: string, input: UpdateCampaignInput) => {
      const updated = await authenticatedFetch<Campaign>(
        `/api/campaigns/${id}`,
        { method: "PATCH", body: JSON.stringify(input) },
        getAccessToken
      );
      setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
      return updated;
    },
    [getAccessToken]
  );

  const deleteCampaignFn = useCallback(
    async (id: string) => {
      await authenticatedFetch<{ deleted: true; id: string }>(
        `/api/campaigns/${id}`,
        { method: "DELETE" },
        getAccessToken
      );
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      setTotal((n) => Math.max(0, n - 1));
    },
    [getAccessToken]
  );

  return {
    campaigns,
    total,
    isLoading,
    error,
    filterByStatus,
    filterByCategory,
    setFilterByStatus,
    setFilterByCategory,
    refetch,
    createCampaign: createCampaignFn,
    updateCampaign: updateCampaignFn,
    deleteCampaign: deleteCampaignFn,
  };
}
