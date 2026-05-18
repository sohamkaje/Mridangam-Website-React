/**
 * Decompose purvangam / uttarangam matra totals into pattern + kaarvai segments.
 * Purvangam: P, K, P, K, …, P, K  (kaarvai after each pattern, including the last)
 * Uttarangam: P, K, P, K, …, P   (kaarvai only between patterns, not after the last)
 */

export const TALA_PRESETS = [
  { id: 'adi', label: 'Adi (8 beats)', defaultMatrasChatusra: 32, beatsPerCycle: 8 },
  { id: 'rupaka', label: 'Rupaka (3 beats)', defaultMatrasChatusra: 12, beatsPerCycle: 3 },
  { id: 'misra-chapu', label: 'Misra chapu', defaultMatrasChatusra: 28, beatsPerCycle: 7 },
  { id: 'khanda-chapu', label: 'Khanda chapu', defaultMatrasChatusra: 20, beatsPerCycle: 5 },
  { id: 'tisra-eka', label: 'Tisra Eka (3 beats)', defaultMatrasChatusra: 9, beatsPerCycle: 3 },
  { id: 'khanda-eka', label: 'Khanda Eka (5 beats)', defaultMatrasChatusra: 15, beatsPerCycle: 5 },
  { id: 'custom', label: 'Custom (set matras below)', defaultMatrasChatusra: 32, beatsPerCycle: 8 },
]

export const NADAI_OPTIONS = [
  { id: 'tisra', label: 'Tisra (3)', factor: 3 },
  { id: 'chatusra', label: 'Chatusra (4)', factor: 4 },
  { id: 'khanda', label: 'Khanda (5)', factor: 5 },
  { id: 'misra', label: 'Misra (7)', factor: 7 },
  { id: 'sankeerna', label: 'Sankeerna (9)', factor: 9 },
]

function sumSegments(segments) {
  return segments.reduce((n, s) => n + s.matras, 0)
}

function formatBreakdown(segments) {
  const parts = segments.map((s) => String(s.matras))
  const total = sumSegments(segments)
  return { parts, formula: `(${parts.join(' + ')}) = ${total}`, total }
}

/** Purvangam: n patterns, n kaarvais → n × (P + K) = total */
export function decomposePurvangam(total, repetitions = 3) {
  const errors = []
  if (total < 6 || !Number.isInteger(total)) {
    return { ok: false, errors: ['Purvangam matras must be a whole number ≥ 6.'] }
  }

  const tryN = [repetitions, 3, 4, 2, 5, 6].filter((n, i, a) => a.indexOf(n) === i)

  for (const n of tryN) {
    if (total % n !== 0) continue
    const unit = total / n

    const candidates = []
    for (let p = 2; p < unit; p++) {
      const k = unit - p
      if (k < 1) continue
      candidates.push({ pattern: p, kaarvai: k, score: Math.abs(p - k * 2) })
    }
    candidates.sort((a, b) => a.score - b.score)

    for (const { pattern, kaarvai } of candidates.slice(0, 8)) {
      const patternSizes = Array(n).fill(pattern)
      const segments = []
      for (let i = 0; i < patternSizes.length; i++) {
        segments.push({ type: 'pattern', matras: patternSizes[i] })
        segments.push({ type: 'kaarvai', matras: kaarvai })
      }

      if (sumSegments(segments) !== total) continue

      return {
        ok: true,
        style: 'purvangam',
        repetitions: n,
        patternMatras: pattern,
        kaarvaiMatras: kaarvai,
        segments,
        breakdown: formatBreakdown(segments),
        note:
          'Purvangam: kaarvai after every pattern (including the last). Numbers shown are matras per block.',
      }
    }
  }

  errors.push(
    `Could not split ${total} purvangam matras into equal (pattern + kaarvai) × ${repetitions} with positive integers. Try a multiple of ${repetitions} (e.g. 24, 27, 30).`,
  )
  return { ok: false, errors }
}

