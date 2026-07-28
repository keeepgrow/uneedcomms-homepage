// 우리의 제품 — 제품 카드 데이터
// image: Figma에서 export한 3D 글래스모피즘 렌더 (assets/products/*)
import keepgrow from '../assets/products/keepgrow.png'
import mesion from '../assets/products/mesion.png'
import decageo from '../assets/products/decageo.png'
import modoai from '../assets/products/modoai.png'

export const products = [
  { id: 'keepgrow', name: 'KeepGrow', tagline: '누구나 고용하는 AI 마케팅 직원', image: keepgrow },
  { id: 'mesion', name: 'Mesion', tagline: '비회원까지 닿는 세일즈 채널', image: mesion },
  { id: 'decageo', name: 'DecaGEO', tagline: 'See where AI ranks you', image: decageo },
  { id: 'modoai', name: 'ModoAI', tagline: 'CD, Creative Director', image: modoai },
]
