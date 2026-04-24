import { NextResponse } from "next/server";

export interface ApiErrorBody {
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

function make(status: number, code: string, message: string, details?: unknown) {
  const body: ApiErrorBody = { error: { message, code } };
  if (details !== undefined) body.error.details = details;
  return NextResponse.json(body, { status });
}

export const badRequest = (message = "Invalid request", details?: unknown) =>
  make(400, "BAD_REQUEST", message, details);

export const unauthorized = (message = "Unauthorized") =>
  make(401, "UNAUTHORIZED", message);

export const forbidden = (message = "Forbidden") =>
  make(403, "FORBIDDEN", message);

export const notFound = (resource: string) =>
  make(404, "NOT_FOUND", `${resource} not found`);

export const internalError = (message = "Internal error") =>
  make(500, "INTERNAL_ERROR", message);
