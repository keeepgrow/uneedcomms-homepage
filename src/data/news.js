// 뉴스룸 기사 데이터
// 원본은 news.xml 이며, 이 모듈이 파싱해 배열로 제공합니다.
// → news.xml 을 편집하면 메인 페이지와 뉴스룸 서브페이지에 모두 자동 반영됩니다.
import xml from './news.xml?raw'

function parseNews(xmlString) {
  const doc = new DOMParser().parseFromString(xmlString, 'application/xml')
  const err = doc.getElementsByTagName('parsererror')[0]
  if (err) {
    console.error('news.xml 파싱 오류:', err.textContent)
    return []
  }
  const text = (el, tag) =>
    el.getElementsByTagName(tag)[0]?.textContent?.trim() ?? ''
  return [...doc.getElementsByTagName('article')].map((el) => {
    const item = {
      source: text(el, 'source'),
      sourceEn: text(el, 'source_en'),
      date: text(el, 'date'),
      title: text(el, 'title'),
      titleEn: text(el, 'title_en'),
    }
    const href = text(el, 'href')
    if (href) item.href = href
    return item
  })
}

export const news = parseNews(xml)

// 최신순(날짜 내림차순) 상위 n건 — 메인 섹션 노출용
export function latestNews(n) {
  return [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n)
}
