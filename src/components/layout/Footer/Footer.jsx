import styles from './Footer.module.css'
import Logo from '../Header/Logo.jsx'

const NAV = [
  { label: '처음으로', href: '#top' },
  { label: '회사소개', href: '#about' },
  { label: '뉴스룸', href: '#newsroom' },
  { label: '채용', href: '#careers' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* 블루 상단 — 대형 로고 + 메뉴 */}
      <div className={styles.top}>
        <div className={`container ${styles.topInner}`}>
          <Logo className={styles.logo} mono />
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 블랙 하단 — 회사 정보 */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <div className={styles.company}>
            <p className={styles.companyName}>(주) 유니드컴즈</p>
            <p className={styles.info}>
              대표자: 양재필, 전형신&nbsp;&nbsp;&nbsp;&nbsp;사업자등록번호 : 220-88-93926
            </p>
            <p className={styles.info}>
              주소: 서울특별시 마포구 양화로 81, L1층 L105호(서교동, 패스트파이브 합정점)
            </p>
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
