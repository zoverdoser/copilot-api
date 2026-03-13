import { Hono } from "hono"

import { validateKey } from "~/lib/auth-key"
import { state } from "~/lib/state"

export const tokenRoute = new Hono()

tokenRoute.get("/", (c) => {
  const authError = validateKey(c)
  if (authError) return authError
  try {
    return c.json({
      token: state.copilotToken,
    })
  } catch (error) {
    console.error("Error fetching token:", error)
    return c.json({ error: "Failed to fetch token", token: null }, 500)
  }
})
