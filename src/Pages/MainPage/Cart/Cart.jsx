import Header from '../../../Components/MainPage/Header/Header'
import Footer from '../../../Components/MainPage/Footer/Footer'
import CartPage from '../../../Components/MainPage/CartPage/CartPage'

function Cart() {
    return (
        <>
        <Header />
        <main className="app__main">
          <CartPage />
        </main>
        <Footer />
        </>
      )
}

export default Cart