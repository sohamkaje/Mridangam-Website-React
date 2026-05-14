import { Link, useParams } from 'react-router-dom'
import { solkattuTopic } from '../data/lessonSolkattu'
import './Page.css'

const topicCopy = {
  fundamentals: {
    title: 'Fundamentals',
    body: 'This section will cover seating, hand position, basic strokes (such as chaapu variants and na finger work), and short practice routines. Placeholder until the first lessons are written.',
  },
  solkattu: solkattuTopic,
  thalam: {
    title: 'Thalam & nadai',
    body: 'Explanations of common talas, counting out loud with talam, and exercises in thisra, khanda, misra, and sankeerna nadai.',
  },
  korvais: {
    title: 'Korvais & moharas',
    body: 'How korvais are structured, common eduppu points, and practice strategies. The Korvai AI area will complement this with generative examples you can edit.',
  },
}

function LessonSections({ topic }) {
  return (
    <>
      <p className="page-lead">{topic.lead}</p>
      {topic.sections.map((section, idx) => (
        <section key={`${section.heading}-${idx}`} className="lesson-section">
          <h2 className="lesson-section__title">{section.heading}</h2>
          {section.blurb ? <p className="lesson-section__blurb">{section.blurb}</p> : null}
          {section.blurbs?.map((b, bi) => (
            <p key={`${section.heading}-blurb-${bi}`} className="lesson-section__blurb">
              {b}
            </p>
          ))}
          {section.items ? (
            <ul className="syllable-pill-list" aria-label={section.heading}>
              {section.items.map((s, i) => (
                <li key={`${section.heading}-${i}-${s}`}>
                  <span className="syllable-pill">{s}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {section.rows
            ? section.rows.map((row, i) => (
                <pre key={`${section.heading}-row-${i}`} className="sollu-row">
                  {row}
                </pre>
              ))
            : null}
        </section>
      ))}
    </>
  )
}

export default function LessonTopicPage() {
  const { topicSlug } = useParams()
  const topic = topicCopy[topicSlug]

  if (!topic) {
    return (
      <div className="page">
        <h1>Topic not found</h1>
        <p>No lesson module matches this path yet.</p>
        <p>
          <Link to="/lessons">Back to all lessons</Link>
        </p>
      </div>
    )
  }

  const hasSections = Array.isArray(topic.sections)

  return (
    <div className="page page--wide">
      <p className="breadcrumb">
        <Link to="/lessons">Lessons</Link>
        <span aria-hidden="true"> / </span>
        <span>{topic.title}</span>
      </p>
      <h1>{topic.title}</h1>
      {hasSections ? <LessonSections topic={topic} /> : <p className="page-lead">{topic.body}</p>}
      <p className="lesson-back">
        <Link to="/lessons">← All lesson topics</Link>
      </p>
    </div>
  )
}
