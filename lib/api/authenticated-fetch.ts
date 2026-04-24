export type TokenGetter = () => Promise<string | null | undefined>;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * fetch wrapper that adds `Authorization: Bearer <privy-token>`, parses JSON
 * bodies, and throws `ApiError` on non-2xx responses with a useful message.
 */
export async function authenticatedFetch<T = unknown>(
  url: string,
  options: RequestInit,
  getToken: TokenGetter
): Promise<T> {
  const token = await getToken();
  if (!token) throw new ApiError(401, "Privy access token unavailable");

  const headers = new Headers(options.headers);
  headers.set("authorization", `Bearer ${token}`);
  if (options.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  const res = await fetch(url, { ...options, headers });
  const contentType = res.headers.get("content-type") ?? "";
  const parsed: unknown = contentType.includes("application/json")
    ? await res.json().catch(() => undefined)
    : await res.text().catch(() => undefined);

  if (!res.ok) {
    const msg =
      (typeof parsed === "object" &&
        parsed !== null &&
        "error" in parsed &&
        typeof (parsed as { error: unknown }).error === "object" &&
        (parsed as { error: { message?: string } }).error?.message) ||
      `Request failed: ${res.status}`;
    throw new ApiError(res.status, msg, parsed);
  }

  return parsed as T;
}
