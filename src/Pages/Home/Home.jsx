import Header from './../../Components/Header/Header'
import Categories from './../../Components/Categories/Categories'
import FlashSale from './../../Components/FlashSale/FlashSale'

function Home() {
  return (
    <>
    <Header />
    <main className="app_main">
      <Categories />
      <FlashSale />
    </main>
    </>
  )
}

export default Home