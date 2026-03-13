import type { Context } from "hono"

import { state } from "./state"

export function extractKeyFromRequest(c: Context): string | undefined {
  // 1. Authorization: Bearer <key>
  const authHeader = c.req.header("Authorization")
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7)
  }

  // 2. Query parameter: ?key=<key>
  const queryKey = c.req.query("key")
  if (queryKey) return queryKey

  // 3. x-api-key header
  const apiKeyHeader = c.req.header("x-api-key")
  if (apiKeyHeader) return apiKeyHeader

  return undefined
}

export function validateKey(c: Context): Response | null {
  if (!state.authKey) return null

  const requestKey = extractKeyFromRequest(c)

  if (!requestKey) {
    return c.json(
      { error: { message: "Missing API key", type: "authentication_error" } },
      401,
    )
  }

  if (requestKey !== state.authKey) {
    return c.json(
      { error: { message: "Invalid API key", type: "authentication_error" } },
      401,
    )
  }

  return null
}
