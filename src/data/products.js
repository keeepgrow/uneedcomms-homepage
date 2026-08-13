// 우리의 제품 — 제품 카드 데이터
// image: Figma에서 export한 3D 글래스모피즘 렌더 (assets/products/*)
import keepgrow from '../assets/products/keepgrow.png'
import mesion from '../assets/products/mesion.png'
import decageo from '../assets/products/decageo.png'
import modoai from '../assets/products/modoai.png'
// 하단 워드마크 로고 (Figma 제공 · 모두 다크/컬러라 반전 없이 사용)
import keepgrowLogo from '../assets/products/keepgrow-logo.png'
import mesionLogo from '../assets/products/mesion-logo.png'
import decaLogo from '../assets/products/deca-logo.png'
import modoLogo from '../assets/products/modo-logo.png'

export const products = [
  { id: 'keepgrow', name: 'KeepGrow', tag: 'MARKETING', tagline: '누구나 고용하는 AI 마케팅 직원', image: keepgrow, logo: keepgrowLogo },
  { id: 'mesion', name: 'Mesion', tag: 'SALES', tagline: '비회원까지 닿는 세일즈 채널', image: mesion, logo: mesionLogo },
  { id: 'decageo', name: 'DecaGEO', tag: 'GEO', tagline: 'See where AI ranks you', image: decageo, logo: decaLogo },
  { id: 'modoai', name: 'ModoAI', tag: 'CREATIVE', tagline: 'CD, Creative Director', image: modoai, logo: modoLogo },
]
