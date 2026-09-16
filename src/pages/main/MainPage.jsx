import Header from '../../components/layout/Header/Header.jsx'
import Footer from '../../components/layout/Footer/Footer.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Products from './sections/Products/Products.jsx'
import Making from './sections/Making/Making.jsx'
import Partners from './sections/Partners/Partners.jsx'
import Newsroom from './sections/Newsroom/Newsroom.jsx'
import History from './sections/History/History.jsx'

export default function MainPage() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <Reveal>
          <Products />
        </Reveal>
        <Reveal>
          <Making />
        </Reveal>
        <Reveal>
          <Partners />
        </Reveal>
        <Reveal>
          <Newsroom />
        </Reveal>
        <Reveal>
          <History />
        </Reveal>
      </main>
      <Footer />
    </>
  )
}
