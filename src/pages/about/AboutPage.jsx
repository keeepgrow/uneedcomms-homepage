import Header from '../../components/layout/Header/Header.jsx'
import Footer from '../../components/layout/Footer/Footer.jsx'
import { useLang } from '../../i18n/LanguageContext.jsx'
import spiritImg from '../../assets/about/spirit.png'
import flywheelImg from '../../assets/about/flywheel.png'
import styles from './AboutPage.module.css'

// 줄바꿈(\n)을 <br />로 렌더
function MultiLine({ text }) {
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ))
}

// 원칙 칩 EN 라벨 — 인덱스로 One~Six 매핑 (KR은 각 p.tag: 하나~여섯)
const EN_PRINCIPLE_TAGS = ['// One', '// Two', '// Three', '// Four', '// Five', '// Six']

const introBody = [
  '세상에는 지식만으로 되지 않는 일들이 있습니다.',
  '그날의 재료에 맞게 불과 간을 조절하는 요리사의 감각, 아이의 표정만 보고도 어디가 아픈지 아는 부모의 눈. 우리는 그것을 지혜라고 부릅니다.',
  '이제 우리는 무엇이든 AI에게 묻고, AI는 무엇이든 답합니다. 그러나 똑똑한 AI는 많아도, 지혜로운 AI는 없습니다.',
  '유니드컴즈는 지금 이 상황에 맞게 스스로 판단하는, 지혜로운 AI 에이전트를 만듭니다.',
  '경험의 한계를 넘어, 한 사람이 해낼 수 있는 일의 넓이와 깊이가 달라지도록. 그 변화가 쌓여, 세상이 일하는 방식을 바꿉니다.',
]

const spiritBody = [
  "우리는 혼자 모든 걸 해내는 '완성된 천재'가 아닙니다.",
  '우리는 한끗이 있는 사람들입니다. 어려운 문제를 끝까지 파고들어, 제품으로 만들어내는 사람. 모르는 것을 모른다고 말하고, 계속 배우는 사람. 동료에게 박수를 아끼지 않는 사람.',
  '지금 완성되어 있지 않아도 됩니다.',
  '실력으로 자라고, 사람으로 깊어지는 사람이면 됩니다.',
]

// 블라이휠 본문 — 빈 줄로 구분된 문단 그룹, 각 그룹은 줄바꿈으로 이어진 문장들
const flywheelGroups = [
  [
    '우리가 나아가는 방식은, 한 문장이 아니라 하나의 플라이휠(Flywheel)입니다.',
    '문장은 하나의 목적지에서 끝나지만, 바퀴는 돌면서 다음 목적지를 계속 만들어냅니다.',
  ],
  [
    '비즈니스 기회를 포착하면 새로운 사업부를 신설합니다.',
    '이 순환 안에서 각 사업부는 스스로 판단하고 결정하며, 자기만의 플라이휠을 돌립니다.',
    '그렇게 고객을 만들어 수익을 내고, 그 수익을 다음 사업에 재투자합니다.',
    '지금은 킵그로우, 메시온, 데카, 모도, 네 개의 사업부가 각자의 플라이휠을 돌리고 있습니다.',
  ],
  [
    '이 플라이휠은 발명이 아니라 발견입니다.',
    '오랜 시행착오 끝에, 우리를 여기까지 오게 한 방식에 이름을 붙인 것입니다.',
    '회사가 어디로 가는지 궁금할 때는 플라이휠 전체를 보고, 오늘 내 일이 무엇을 위한 것인지 궁금할 때는 내 일이 어느 단계에 연결되는지 봅니다.',
  ],
  [
    '이 플라이휠이 한 바퀴 돌아 만들어내는 것은 하나의 기능이나 제품이 아니라, 하나의 사업입니다.',
    '무거운 플라이휠은 처음 돌리는 데 가장 큰 힘이 들지만, 한번 돌기 시작하면 엔진을 꺼도 쉽게 멈추지 않습니다.',
    '그래서 우리는 눈앞의 숫자에 조급해하지 않습니다.',
  ],
  [
    '이 플라이휠은 이미, 돌기 시작했습니다.',
    '그래서 우리는 새로운 일 앞에서 묻습니다.',
    '이것이 플라이휠을 빠르게 하는가.',
    '그리고 하루의 끝에 다시 묻습니다.',
    '오늘 우리는, 이 플라이휠을 빠르게 했는가.',
  ],
]

