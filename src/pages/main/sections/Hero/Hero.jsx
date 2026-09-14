import styles from './Hero.module.css'
import sky from '../../../../assets/hero/sky.png'
import mtn1 from '../../../../assets/hero/mtn1.png'
import mtn2 from '../../../../assets/hero/mtn2.png'
import mtn3 from '../../../../assets/hero/mtn3.png'

export default function Hero() {
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
          한 사람이 해낼 수 있는 일의
          <br />
          넓이와 깊이를 바꾸는,
          <br />
          지혜로운 AI 에이전트를 만듭니다.
        </h1>

        <a href="#about" className={styles.cta}>
          더 알아보기
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
            <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
