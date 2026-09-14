// 투자사 · 파트너사 — 무채색(화이트) 로고 (Figma export, assets/partners-w/*)
import google from '../assets/partners-w/google.png'
import meta from '../assets/partners-w/meta.png'
import aws from '../assets/partners-w/aws.png'
import shopify from '../assets/partners-w/shopify.png'
import naver from '../assets/partners-w/naver.png'
import kakao from '../assets/partners-w/kakao.png'
import cafe24 from '../assets/partners-w/cafe24.png'
import makeshop from '../assets/partners-w/makeshop.png'
import imweb from '../assets/partners-w/imweb.png'
import bonangels from '../assets/partners-w/bonangels.png'
import sj from '../assets/partners-w/sj.png'
import cjenm from '../assets/partners-w/cjenm.png'
import kolon from '../assets/partners-w/kolon.png'
import naverD2 from '../assets/partners-w/naver-d2.png'
import magna from '../assets/partners-w/magna.png'
import daekyung from '../assets/partners-w/daekyung.png'
import ts from '../assets/partners-w/ts.png'

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
  { name: 'SJ 인베스트먼트', logo: sj, type: '투자사' },
  { name: 'CJ이엔엠', logo: cjenm, type: '투자사' },
  // ── 열어서 더보기로 노출되는 추가 투자사 ──
  { name: '코오롱 인베스트먼트', logo: kolon, type: '투자사' },
  { name: '네이버 D2', logo: naverD2, type: '투자사' },
  { name: '마그나 인베스트먼트', logo: magna, type: '투자사' },
  { name: '대경 인베스트먼트', logo: daekyung, type: '투자사' },
  { name: 'TS 인베스트먼트', logo: ts, type: '투자사' },
]

// 기본 노출 개수(나머지는 "열어서 더보기"로 펼침)
export const PARTNERS_VISIBLE = 12
