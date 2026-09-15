import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import Logo from '../Header/Logo.jsx'

const NAV = [
  { label: '처음으로', to: '/' },
  { label: '회사소개', to: '/about' },
  { label: '뉴스룸', to: '/newsroom' },
  { label: '채용', href: 'https://uneedcomms.ninehire.site/', external: true },
]

export default function Footer({ sitemap = true }) {
  return (
    <footer className={styles.footer}>
      {/* 블루 사이트맵 — 홈에서만 노출 (서브페이지는 sitemap={false}) */}
      {sitemap && (
        <div className={styles.top}>
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
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.to} to={item.to} className={styles.navLink}>
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}

      {/* 블랙 하단 — 회사 정보 */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <div className={styles.company}>
            <p className={styles.companyName}>(주) 유니드컴즈</p>
            <div className={styles.infoBlock}>
              <p className={styles.info}>
                대표자: 양재필, 전형신&nbsp;&nbsp;&nbsp;&nbsp;사업자등록번호 : 220-88-93926
              </p>
              <p className={styles.info}>
                주소: 서울특별시 마포구 양화로 81, L1층 L105호(서교동, 패스트파이브 합정점)
              </p>
            </div>
          </div>
          <div className={styles.legal}>
            <a href="mailto:public@uneedcomms.com" className={styles.email}>
              public@uneedcomms.com
            </a>
            <span className={styles.copyright}>© 2026 UNEEDCOMMS.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
