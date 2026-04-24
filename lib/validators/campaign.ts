import { z } from "zod";

export const VALID_CATEGORIES = [
  "voos",
  "hoteis",
  "fintech",
  "educacao",
  "saude",
  "seguros",
  "software",
  "varejo",
] as const;

export type CampaignCategory = (typeof VALID_CATEGORIES)[number];

export const CREATE_STATUSES = ["active", "paused"] as const;
export const UPDATE_STATUSES = ["active", "paused", "finished"] as const;

export const createCampaignSchema = z.object({
  name: z.string().min(3).max(200),
  category: z.enum(VALID_CATEGORIES),
  target_queries: z.array(z.string().min(2).max(200)).min(1).max(50),
  offer_text: z.string().min(10).max(500),
  max_cpd: z.number().min(0.01).max(100),
  daily_budget: z.number().min(1).max(100_000),
  status: z.enum(CREATE_STATUSES).default("active"),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;

export const updateCampaignSchema = z
  .object({
    name: z.string().min(3).max(200),
    category: z.enum(VALID_CATEGORIES),
    target_queries: z.array(z.string().min(2).max(200)).min(1).max(50),
    offer_text: z.string().min(10).max(500),
    max_cpd: z.number().min(0.01).max(100),
    daily_budget: z.number().min(1).max(100_000),
    status: z.enum(UPDATE_STATUSES),
  })
  .partial();

export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;

export const campaignIdSchema = z.string().uuid();

export const listCampaignsQuerySchema = z.object({
  status: z.enum(UPDATE_STATUSES).optional(),
  category: z.enum(VALID_CATEGORIES).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type ListCampaignsQuery = z.infer<typeof listCampaignsQuerySchema>;
