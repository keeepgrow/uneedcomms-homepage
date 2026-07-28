import Header from '../../components/layout/Header/Header.jsx'
import Footer from '../../components/layout/Footer/Footer.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Products from './sections/Products/Products.jsx'
import Partners from './sections/Partners/Partners.jsx'
import Newsroom from './sections/Newsroom/Newsroom.jsx'

export default function MainPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Partners />
        <Newsroom />
      </main>
      <Footer />
    </>
  )
}
