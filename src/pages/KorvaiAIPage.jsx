import { Link } from 'react-router-dom'
import './Page.css'

export default function KorvaiAIPage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">Korvai AI</h1>
        <p className="page-header__intro">
          This area is reserved for an in-browser assistant that helps you draft and revise korvai
          patterns: you describe the thalam, eduppu, and length, and the model proposes notation or
          solkattu-style text you can refine.
        </p>
      </header>

      <div className="callout callout--muted">
        <h2 className="callout__title">Status</h2>
        <p>
          The page structure and navigation are in place; the AI workflow (prompt UI, safeguards, and
          API wiring) will be implemented in a later step once you choose how you want to host the
          model (browser-only vs. a small backend).
        </p>
        <p className="callout__footer">
          Until then, see <Link to="/lessons/korvais">Korvais & moharas</Link> for where written
          lessons will support the same ideas.
        </p>
      </div>
    </div>
  )
}
