import Header from '../../../Components/MainPage/Header/Header'
import Footer from '../../../Components/MainPage/Footer/Footer'
import Register from '../../../Components/MainPage/Register/Register'

function SignUp() {
  return (
    <>
    <Header />
    <main className="app__main">
      <Register />
    </main>
    <Footer />
    </>
  )
}

export default SignUp