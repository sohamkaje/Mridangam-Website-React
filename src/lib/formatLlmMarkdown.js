/** Lightweight markdown → HTML for LLM output (headings, bold, lists only). */

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function formatLlmMarkdown(markdown) {
  const lines = markdown.split('\n')
  const html = []
  let inList = false

  const closeList = () => {
    if (inList) {
      html.push('</ul>')
      inList = false
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      closeList()
      continue
    }

    if (line.startsWith('## ')) {
      closeList()
      html.push(`<h3>${inlineFormat(escapeHtml(line.slice(3)))}</h3>`)
      continue
    }
    if (line.startsWith('### ')) {
      closeList()
      html.push(`<h4>${inlineFormat(escapeHtml(line.slice(4)))}</h4>`)
      continue
    }
    if (line.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${inlineFormat(escapeHtml(line.slice(2)))}</li>`)
      continue
    }

    closeList()
    html.push(`<p>${inlineFormat(escapeHtml(line))}</p>`)
  }
  closeList()
  return html.join('\n')
}

function inlineFormat(safeText) {
  return safeText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')
}
