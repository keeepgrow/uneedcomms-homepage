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
  {
    id: 'keepgrow',
    name: 'KeepGrow',
    nameKo: '킵그로우',
    tag: 'MARKETING',
    tagline: '누구나 고용하는 AI 마케팅 직원',
    image: keepgrow,
    logo: keepgrowLogo,
    accent: '#2639A7',
    description:
      'KeepGrow는 마케팅 자동화 도구가 아니라, 이커머스의 매출 성장을 책임지는 AI 마케터입니다. 1초 회원가입과 성과 기반 쿠폰으로 방문자를 고객으로 전환하고, 신규 획득부터 재구매까지 성장 사이클을 완성합니다.',
  },
  {
    id: 'mesion',
    name: 'Mesion',
    nameKo: '메시온',
    tag: 'SALES',
    tagline: '비회원까지 닿는 세일즈 채널',
    image: mesion,
    logo: mesionLogo,
    logoScale: 1.22,
    accent: '#4057DF',
    description:
      'Mesion은 메시지 발송 도구가 아니라, 프로모션으로 놓치던 고객을 매출로 바꾸는 세일즈 채널입니다. 기존 회원을 넘어 네이버페이 비회원 결제 고객까지 네이버 스마트톡톡으로 도달해, 비회원 매출을 총매출 성장으로 전환합니다.',
  },
  {
    id: 'decageo',
    name: 'DecaGEO',
    nameKo: '데카GEO',
    tag: 'GEO',
    tagline: 'See where AI ranks you',
    image: decageo,
    logo: decaLogo,
    accent: '#2DA0B9',
    description:
      'DecaGEO는 순위 조회 도구가 아니라, AI 추천의 기준을 세우는 표준 랭킹입니다. ChatGPT 같은 AI가 어떤 브랜드를 왜 추천하는지 매주 편향 없이 공개하고, 경쟁 브랜드 대비 내 위치를 확인해 다음 전략을 찾게 합니다.',
  },
  {
    id: 'modoai',
    name: 'ModoAI',
    nameKo: '모도AI',
    tag: 'CREATIVE',
    tagline: 'CD, Creative Director',
    image: modoai,
    logo: modoLogo,
    accent: '#A164F4',
    description:
      '모도AI는 이미지 생성 AI가 아니라, 글로벌 소상공인의 판매 성과를 만드는 Creative Director입니다. No Prompt, No Editing 취향을 매출로 전환하여, 작은 브랜드도 자신만의 스타일로 더 많이 판매하도록 돕습니다.',
  },
]
