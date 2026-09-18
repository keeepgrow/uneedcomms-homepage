import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import Logo from './Logo.jsx'
import { useLang } from '../../../i18n/LanguageContext.jsx'

const NAV = [
  { label: '홈', to: '/' },
  { label: '회사소개', to: '/about' },
  { label: '뉴스룸', to: '/newsroom' },
  { label: '채용', href: 'https://uneedcomms.ninehire.site/', external: true },
]

// NAV 아이템 렌더링 (외부 링크는 새창, 내부는 라우터 Link)
function NavItem({ item, className, onClick }) {
  const { t } = useLang()
  return item.external ? (
    <a
      href={item.href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {t(item.label)}
    </a>
  ) : (
    <Link to={item.to} className={className} onClick={onClick}>
      {t(item.label)}
    </Link>
  )
}

export default function Header({ bordered = false }) {
  const { lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false) // 스크롤 시 흰 배경
  const [hidden, setHidden] = useState(false) // 다운=숨김 / 업=노출
  const [menuOpen, setMenuOpen] = useState(false) // 모바일 메뉴 드롭박스
  const lastY = useRef(0)
  const headerRef = useRef(null)

  // 메뉴 열림 시: 헤더/메뉴 바깥(빈 화면) 클릭하면 닫기
  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [menuOpen])

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

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${bordered ? styles.bordered : ''} ${
        scrolled ? styles.scrolled : ''
      } ${hidden ? styles.hidden : ''} ${menuOpen ? styles.menuActive : ''}`}
    >
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="유니드컴즈 홈" onClick={closeMenu}>
          <Logo className={styles.logoMark} />
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <NavItem key={item.label} item={item} className={styles.navLink} />
            ))}
          </nav>

          {/* 모바일 전용 메뉴 토글 텍스트 */}
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? '닫기' : '메뉴'}
          </button>

          <div className={styles.lang}>
            <button
              type="button"
              className={lang === 'ko' ? styles.langActive : styles.langInactive}
              onClick={() => setLang('ko')}
              aria-pressed={lang === 'ko'}
            >
              KR
            </button>
            <span className={styles.langDivider} aria-hidden="true" />
            <button
              type="button"
              className={lang === 'en' ? styles.langActive : styles.langInactive}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 화이트 드롭박스 — 상단 메뉴, 가운데 정렬·1줄씩 */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <div className={styles.mobileMenuInner}>
          {NAV.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              className={styles.mobileLink}
              onClick={closeMenu}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