/** Uttarangam: n patterns, (n−1) kaarvais → n×P + (n−1)×K = total */
export function decomposeUttarangam(total, repetitions = 3) {
  const errors = []
  if (total < 5 || !Number.isInteger(total)) {
    return { ok: false, errors: ['Uttarangam matras must be a whole number ≥ 5.'] }
  }

  const n = repetitions
  if (n < 2) {
    return { ok: false, errors: ['Need at least 2 repetitions for uttarangam kaarvai logic.'] }
  }

  for (let pattern = Math.floor(total / n); pattern >= 2; pattern--) {
    const kaarvaiNumerator = total - n * pattern
    if (kaarvaiNumerator <= 0) continue
    if (kaarvaiNumerator % (n - 1) !== 0) continue
    const kaarvai = kaarvaiNumerator / (n - 1)
    if (kaarvai < 1) continue

    const patternSizes = Array(n).fill(pattern)
    const segments = []
    for (let i = 0; i < patternSizes.length; i++) {
      segments.push({ type: 'pattern', matras: patternSizes[i] })
      if (i < patternSizes.length - 1) {
        segments.push({ type: 'kaarvai', matras: kaarvai })
      }
    }

    if (sumSegments(segments) !== total) continue

    return {
      ok: true,
      style: 'uttarangam',
      repetitions: n,
      patternMatras: pattern,
      kaarvaiMatras: kaarvai,
      segments,
      breakdown: formatBreakdown(segments),
      note:
        'Uttarangam: kaarvai only between patterns (not after the last). Numbers shown are matras per block.',
    }
  }

  errors.push(
    `Could not split ${total} uttarangam matras as ${n} patterns with ${n - 1} kaarvais. Example that works: 24 → (6 + 3 + 6 + 3 + 6).`,
  )
  return { ok: false, errors }
}

export function beatsForTala(talaId) {
  return TALA_PRESETS.find((t) => t.id === talaId)?.beatsPerCycle ?? 8
}

export function matrasForTalaNadai(talaId, nadaiId, beatsOverride) {
  const tala = TALA_PRESETS.find((t) => t.id === talaId) ?? TALA_PRESETS[0]
  const nadai = NADAI_OPTIONS.find((n) => n.id === nadaiId) ?? NADAI_OPTIONS[1]
  if (beatsOverride && beatsOverride > 0) {
    return beatsOverride * nadai.factor
  }
  if (talaId === 'custom') return tala.defaultMatrasChatusra
  const base = tala.defaultMatrasChatusra
  const chatusraFactor = 4
  return Math.round((base / chatusraFactor) * nadai.factor)
}

export function generateKorvaiPlan({
  talaId,
  nadaiId,
  matrasPerCycle,
  purvangamMatras,
  uttarangamMatras,
  repetitions = 3,
}) {
  const cycleErrors = []
  const korvaiBody = purvangamMatras + uttarangamMatras
  const triplePlay = korvaiBody * repetitions

  if (matrasPerCycle > 0 && korvaiBody % matrasPerCycle !== 0) {
    const remainder = korvaiBody % matrasPerCycle
    const need = matrasPerCycle - remainder
    cycleErrors.push(
      `Purvangam + uttarangam = ${korvaiBody} matras, which is not a multiple of ${matrasPerCycle} (one avartanam). Add ${need} matras or subtract ${remainder} so the total lands on samam across full cycles.`,
    )
  }

  const purvangam =
    cycleErrors.length > 0
      ? { ok: false, errors: [] }
      : decomposePurvangam(purvangamMatras, repetitions)
  const uttarangam =
    cycleErrors.length > 0
      ? { ok: false, errors: [] }
      : decomposeUttarangam(uttarangamMatras, repetitions)

  const avartanamsInBody =
    matrasPerCycle > 0 && korvaiBody % matrasPerCycle === 0 ? korvaiBody / matrasPerCycle : null

  return {
    context: {
      talaId,
      nadaiId,
      matrasPerCycle,
      repetitions,
      beatsPerCycle: beatsForTala(talaId),
    },
    purvangam,
    uttarangam,
    cycleErrors,
    summary: {
      korvaiBodyPerRound: korvaiBody,
      avartanamsInBody,
      ifEachAngaPlayedThreeTimes: triplePlay,
      landsOnCycle: avartanamsInBody !== null,
    },
    ok: cycleErrors.length === 0 && purvangam.ok && uttarangam.ok,
  }
}
