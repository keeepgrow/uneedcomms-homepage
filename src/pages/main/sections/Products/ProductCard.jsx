import styles from './Products.module.css'

export default function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardText}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <p className={styles.cardTagline}>{product.tagline}</p>
      </div>

      <div className={styles.cardMedia}>
        <img src={product.image} alt={`${product.name} 제품 이미지`} />
      </div>
    </article>
  )
}
