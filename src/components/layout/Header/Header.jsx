import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import Logo from './Logo.jsx'

const NAV = [
  { label: '처음으로', to: '/' },
  { label: '회사소개', to: '/about' },
  { label: '뉴스룸', to: '/newsroom' },
  { label: '채용', href: 'https://uneedcomms.ninehire.site/', external: true },
]

export default function Header({ bordered = false }) {
  const [scrolled, setScrolled] = useState(false) // 스크롤 시 흰 배경
  const [hidden, setHidden] = useState(false) // 다운=숨김 / 업=노출
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y < 80) {
        setHidden(false)
      } else if (y > lastY.current + 4) {
        setHidden(true)
      } else if (y < lastY.current - 4) {
        setHidden(false)
      }
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`${styles.header} ${bordered ? styles.bordered : ''} ${
        scrolled ? styles.scrolled : ''
      } ${hidden ? styles.hidden : ''}`}
    >
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="유니드컴즈 홈">
          <Logo className={styles.logoMark} />
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav}>
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.navLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.to} to={item.to} className={styles.navLink}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className={styles.lang}>
            <button type="button" className={styles.langActive}>KR</button>
            <span className={styles.langDivider} aria-hidden="true" />
            <button type="button" className={styles.langInactive}>EN</button>
          </div>
        </div>
      </div>
    </header>
  )
}
