import styles from './Hero.module.css'
import DotArrow from '../../../../components/ui/DotArrow.jsx'
import { useLang } from '../../../../i18n/LanguageContext.jsx'
import sky from '../../../../assets/hero/sky.png'
import mtn1 from '../../../../assets/hero/mtn1.png'
import mtn2 from '../../../../assets/hero/mtn2.png'
import mtn3 from '../../../../assets/hero/mtn3.png'

// 줄바꿈(\n)을 <br />로 렌더
function MultiLine({ text }) {
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ))
}

export default function Hero() {
  const { t } = useLang()
  return (
    <section className={styles.hero} id="top">
      {/* 배경: 디더링(하프톤) 산 — 하늘 + 산1/2/3 레이어를 하단 정렬 스택 */}
      <div className={styles.bg} aria-hidden="true">
        <img className={styles.sky} src={sky} alt="" />
        <img className={styles.mtn} style={{ zIndex: 1 }} src={mtn1} alt="" />
        <img className={styles.mtn} style={{ zIndex: 2 }} src={mtn2} alt="" />
        <img className={styles.mtn} style={{ zIndex: 3 }} src={mtn3} alt="" />
      </div>

      <div className={`container ${styles.content}`}>
        <h1 className={styles.headline}>
          <MultiLine
            text={t('한 사람이 해낼 수 있는 일의\n넓이와 깊이를 바꾸는,\n지혜로운 AI 에이전트를 만듭니다.')}
          />
        </h1>

        <a href="#about" className={styles.cta}>
          {t('더 알아보기')}
          <DotArrow dir="right" />
        </a>
      </div>
    </section>
  )
}
