import React from 'react'
import LoginPage from '../pages/User/Login/login'
import Signup from '../pages/User/Signup/Signup'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Home from '../pages/User/Home/Home'
import { Route, Routes } from 'react-router-dom'

 const UserRouting = () => {
  return (
    <div>
      <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/home' element= {<ProtectedRoute><Home/></ProtectedRoute>} />
        </Routes>
        
    </div>
  )
}

export default UserRouting