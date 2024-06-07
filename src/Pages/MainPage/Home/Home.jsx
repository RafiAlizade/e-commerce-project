import Header from '../../../Components/MainPage/Header/Header'
import Categories from '../../../Components/MainPage/Categories/Categories'
import FlashSale from '../../../Components/MainPage/FlashSale/FlashSale'
import BrowseCategory from '../../../Components/MainPage/BrowseCategory/BrowseCategory'
import BestSelling from '../../../Components/MainPage/BestSelling/BestSelling'
import Advertising from '../../../Components/MainPage/Advertising/Advertising'
import ExploreProducts from '../../../Components/MainPage/ExploreProducts/ExploreProducts'
import Featured from '../../../Components/MainPage/Featured/Featured'
import Advantages from '../../../Components/MainPage/Advantages/Advantages'
import Footer from '../../../Components/MainPage/Footer/Footer'

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