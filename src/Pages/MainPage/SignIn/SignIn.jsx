import Header from '../../../Components/MainPage/Header/Header'
import Footer from '../../../Components/MainPage/Footer/Footer'
import Login from '../../../Components/MainPage/Login/Login'

function SignIn() {
  return (
    <>
    <Header />
    <main className="app__main">
      <Login />
    </main>
    <Footer />
    </>
  )
}

export default SignIn