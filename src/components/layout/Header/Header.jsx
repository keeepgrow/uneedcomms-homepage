import { useEffect, useState } from 'react'
import styles from './Header.module.css'
import Logo from './Logo.jsx'

const NAV = [
  { label: '처음으로', href: '#top' },
  { label: '회사소개', href: '#about' },
  { label: '뉴스룸', href: '#newsroom' },
  { label: '채용', href: '#careers' },
]

export default function Header() {
  // 히어로(밝은 하늘) 위 → 다크 텍스트 / 검정 섹션 위 → 화이트 텍스트 + 프로스트 배경
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setOnDark(window.scrollY > window.innerHeight * 0.82)
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
    <header className={`${styles.header} ${onDark ? styles.onDark : ''}`}>
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
            <button type="button" className={styles.langActive}>KR</button>
            <span className={styles.langDivider} aria-hidden="true" />
            <button type="button" className={styles.langInactive}>EN</button>
          </div>
        </div>
      </div>
    </header>
  )
}
