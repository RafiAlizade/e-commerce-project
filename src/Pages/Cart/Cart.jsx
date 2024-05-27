import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import CartPage from '../../Components/CartPage/CartPage'

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