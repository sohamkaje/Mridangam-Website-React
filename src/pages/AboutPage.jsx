import './Page.css'

export default function AboutPage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">About this site</h1>
      </header>

      <div className="prose">
        <p>
          This project is a focused home for learning Carnatic mridangam: clear lesson paths,
          reference material, and tools that respect how rhythm is actually taught and performed.
        </p>
        <p>
          The <strong>Korvai AI</strong> feature is meant as a practice partner for pattern writing,
          not a replacement for a guru or live classes. When it ships, it will sit alongside written
          lessons so you can compare machine suggestions with traditional forms.
        </p>
        <p>
          If you are building content or curriculum, each route under <code>/lessons</code> can grow
          into its own subsection (articles, PDFs, or embedded audio) without changing the overall
          site map.
        </p>
      </div>
    </div>
  )
}
