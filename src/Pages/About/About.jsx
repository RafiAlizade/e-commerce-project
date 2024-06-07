import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import AboutUs from './../../Components/AboutUs/AboutUs'
import Advantages from './../../Components/Advantages/Advantages'

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