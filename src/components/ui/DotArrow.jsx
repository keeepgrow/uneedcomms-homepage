import styles from './DotArrow.module.css'

// 도트(4×4px 사각형 3개)로 만든 쉐브론 화살표 — Figma 버튼 화살표
// dir: 'right'(기본) | 'down' | 'up' | 'left'
const ROT = { down: '0deg', right: '-90deg', up: '180deg', left: '90deg' }

export default function DotArrow({ dir = 'right', color }) {
  const vars = { '--rot': ROT[dir] || '-90deg' }
  if (color) vars['--dot'] = color
  return (
    <span className={styles.arrow} aria-hidden="true">
      <span className={styles.shape} style={vars}>
        <span className={styles.sq} />
        <span className={styles.sq} />
        <span className={styles.sq} />
      </span>
    </span>
  )
}
