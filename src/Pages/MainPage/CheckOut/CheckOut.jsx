import Header from '../../../Components/MainPage/Header/Header'
import Footer from '../../../Components/MainPage/Footer/Footer'
import CheckPage from '../../../Components/MainPage/CheckPage/CheckPage'

function CheckOut() {
  return (
    <>
    <Header />
    <main className="app__main">
        <CheckPage />
    </main>

    <Footer />
    </>
  )
}

export default CheckOut