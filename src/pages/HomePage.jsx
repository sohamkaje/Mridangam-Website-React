import { Link } from 'react-router-dom'
import './Page.css'

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <h1 className="hero__title">Learn the mridangam</h1>
        <p className="hero__lead">
          Structured lessons, rhythmic concepts, and soon an assistant to help you compose and study{' '}
          <em>korvais</em>—the patterned endings that shape Carnatic performances.
        </p>
        <div className="hero__actions">
          <Link to="/lessons" className="button button--primary">
            Browse lessons
          </Link>
          <Link to="/korvai-ai" className="button button--ghost">
            Korvai AI (preview)
          </Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">On this site</h2>
        <ul className="card-grid">
          <li className="card">
            <h3 className="card__title">Lessons</h3>
            <p className="card__text">
              Step-by-step material from basics to more advanced topics. Individual lesson pages will
              fill in as content is added.
            </p>
            <Link to="/lessons" className="card__link">
              Go to lessons →
            </Link>
          </li>
          <li className="card">
            <h3 className="card__title">Korvai AI</h3>
            <p className="card__text">
              A built-in tool to generate and refine korvai patterns with AI, grounded in the
              constraints you set (thalam, mohara length, and more).
            </p>
            <Link to="/korvai-ai" className="card__link">
              View roadmap →
            </Link>
          </li>
          <li className="card">
            <h3 className="card__title">About</h3>
            <p className="card__text">
              What this project is for, how to use it, and how lesson levels are organized.
            </p>
            <Link to="/about" className="card__link">
              Read about →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
