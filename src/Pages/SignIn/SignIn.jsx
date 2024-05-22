import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'
import Login from '../../Components/Login/Login'

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