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
  홈: 'Home',
  회사소개: 'About',
  뉴스룸: 'Newsroom',
  채용: 'Careers',

  // ── 공통: 푸터 회사 정보 ─────────────────────────────
  '(주) 유니드컴즈': 'UneedComms Co., Ltd.',
  '대표자: 양재필, 전형신    사업자등록번호 : 220-88-93926':
    'Co-CEOs: Jaepil Yang, Hyeongshin Jeon    Business Registration No. 220-88-93926',
  '주소: 서울특별시 마포구 양화로 81, L1층 L105호(서교동, 패스트파이브 합정점)':
    'L105, L1, FastFive Hapjeong, 81 Yanghwa-ro, Mapo-gu, Seoul, Republic of Korea',
  'public@uneedcomms.com': 'Contact: public@uneedcomms.com',

  // ── 메인: 히어로 ─────────────────────────────────────
  '더 알아보기': 'Learn more',

  // ── 메인: 유니드컴즈가 만드는 것 (제품) ──────────────
  '유니드컴즈가 만드는 것': 'What We Build',
  '그 지혜를 향해, 오늘의 제품을 만듭니다.':
    'Every product we build today is a step toward that wisdom.',
  바로가기: 'Visit site',

  // 제품명 (KeepGrow, Mesion 은 동일하여 미등록)
  DECA: 'DecaGEO',
  modoAI: 'modoAI',

  // 태그라인
  '누구나 고용하는 AI 마케팅 직원': 'The AI marketer anyone can hire',
  '비회원까지 닿는 세일즈 채널': 'The sales channel that reaches guest shoppers',
  'CD, Creative Director': 'The Creative Director that sells.',
  // 'See where AI ranks you' 는 이미 영어라 미등록

  // 설명
  'KeepGrow는 마케팅 자동화 도구가 아니라, 이커머스의 매출 성장을 책임지는 AI 마케터입니다. 1초 회원가입과 성과 기반 쿠폰으로 방문자를 고객으로 전환하고, 신규 획득부터 재구매까지 성장 사이클을 완성합니다.':
    "KeepGrow isn't a marketing automation tool. It's an AI marketer that owns your e-commerce revenue growth. With 1-second sign-up and performance-based coupons, it turns visitors into customers and completes the growth cycle, from first purchase to repeat purchase.",
  'Mesion은 메시지 발송 도구가 아니라, 프로모션으로 놓치던 고객을 매출로 바꾸는 세일즈 채널입니다. 기존 회원을 넘어 네이버페이 비회원 결제 고객까지 네이버 스마트 톡톡으로 도달해, 비회원 매출을 총매출 성장으로 전환합니다.':
    "Mesion isn't a messaging tool. It's a sales channel that uses promotions to turn the customers you'd otherwise miss into revenue. Through Naver Smart TalkTalk, it reaches beyond your registered customers to Naver Pay guest shoppers, turning guest purchases into top-line growth.",
  'DecaGEO는 순위 조회 도구가 아니라, AI 추천의 기준을 세우는 표준 랭킹입니다. ChatGPT 같은 AI가 어떤 브랜드를 왜 추천하는지 매주 편향 없이 공개하고, 경쟁 브랜드 대비 내 위치를 확인해 다음 전략을 찾게 합니다.':
    "DecaGEO isn't a rank checker. It's the benchmark for how AI recommends brands. Every week, it shows — without bias — which brands AI models like ChatGPT recommend, and why. See where you stand against competitors, and find your next move.",
  '모도AI는 이미지 생성 AI가 아니라, 글로벌 소상공인의 판매 성과(Sales Performance)를 만드는 Creative Director입니다. No Prompting, No Editing. 취향을 매출로 전환하여, 작은 브랜드도 자신만의 스타일로 더 많이 판매하도록 돕습니다.':
    "modoAI isn't an image generator. It's a Creative Director that drives sales for small businesses worldwide. No prompting. No editing. Just your taste, turned into sales — so small brands sell more in a style that's truly their own.",

  // ── 메인: 유니드컴즈를 만드는 것 (What Builds Us) ──────
  '유니드컴즈를 만드는 것': 'What Builds Us',
  '시작과 판단의 기준이, 여기에 있습니다.': 'This is where we start, and how we decide.',
  '트렌드 시그널': 'Trend Signal',
  플라이휠: 'Flywheel',
  '시장이 움직이기 시작했다는 신호': 'A sign that a market has started to move',
  // 플라이휠 다이어그램 라벨 (피그마 KR/EN 기준)
  '비즈니스 기회': 'Business Opportunity',
  수익창출: 'Revenue',
  '사업부 신설': 'New\nBusiness Unit',
  고객창출: 'Customers',
  '사업부 플라이휠\n(4개 사업부)': "Each Unit's Flywheel\n(4 units)",
  '좋은 제품만으로는 충분하지 않다는 것을, 우리는 경험으로 배웠습니다. 그래서 시장이 움직이기 시작했다는 신호, ‘트렌드 시그널’을 먼저 읽습니다. 모두가 트렌드라 부르기 전에, 제품을 내놓습니다.':
    "We learned from experience that a good product alone isn't enough. So we read the Trend Signal first — the sign that a market has started to move. Before everyone calls it a trend, we've already shipped.",
  '유니드컴즈는 플라이휠로 움직입니다. 우리의 목표는 여기서 나오고, 새로운 일을 시작할지도 여기서 정합니다. 질문은 하나입니다. 이 플라이휠을 빠르게 하는가.':
    "UneedComms runs on a flywheel. Our goals come from it, and so do our decisions about what to start next. There's only one question: Does this make the flywheel turn faster?",

  // ── 메인: 투자사 · 파트너사 (Our Investors & Partners) ──
  '유니드컴즈와 함께하는 투자사 · 파트너사': 'Our Investors & Partners',
  // 부제목
  '유니드컴즈는, 혼자 만들어지지 않았습니다.': "UneedComms wasn't built alone.",
  '유니드의 혁신과 성장에 뜻을 함께하는 글로벌 파트너 및 투자사입니다':
    'The global partners and investors who believe in our vision — and grow with us.',
  // 파트너 더보기/접기 토글
  더보기: 'Show more',
  접기: 'Show less',
  '열어서 더보기': 'Show more',
  닫기: 'Show less',

  // ── 메인/서브: 뉴스룸 ────────────────────────────────
  '언론 속의 유니드컴즈': 'In the News',
  '지혜로운 AI와 함께 일할 때, 한 사람의 일은 어디까지 달라질까요?':
    'How much can one person accomplish, working with wise AI?',
  '유니드컴즈는 그 답을 향해, 지금도 나아가고 있습니다.':
    'UneedComms is building toward that answer.',
  '전체보기': 'View all',
  '// 기사 및 보도자료': '// Articles & Press Releases',
  '최신순': 'Newest first',
  '오래된순': 'Oldest first',
  '언론사별': 'By outlet',
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
  '성공은 한 번의 혁신이 아니라, 축적의 결과라고 믿습니다.':
    'We believe success comes from compounding, not a single breakthrough.',
  '유니드컴즈의 변화는 세상을 놀랍게 만듭니다':
    'The story of change that keeps surprising the world.',
  // 연도별 마일스톤
  '㈜유니드컴즈 설립': 'Founded UneedComms',
  '스마트스킨 출시': 'Launched SmartSkin',
  '스마트앱·타겟북 출시': 'Launched SmartApp and TargetBook',
  'K-Global 300 선정': 'Selected for K-Global 300',
  '시드 투자 유치': 'Raised seed funding',
  'Meta Business Partners 선정': 'Became a Meta Business Partner',
  '프리 시리즈 A 투자 유치': 'Raised Pre-Series A',
  'AWS 글로벌 기술 파트너 선정': 'Became an AWS global technology partner',
  'Shopify 에이전시 파트너 선정': 'Became a Shopify agency partner',
  'Google 기술 채널 파트너 선정': 'Became a Google technology channel partner',
  '킵그로우(KeepGrow) 출시': 'Launched KeepGrow',
  "킵그로우 '1초 회원가입' 출시": 'Launched KeepGrow 1-second sign-up',
  '시리즈 A 투자 유치': 'Raised Series A',
  '네이버 커머스솔루션마켓 입점': 'Listed on Naver Commerce Solution Market',
  '카페24 베스트파트너 3년 연속 선정':
    'Became Cafe24 Best Partner, three years running',
  '데카(DecaGEO)·모도(modoAI) 글로벌 출시':
    'Launched DecaGEO and modoAI globally',
  '메시온(Mesion) 출시': 'Launched Mesion',
  'NVIDIA Inception 프로그램 선정': 'Joined NVIDIA Inception program',

  // ── 회사소개: 인트로 / 미션 ──────────────────────────
  '// 유니드컴즈 소개': '// About UneedComms',
  '한 사람이 해낼 수 있는 일의 넓이와 깊이를 바꾸는,\n지혜로운 AI 에이전트를 만듭니다.':
    'We build wise AI agents that expand the breadth and depth\nof what one person can accomplish.',
  '세상에는 지식만으로 되지 않는 일들이 있습니다.':
    "Some things can't be done with knowledge alone.",
  '그날의 재료에 맞게 불과 간을 조절하는 요리사의 감각, 아이의 표정만 보고도 어디가 아픈지 아는 부모의 눈. 우리는 그것을 지혜라고 부릅니다.':
    "A chef's instinct — same recipe, but heat and seasoning adjusted to the day's ingredients. A parent's eye, knowing where it hurts just from their child's face. We call that wisdom.",
  '이제 우리는 무엇이든 AI에게 묻고, AI는 무엇이든 답합니다. 그러나 똑똑한 AI는 많아도, 지혜로운 AI는 없습니다.':
    'Today we ask AI everything, and AI answers everything. Yet smart AI is everywhere, and wise AI is nowhere to be found.',
  '유니드컴즈는 지금 이 상황에 맞게 스스로 판단하는, 지혜로운 AI 에이전트를 만듭니다.':
    'UneedComms builds wise AI agents that judge for themselves what each moment calls for.',
  '경험의 한계를 넘어, 한 사람이 해낼 수 있는 일의 넓이와 깊이가 달라지도록. 그 변화가 쌓여, 세상이 일하는 방식을 바꿉니다.':
    "Beyond the limits of one person's experience, expanding the breadth and depth of what one person can accomplish. And as those changes add up, they reshape how the world gets work done.",

  // ── 회사소개: 나아가는 방식 (밴드 타이틀) ────────────
  '유니드컴즈가 나아가는 방식': 'How We Move Forward',
  '// 유니드컴즈는, 매일 이 바퀴를 더 빠르게 합니다.':
    '// Every day, we make this wheel turn faster.',

  // ── 회사소개: 클로징 스테이트먼트 ────────────────────
  '한 사람의 지혜가 기록으로 남을 때,\n모두가 해낼 수 있는 일의 넓이와 깊이가 달라집니다.':
    "When one person's wisdom is written down,\nit expands the breadth and depth of what everyone can accomplish.",

  // ── 푸터 사이트맵: 클로징 문구 (한 줄) ────────────────
  '한 사람의 지혜가 기록으로 남을 때, 모두가 해낼 수 있는 일의 넓이와 깊이가 달라집니다.':
    "When one person's wisdom is written down, it expands the breadth and depth of what everyone can accomplish.",

  // ── 회사소개: 우리가 일하는 방식 (How We Work) ────────
  '우리가 일하는 방식': 'How We Work',
  '// 한끗이 있는 사람들은, 매일 이렇게 일합니다.':
    '// This is how people with hankkeut work, every day.',
  // 원칙 제목
  '"원래 그렇게 해"를 의심한다.': 'Question "the way it\'s always been done."',
  '될 때까지 파고든다.': "Dig until it's solved.",
  '예의는 전문가의 기본': 'Courtesy is the baseline of professionalism.',
  '일은 내가 끌고 간다.': 'Drive the work.',
  '나만 알지 않는다.': "Don't keep it to yourself.",
  '우리의 기록을, 이제 AI 에이전트도 읽는다.':
    'What we write down, AI agents now read.',
  // 원칙 설명
  '당연한 것에는 이유가 없을 때가 많습니다. 남들이 정해둔 방식을 그대로 따르지 않고, 왜 그런지 다시 묻고 더 나은 길을 만듭니다.':
    "What everyone takes for granted often has no reason behind it. We don't follow paths others have set. We ask why, and build a better way.",
  '"일단 됐어"는 끝이 아닙니다. 진짜 원인이 나올 때까지, 파고 또 파고듭니다. 우리에게 책임은 실패하지 않는 것이 아니라, 포기하지 않는 것입니다.':
    '"It works" isn\'t the finish line. We dig, and dig again, until the real cause surfaces. Responsibility isn\'t about never failing. It\'s about never giving up.',
  '예의는 격식이 아니라, 상대의 시간과 판단을 존중하는 일입니다. 동료를 100% 신뢰하고 시작하며, 동료의 자리에서 한 번 더 생각합니다. 전문가는 전문가를 그렇게 대합니다.':
    "Courtesy isn't formality. It's respect for another person's time and judgment. We start from 100% trust in our colleagues, and put ourselves in their shoes one more time. That's how professionals treat professionals.",
  '닥친 일을 쳐내는 사람과, 계획을 세워 일을 장악하는 사람은 다릅니다. 우리는 시작하기 전에 순서를 설계하고, 무엇부터 할지 스스로 정합니다. 사람은 일을 주도할 때, 가장 큰 힘을 냅니다.':
    "There's a difference between clearing tasks as they come and taking charge of the work with a plan. Before we start, we design the sequence and decide for ourselves what comes first. People are at their strongest when they lead the work.",
  '내가 아는 것은 나의 것이 아니라, 우리의 것이 될 때 힘이 됩니다. 그래서 우리는 공개를 기본값으로 둡니다. 알게 된 것은 머릿속에 두지 않고, 동료가 볼 수 있는 곳에 남깁니다. 결과만이 아니라 왜 그렇게 판단했는지까지 남을 때, 내 경험이 동료의 경험이 됩니다.':
    "What one of us knows only becomes powerful when it becomes ours. So we work open by default. We don't keep what we learn in our own heads — we leave it where colleagues can find it. And when we write down not just the result, but the reasoning behind it, one colleague's experience becomes another's.",
  '그리고 이제, 그 기록을 동료만 읽지 않습니다. 에이전트는 어깨너머로 배우지 못합니다. 기록된 것만 배웁니다. 그래서 기록을 남기는 일은, 함께 일할 에이전트를 가르치는 일이기도 합니다. 그렇게 배운 에이전트가 이미 우리 곁에서 일하고 있습니다.':
    "And colleagues aren't the only ones reading. Agents can't learn by looking over your shoulder — they learn only what's written down. So keeping a record is also how we teach the agents we work with. Agents taught this way are already working alongside us.",

  // ── 회사소개: 한끗이 있는 사람 (People with Hankkeut) ──
  '한끗이 있는 사람': 'People with Hankkeut',
  "우리는 혼자 모든 걸 해내는 '완성된 천재'가 아닙니다.":
    "We're not lone geniuses who have it all figured out.",
  '우리는 한끗이 있는 사람들입니다. 어려운 문제를 끝까지 파고들어, 제품으로 만들어내는 사람. 모르는 것을 모른다고 말하고, 계속 배우는 사람. 동료에게 박수를 아끼지 않는 사람.':
    'We\'re people with an edge. In Korean, we call it hankkeut (한끗): the small, decisive difference between good and great. People who dig into hard problems and see them through to a shipped product. People who say "I don\'t know" and keep learning. People who never hold back applause for a colleague.',
  '지금 완성되어 있지 않아도 됩니다.': "You don't need to have it all figured out yet.",
  '실력으로 자라고, 사람으로 깊어지는 사람이면 됩니다.':
    "Grow in skill, deepen as a person. That's enough.",

  // ── 회사소개: 플라이휠 본문 ──────────────────────────
  '// 플라이 휠': '// Flywheel',
  '우리가 나아가는 방식은, 한 문장이 아니라 하나의 플라이휠(Flywheel)입니다.':
    "How we move forward isn't a statement — it's a flywheel.",
  '문장은 하나의 목적지에서 끝나지만, 바퀴는 돌면서 다음 목적지를 계속 만들어냅니다.':
    'A statement ends at one destination. A wheel keeps turning, creating the next destination as it goes.',
  '비즈니스 기회를 포착하면 새로운 사업부를 신설합니다.':
    'When we spot a business opportunity, we launch a new business unit.',
  '이 순환 안에서 각 사업부는 스스로 판단하고 결정하며, 자기만의 플라이휠을 돌립니다.':
    'Within this cycle, each unit makes its own calls, turning a flywheel of its own.',
  '그렇게 고객을 만들어 수익을 내고, 그 수익을 다음 사업에 재투자합니다.':
    'It creates customers, generates revenue, and reinvests that revenue into the next business.',
  '지금은 킵그로우, 메시온, 데카, 모도, 네 개의 사업부가 각자의 플라이휠을 돌리고 있습니다.':
    'Today, four units — KeepGrow, Mesion, DecaGEO, and modoAI — are each turning their own flywheel.',
  '이 플라이휠은 발명이 아니라 발견입니다.':
    "This flywheel is not an invention. It's a discovery.",
  '오랜 시행착오 끝에, 우리를 여기까지 오게 한 방식에 이름을 붙인 것입니다.':
    'After years of trial and error, we gave a name to the way of working that brought us this far.',
  '회사가 어디로 가는지 궁금할 때는 플라이휠 전체를 보고, 오늘 내 일이 무엇을 위한 것인지 궁금할 때는 내 일이 어느 단계에 연결되는지 봅니다.':
    "When you wonder where the company is headed, look at the whole flywheel. When you wonder what today's work is for, look at the stage your work feeds.",
  '이 플라이휠이 한 바퀴 돌아 만들어내는 것은 하나의 기능이나 제품이 아니라, 하나의 사업입니다.':
    'One full turn of this flywheel produces not a feature or a product, but a business.',
  '무거운 플라이휠은 처음 돌리는 데 가장 큰 힘이 들지만, 한번 돌기 시작하면 엔진을 꺼도 쉽게 멈추지 않습니다.':
    "A heavy flywheel takes enormous force to get moving — but once it starts turning, it doesn't stop easily, even with the engine off.",
  '그래서 우리는 눈앞의 숫자에 조급해하지 않습니다.':
    "That's why we don't chase the numbers in front of us.",
  '이 플라이휠은 이미, 돌기 시작했습니다.': 'This flywheel has already started turning.',
  '그래서 우리는 새로운 일 앞에서 묻습니다.': 'So before anything new, we ask:',
  '이것이 플라이휠을 빠르게 하는가.': 'Does this make the flywheel turn faster?',
  '그리고 하루의 끝에 다시 묻습니다.': 'And at the end of each day, we ask again:',
  '오늘 우리는, 이 플라이휠을 빠르게 했는가.':
    'Did we make the flywheel turn faster today?',
}
