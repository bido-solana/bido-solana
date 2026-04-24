# Campaigns API

All endpoints require a Privy access token in `Authorization: Bearer <token>`.

## Error envelope

Every non-2xx response uses the same shape (built by [lib/api/errors.ts](../lib/api/errors.ts)):

```json
{ "error": { "message": "...", "code": "BAD_REQUEST", "details": { } } }
```

| code             | status | when                                                     |
|------------------|-------:|----------------------------------------------------------|
| `BAD_REQUEST`    | 400    | JSON parse, zod validation, or invalid UUID              |
| `UNAUTHORIZED`   | 401    | missing/invalid Privy token                              |
| `FORBIDDEN`      | 403    | campaign exists but belongs to another sponsor           |
| `NOT_FOUND`      | 404    | campaign or sponsor missing                              |
| `INTERNAL_ERROR` | 500    | unexpected exception (details logged server-side only)   |

## Endpoints

### `POST /api/campaigns`

Create a new campaign for the authenticated sponsor. Returns 201 with the created row.

Body ([createCampaignSchema](../lib/validators/campaign.ts)):

```json
{
  "name": "Viagens Brasil → EUA",
  "category": "voos",
  "target_queries": ["voos baratos eua", "passagem ny"],
  "offer_text": "Temos as melhores tarifas para Nova York em maio.",
  "max_cpd": 0.35,
  "daily_budget": 200,
  "status": "active"
}
```

Valid categories: `voos`, `hoteis`, `fintech`, `educacao`, `saude`, `seguros`, `software`, `varejo`.

### `GET /api/campaigns`

List campaigns owned by the authenticated sponsor. Ordered by `created_at DESC`.

Query params (all optional): `status`, `category`, `limit` (default 20, max 100), `offset` (default 0).

Response 200:

```json
{ "campaigns": [...], "total": 42, "limit": 20, "offset": 0 }
```

### `GET /api/campaigns/:id`

Returns a single campaign. `404` if it doesn't exist, `403` if it belongs to another sponsor.

### `PATCH /api/campaigns/:id`

Partial update. Body is the same as `POST` but every field optional; `status` additionally accepts `"finished"`. Empty body returns the current row unchanged.

### `DELETE /api/campaigns/:id`

Deletes the campaign. Response: `{ "deleted": true, "id": "<uuid>" }`.

## curl examples

```bash
PRIVY_TOKEN="eyJ..."
BASE="http://localhost:3000/api/campaigns"

# Create
curl -X POST "$BASE" \
  -H "Authorization: Bearer $PRIVY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Viagens Brasil -> EUA",
    "category":"voos",
    "target_queries":["voos baratos eua","passagem ny"],
    "offer_text":"Temos as melhores tarifas para Nova York em maio.",
    "max_cpd":0.35,
    "daily_budget":200
  }'

# List — only active
curl "$BASE?status=active&limit=10" -H "Authorization: Bearer $PRIVY_TOKEN"

# Get one
curl "$BASE/<CAMPAIGN_ID>" -H "Authorization: Bearer $PRIVY_TOKEN"

# Pause it
curl -X PATCH "$BASE/<CAMPAIGN_ID>" \
  -H "Authorization: Bearer $PRIVY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"paused"}'

# Delete
curl -X DELETE "$BASE/<CAMPAIGN_ID>" -H "Authorization: Bearer $PRIVY_TOKEN"
```

## Using the `useCampaigns` hook

```tsx
"use client";

import { useCampaigns } from "@/hooks/use-campaigns";

export function CampaignsList() {
  const {
    campaigns,
    total,
    isLoading,
    error,
    filterByStatus,
    setFilterByStatus,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  } = useCampaigns();

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <select
        value={filterByStatus ?? ""}
        onChange={(e) => setFilterByStatus((e.target.value || undefined) as never)}
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="finished">Finished</option>
      </select>

      <p>{total} campaign(s)</p>

      <ul>
        {campaigns.map((c) => (
          <li key={c.id}>
            {c.name} — {c.status}
            <button onClick={() => updateCampaign(c.id, { status: "paused" })}>
              Pause
            </button>
            <button onClick={() => deleteCampaign(c.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button
        onClick={() =>
          createCampaign({
            name: "New campaign",
            category: "voos",
            target_queries: ["test query"],
            offer_text: "Offer text long enough to pass validation.",
            max_cpd: 0.5,
            daily_budget: 100,
            status: "active",
          })
        }
      >
        New
      </button>
    </div>
  );
}
```
