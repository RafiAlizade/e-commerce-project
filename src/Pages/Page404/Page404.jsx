import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import PageNotFound from '../../Components/PageNotFound/PageNotFound'

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