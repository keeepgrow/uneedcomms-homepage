import styles from './Making.module.css'
import wave from '../../../../assets/making/trend-wave.png'
import sphere from '../../../../assets/making/flywheel-sphere.png'
import diagram from '../../../../assets/making/flywheel-diagram.svg'

// 플라이휠 다이어그램 라벨 — Figma Frame 242(556×359) 좌표 기준 (%)
const FW_LABELS = [
  { text: '비지니스 기회', left: '41%', top: '0%' },
  { text: '수익창출', left: '0%', top: '38.4%' },
  { text: '사업부 신설', left: '87.6%', top: '38.4%' },
  { text: '고객창출', left: '10.6%', top: '88.9%' },
  { text: '사업부 플라이휠\n(4개 사업부)', left: '76.8%', top: '88.9%' },
]

export default function Making() {
  return (
    <section className={styles.section} id="about">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>유니드컴즈를 만드는 것</h2>

        <div className={styles.cards}>
          {/* 트렌드 시그널 (흰 카드) */}
          <article className={`${styles.card} ${styles.trend}`}>
            <h3 className={styles.cardTitle}>트렌드 시그널</h3>
            <p className={styles.cardDesc}>
              좋은 제품만으로는 충분하지 않다는 것을, 우리는 경험으로 배웠습니다.
              그래서 시장이 움직이기 시작했다는 신호, ‘트렌드 시그널’을 먼저
              읽습니다. 모두가 트렌드라 부르기 전에, 제품을 내놓습니다.
            </p>

            <div className={styles.waveWrap}>
              <div className={styles.annotation}>
                <span className={styles.annoDot} />
                <div className={styles.annoLine} />
                <div className={styles.annoText}>
                  <span className={styles.annoHead}>트렌드 시그널</span>
                  <span className={styles.annoSub}>시장이 움직이기 시작했다는 신호</span>
                </div>
              </div>
              <img className={styles.wave} src={wave} alt="" aria-hidden="true" />
            </div>
          </article>

          {/* 플라이휠 (블루 카드) */}
          <article className={`${styles.card} ${styles.flywheel}`}>
            <h3 className={styles.cardTitle}>플라이휠</h3>
            <p className={styles.cardDesc}>
              유니드컴즈는 플라이휠로 움직입니다. 우리의 목표는 여기서 나오고,
              새로운 일을 시작할지도 여기서 정합니다. 질문은 하나입니다. 이
              플라이휠을 빠르게 하는가.
            </p>

            <div className={styles.fwGraphic}>
              <img className={styles.sphere} src={sphere} alt="" aria-hidden="true" />
              <div className={styles.diagram}>
                <img className={styles.diagramSvg} src={diagram} alt="" aria-hidden="true" />
                <span className={styles.fwCenter}>UNEEDCOMMS</span>
                {FW_LABELS.map((l) => (
                  <span
                    key={l.text}
                    className={styles.fwLabel}
                    style={{ left: l.left, top: l.top }}
                  >
                    {l.text}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
