import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/SignUp'
import SignIn from './Pages/SignIn/SignIn'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import Page404 from './Pages/Page404/Page404'
import Wishlist from './Pages/Wishlist/Wishlist'
import Cart from './Pages/Cart/Cart'
import CheckOut from './Pages/CheckOut/CheckOut'
import OrderConfirm from './Components/OrderConfirm/OrderConfirm'
import './assets/fonts/Poppins-Medium.ttf'
import './assets/fonts/Poppins-Regular.ttf'
import './assets/fonts/Poppins-Bold.ttf'
import './assets/fonts/Poppins-SemiBold.ttf'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/signup' element={< SignUp />} />
        <Route path='/login' element={< SignIn />} />
        <Route path='/about' element={< About />} />
        <Route path='/contact' element={< Contact />} />
        <Route path='/wishlist' element={< Wishlist />} />
        <Route path='/cart' element={< Cart />} />
        <Route path='/checkout' element={< CheckOut />} />
        <Route path='/completed-order/:ordernumber' element={< OrderConfirm />} />
        <Route path='/product/:id' element={< OrderConfirm />} />
        <Route path='*' element={< Page404 />} />
      </Routes>
    </>
  )
}

export default App
