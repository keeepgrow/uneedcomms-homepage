import ArrowIcon from './ArrowIcon.jsx'
import styles from './ArrowButton.module.css'

// 원형 화살표 버튼 (제품 캐러셀 좌/우 컨트롤)
export default function ArrowButton({ direction = 'right', onClick, label }) {
  return (
    <button
      type="button"
      className={styles.button}
      data-direction={direction}
      onClick={onClick}
      aria-label={label}
    >
      <ArrowIcon size={26} />
    </button>
  )
}
