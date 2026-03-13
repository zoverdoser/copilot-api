import { Hono } from "hono"

import { validateKey } from "~/lib/auth-key"
import { forwardError } from "~/lib/error"

import { handleCompletion } from "./handler"

export const completionRoutes = new Hono()

completionRoutes.post("/", async (c) => {
  const authError = validateKey(c)
  if (authError) return authError
  try {
    return await handleCompletion(c)
  } catch (error) {
    return await forwardError(c, error)
  }
})
