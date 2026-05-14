import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LessonsPage from './pages/LessonsPage'
import LessonTopicPage from './pages/LessonTopicPage'
import KorvaiAIPage from './pages/KorvaiAIPage'
import AboutPage from './pages/AboutPage'
import HistoryLayout from './pages/history/HistoryLayout'
import HistoryMastersPage from './pages/history/HistoryMastersPage'
import HistoryKindsPage from './pages/history/HistoryKindsPage'
import HistoryAwardeesPage from './pages/history/HistoryAwardeesPage'
import HistoryLayaSingersPage from './pages/history/HistoryLayaSingersPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="lessons" element={<LessonsPage />} />
        <Route path="lessons/:topicSlug" element={<LessonTopicPage />} />
        <Route path="history" element={<HistoryLayout />}>
          <Route index element={<Navigate to="masters" replace />} />
          <Route path="masters" element={<HistoryMastersPage />} />
          <Route path="kinds" element={<HistoryKindsPage />} />
          <Route path="awardees" element={<HistoryAwardeesPage />} />
          <Route path="laya-singers" element={<HistoryLayaSingersPage />} />
        </Route>
        <Route path="korvai-ai" element={<KorvaiAIPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
