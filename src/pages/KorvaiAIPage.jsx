import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  beatsForTala,
  generateKorvaiPlan,
  matrasForTalaNadai,
  NADAI_OPTIONS,
  TALA_PRESETS,
} from '../lib/korvaiGenerator'
import { formatNumberLine } from '../lib/korvaiTalam'
import KorvaiTalamGrid from '../components/KorvaiTalamGrid'
import { formatLlmMarkdown } from '../lib/formatLlmMarkdown'
import {
  checkLlmConnection,
  DEFAULT_OLLAMAFREE_MODEL,
  generateKorvaiNarration,
  OLLAMAFREE_SETUP_STEPS,
} from '../lib/korvaiLlm'
import './Page.css'
import './KorvaiAI.css'

function LlmMarkdown({ content }) {
  const html = useMemo(() => formatLlmMarkdown(content), [content])
  return (
    <div
      className="korvai-llm__body prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function BreakdownCard({ title, result, matrasPerCycle, beatsPerCycle }) {
  if (!result.ok) return null

  return (
    <article className="korvai-result">
      <h3 className="korvai-result__title">{title}</h3>
      <p className="korvai-result__formula">{result.breakdown.formula}</p>
      <ul className="korvai-result__segments">
        {result.segments.map((seg, i) => (
          <li key={`${seg.type}-${i}`} className={`korvai-seg korvai-seg--${seg.type}`}>
            <span className="korvai-seg__meta">
              {seg.type === 'pattern' ? 'Pattern' : 'Kaarvai'}
            </span>
            <span className="korvai-seg__count">{seg.matras}</span>
          </li>
        ))}
      </ul>
      <p className="korvai-result__counts-line">
        <strong>Line:</strong> {formatNumberLine(result.segments)}
      </p>
      <KorvaiTalamGrid
        segments={result.segments}
        matrasPerCycle={matrasPerCycle}
        beatsPerCycle={beatsPerCycle}
      />
      <p className="korvai-result__note">{result.note}</p>
    </article>
  )
}

export default function KorvaiAIPage() {
  const [talaId, setTalaId] = useState('adi')
  const [nadaiId, setNadaiId] = useState('chatusra')
  const [matrasPerCycle, setMatrasPerCycle] = useState(32)
  const [matrasManual, setMatrasManual] = useState(false)
  const [purvangamMatras, setPurvangamMatras] = useState(16)
  const [uttarangamMatras, setUttarangamMatras] = useState(16)
  const [repetitions, setRepetitions] = useState(3)
  const [submitted, setSubmitted] = useState(false)
  const [useAi, setUseAi] = useState(false)
  const [aiModel, setAiModel] = useState(DEFAULT_OLLAMAFREE_MODEL)
  const [aiStatus, setAiStatus] = useState('unknown')
  const [aiLastError, setAiLastError] = useState(null)
  const [aiModels, setAiModels] = useState([])
  const [llmLoading, setLlmLoading] = useState(false)
  const [llmError, setLlmError] = useState(null)
  const [llmResponse, setLlmResponse] = useState(null)

  const suggestedMatras = useMemo(
    () => matrasForTalaNadai(talaId, nadaiId),
    [talaId, nadaiId],
  )

  const effectiveMatras = matrasManual ? matrasPerCycle : suggestedMatras

  const plan = useMemo(() => {
    if (!submitted) return null
    return generateKorvaiPlan({
      talaId,
      nadaiId,
      matrasPerCycle: effectiveMatras,
      purvangamMatras: Number(purvangamMatras),
      uttarangamMatras: Number(uttarangamMatras),
      repetitions: Number(repetitions),
    })
  }, [
    submitted,
    talaId,
    nadaiId,
    effectiveMatras,
    purvangamMatras,
    uttarangamMatras,
    repetitions,
  ])

  const beatsPerCycle = beatsForTala(talaId)

  const handleTalaChange = (id) => {
    setTalaId(id)
    if (!matrasManual) setMatrasPerCycle(matrasForTalaNadai(id, nadaiId))
  }

  const handleNadaiChange = (id) => {
    setNadaiId(id)
    if (!matrasManual) {
      setMatrasPerCycle(matrasForTalaNadai(talaId, id))
    }
  }

  const runAiNarration = async (planNow) => {
    const talaLabel = TALA_PRESETS.find((t) => t.id === talaId)?.label ?? talaId
    const nadaiLabel = NADAI_OPTIONS.find((n) => n.id === nadaiId)?.label ?? nadaiId
    setLlmLoading(true)
    setLlmError(null)
    setLlmResponse(null)

    const conn = await checkLlmConnection()
    if (!conn.ok) {
      setAiStatus('offline')
      setAiLastError(conn.error)
      setLlmError(conn.error ?? 'AI backend not reachable.')
      setLlmLoading(false)
      return
    }

    setAiStatus('connected')
    setAiModels(conn.models ?? [])
    setAiLastError(null)
    if (conn.defaultModel && !aiModel) {
      setAiModel(conn.defaultModel)
    }

    try {
      const text = await generateKorvaiNarration(
        {
          plan: planNow,
          talaLabel,
          nadaiLabel,
          matrasPerCycle: effectiveMatras,
          repetitions: Number(repetitions),
        },
        { model: aiModel },
      )
      setLlmResponse(text)
    } catch (err) {
      setLlmError(err instanceof Error ? err.message : 'AI request failed.')
      setAiStatus('offline')
    } finally {
      setLlmLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setLlmResponse(null)
    setLlmError(null)

    if (!useAi) return

    const planNow = generateKorvaiPlan({
      talaId,
      nadaiId,
      matrasPerCycle: effectiveMatras,
      purvangamMatras: Number(purvangamMatras),
      uttarangamMatras: Number(uttarangamMatras),
      repetitions: Number(repetitions),
    })

    if (planNow.ok) {
      await runAiNarration(planNow)
    }
  }

  const retestAi = async () => {
    setAiStatus('checking')
    setAiLastError(null)
    const result = await checkLlmConnection()
    if (result.ok) {
      setAiStatus('connected')
      setAiModels(result.models ?? [])
      if (result.defaultModel) setAiModel(result.defaultModel)
    } else {
      setAiStatus('offline')
      setAiLastError(result.error)
    }
  }

  const applySuggestedMatras = () => {
    setMatrasPerCycle(suggestedMatras)
    setMatrasManual(false)
  }

  return (
    <div className="page page--wide korvai-page">
      <header className="page-header">
        <h1 className="page-header__title">Korvai AI</h1>
        <p className="page-header__intro">
          Describe your tala, nadai, and matras in one avartanam, then set purvangam and uttarangam
          lengths. The site computes matra counts laid on your talam, then optionally uses free AI (
          <a href="https://github.com/mfoud444/ollamafreeapi" target="_blank" rel="noreferrer">
            OllamaFreeAPI
          </a>
          ) for extra notes.
        </p>
      </header>

      <div className="korvai-ollama-setup callout callout--muted">
        <h2 className="korvai-ollama-setup__title">Free AI (OllamaFreeAPI)</h2>
        <p className="korvai-ollama-setup__text">
          Run <code>npm run dev</code> — that runs <code>python scripts/run_dev.py</code>, which
          starts this website and the Python AI proxy on port <strong>8000</strong>. One-time:{' '}
          <code>pip install -r scripts/requirements-ai.txt</code>
        </p>

        <ol className="korvai-ollama-setup__steps">
          {OLLAMAFREE_SETUP_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="korvai-ollama-setup__row">
          <span
            className={`korvai-ollama-status korvai-ollama-status--${
              aiStatus === 'connected'
                ? 'ok'
                : aiStatus === 'checking'
                  ? 'wait'
                  : aiStatus === 'offline'
                    ? 'bad'
                    : 'wait'
            }`}
          >
            {aiStatus === 'connected' && 'Connected'}
            {aiStatus === 'offline' && 'Not reachable — run npm run dev'}
            {aiStatus === 'checking' && 'Checking…'}
            {aiStatus === 'unknown' && 'Not tested yet — click Test connection'}
          </span>
          <button type="button" className="button button--ghost korvai-ollama-setup__btn" onClick={retestAi}>
            Test connection
          </button>
        </div>
        {aiLastError && aiStatus === 'offline' && (
          <p className="korvai-ollama-setup__error" role="alert">
            {aiLastError}
          </p>
        )}
        <label className="korvai-field korvai-field--inline">
          <input type="checkbox" checked={useAi} onChange={(e) => setUseAi(e.target.checked)} />
          <span>Enhance results with free AI after generating math</span>
        </label>
        {useAi && (
          <label className="korvai-field">
            <span className="korvai-field__label">Model name</span>
            <input
              type="text"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              placeholder={DEFAULT_OLLAMAFREE_MODEL}
              list="ai-model-list"
            />
            {aiModels.length > 0 && (
              <datalist id="ai-model-list">
                {aiModels.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            )}
          </label>
        )}
      </div>

      <form className="korvai-form" onSubmit={handleSubmit}>
        <div className="korvai-form__grid">
          <label className="korvai-field">
            <span className="korvai-field__label">Talam</span>
            <select value={talaId} onChange={(e) => handleTalaChange(e.target.value)}>
              {TALA_PRESETS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label className="korvai-field">
            <span className="korvai-field__label">Nadai</span>
            <select value={nadaiId} onChange={(e) => handleNadaiChange(e.target.value)}>
              {NADAI_OPTIONS.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </label>

          <label className="korvai-field">
            <span className="korvai-field__label">Matras in one cycle (avartanam)</span>
            <input
              type="number"
              min={1}
              max={128}
              value={matrasManual ? matrasPerCycle : suggestedMatras}
              onChange={(e) => {
                setMatrasManual(true)
                setMatrasPerCycle(Number(e.target.value))
              }}
            />
            <button type="button" className="korvai-field__hint-btn" onClick={applySuggestedMatras}>
              Use suggested: {suggestedMatras}
            </button>
          </label>

          <label className="korvai-field">
            <span className="korvai-field__label">Purvangam matras (one design)</span>
            <input
              type="number"
              min={6}
              max={96}
              value={purvangamMatras}
              onChange={(e) => setPurvangamMatras(e.target.value)}
            />
          </label>

          <label className="korvai-field">
            <span className="korvai-field__label">Uttarangam matras (one design)</span>
            <input
              type="number"
              min={5}
              max={96}
              value={uttarangamMatras}
              onChange={(e) => setUttarangamMatras(e.target.value)}
            />
            <span className="korvai-field__hint">
              Purvangam + uttarangam must be a multiple of {effectiveMatras} (one cycle). Now:{' '}
              {Number(purvangamMatras) + Number(uttarangamMatras)} matras
              {(Number(purvangamMatras) + Number(uttarangamMatras)) % effectiveMatras === 0
                ? ' ✓'
                : ` — off by ${(Number(purvangamMatras) + Number(uttarangamMatras)) % effectiveMatras}`}
            </span>
          </label>

          <label className="korvai-field">
            <span className="korvai-field__label">Pattern repetitions (usually 3)</span>
            <input
              type="number"
              min={2}
              max={6}
              value={repetitions}
              onChange={(e) => setRepetitions(e.target.value)}
            />
          </label>

        </div>

        <button type="submit" className="button button--primary korvai-form__submit">
          Generate korvai breakdown
        </button>
      </form>

      <details className="korvai-explainer">
        <summary>How purvangam & uttarangam math works</summary>
        <div className="prose">
          <p>
            A korvai is built in two main parts. Each part is designed so that when played in the
            traditional threefold way, it can land on <strong>samam</strong> or your chosen{' '}
            <strong>eduppu</strong>.
          </p>
          <p>
            <strong>Purvangam:</strong> pattern and kaarvai alternate, with kaarvai after each
            pattern (including the last). For three equal blocks:{' '}
            <em>3 × (pattern + kaarvai) = total</em> — e.g. 3 × (6 + 2) = 24.
          </p>
          <p>
            <strong>Uttarangam:</strong> kaarvai only between patterns, not after the final one:{' '}
            <em>3 × pattern + 2 × kaarvai = total</em> — e.g. 3 × 6 + 2 × 3 = 24.
          </p>
          <p>
            <strong>Cycle:</strong> purvangam + uttarangam must equal a whole number of avartanams
            (e.g. 16 + 16 = 32 for one Adi cycle in chatusra nadai).
          </p>
        </div>
      </details>

      {submitted && plan && (
        <section className="korvai-output" aria-live="polite">
          {!plan.ok && (
            <div className="korvai-errors">
              {(plan.cycleErrors ?? []).map((err) => (
                <p key={err}>{err}</p>
              ))}
              {[...(plan.purvangam.errors ?? []), ...(plan.uttarangam.errors ?? [])].map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          )}

          {plan.ok && (
            <>
              <div className="korvai-summary callout callout--muted">
                <p>
                  <strong>Cycle:</strong> {effectiveMatras} matras per avartanam ({' '}
                  {TALA_PRESETS.find((t) => t.id === talaId)?.label}, {NADAI_OPTIONS.find((n) => n.id === nadaiId)?.label}
                  ).
                </p>
                <p>
                  <strong>Korvai body</strong> (purvangam + uttarangam once):{' '}
                  {plan.summary.korvaiBodyPerRound} matras ={' '}
                  {plan.summary.avartanamsInBody} avartanam
                  {plan.summary.avartanamsInBody !== 1 ? 's' : ''} ({effectiveMatras} matras each).
                </p>
                <p>
                  <strong>×{repetitions} tradition:</strong> each anga is often rendered three times;
                  combined matras if counted straight: {plan.summary.ifEachAngaPlayedThreeTimes} (before
                  extra samam kaarvai between triplet groups).
                </p>
              </div>

              {plan.purvangam.ok && plan.uttarangam.ok && (
                <KorvaiTalamGrid
                  title="Full korvai (purvangam + uttarangam) on talam"
                  segments={[...plan.purvangam.segments, ...plan.uttarangam.segments]}
                  matrasPerCycle={effectiveMatras}
                  beatsPerCycle={beatsPerCycle}
                />
              )}

              <div className="korvai-results">
                <BreakdownCard
                  title="Purvangam"
                  result={plan.purvangam}
                  matrasPerCycle={effectiveMatras}
                  beatsPerCycle={beatsPerCycle}
                />
                <BreakdownCard
                  title="Uttarangam"
                  result={plan.uttarangam}
                  matrasPerCycle={effectiveMatras}
                  beatsPerCycle={beatsPerCycle}
                />
              </div>

              {useAi && (
                <article className="korvai-llm">
                  <h3 className="korvai-llm__title">AI narration</h3>
                  {llmLoading && (
                    <p className="korvai-llm__status" role="status">
                      Asking {aiModel} for practice notes…
                    </p>
                  )}
                  {llmError && (
                    <div className="korvai-errors">
                      <p>{llmError}</p>
                      <p className="korvai-llm__hint">
                        Run <code>npm run dev</code> (starts the Python proxy on port 8000), then
                        Test connection. Model:{' '}
                        <code>{aiModel || DEFAULT_OLLAMAFREE_MODEL}</code>
                      </p>
                    </div>
                  )}
                  {llmResponse && !llmLoading && <LlmMarkdown content={llmResponse} />}
                </article>
              )}
            </>
          )}
        </section>
      )}

      <p className="korvai-footer-note">
        This is a practice assistant, not a guru. Verify eduppu, nadai, and sollu with your teacher.{' '}
        <Link to="/lessons/solkattu">Solkattu syllables</Link> ·{' '}
        <Link to="/lessons/korvais">Korvais lesson</Link>
      </p>
    </div>
  )
}
