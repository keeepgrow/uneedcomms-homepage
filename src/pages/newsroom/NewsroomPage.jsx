import { useState } from 'react'
import Header from '../../components/layout/Header/Header.jsx'
import Footer from '../../components/layout/Footer/Footer.jsx'
import DotArrow from '../../components/ui/DotArrow.jsx'
import { news } from '../../data/news.js'
import styles from './NewsroomPage.module.css'

const PER_PAGE = 10
const totalPages = Math.ceil(news.length / PER_PAGE)

export default function NewsroomPage() {
  const [page, setPage] = useState(1)

  const start = (page - 1) * PER_PAGE
  const items = news.slice(start, start + PER_PAGE)

  const goto = (p) => {
    if (p < 1 || p > totalPages) return
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header bordered />
      <main className={styles.page}>
        <section className={styles.section} id="newsroom">
          <div className="container">
            <p className={styles.tag}>{'// 기사 및 보도자료'}</p>
            <h1 className={styles.title}>언론 속의 유니드컴즈</h1>
          </div>

          {/* 리스트 최상단 = 풀블리드(뷰포트 전체폭) 수평선 */}
          <div className={styles.topRule} />

          <div className="container">
            <ul className={styles.list}>
              {items.map((item, i) => {
                const inner = (
                  <>
                    <div className={styles.itemTop}>
                      <span className={styles.source}>{item.source}</span>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                    <p className={styles.headline}>{item.title}</p>
                  </>
                )
                return (
                  <li key={start + i}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={styles.item}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={styles.item}>{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* 리스트 하단 = 풀블리드(뷰포트 전체폭) 마감 수평선 */}
          <div className={styles.bottomRule} />

          <div className="container">
            {/* 페이징 — 이전/다음 도트 화살표 (10개씩) */}
            <nav className={styles.pager} aria-label="뉴스룸 페이지 이동">
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => goto(page - 1)}
                disabled={page === 1}
                aria-label="이전 페이지"
              >
                <DotArrow dir="left" color="#111" />
              </button>
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => goto(page + 1)}
                disabled={page === totalPages}
                aria-label="다음 페이지"
              >
                <DotArrow dir="right" color="#111" />
              </button>
            </nav>
          </div>
        </section>
      </main>
      <Footer sitemap={false} />
    </>
  )
}
