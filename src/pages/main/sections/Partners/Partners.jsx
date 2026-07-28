import { partnerRows } from '../../../../data/partners.js'
import styles from './Partners.module.css'

export default function Partners() {
  return (
    <section className={styles.section} id="partners">
      <div className="container">
        <div className={styles.card}>
          <h2 className={styles.title}>
            유니드컴즈와 함께하는
            <br />
            투자사 · 파트너사
          </h2>

          <div className={styles.rows}>
            {partnerRows.map((row, i) => (
              <div key={i} className={styles.row}>
                {row.map((partner, j) => (
                  <div
                    key={`${partner.name}-${j}`}
                    className={styles.tile}
                    style={{ width: partner.width }}
                  >
                    {partner.image ? (
                      <img src={partner.image} alt={partner.name} />
                    ) : (
                      <span className={styles.tileLabel}>{partner.name}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
