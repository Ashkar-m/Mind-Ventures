import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/login'
import Signup from './pages/Signup/Signup'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './pages/Home/Home'

function App() {

  return (
     <>
     <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/' element= {<ProtectedRoute><Home/></ProtectedRoute>} />
     </Routes>
     </>
  )
}

export default App
