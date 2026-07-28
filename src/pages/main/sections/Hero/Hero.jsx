import styles from './Hero.module.css'

const HEADLINE = '한 사람이 해낼 수 있는 일의'

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.marquee} aria-label={HEADLINE}>
        <div className={styles.track} aria-hidden="true">
          {/* 끊김 없는 루프를 위해 동일 문구를 2벌 반복 */}
          {[0, 1].map((n) => (
            <span key={n} className={styles.phrase}>
              {HEADLINE}
              <span className={styles.gap} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
