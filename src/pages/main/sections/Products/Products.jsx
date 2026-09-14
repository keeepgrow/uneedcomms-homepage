import { useState } from 'react'
import { products } from '../../../../data/products.js'
import styles from './Products.module.css'

export default function Products() {
  const [activeId, setActiveId] = useState(products[0].id)

  return (
    <section className={styles.section} id="products">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>유니드컴즈가 만드는 것</h2>

        <div className={styles.accordion}>
          {products.map((p) => {
            const active = activeId === p.id
            return (
              <div
                key={p.id}
                className={`${styles.item} ${active ? styles.itemActive : ''}`}
              >
                <button
                  type="button"
                  className={styles.head}
                  aria-expanded={active}
                  onClick={() => setActiveId(active ? null : p.id)}
                >
                  <span className={styles.name}>{p.name}</span>
                </button>

                <div className={styles.panel} hidden={!active}>
                  <img className={styles.logo} src={p.logo} alt={`${p.name} 로고`} />
                  <p className={styles.tagline}>{p.tagline}</p>
                  <p className={styles.desc}>{p.description}</p>
                  <a href={p.href} className={styles.link}>
                    바로가기
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
