import { type NextRequest, NextResponse } from "next/server";
import { authenticatePrivyRequest } from "@/lib/api/privy-auth";
import {
  badRequest,
  forbidden,
  internalError,
  notFound,
} from "@/lib/api/errors";
import {
  campaignIdSchema,
  updateCampaignSchema,
} from "@/lib/validators/campaign";
import {
  deleteCampaign,
  getCampaignById,
  getSponsorIdByPrivyId,
  updateCampaign,
} from "@/lib/db/campaigns";

type RouteContext = { params: Promise<{ id: string }> };

async function resolveOwnedCampaign(
  request: NextRequest,
  context: RouteContext
) {
  const auth = await authenticatePrivyRequest(request);
  if (!auth.ok) return { kind: "response" as const, response: auth.response };

  const { id: rawId } = await context.params;
  const idCheck = campaignIdSchema.safeParse(rawId);
  if (!idCheck.success) {
    return { kind: "response" as const, response: badRequest("Invalid campaign id") };
  }
  const id = idCheck.data;

  const sponsorId = await getSponsorIdByPrivyId(auth.payload.sub);
  if (!sponsorId) {
    return {
      kind: "response" as const,
      response: notFound("Sponsor. Call /api/sponsors/sync first."),
    };
  }

  const campaign = await getCampaignById(id);
  if (!campaign) {
    return { kind: "response" as const, response: notFound("Campaign") };
  }
  if (campaign.sponsor_id !== sponsorId) {
    return { kind: "response" as const, response: forbidden() };
  }

  return { kind: "ok" as const, id, campaign, sponsorId };
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const resolved = await resolveOwnedCampaign(request, context);
    if (resolved.kind === "response") return resolved.response;
    return NextResponse.json(resolved.campaign);
  } catch (err) {
    console.error("[campaigns/[id] GET] unexpected error:", err);
    return internalError();
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const resolved = await resolveOwnedCampaign(request, context);
    if (resolved.kind === "response") return resolved.response;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return badRequest("Body must be valid JSON");
    }

    const parsed = updateCampaignSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Invalid body", parsed.error.flatten());
    }

    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(resolved.campaign);
    }

    const updated = await updateCampaign(resolved.id, parsed.data);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[campaigns/[id] PATCH] unexpected error:", err);
    return internalError();
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const resolved = await resolveOwnedCampaign(request, context);
    if (resolved.kind === "response") return resolved.response;

    await deleteCampaign(resolved.id);
    return NextResponse.json({ deleted: true, id: resolved.id });
  } catch (err) {
    console.error("[campaigns/[id] DELETE] unexpected error:", err);
    return internalError();
  }
}
