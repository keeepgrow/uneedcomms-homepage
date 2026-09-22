import styles from './Making.module.css'
import wave from '../../../../assets/making/trend-wave.png'
import sphere from '../../../../assets/making/flywheel-sphere.png'
import diagram from '../../../../assets/making/flywheel-diagram.svg'
import { useLang } from '../../../../i18n/LanguageContext.jsx'

// 플라이휠 다이어그램 라벨 — 노드 기준 앵커링(길이 무관, KR/EN 공통)
//  상단=중앙정렬, 좌측=우측정렬(노드쪽 고정), 우측=좌측정렬
const FW_LABELS = [
  { text: '비즈니스 기회', style: { top: '0', left: '47.81%', transform: 'translateX(-50%)', textAlign: 'center' } },
  { text: '수익창출', style: { top: '38.44%', left: '8.7%', transform: 'translateX(-100%)', textAlign: 'right' } },
  { text: '사업부 신설', style: { top: '38.44%', left: '87.59%', textAlign: 'left' } },
  { text: '고객창출', style: { top: '88.86%', left: '19.31%', transform: 'translateX(-100%)', textAlign: 'right' } },
  { text: '사업부 플라이휠\n(4개 사업부)', style: { top: '88.86%', left: '76.8%', textAlign: 'left' } },
]

export default function Making() {
  const { t } = useLang()
  return (
    <section className={styles.section} id="about">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>{t('유니드컴즈를 만드는 것')}</h2>
        <p className={styles.subtitle}>{t('시작과 판단의 기준이, 여기에 있습니다.')}</p>

        <div className={styles.cards}>
          {/* 트렌드 시그널 (흰 카드) */}
          <article className={`${styles.card} ${styles.trend}`}>
            <h3 className={styles.cardTitle}>{t('트렌드 시그널')}</h3>
            <p className={styles.cardDesc}>
              {t(
                '좋은 제품만으로는 충분하지 않다는 것을, 우리는 경험으로 배웠습니다. 그래서 시장이 움직이기 시작했다는 신호, ‘트렌드 시그널’을 먼저 읽습니다. 모두가 트렌드라 부르기 전에, 제품을 내놓습니다.'
              )}
            </p>

            <img className={styles.wave} src={wave} alt="" aria-hidden="true" />

            <span className={styles.annoLine} aria-hidden="true" />
            <span className={styles.annoDot} aria-hidden="true" />
            <span className={styles.annoHead}>{t('트렌드 시그널')}</span>
            <span className={styles.annoSub}>{t('시장이 움직이기 시작했다는 신호')}</span>
          </article>

          {/* 플라이휠 (블루 카드) */}
          <article className={`${styles.card} ${styles.flywheel}`}>
            <h3 className={styles.cardTitle}>{t('플라이휠')}</h3>
            <p className={styles.cardDesc}>
              {t(
                '유니드컴즈는 플라이휠로 움직입니다. 우리의 목표는 여기서 나오고, 새로운 일을 시작할지도 여기서 정합니다. 질문은 하나입니다. 이 플라이휠을 빠르게 하는가.'
              )}
            </p>

            {/* 하프톤 구체 (원본 흰배경 + mix-blend-multiply, -90° 회전 크롭) */}
            <div className={styles.sphere} aria-hidden="true">
              <div className={styles.sphereRot}>
                <div className={styles.sphereBox}>
                  <img className={styles.sphereImg} src={sphere} alt="" />
                </div>
              </div>
            </div>

            {/* 플라이휠 다이어그램 */}
            <div className={styles.diagram} aria-hidden="true">
              <img className={styles.diagramSvg} src={diagram} alt="" />
              <span className={`${styles.fwLabel} ${styles.fwCenter}`}>UNEEDCOMMS</span>
              {FW_LABELS.map((l) => (
                <span key={l.text} className={styles.fwLabel} style={l.style}>
                  {t(l.text)}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
