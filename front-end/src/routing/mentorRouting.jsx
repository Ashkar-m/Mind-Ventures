import React from "react";
import { Route, Routes } from "react-router-dom";
import MentorHome from "../pages/Mentor/Home/MentorHome";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AddCourse from "../pages/Mentor/AddCourse/AddCourse";
import MentorProfile from "../pages/Mentor/Profile/Profile";
import MentorDashboard from "../pages/Mentor/Dashboard/Dashboard";
import EditCourse from "../pages/Mentor/EditCourse/EditCourse";
import PageRedirect from "../components/PageRedirect/PageRedirect";
import Chapter from "../pages/Mentor/Chapter/Chapter";


const MentorRouting = () => {
    return (
        <div>
            <Routes>
            <Route path='/mentor/home' element={<PageRedirect allowedRoles={['mentor']}><MentorHome/></PageRedirect>} />
            <Route path='/mentor/add-course' element={<PageRedirect allowedRoles={['mentor']}><AddCourse/></PageRedirect>} />
            <Route path="/mentor/profile" element={<PageRedirect allowedRoles={['mentor']}><MentorProfile /></PageRedirect>} />
            <Route path='/mentor/dashboard' element={<PageRedirect allowedRoles={['mentor']}><MentorDashboard /></PageRedirect> } />
            <Route path='/mentor/edit-course/:id' element={<PageRedirect allowedRoles={['mentor']}><EditCourse/></PageRedirect>} />
            <Route path='/mentor/chapters/:id' element={<PageRedirect allowedRoles={['mentor']}><Chapter /></PageRedirect>} />
            </Routes>
        </div>
    )
}

export default MentorRouting;