import React from 'react'
import Signup from '../pages/User/Signup/Signup'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Home from '../pages/User/Home/Home'
import { Route, Routes } from 'react-router-dom'
import UserDashboard from '../pages/User/Dashboard/Dashboard'
import CourseList from '../pages/User/CourseList/CourseList'
import CourseDetail from '../pages/User/CourseDetail/CourseDetail'
import OtpPage from '../pages/User/OtpPage/OtpPage'
import UserProfile from '../pages/User/Profile/Profile'
import PageRedirect from '../components/PageRedirect/PageRedirect'
import LoginPage from '../pages/User/Login/Login'
import CourseChapters from '../pages/User/CourseChapters/CourseChapters'
import Wishlist from '../pages/User/Wishlist/Wishlist'
import Cart from '../pages/User/Cart/Cart'
import Checkout from '../pages/User/Checkout/Checkout'

 const UserRouting = () => {
  return (
    <div>
      <Routes>
            <Route path='/login' element={ <LoginPage />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/home' element= {<Home/>} />
            <Route path='/student/dashboard' element= {<PageRedirect allowedRoles={['student']}><UserDashboard/></PageRedirect>} />
            <Route path='/course-list' element={<CourseList/>} />
            <Route path='/course-detail/:id' element={<CourseDetail/>} />
            <Route path='/otp' element={<OtpPage/>} />
            <Route path='/student/profile' element={<PageRedirect allowedRoles={['student']}><UserProfile /></PageRedirect>} />
            <Route path='/course/chapters' element={<PageRedirect allowedRoles={['student']}><CourseChapters /></PageRedirect>} />
            <Route path='/wishlist' element={<PageRedirect allowedRoles={['student']}> <Wishlist /> </PageRedirect>} />
            <Route path='/cart' element={<PageRedirect allowedRoles={['student']}> <Cart /> </PageRedirect>} />
            <Route path='/checkout' element={<PageRedirect allowedRoles={['student']}> <Checkout /> </PageRedirect>} />
        </Routes>
        
    </div>
  )
}

export default UserRouting