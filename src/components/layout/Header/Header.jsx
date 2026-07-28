import styles from './Header.module.css'

const NAV = [
  { label: '회사소개', href: '#about' },
  { label: '뉴스룸', href: '#newsroom' },
  { label: '채용', href: '#careers' },
]

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label="유니드컴즈 홈">
          UneedComms
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
