import Header from '../../Components/MainPage/Header/Header'
import Footer from '../../Components/MainPage/Footer/Footer'
import PageNotFound from '../../Components/MainPage/PageNotFound/PageNotFound'

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