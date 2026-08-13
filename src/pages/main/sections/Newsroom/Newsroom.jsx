import { news } from '../../../../data/news.js'
import styles from './Newsroom.module.css'

export default function Newsroom() {
  return (
    <section className={styles.section} id="newsroom">
      <div className="container">
        <h2 className={styles.title}>오늘을 함께하는 우리의 소식</h2>

        <ul className={styles.list}>
          {news.map((item) => (
            <li key={item.no} className={styles.item}>
              <a href={item.href} className={styles.link}>
                <span className={styles.label}>{item.source}</span>
                <span className={styles.headline}>
                  {item.title}
                  {item.date && <span className={styles.date}>( {item.date} )</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
