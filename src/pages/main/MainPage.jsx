import Header from '../../components/layout/Header/Header.jsx'
import Footer from '../../components/layout/Footer/Footer.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Products from './sections/Products/Products.jsx'
import Partners from './sections/Partners/Partners.jsx'
import Newsroom from './sections/Newsroom/Newsroom.jsx'
import styles from './MainPage.module.css'

export default function MainPage() {
  return (
    <>
      <Header />
      {/* 히어로는 fixed로 고정 */}
      <Hero />
      {/* 히어로 이후 전체 콘텐츠가 하나의 덮개로 위로 스크롤되며 히어로를 덮음 */}
      <div className={styles.body}>
        <main>
          <Products />
          <Partners />
          <Newsroom />
        </main>
        <Footer />
      </div>
    </>
  )
}
