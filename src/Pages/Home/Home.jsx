import Header from './../../Components/Header/Header'
import Categories from './../../Components/Categories/Categories'
import FlashSale from './../../Components/FlashSale/FlashSale'
import BrowseCategory from './../../Components/BrowseCategory/BrowseCategory'

function Home() {
  return (
    <>
    <Header />
    <main className="app_main">
      <Categories />
      <FlashSale />
      <BrowseCategory />
    </main>
    </>
  )
}

export default Home