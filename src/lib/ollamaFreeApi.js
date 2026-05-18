/**
 * OllamaFreeAPI — free remote LLM via Python proxy in this repo.
 * Proxy: scripts/ollamafree-proxy.py (port 8000)
 * Start everything: python scripts/run_dev.py  or  npm run dev
 */

export const DEFAULT_OLLAMAFREE_BASE =
  import.meta.env.VITE_OLLAMAFREE_BASE_URL?.replace(/\/$/, '') || '/ollamafree-api'

export const DEFAULT_OLLAMAFREE_MODEL =
  import.meta.env.VITE_OLLAMAFREE_MODEL || 'llama3.2:3b'

export const OLLAMAFREE_OFFLINE_HINT =
  'AI proxy is not running. From the project folder run: npm run dev (or python scripts/run_dev.py). First time: pip install -r scripts/requirements-ai.txt'

export const OLLAMAFREE_SETUP_STEPS = [
  'One-time: pip install -r scripts/requirements-ai.txt',
  'Start the project: npm run dev  (runs python scripts/run_dev.py)',
  'That starts the website and the AI proxy on port 8000 automatically.',
  'On Korvai AI, click Test connection, then enable AI and generate.',
  'Website only (no AI): npm run dev:site',
]

function apiUrl(base, path) {
  return `${base.replace(/\/$/, '')}${path}`
}

export function formatOllamaFreeError(err) {
  const msg = err instanceof Error ? err.message : String(err)
  if (
    msg.includes('Failed to fetch') ||
    msg.includes('NetworkError') ||
    msg.includes('ECONNREFUSED') ||
    msg.includes('Load failed')
  ) {
    return OLLAMAFREE_OFFLINE_HINT
  }
  return msg || OLLAMAFREE_OFFLINE_HINT
}

export async function checkOllamaFreeConnection(baseUrl = DEFAULT_OLLAMAFREE_BASE) {
  try {
    const res = await fetch(apiUrl(baseUrl, '/health'), { method: 'GET' })
    if (!res.ok) {
      return { ok: false, error: `Proxy returned HTTP ${res.status}. Is npm run dev running?` }
    }
    const health = await res.json()
    if (health.status !== 'ok') {
      return { ok: false, error: 'Proxy health check failed.' }
    }

    let models = []
    try {
      const modelsRes = await fetch(apiUrl(baseUrl, '/models'))
      if (modelsRes.ok) {
        const data = await modelsRes.json()
        models = data.models ?? []
      }
    } catch {
      /* optional */
    }

    let defaultModel
    try {
      const cfgRes = await fetch(apiUrl(baseUrl, '/config'))
      if (cfgRes.ok) {
        const cfg = await cfgRes.json()
        defaultModel = cfg.default_model
      }
    } catch {
      /* optional */
    }

    return { ok: true, models, defaultModel }
  } catch (err) {
    return { ok: false, error: formatOllamaFreeError(err) }
  }
}

export async function generateKorvaiNarration(
  systemPrompt,
  userPrompt,
  { model = DEFAULT_OLLAMAFREE_MODEL, baseUrl = DEFAULT_OLLAMAFREE_BASE } = {},
) {
  const combined = `${systemPrompt}\n\n---\n\n${userPrompt}`

  const res = await fetch(apiUrl(baseUrl, '/v1/chat/completions'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: combined }],
      stream: false,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(
      body.includes('not found')
        ? `Model "${model}" not available. Try llama3.2:3b`
        : `AI proxy error (${res.status}): ${body.slice(0, 200)}`,
    )
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('Empty response from AI proxy')
  return content.trim()
}
