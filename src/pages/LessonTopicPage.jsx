import { Link, useParams } from 'react-router-dom'
import './Page.css'

const topicCopy = {
  fundamentals: {
    title: 'Fundamentals',
    body: 'This section will cover seating, hand position, basic strokes (such as chaapu variants and na finger work), and short practice routines. Placeholder until the first lessons are written.',
  },
  solkattu: {
    title: 'Solkattu & syllables',
    body: 'Here you will find solkattu sequences aligned with mridangam syllables, call-and-response patterns, and audio references when available.',
  },
  thalam: {
    title: 'Thalam & nadai',
    body: 'Explanations of common talas, counting out loud with talam, and exercises in thisra, khanda, misra, and sankeerna nadai.',
  },
  korvais: {
    title: 'Korvais & moharas',
    body: 'How korvais are structured, common eduppu points, and practice strategies. The Korvai AI area will complement this with generative examples you can edit.',
  },
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

  return (
    <div className="page">
      <p className="breadcrumb">
        <Link to="/lessons">Lessons</Link>
        <span aria-hidden="true"> / </span>
        <span>{topic.title}</span>
      </p>
      <h1>{topic.title}</h1>
      <p className="page-lead">{topic.body}</p>
      <p>
        <Link to="/lessons">← All lesson topics</Link>
      </p>
    </div>
  )
}
