import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LessonsPage from './pages/LessonsPage'
import LessonTopicPage from './pages/LessonTopicPage'
import KorvaiAIPage from './pages/KorvaiAIPage'
import AboutPage from './pages/AboutPage'
import HistoryPage from './pages/HistoryPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="lessons" element={<LessonsPage />} />
        <Route path="lessons/:topicSlug" element={<LessonTopicPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="korvai-ai" element={<KorvaiAIPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
