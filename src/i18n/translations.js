// 한국어 원문 → 영어 매핑.
// EN(영어) 모드에서 여기에 등록된 항목만 영어로 바뀌고,
// 없는 항목은 한글 원문이 그대로 노출됩니다(폴백).
//
// 사용법(컴포넌트):
//   import { useLang } from '../../i18n/LanguageContext.jsx'
//   const { t } = useLang()
//   <h2>{t('유니드컴즈가 만드는 것')}</h2>
//
// 번역 추가:
//   '유니드컴즈가 만드는 것': 'What We Build',
export const translations = {
  // ── 공통: NAV / 사이트맵 ─────────────────────────────
  처음으로: 'Welcome',
  회사소개: 'About',
  뉴스룸: 'Newsroom',
  채용: 'Careers',

  // ── 공통: 푸터 회사 정보 ─────────────────────────────
  '(주) 유니드컴즈': 'UneedComms Co., Ltd.',
  '대표자: 양재필, 전형신    사업자등록번호 : 220-88-93926':
    'CEO: Jaepil Yang, Hyeongshin Jeon    Business Registration No. 220-88-93926',
  '주소: 서울특별시 마포구 양화로 81, L1층 L105호(서교동, 패스트파이브 합정점)':
    'L105, L1, FastFive Hapjeong, 81 Yanghwa-ro, Mapo-gu, Seoul, Republic of Korea',
  'public@uneedcomms.com': 'Contact: public@uneedcomms.com',

  // ── 메인: 히어로 ─────────────────────────────────────
  '한 사람이 해낼 수 있는 일의\n넓이와 깊이를 바꾸는,\n지혜로운 AI 에이전트를 만듭니다.':
    'We build wise AI agents\nthat expand the breadth and depth\nof what one person can accomplish.',
  '더 알아보기': 'Learn more',

  // ── 메인: 유니드컴즈가 만드는 것 (제품) ──────────────
  '유니드컴즈가 만드는 것': 'What We Build',
  바로가기: 'Learn more',

  // 제품명 (KeepGrow, Mesion 은 동일하여 미등록)
  DECA: 'DecaGEO',
  modoAI: 'ModoAI',

  // 태그라인
  '누구나 고용하는 AI 마케팅 직원': 'The AI marketer anyone can hire',
  '비회원까지 닿는 세일즈 채널': 'The sales channel that reaches guest shoppers',
  'CD, Creative Director': 'The Creative Director that sells.',
  // 'See where AI ranks you' 는 이미 영어라 미등록

  // 설명
  'KeepGrow는 마케팅 자동화 도구가 아니라, 이커머스의 매출 성장을 책임지는 AI 마케터입니다. 1초 회원가입과 성과 기반 쿠폰으로 방문자를 고객으로 전환하고, 신규 획득부터 재구매까지 성장 사이클을 완성합니다.':
    "KeepGrow isn't a marketing automation tool. It's an AI marketer that owns your e-commerce revenue growth. With 1-second sign-up and performance-based coupons, it turns visitors into customers and completes the growth cycle, from first purchase to repeat purchase.",
  'Mesion은 메시지 발송 도구가 아니라, 프로모션으로 놓치던 고객을 매출로 바꾸는 세일즈 채널입니다. 기존 회원을 넘어 네이버페이 비회원 결제 고객까지 네이버 스마트톡톡으로 도달해, 비회원 매출을 총매출 성장으로 전환합니다.':
    "Mesion isn't a messaging tool. It's a sales channel that uses promotions to turn the customers you'd otherwise miss into revenue. Through Naver TalkTalk, it reaches beyond your registered customers to Naver Pay guest shoppers, turning guest purchases into top-line growth.",
  'DecaGEO는 순위 조회 도구가 아니라, AI 추천의 기준을 세우는 표준 랭킹입니다. ChatGPT 같은 AI가 어떤 브랜드를 왜 추천하는지 매주 편향 없이 공개하고, 경쟁 브랜드 대비 내 위치를 확인해 다음 전략을 찾게 합니다.':
    "DecaGEO isn't a rank checker. It's the benchmark for how AI recommends brands. Every week, it shows — without bias — which brands AI models like ChatGPT recommend, and why. See where you stand against competitors, and find your next move.",
  '모도AI는 이미지 생성 AI가 아니라, 글로벌 소상공인의 판매 성과를 만드는 Creative Director입니다. No Prompting, No Editing 취향을 매출로 전환하여, 작은 브랜드도 자신만의 스타일로 더 많이 판매하도록 돕습니다.':
    "ModoAI isn't an image generator. It's a Creative Director that drives sales for small businesses worldwide. No prompting. No editing. Just your taste, turned into sales — so small brands sell more in a style that's truly their own.",

  // ── 메인: 유니드컴즈를 만드는 것 (What Builds Us) ──────
  '유니드컴즈를 만드는 것': 'What Builds Us',
  '트렌드 시그널': 'Trend Signal',
  플라이휠: 'Flywheel',
  '좋은 제품만으로는 충분하지 않다는 것을, 우리는 경험으로 배웠습니다. 그래서 시장이 움직이기 시작했다는 신호, ‘트렌드 시그널’을 먼저 읽습니다. 모두가 트렌드라 부르기 전에, 제품을 내놓습니다.':
    "We learned from experience that a good product alone isn't enough. So we read the Trend Signal first — the sign that a market has started to move. Before everyone calls it a trend, we've already shipped.",
  '유니드컴즈는 플라이휠로 움직입니다. 우리의 목표는 여기서 나오고, 새로운 일을 시작할지도 여기서 정합니다. 질문은 하나입니다. 이 플라이휠을 빠르게 하는가.':
    'UneedComms runs on a flywheel. Our goals come from it, and so do our decisions about what to start next. There’s only one question: does this make the flywheel turn faster?',

  // ── 메인: 투자사 · 파트너사 (Our Investors & Partners) ──
  '유니드컴즈와 함께하는 투자사 · 파트너사': 'Our Investors & Partners',
  '유니드의 혁신과 성장에 뜻을 함께하는 글로벌 파트너 및 투자사입니다':
    'The global partners and investors who believe in our vision — and grow with us.',
  // 열어서 더보기 / 닫기 토글 ('닫기'는 현재 Partners 에서만 t() 사용)
  '열어서 더보기': 'Show more',
  닫기: 'Show less',

  // ── 메인/서브: 뉴스룸 ────────────────────────────────
  '언론 속의 유니드컴즈': 'In the News',
  '이야기 더보기': 'View all',
  // 칩 (AWS 는 동일하여 미등록)
  파트너: 'Partner',
  투자사: 'Investor',
  // 파트너 이름
  구글: 'Google',
  메타: 'Meta',
  쇼피파이: 'Shopify',
  네이버: 'NAVER',
  카카오: 'kakao',
  카페24: 'Cafe24',
  메이크샵: 'make#',
  아임웹: 'imweb',
  // 투자사 이름
  본엔젤스: 'Bon Angels',
  'SJ 인베스트먼트': 'SJ Investment Partners',
  CJ이엔엠: 'CJ ENM',
  '코오롱 인베스트먼트': 'KOLON',
  '네이버 D2': 'NAVER',
  '마그나 인베스트먼트': 'MAGNA Investment',
  '대경 인베스트먼트': 'Daekyung Investment',
  'TS 인베스트먼트': 'TS Investment',

  // ── 메인: 연혁 (How We Got Here) ─────────────────────
  '유니드컴즈가 걸어온 길': 'How We Got Here',
  '유니드컴즈의 변화는 세상을 놀랍게 만듭니다':
    'The story of change that keeps surprising the world.',
  // 연도별 마일스톤
  '㈜유니드컴즈 설립': 'Founded UneedComms',
  '스마트스킨 출시': 'Launched SmartSkin',
  '스마트앱·타겟북 출시': 'Launched SmartApp and TargetBook',
  'K-Global 300 선정': 'Selected for K-Global 300',
  '시드 투자 유치': 'Raised seed funding',
  'Meta Business Partners 선정': 'Became a Meta Business Partner',
  'Pre-Series A 투자 유치': 'Raised Pre-Series A',
  'AWS 글로벌 기술 파트너 선정': 'Became an AWS global technology partner',
  'Shopify 에이전시 파트너 선정': 'Became a Shopify agency partner',
  'Google 기술 채널 파트너 선정': 'Became a Google technology channel partner',
  '킵그로우(KeepGrow) 출시': 'Launched KeepGrow',
  "킵그로우 '1초 회원가입' 출시": 'Launched KeepGrow 1-second sign-up',
  'Series A 투자 유치': 'Raised Series A',
  '네이버 커머스솔루션마켓 입점': 'Listed on Naver Commerce Solution Market',
  '카페24 베스트파트너 3년 연속 선정':
    'Became Cafe24 Best Partner, three years running',
  '데카(DecaGEO)·모도(ModoAI) 글로벌 출시':
    'Launched DecaGEO and ModoAI globally',
  '메시온(Mesion) 출시': 'Launched Mesion',
  'NVIDIA Inception 프로그램 선정': 'Joined NVIDIA Inception program',
}
