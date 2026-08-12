import { useEffect, useState } from 'react'
import styles from './Header.module.css'
import Logo from './Logo.jsx'

const NAV = [
  { label: '회사소개', href: '#about' },
  { label: '뉴스룸', href: '#newsroom' },
  { label: '채용', href: '#careers' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false) // 스크롤 시 프로스트 배경
  const [onLight, setOnLight] = useState(false) // 흰 배경 섹션 위 → 다크 텍스트

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // 히어로(≈100vh)를 지나 밝은 섹션이 헤더에 닿으면 다크로 전환
      setOnLight(y > window.innerHeight * 0.9)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${
        onLight ? styles.onLight : ''
      }`}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label="유니드컴즈 홈">
          <Logo className={styles.logoMark} />
        </a>

        <div className={styles.right}>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.lang}>
            <button type="button" className={styles.langActive}>KOR</button>
            <span className={styles.langDivider} aria-hidden="true" />
            <button type="button" className={styles.langInactive}>ENG</button>
          </div>
        </div>
      </div>
    </header>
  )
}
