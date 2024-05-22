import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/SignUp'
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
      </Routes>
    </>
  )
}

export default App
