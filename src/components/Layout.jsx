import { useRef } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { HISTORY_NAV_SECTIONS } from '../data/historyNav'
import './Layout.css'

const mainNavLinks = [
  { to: '/', end: true, label: 'Home' },
  { to: '/lessons', label: 'Lessons' },
  { to: '/korvai-ai', label: 'Korvai AI' },
  { to: '/about', label: 'About' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const historyDetailsRef = useRef(null)
  const historyNavActive = pathname.startsWith('/history')

  const closeHistoryMenu = () => {
    historyDetailsRef.current?.removeAttribute('open')
  }

  return (
    <div className="site">
      <header className="site-header">
        <NavLink to="/" className="site-brand" end>
          <span className="site-brand__title">Mridangam</span>
          <span className="site-brand__tagline">rhythm & lessons</span>
        </NavLink>
        <div className="site-header__end">
          <nav className="site-nav" aria-label="Main">
            <ul>
              {mainNavLinks.slice(0, 2).map(({ to, end, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

              <li className="site-nav__item site-nav__item--has-dropdown">
                <details ref={historyDetailsRef} className="site-nav__details">
                  <summary
                    className={
                      historyNavActive
                        ? 'site-nav__summary site-nav__summary--active'
                        : 'site-nav__summary'
                    }
                  >
                    History
                  </summary>
                  <ul className="site-nav__dropdown" role="list">
                    {HISTORY_NAV_SECTIONS.map(({ segment, label }) => (
                      <li key={segment}>
                        <NavLink
                          to={`/history/${segment}`}
                          className={({ isActive }) =>
                            isActive
                              ? 'site-nav__dropdown-link site-nav__dropdown-link--active'
                              : 'site-nav__dropdown-link'
                          }
                          onClick={closeHistoryMenu}
                        >
                          {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

              {mainNavLinks.slice(2).map(({ to, end, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Educational resource for Carnatic percussion. Content and AI tools will expand over time.</p>
      </footer>
    </div>
  )
}
