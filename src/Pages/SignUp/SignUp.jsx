import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import Register from '../../Components/Register/Register'

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