import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import Logo from '../Header/Logo.jsx'
import dots from '../../../assets/footer-dots.png'
import { useLang } from '../../../i18n/LanguageContext.jsx'

const NAV = [
  { label: '홈', to: '/' },
  { label: '회사소개', to: '/about' },
  { label: '뉴스룸', to: '/newsroom' },
  { label: '채용', href: 'https://uneedcomms.ninehire.site/', external: true },
]

export default function Footer({ sitemap = true }) {
  const { t, lang } = useLang()
  const dotsRef = useRef(null)

  // 푸터 끝으로 스크롤할수록 도트가 부드럽게 위로 최대 100px 상승 (스크롤 연동)
  useEffect(() => {
    if (!sitemap) return
    const el = dotsRef.current
    if (!el) return
    const RANGE = 600 // 하단 600px 구간에서 서서히 상승
    let raf = 0
    const update = () => {
      raf = 0
      const winBottom = window.scrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const dist = docHeight - winBottom // 페이지 맨 아래에서 0
      const p = Math.min(Math.max(1 - dist / RANGE, 0), 1)
      el.style.transform = `translate(-50%, ${(1 - p) * 100}px)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [sitemap])

  return (
    <footer className={styles.footer}>
      {/* 블루 사이트맵 — 홈에서만 노출 (서브페이지는 sitemap={false}) */}
      {sitemap && (
        <div className={styles.top}>
          {/* 도트 산맥 (전체폭, 하단) — 검은 배경 원본을 invert+multiply로 블루 위 어둡게 */}
          <img
            ref={dotsRef}
            className={styles.dots}
            src={dots}
            alt=""
            aria-hidden="true"
          />
          <div className={`container ${styles.topInner}`}>
            <Link to="/" className={styles.logoLink} aria-label="유니드컴즈 홈">
              <Logo className={styles.logo} mono />
            </Link>
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
                    {t(item.label)}
                  </a>
                ) : (
                  <Link key={item.to} to={item.to} className={styles.navLink}>
                    {t(item.label)}
                  </Link>
                )
              )}
            </nav>
          </div>
          <p className={styles.closing}>
            {lang === 'en' ? 'Beyond Knowledge. Toward Wisdom.' : '지식을 넘어, 지혜로,'}
          </p>
        </div>
      )}

      {/* 블랙 하단 — 회사 정보 */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <div className={styles.company}>
            <p className={styles.companyName}>{t('(주) 유니드컴즈')}</p>
            <p className={styles.info}>
              {t(
                '대표자: 양재필, 전형신    사업자등록번호 : 220-88-93926'
              )}
            </p>
            <p className={styles.info}>
              {t(
                '주소: 서울특별시 마포구 양화로 81, L1층 L105호(서교동, 패스트파이브 합정점)'
              )}
            </p>
          </div>
          <div className={styles.legal}>
            <a href="mailto:public@uneedcomms.com" className={styles.email}>
              {t('public@uneedcomms.com')}
            </a>
            <span className={styles.copyright}>© 2026 UNEEDCOMMS.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
