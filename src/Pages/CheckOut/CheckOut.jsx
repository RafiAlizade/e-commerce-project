import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import CheckPage from '../../Components/CheckPage/CheckPage'

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