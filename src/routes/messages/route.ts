import { Hono } from "hono"

import { validateKey } from "~/lib/auth-key"
import { forwardError } from "~/lib/error"

import { handleCountTokens } from "./count-tokens-handler"
import { handleCompletion } from "./handler"

export const messageRoutes = new Hono()

messageRoutes.post("/", async (c) => {
  const authError = validateKey(c)
  if (authError) return authError
  try {
    return await handleCompletion(c)
  } catch (error) {
    return await forwardError(c, error)
  }
})

messageRoutes.post("/count_tokens", async (c) => {
  const authError = validateKey(c)
  if (authError) return authError
  try {
    return await handleCountTokens(c)
  } catch (error) {
    return await forwardError(c, error)
  }
})
