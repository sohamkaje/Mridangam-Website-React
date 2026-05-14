import { Outlet } from 'react-router-dom'
import '../Page.css'
import './History.css'

export default function HistoryLayout() {
  return (
    <div className="history-shell page page--wide">
      <header className="history-shell__header">
        <h1 className="page-header__title">History</h1>
        <p className="page-header__intro history-shell__intro">
          Context on lineages, the instrument itself, Sangita Kalanidhi, and vocalists who treat{' '}
          <em>laya</em> as a first-class part of kutcheri craft. Use the <strong>History</strong>{' '}
          menu in the top bar to jump between sections.
        </p>
      </header>

      <Outlet />
    </div>
  )
}
