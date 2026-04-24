import { type NextRequest, NextResponse } from "next/server";
import { authenticatePrivyRequest } from "@/lib/api/privy-auth";
import {
  badRequest,
  internalError,
  notFound,
} from "@/lib/api/errors";
import {
  createCampaign,
  getSponsorIdByPrivyId,
  listCampaignsBySponsor,
} from "@/lib/db/campaigns";
import {
  createCampaignSchema,
  listCampaignsQuerySchema,
} from "@/lib/validators/campaign";

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticatePrivyRequest(request);
    if (!auth.ok) return auth.response;

    const sponsorId = await getSponsorIdByPrivyId(auth.payload.sub);
    if (!sponsorId) {
      return notFound("Sponsor. Call /api/sponsors/sync first.");
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return badRequest("Body must be valid JSON");
    }

    const parsed = createCampaignSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Invalid body", parsed.error.flatten());
    }

    const campaign = await createCampaign(sponsorId, parsed.data);
    return NextResponse.json(campaign, { status: 201 });
  } catch (err) {
    console.error("[campaigns POST] unexpected error:", err);
    return internalError();
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticatePrivyRequest(request);
    if (!auth.ok) return auth.response;

    const sponsorId = await getSponsorIdByPrivyId(auth.payload.sub);
    if (!sponsorId) {
      return notFound("Sponsor. Call /api/sponsors/sync first.");
    }

    const rawQuery = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parsed = listCampaignsQuerySchema.safeParse(rawQuery);
    if (!parsed.success) {
      return badRequest("Invalid query params", parsed.error.flatten());
    }

    const { campaigns, total } = await listCampaignsBySponsor(sponsorId, parsed.data);
    return NextResponse.json({
      campaigns,
      total,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
    });
  } catch (err) {
    console.error("[campaigns GET] unexpected error:", err);
    return internalError();
  }
}
