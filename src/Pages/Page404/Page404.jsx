<<<<<<< Updated upstream
import Header from '../../Components/MainPage/Header/Header'
import Footer from '../../Components/MainPage/Footer/Footer'
import PageNotFound from '../../Components/MainPage/PageNotFound/PageNotFound'
=======
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import PageNotFound from '../../Components/PageNotFound/PageNotFound'
>>>>>>> Stashed changes

function Page404() {
  return (
    <>
    <Header />
    <main className="app__main">
    <PageNotFound />
    </main>

    <Footer />
    </>
  )
}

export default Page404