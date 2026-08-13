import { news } from '../../../../data/news.js'
import styles from './Newsroom.module.css'

export default function Newsroom() {
  return (
    <section className={styles.section} id="newsroom">
      <div className="container">
        <h2 className={styles.title}>
          유니드컴즈가 기록하는{' '}
          <br className={styles.mBreak} />오늘 우리의 이야기
        </h2>

        <ul className={styles.list}>
          {news.map((item) => {
            const external = item.href?.startsWith('http')
            return (
            <li key={item.no} className={styles.item}>
              <a
                href={item.href}
                className={styles.link}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <span className={styles.label}>{item.source}</span>
                <span className={styles.headline}>
                  <span className={styles.textWrap}>
                    {/* 비호버: 말줄임 */}
                    <span className={styles.ellip}>{item.title}</span>
                    {/* 호버: 왼쪽으로 흐르는 마퀴 (이음새 위해 2벌) */}
                    <span className={styles.marquee} aria-hidden="true">
                      <span className={styles.mItem}>{item.title}</span>
                      <span className={styles.mItem}>{item.title}</span>
                    </span>
                  </span>
                  {item.date && <span className={styles.date}>( {item.date} )</span>}
                </span>
              </a>
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
