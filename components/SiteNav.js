import Link from 'next/link'
import { useRouter } from 'next/router'

const NAV_LINKS = [
  { href: '/', label: 'About', match: /^\/$/ },
  { href: '/projects', label: 'Projects', match: /^\/projects(\/.*)?$/ },
  { href: '/art', label: 'Art', match: /^\/art(\/.*)?$/ },
  { href: '/posts', label: 'Blog', match: /^\/posts(\/.*)?$/ }
]

export default function SiteNav() {
  const { asPath } = useRouter()

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="site-nav__container">
        {NAV_LINKS.map(({ href, label, match }) => {
          const isActive = match.test(asPath)
          const className = `site-nav__link${isActive ? ' site-nav__link--active' : ''}`

          if (isActive) {
            return (
              <span key={href} className={className} aria-current="page">
                {label}
              </span>
            )
          }

          return (
            <Link key={href} href={href} legacyBehavior>
              <a className={className}>{label}</a>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
