import { Link } from 'react-router-dom'
// Replace these imports with your own images (e.g. .jpg / .webp) from this folder when ready.
import imgMridangamWide from '../assets/images/home-mridangam-wide.svg'
import imgMridangamClose from '../assets/images/home-mridangam-close.svg'
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

      <section className="section section--instrument" aria-labelledby="instrument-heading">
        <h2 id="instrument-heading" className="section__title">
          What is the mridangam?
        </h2>
        <div className="instrument-block">
          <div className="instrument-block__text prose">
            <p>
              The <strong>mridangam</strong> (also spelled mridangam) is a double-headed barrel drum from
              South India. It is the principal percussion instrument in{' '}
              <strong>Carnatic classical music</strong>, where it supports the melody, marks the tala
              (time cycle), and shapes the energy of a concert through solos, korvais, and rhythmic dialogue
              with other artists.
            </p>
            <p>
              The two faces are tuned differently: the larger bass side (thoppi / eda bage) and the smaller,
              higher-pitched right side (valanthal / vala bage) where most fingering patterns are played.
              Skins are stretched with straps and paste (soru / maida) is applied to get the characteristic
              pitch and timbre. Playing combines hand strokes, finger rolls, and palm work to produce a wide
              vocabulary of sounds used in compositions and improvisation.
            </p>
          </div>
          <div className="instrument-gallery">
            <figure className="instrument-gallery__figure instrument-gallery__figure--wide">
              <img
                src={imgMridangamWide}
                alt="Mridangam instrument (replace this image in src/assets/images)"
                className="instrument-gallery__img"
                width={960}
                height={540}
                loading="lazy"
              />
              <figcaption className="instrument-gallery__caption">Wide shot — swap file in assets and update import.</figcaption>
            </figure>
            <figure className="instrument-gallery__figure">
              <img
                src={imgMridangamClose}
                alt="Mridangam detail (replace this image in src/assets/images)"
                className="instrument-gallery__img"
                width={640}
                height={640}
                loading="lazy"
              />
              <figcaption className="instrument-gallery__caption">Detail or playing angle — same folder.</figcaption>
            </figure>
          </div>
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
