import { Route, Routes } from 'react-router-dom'
import './App.css'
<<<<<<< Updated upstream
import Home from './Pages/MainPage/Home/Home'
import SignUp from './Pages/MainPage/SignUp/SignUp'
import SignIn from './Pages/MainPage/SignIn/SignIn'
import About from './Pages/MainPage/About/About'
import Contact from './Pages/MainPage/Contact/Contact'
import Page404 from './Pages/Page404/Page404'
import Wishlist from './Pages/MainPage/Wishlist/Wishlist'
import Cart from './Pages/MainPage/Cart/Cart'
import CheckOut from './Pages/MainPage/CheckOut/CheckOut'
import OrderConfirm from './Components/MainPage/OrderConfirm/OrderConfirm'
import ProductPage from './Components/MainPage/ProductPage/ProductPage'
=======
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/SignUp'
import SignIn from './Pages/SignIn/SignIn'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import Page404 from './Pages/Page404/Page404'
>>>>>>> Stashed changes
import './assets/fonts/Poppins-Medium.ttf'
import './assets/fonts/Poppins-Regular.ttf'
import './assets/fonts/Poppins-Bold.ttf'
import './assets/fonts/Poppins-SemiBold.ttf'
import { Provider } from 'react-redux'
import store from './redux/store/store'

function App() {
  return (
    <Provider store={store}>
      <Routes>
<<<<<<< Updated upstream
        <Route path='/' element={< Home />} />
        <Route path='/signup' element={< SignUp />} />
        <Route path='/login' element={< SignIn />} />
        <Route path='/about' element={< About />} />
        <Route path='/contact' element={< Contact />} />
        <Route path='/wishlist' element={< Wishlist />} />
        <Route path='/cart' element={< Cart />} />
        <Route path='/checkout' element={< CheckOut />} />
        <Route path='/completed-order/:ordernumber' element={< OrderConfirm />} />
        <Route path='/product/:id/:colorIndex?' element={<ProductPage />} />
        <Route path='*' element={< Page404 />} />
=======
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<Page404 />} />
>>>>>>> Stashed changes
      </Routes>
    </Provider>
  )
}

export default App
