import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/login'
import Signup from './pages/Signup/Signup'

function App() {

  return (
     <>
     <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<Signup />} />
     </Routes>
     </>
  )
}

export default App
