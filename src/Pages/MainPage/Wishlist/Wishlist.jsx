import Header from '../../../Components/MainPage/Header/Header'
import Footer from '../../../Components/MainPage/Footer/Footer'
import WishPage from '../../../Components/MainPage/WishPage/WishPage'

function Wishlist() {
  return (
    <>
    <Header />
    <main className="app__main">
    <WishPage />
    </main>
    <Footer />
    </>
  )
}

export default Wishlist