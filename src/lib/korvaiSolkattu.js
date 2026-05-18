/** Map matra counts to common sollu (approximate; guru’s phrasing may differ). */

const PATTERN_BY_MATRAS = {
  1: 'tha',
  2: 'tha ka',
  3: 'tha kita',
  4: 'tha ka dhi mi',
  5: 'tha dhin gi na thom',
  6: 'tha ka dhi mi tha ka',
  7: 'tha ka dhi mi tha kita',
  8: 'tha ka dhi mi tha ka dhi mi',
  9: 'tha ka dhi mi tha ka tha kita',
  10: 'tha ka dhi mi thaka thari kita',
  11: 'tha ka dhi mi thaka thari kita tha',
  12: 'tha ka dhi mi thaka thari kita thom ,',
}

const KAARVAI_BY_MATRAS = {
  1: '—',
  2: 'dha dha',
  3: 'thom nam',
  4: 'dha di gi na',
  5: 'thadiginathom',
  6: 'thadiginathom dha',
  7: 'thadiginathom dha di',
  8: 'thadiginathom dha di gi',
}

function fallbackPattern(n) {
  if (n <= 12) return PATTERN_BY_MATRAS[n]
  const chunks = []
  let left = n
  while (left > 0) {
    const take = Math.min(left, 4)
    chunks.push(PATTERN_BY_MATRAS[take] ?? `(${take} matras)`)
    left -= take
  }
  return chunks.join(' ')
}

function fallbackKaarvai(n) {
  if (n <= 8) return KAARVAI_BY_MATRAS[n]
  if (n === 5 || n === 10) return 'thadiginathom'.repeat(Math.floor(n / 5)).trim()
  return `(${n} matra kaarvai — ask your guru for sollu)`
}

export function segmentToSolkattu(segment) {
  const n = segment.matras
  if (segment.type === 'pattern') {
    return { label: 'Pattern', matras: n, sollu: fallbackPattern(n) }
  }
  return { label: 'Kaarvai', matras: n, sollu: fallbackKaarvai(n) }
}

export function segmentsToSolkattuLine(segments) {
  return segments.map(segmentToSolkattu)
}

export function fullSolkattuPhrase(segments) {
  return segmentsToSolkattuLine(segments)
    .map((s) => s.sollu)
    .join(' · ')
}
