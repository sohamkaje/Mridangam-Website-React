/** Prompt templates for Korvai AI (OllamaFreeAPI). */

export function buildKorvaiSystemPrompt() {
  return `You are an expert assistant for Carnatic mridangam korvai design.
You help students with matra arithmetic and talam placement.

Rules you must follow:
- Purvangam: pattern and kaarvai alternate; kaarvai after EVERY pattern including the last.
  For 3 equal blocks: 3 × (pattern + kaarvai) = purvangam total.
- Uttarangam: kaarvai only BETWEEN patterns, NOT after the final pattern.
  For 3 blocks: 3 × pattern + 2 × kaarvai = uttarangam total.
- Purvangam + uttarangam must equal a whole number of avartanams.
- Refer to matra COUNTS only (numbers), not sollu syllables, unless the student asks.
- Be concise. Respect the computed breakdown matra counts exactly.
- Mention that the student must verify eduppu and samam with their guru.
- Do not invent fake Sanskrit titles or fake artist quotes.`
}

export function buildKorvaiUserPrompt({ plan, talaLabel, nadaiLabel, matrasPerCycle, repetitions }) {
  const p = plan.purvangam
  const u = plan.uttarangam

  return `Generate a korvai proposal for mridangam practice.

Context:
- Talam: ${talaLabel}
- Nadai: ${nadaiLabel}
- Matras per avartanam: ${matrasPerCycle}
- Pattern repetitions (traditional): ${repetitions}
- Korvai body spans ${plan.summary.avartanamsInBody} avartanam(s)

Computed breakdown (you MUST keep these matra totals):
- Purvangam: ${p.breakdown.formula}
- Uttarangam: ${u.breakdown.formula}

Respond in this structure (markdown headings):

## Purvangam
- Show the (a + b + ...) breakdown again (numbers only)
- Brief note on playing it 3 times and kaarvai role

## Uttarangam
- Show the breakdown again (numbers only)
- Note why kaarvai is omitted after the last pattern

## Samam / eduppu
- 2–3 sentences on landing on samam across ${plan.summary.avartanamsInBody} avartanam(s)

## Practice tip
- One concrete tip for the student`
}
