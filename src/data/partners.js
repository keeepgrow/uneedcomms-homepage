// 투자사 · 파트너사 — 무채색 로고 (Figma SVG 벡터, assets/partners-svg/*)
import google from '../assets/partners-svg/google.svg'
import meta from '../assets/partners-svg/meta.svg'
import aws from '../assets/partners-svg/aws.svg'
import shopify from '../assets/partners-svg/shopify.svg'
import naver from '../assets/partners-svg/naver.svg'
import kakao from '../assets/partners-svg/kakao.svg'
import cafe24 from '../assets/partners-svg/cafe24.svg'
import makeshop from '../assets/partners-svg/makeshop.svg'
import imweb from '../assets/partners-svg/imweb.svg'
import bonangels from '../assets/partners-svg/bonangels.svg'
import sj from '../assets/partners-svg/sj.svg'
import cjenm from '../assets/partners-svg/cjenm.svg'
import kolon from '../assets/partners-svg/kolon.svg'
import naverD2 from '../assets/partners-svg/naver-d2.svg'
import magna from '../assets/partners-svg/magna.svg'
import daekyung from '../assets/partners-svg/daekyung.svg'
import ts from '../assets/partners-svg/ts.svg'

export const partners = [
  { name: '구글', logo: google, type: '파트너' },
  { name: '메타', logo: meta, type: '파트너' },
  { name: 'AWS', logo: aws, type: '파트너' },
  { name: '쇼피파이', logo: shopify, type: '파트너' },
  { name: '네이버', logo: naver, type: '파트너' },
  { name: '카카오', logo: kakao, type: '파트너' },
  { name: '카페24', logo: cafe24, type: '파트너' },
  { name: '메이크샵', logo: makeshop, type: '파트너' },
  { name: '아임웹', logo: imweb, type: '파트너' },
  { name: '본엔젤스', logo: bonangels, type: '투자사' },
  { name: 'TS 인베스트먼트', logo: ts, type: '투자사' },
  { name: '코오롱 인베스트먼트', logo: kolon, type: '투자사' },
  // ── 열어서 더보기로 노출되는 추가 투자사 ──
  { name: '네이버 D2', logo: naverD2, type: '투자사' },
  { name: 'SJ 인베스트먼트', logo: sj, type: '투자사' },
  { name: 'CJ이엔엠', logo: cjenm, type: '투자사' },
  { name: '마그나 인베스트먼트', logo: magna, type: '투자사' },
  { name: '대경 인베스트먼트', logo: daekyung, type: '투자사' },
]

// 기본 노출 개수(나머지는 "열어서 더보기"로 펼침)
export const PARTNERS_VISIBLE = 12
