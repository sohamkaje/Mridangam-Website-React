/**
 * Lay korvai segments on a talam beat grid (matra counts only, no sollu).
 */

export function formatNumberLine(segments) {
  return segments
    .map((s) => (s.type === 'kaarvai' ? `K${s.matras}` : String(s.matras)))
    .join(' · ')
}

/**
 * @param {Array<{type: string, matras: number}>} segments
 * @param {number} matrasPerCycle
 * @param {number} beatsPerCycle
 */
export function buildTalamLayout(segments, matrasPerCycle, beatsPerCycle) {
  const numberLine = formatNumberLine(segments)
  const total = segments.reduce((n, s) => n + s.matras, 0)

  if (!beatsPerCycle || !matrasPerCycle || matrasPerCycle % beatsPerCycle !== 0) {
    return { numberLine, total, avartanams: [], matrasPerBeat: null }
  }

  const matrasPerBeat = matrasPerCycle / beatsPerCycle
  const avartanamCount = Math.max(1, Math.ceil(total / matrasPerCycle))
  const avartanams = []

  for (let a = 0; a < avartanamCount; a++) {
    const cycleStart = a * matrasPerCycle
    const beats = []

    for (let b = 0; b < beatsPerCycle; b++) {
      const beatStart = cycleStart + b * matrasPerBeat
      const beatEnd = beatStart + matrasPerBeat
      const labels = []
      let cursor = 0

      for (const seg of segments) {
        const segStart = cursor
        const segEnd = cursor + seg.matras
        if (segStart >= beatEnd) break
        if (segStart >= beatStart && segStart < beatEnd) {
          labels.push({
            matras: seg.matras,
            type: seg.type,
            text: seg.type === 'kaarvai' ? `K${seg.matras}` : String(seg.matras),
          })
        }
        cursor = segEnd
      }

      beats.push({ beat: b + 1, labels })
    }

    avartanams.push({ index: a + 1, beats })
  }

  return { numberLine, total, avartanams, matrasPerBeat, beatsPerCycle }
}
