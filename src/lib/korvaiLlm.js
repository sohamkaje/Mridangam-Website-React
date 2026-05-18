import { buildKorvaiSystemPrompt, buildKorvaiUserPrompt } from './korvaiPrompts'
import {
  checkOllamaFreeConnection,
  DEFAULT_OLLAMAFREE_MODEL,
  generateKorvaiNarration as chatKorvai,
  OLLAMAFREE_SETUP_STEPS,
} from './ollamaFreeApi'

export { DEFAULT_OLLAMAFREE_MODEL, OLLAMAFREE_SETUP_STEPS }

export const checkLlmConnection = checkOllamaFreeConnection

export async function generateKorvaiNarration(context, { model = DEFAULT_OLLAMAFREE_MODEL } = {}) {
  const system = buildKorvaiSystemPrompt()
  const user = buildKorvaiUserPrompt(context)
  return chatKorvai(system, user, { model })
}
