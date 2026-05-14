import { Link } from 'react-router-dom'
import './Page.css'

const topics = [
  {
    slug: 'fundamentals',
    title: 'Fundamentals',
    blurb: 'Posture, basic strokes, and getting comfortable with the instrument.',
  },
  {
    slug: 'solkattu',
    title: 'Solkattu & syllables',
    blurb: 'Spoken rhythm, mapping syllables to strokes, and simple exercises.',
  },
  {
    slug: 'thalam',
    title: 'Thalam & nadai',
    blurb: 'Keeping time, common talas, and how nadai changes feel and phrasing.',
  },
  {
    slug: 'korvais',
    title: 'Korvais & moharas',
    blurb: 'Structural ideas for endings; pairs well with the Korvai AI section later.',
  },
]

export default function LessonsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">Lessons</h1>
        <p className="page-header__intro">
          Lesson modules are organized by topic. Each link opens a dedicated page where detailed
          articles, notation, and exercises will live as the site grows.
        </p>
      </header>

      <ul className="lesson-list">
        {topics.map((t) => (
          <li key={t.slug} className="lesson-list__item">
            <Link to={`/lessons/${t.slug}`} className="lesson-list__link">
              <span className="lesson-list__title">{t.title}</span>
              <span className="lesson-list__blurb">{t.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
