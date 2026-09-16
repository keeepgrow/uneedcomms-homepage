import { useMemo, useState } from 'react'
import Header from '../../components/layout/Header/Header.jsx'
import Footer from '../../components/layout/Footer/Footer.jsx'
import DotArrow from '../../components/ui/DotArrow.jsx'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { news } from '../../data/news.js'
import styles from './NewsroomPage.module.css'

const PER_PAGE = 10
const TOTAL = news.length

const SORTS = [
  { key: 'recent', label: '최신글부터' },
  { key: 'old', label: '과거글부터' },
  { key: 'source', label: '언론사별' },
]

export default function NewsroomPage() {
  const { t, lang } = useLang()
  const [sort, setSort] = useState('recent')
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => {
    const arr = [...news]
    const src = (x) => (lang === 'en' && x.sourceEn ? x.sourceEn : x.source)
    if (sort === 'old') {
      arr.sort((a, b) => a.date.localeCompare(b.date))
    } else if (sort === 'source') {
      arr.sort(
        (a, b) =>
          src(a).localeCompare(src(b), lang === 'en' ? 'en' : 'ko') ||
          b.date.localeCompare(a.date)
      )
    } else {
      // recent (기본): 최신글부터
      arr.sort((a, b) => b.date.localeCompare(a.date))
    }
    return arr
  }, [sort, lang])

  const totalPages = Math.ceil(sorted.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const items = sorted.slice(start, start + PER_PAGE)

  const goto = (p) => {
    if (p < 1 || p > totalPages) return
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const changeSort = (key) => {
    setSort(key)
    setPage(1)
  }

  return (
    <>
      <Header bordered />
      <main className={styles.page}>
        <section className={styles.section} id="newsroom">
          <div className="container">
            <p className={styles.tag}>{t('// 기사 및 보도자료')}</p>
            <h1 className={styles.title}>{t('언론 속의 유니드컴즈')}</h1>
          </div>

          {/* 제목 아래 풀블리드 라인 */}
          <div className={styles.topRule} />

          {/* 정렬 탭 */}
          <div className="container">
            <div className={styles.sortTabs}>
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={`${styles.sortTab} ${
                    sort === s.key ? styles.sortTabActive : ''
                  }`}
                  onClick={() => changeSort(s.key)}
                >
                  {t(s.label)}
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 탭 아래 = 리스트 위 풀블리드 라인 */}
          <div className={styles.rule} />

          <div className="container">
            <ul className={styles.list}>
              {items.map((item, i) => {
                const inner = (
                  <>
                    <div className={styles.itemTop}>
                      <span className={styles.source}>
                        {lang === 'en' && item.sourceEn ? item.sourceEn : item.source}
                      </span>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                    <p className={styles.headline}>
                      {lang === 'en' && item.titleEn ? item.titleEn : item.title}
                    </p>
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

          {/* 리스트 아래 풀블리드 라인 */}
          <div className={styles.rule} />

          {/* 하단 바 — 페이지 정보(좌) + 이전/다음(우) */}
          <div className="container">
            <div className={styles.bottomBar}>
              <div className={styles.pageInfo}>
                <span className={styles.pageNum}>
                  {lang === 'en' ? `// Page ${page}` : `// ${page}페이지`}
                </span>
                <span className={styles.totalCount}>
                  {lang === 'en' ? `Total ${TOTAL}` : `총 ${TOTAL}개`}
                </span>
              </div>
              <nav className={styles.pager} aria-label="뉴스룸 페이지 이동">
                <button
                  type="button"
                  className={styles.pageBtn}
                  onClick={() => goto(page - 1)}
                  disabled={page === 1}
                  aria-label="이전 페이지"
                >
                  <DotArrow dir="left" />
                </button>
                <button
                  type="button"
                  className={styles.pageBtn}
                  onClick={() => goto(page + 1)}
                  disabled={page === totalPages}
                  aria-label="다음 페이지"
                >
                  <DotArrow dir="right" />
                </button>
              </nav>
            </div>
          </div>

          {/* 푸터 위 풀블리드 라인 */}
          <div className={styles.rule} />
        </section>
      </main>
      <Footer sitemap={false} />
    </>
  )
}
