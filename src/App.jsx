import { Route, Routes } from 'react-router-dom'
import './App.css'
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
import AdminLogin from './Components/AdminPage/AdminLogin/AdminLogin'
import './assets/fonts/Poppins-Medium.ttf'
import './assets/fonts/Poppins-Regular.ttf'
import './assets/fonts/Poppins-Bold.ttf'
import './assets/fonts/Poppins-SemiBold.ttf'

function App() {
  return (      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/signup' element={< SignUp />} />
        <Route path='/login' element={< SignIn />} />
        <Route path='/about' element={< About />} />
        <Route path='/contact' element={< Contact />} />
        <Route path='/wishlist' element={< Wishlist />} />
        <Route path='/cart' element={< Cart />} />
        <Route path='/admin' element={< AdminLogin />} />
        <Route path='/checkout' element={< CheckOut />} />
        <Route path='/completed-order/:ordernumber' element={< OrderConfirm />} />
        <Route path='/product/:id/:colorIndex?' element={<ProductPage />} />
        <Route path='*' element={< Page404 />} />
      </Routes>
  )
}

export default App
