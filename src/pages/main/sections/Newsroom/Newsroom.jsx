import { news } from '../../../../data/news.js'
import styles from './Newsroom.module.css'

export default function Newsroom() {
  return (
    <section className={styles.section} id="newsroom">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>언론 속의 유니드컴즈</h2>

        <div className={styles.right}>
          <ul className={styles.list}>
            {news.map((item, i) => (
              <li key={i}>
                <a href={item.href} className={styles.item}>
                  <div className={styles.itemTop}>
                    <span className={styles.source}>{item.source}</span>
                    <span className={styles.date}>{item.date}</span>
                  </div>
                  <p className={styles.headline}>{item.title}</p>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.moreWrap}>
            <a href="#newsroom" className={styles.more}>
              이야기 더보기
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
