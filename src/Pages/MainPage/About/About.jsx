import Header from '../../../Components/MainPage/Header/Header'
import Footer from '../../../Components/MainPage/Footer/Footer'
import AboutUs from '../../../Components/MainPage/AboutUs/AboutUs'
import Advantages from '../../../Components/MainPage/Advantages/Advantages'

function About() {
  return (
    <>
    <Header />
    <main className="app__main">
        < AboutUs />
        < Advantages />
    </main>
    <Footer />
    </>
  )
}

export default About