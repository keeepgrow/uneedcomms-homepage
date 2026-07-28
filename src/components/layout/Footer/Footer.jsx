import styles from './Footer.module.css'

const INFO = [
  '대표자: 양재필, 전형신',
  '사업자등록번호 : 220-88-93926',
  '문의: public@uneedcomms.com',
  '주소: 서울특별시 마포구 양화로 81, L1층 L105호(서교동, 패스트파이브 합정점)',
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.company}>(주) 유니드컴즈</p>

        <div className={styles.bottom}>
          <p className={styles.info}>
            {INFO.map((text, i) => (
              <span key={text} className={styles.infoItem}>
                {text}
                {i < INFO.length - 1 && (
                  <span className={styles.dot} aria-hidden="true">
                    ∙
                  </span>
                )}
              </span>
            ))}
          </p>
          <p className={styles.copyright}>
            Copyrights © 2022 UNEEDCOMMS All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
