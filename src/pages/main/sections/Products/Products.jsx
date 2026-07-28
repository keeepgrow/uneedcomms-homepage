import { useRef } from 'react'
import { products } from '../../../../data/products.js'
import ArrowButton from '../../../../components/ui/ArrowButton.jsx'
import ProductCard from './ProductCard.jsx'
import styles from './Products.module.css'

export default function Products() {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    const track = trackRef.current
    if (!track) return
    const amount = 385 + 20 // 카드 폭 + gap
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className={styles.section} id="products">
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>우리의 제품</h2>
          <div className={styles.controls}>
            <ArrowButton direction="left" label="이전 제품" onClick={() => scrollBy(-1)} />
            <ArrowButton direction="right" label="다음 제품" onClick={() => scrollBy(1)} />
          </div>
        </div>

        <div className={styles.track} ref={trackRef}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
