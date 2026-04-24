import { createAdminClient } from "@/lib/supabase/admin";
import type {
  CreateCampaignInput,
  ListCampaignsQuery,
  UpdateCampaignInput,
} from "@/lib/validators/campaign";

export interface Campaign {
  id: string;
  sponsor_id: string;
  name: string;
  category: string;
  target_queries: string[];
  offer_text: string;
  max_cpd: number;
  daily_budget: number;
  status: "active" | "paused" | "finished";
  created_at: string;
  updated_at: string;
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Campaign | null) ?? null;
}

export async function listCampaignsBySponsor(
  sponsorId: string,
  filters: Omit<ListCampaignsQuery, "limit" | "offset"> & {
    limit: number;
    offset: number;
  }
): Promise<{ campaigns: Campaign[]; total: number }> {
  const admin = createAdminClient();
  let query = admin
    .from("campaigns")
    .select("*", { count: "exact" })
    .eq("sponsor_id", sponsorId)
    .order("created_at", { ascending: false })
    .range(filters.offset, filters.offset + filters.limit - 1);

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.category) query = query.eq("category", filters.category);

  const { data, error, count } = await query;
  if (error) throw error;
  return { campaigns: (data ?? []) as Campaign[], total: count ?? 0 };
}

export async function createCampaign(
  sponsorId: string,
  data: CreateCampaignInput
): Promise<Campaign> {
  const admin = createAdminClient();
  const { data: inserted, error } = await admin
    .from("campaigns")
    .insert({ sponsor_id: sponsorId, ...data })
    .select("*")
    .single();
  if (error) throw error;
  return inserted as Campaign;
}

export async function updateCampaign(
  id: string,
  data: UpdateCampaignInput
): Promise<Campaign> {
  const admin = createAdminClient();
  const { data: updated, error } = await admin
    .from("campaigns")
    .update(data)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return updated as Campaign;
}

export async function deleteCampaign(id: string): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin.from("campaigns").delete().eq("id", id);
  if (error) throw error;
}

export async function getSponsorIdByPrivyId(
  privyId: string
): Promise<string | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("sponsors")
    .select("id")
    .eq("privy_id", privyId)
    .maybeSingle();
  if (error) throw error;
  return data?.id ?? null;
}
