import { useState } from 'react'
import { partners, PARTNERS_VISIBLE } from '../../../../data/partners.js'
import DotArrow from '../../../../components/ui/DotArrow.jsx'
import { useLang } from '../../../../i18n/LanguageContext.jsx'
import styles from './Partners.module.css'

export default function Partners() {
  const { t } = useLang()
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? partners : partners.slice(0, PARTNERS_VISIBLE)
  const hasMore = partners.length > PARTNERS_VISIBLE

  return (
    <section className={styles.section} id="partners">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>{t('유니드컴즈와 함께하는 투자사 · 파트너사')}</h2>
        <p className={styles.subtitle}>
          {t('지혜로운 AI와 함께 일할 때, 한 사람의 일은 어디까지 달라질까요?')}{' '}
          <br className={styles.mobileBr} />
          {t('유니드컴즈는 그 답을 향해, 지금도 나아가고 있습니다.')}
        </p>

        <div className={styles.grid}>
          {shown.map((p, idx) => {
            const isExtra = idx >= PARTNERS_VISIBLE
            return (
              <article
                key={p.name}
                className={`${styles.tile} ${isExtra ? styles.reveal : ''}`}
                style={
                  isExtra
                    ? { animationDelay: `${(idx - PARTNERS_VISIBLE) * 0.08}s` }
                    : undefined
                }
              >
                <div className={styles.logoArea}>
                  <img className={styles.logo} src={p.logo} alt={`${p.name} 로고`} />
                </div>
                <div className={styles.meta}>
                  <span className={styles.name}>{t(p.name)}</span>
                  <span className={styles.chip}>{t(p.type)}</span>
                </div>
              </article>
            )
          })}
        </div>

        {hasMore && (
          <div className={styles.moreWrap}>
            <button
              type="button"
              className={styles.more}
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? t('접기') : t('더보기')}
              <DotArrow dir={expanded ? 'up' : 'down'} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