const principles = [
  {
    tag: '// 하나',
    title: '"원래 그렇게 해"를 의심한다.',
    desc: '당연한 것에는 이유가 없을 때가 많습니다. 남들이 정해둔 방식을 그대로 따르지 않고, 왜 그런지 다시 묻고 더 나은 길을 만듭니다.',
  },
  {
    tag: '// 둘',
    title: '될 때까지 파고든다.',
    desc: '"일단 됐어"는 끝이 아닙니다. 진짜 원인이 나올 때까지, 파고 또 파고듭니다. 우리에게 책임은 실패하지 않는 것이 아니라, 포기하지 않는 것입니다.',
  },
  {
    tag: '// 셋',
    title: '예의는 전문가의 기본',
    desc: '예의는 격식이 아니라, 상대의 시간과 판단을 존중하는 일입니다. 동료를 100% 신뢰하고 시작하며, 동료의 자리에서 한 번 더 생각합니다. 전문가는 전문가를 그렇게 대합니다.',
  },
  {
    tag: '// 넷',
    title: '일은 내가 끌고 간다.',
    desc: '닥친 일을 쳐내는 사람과, 계획을 세워 일을 장악하는 사람은 다릅니다. 우리는 시작하기 전에 순서를 설계하고, 무엇부터 할지 스스로 정합니다. 사람은 일을 주도할 때, 가장 큰 힘을 냅니다.',
  },
  {
    tag: '// 다섯',
    label: 'FOR HUMANS',
    title: '나만 알지 않는다.',
    desc: '내가 아는 것은 나의 것이 아니라, 우리의 것이 될 때 힘이 됩니다. 그래서 우리는 공개를 기본값으로 둡니다. 알게 된 것은 머릿속에 두지 않고, 동료가 볼 수 있는 곳에 남깁니다. 결과만이 아니라 왜 그렇게 판단했는지까지 남을 때, 내 경험이 동료의 경험이 됩니다.',
  },
  {
    tag: '// 여섯',
    label: 'FOR AGENTS',
    title: '우리의 기록을, 이제 AI 에이전트도 읽는다.',
    desc: '그리고 이제, 그 기록을 동료만 읽지 않습니다. 에이전트는 어깨너머로 배우지 못합니다. 기록된 것만 배웁니다. 그래서 기록을 남기는 일은, 함께 일할 에이전트를 가르치는 일이기도 합니다. 그렇게 배운 에이전트가 이미 우리 곁에서 일하고 있습니다.',
  },
]

export default function AboutPage() {
  const { t, lang } = useLang()
  return (
    <>
      <Header bordered />
      <main className={styles.page}>
        {/* 1. 소개 / 미션 */}
        <section className={styles.intro} id="about">
          <div className="container">
            <p className={styles.tag}>{t('// 유니드컴즈 소개')}</p>
            <h1 className={styles.headline}>
              <MultiLine
                text={t('한 사람이 해낼 수 있는 일의 넓이와 깊이를 바꾸는,\n지혜로운 AI 에이전트를 만듭니다.')}
              />
            </h1>
            <div className={styles.introBody}>
              {introBody.map((line, i) => (
                <p key={i}>{t(line)}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 2. 한끗이 있는 사람 */}
        <section className={styles.spirit}>
          <div className={`container ${styles.spiritGrid}`}>
            <div className={styles.spiritText}>
              <h2 className={styles.colTitle}>{t('한끗이 있는 사람')}</h2>
              <div className={styles.spiritBody}>
                {spiritBody.map((line, i) => (
                  <p key={i}>{t(line)}</p>
                ))}
              </div>
            </div>
            <div className={styles.spiritImgWrap}>
              <img
                className={styles.spiritImg}
                src={spiritImg}
                alt="한끗이 있는 사람 — 블루 하프톤 이미지"
              />
            </div>
          </div>
        </section>

        {/* 3. 유니드컴즈가 나아가는 방식 (타이틀 밴드) */}
        <section className={styles.band}>
          <div className="container">
            <h2 className={styles.bandTitle}>{t('유니드컴즈가 나아가는 방식')}</h2>
          </div>
        </section>

        {/* 4. 플라이휠 다이어그램 */}
        <section className={styles.diagram}>
          <div className="container">
            <div className={styles.diagramFrame}>
              <img
                className={styles.diagramImg}
                src={flywheelImg}
                alt="유니드컴즈 플라이휠 다이어그램"
              />
            </div>
          </div>
        </section>

        {/* 5. 플라이휠 본문 */}
        <section className={styles.flywheel}>
          <div className={`container ${styles.flywheelGrid}`}>
            <p className={styles.tag}>{t('// 유니드컴즈는, 매일 이 바퀴를 더 빠르게 합니다.')}</p>
            <div className={styles.flywheelText}>
              {flywheelGroups.map((group, gi) => (
                <p key={gi}>
                  {group.map((line, li) => (
                    <span key={li}>
                      {t(line)}
                      {li < group.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 6. 우리가 일하는 방식 (타이틀 밴드) */}
        <section className={`${styles.band} ${styles.bandWork}`}>
          <div className="container">
            <h2 className={styles.bandTitle}>{t('우리가 일하는 방식')}</h2>
          </div>
        </section>

        {/* 7. 일하는 원칙 */}
        <section className={styles.principles}>
          <div className={`container ${styles.principlesGrid}`}>
            <p className={styles.tag}>{t('// 한끗이 있는 사람들은, 매일 이렇게 일합니다.')}</p>
            <div className={styles.principlesList}>
              {principles.map((p, i) => (
                <article key={i} className={styles.principle}>
                  <div className={styles.pTagRow}>
                    <span className={styles.pBox}>
                      {lang === 'en' ? EN_PRINCIPLE_TAGS[i] : p.tag}
                    </span>
                    {p.label && <span className={styles.pLabel}>{p.label}</span>}
                  </div>
                  <h3 className={styles.pTitle}>{t(p.title)}</h3>
                  <p className={styles.pDesc}>{t(p.desc)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 8. 클로징 스테이트먼트 */}
        <section className={styles.closing}>
          <div className="container">
            <p className={styles.closingText}>
              <MultiLine
                text={t('한 사람의 지혜가 기록으로 남을 때,\n모두가 해낼 수 있는 일의 넓이와 깊이가 달라집니다.')}
              />
            </p>
          </div>
        </section>
      </main>
      <Footer sitemap={false} />
    </>
  )
}
