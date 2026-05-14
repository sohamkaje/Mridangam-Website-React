import { Outlet, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import './Layout.css'

const navLinks = [
  { to: '/', end: true, label: 'Home' },
  { to: '/lessons', label: 'Lessons' },
  { to: '/history', label: 'History' },
  { to: '/korvai-ai', label: 'Korvai AI' },
  { to: '/about', label: 'About' },
]

export default function Layout() {
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
              {navLinks.map(({ to, end, label }) => (
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
