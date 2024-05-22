import Header from './../../Components/Header/Header'
import Categories from './../../Components/Categories/Categories'
import FlashSale from './../../Components/FlashSale/FlashSale'
import BrowseCategory from './../../Components/BrowseCategory/BrowseCategory'
import BestSelling from './../../Components/BestSelling/BestSelling'
import Advertising from './../../Components/Advertising/Advertising'
import ExploreProducts from './../../Components/ExploreProducts/ExploreProducts'
import Featured from './../../Components/Featured/Featured'
import Advantages from './../../Components/Advantages/Advantages'
import Footer from './../../Components/Footer/Footer'

function Home() {
  return (
    <>
    <Header />
    <main className="app_main">
      <Categories />
      <FlashSale />
      <BrowseCategory />
      <BestSelling />
      <Advertising />
      <ExploreProducts />
      <Featured />
      <Advantages />
    </main>
    <Footer />
    </>
  )
}

export default Home