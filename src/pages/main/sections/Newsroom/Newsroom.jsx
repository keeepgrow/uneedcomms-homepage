import { news } from '../../../../data/news.js'
import ArrowIcon from '../../../../components/ui/ArrowIcon.jsx'
import styles from './Newsroom.module.css'

export default function Newsroom() {
  return (
    <section className={styles.section} id="newsroom">
      <div className="container">
        <div className={styles.card}>
          <h2 className={styles.title}>유니드컴즈 뉴스룸</h2>

          <ul className={styles.list}>
            {news.map((item) => (
              <li key={item.no}>
                <a
                  href={item.href}
                  className={`${styles.item} ${item.featured ? styles.featured : ''}`}
                >
                  <span className={styles.no}>{item.no}</span>
                  <span className={styles.headline}>{item.title}</span>
                  {item.featured && <ArrowIcon size={28} className={styles.itemArrow} />}
                </a>
              </li>
            ))}
          </ul>

          <a href="#newsroom" className={styles.more}>
            더 많은 소식보기
            <ArrowIcon size={24} />
          </a>
        </div>
      </div>
    </section>
  )
}
