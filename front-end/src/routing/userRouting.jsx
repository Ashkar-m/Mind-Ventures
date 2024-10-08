import React from 'react'
import LoginPage from '../pages/User/Login/login'
import Signup from '../pages/User/Signup/Signup'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Home from '../pages/User/Home/Home'
import { Route, Routes } from 'react-router-dom'
import UserDashboard from '../pages/User/Dashboard/Dashboard'
import CourseList from '../pages/User/CourseList/CourseList'
import CourseDetail from '../pages/User/CourseDetail/CourseDetail'
import OtpPage from '../pages/User/OtpPage/OtpPage'
import UserProfile from '../pages/User/Profile/Profile'

 const UserRouting = () => {
  return (
    <div>
      <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/home' element= {<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path='/student/dashboard' element= {<ProtectedRoute><UserDashboard/></ProtectedRoute>} />
            <Route path='/course-list' element={<CourseList/>} />
            <Route path='/course-detail/:id' element={<CourseDetail/>} />
            <Route path='/otp' element={<OtpPage/>} />
            <Route path='/student/profile' element={<UserProfile />} />
        </Routes>
        
    </div>
  )
}

export default UserRouting