import { Link } from 'react-router-dom'
import { latestNews } from '../../../../data/news.js'
import DotArrow from '../../../../components/ui/DotArrow.jsx'
import styles from './Newsroom.module.css'

// 메인 섹션은 최신 기사 5건만 노출 (전체는 /newsroom 서브페이지)
// news.xml 에 기사를 추가하면 최신순으로 자동 반영됨
const featured = latestNews(5)

export default function Newsroom() {
  return (
    <section className={styles.section} id="newsroom">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>언론 속의 유니드컴즈</h2>

        <div className={styles.right}>
          <ul className={styles.list}>
            {featured.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  className={styles.item}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            <Link to="/newsroom" className={styles.more}>
              이야기 더보기
              <DotArrow dir="right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
