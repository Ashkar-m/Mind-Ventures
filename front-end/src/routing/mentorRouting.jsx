import React from "react";
import { Route, Routes } from "react-router-dom";
import MentorHome from "../pages/Mentor/Home/MentorHome";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AddCourse from "../pages/Mentor/AddCourse/AddCourse";
import MentorProfile from "../pages/Mentor/Profile/Profile";
import MentorDashboard from "../pages/Mentor/Dashboard/Dashboard";
import EditCourse from "../pages/Mentor/EditCourse/EditCourse";


const MentorRouting = () => {
    return (
        <div>
            <Routes>
            <Route path='/mentor/home' element={<MentorHome/>} />
            <Route path='/mentor/add-course' element={<AddCourse/>} />
            <Route path="/mentor/profile" element={<MentorProfile />} />
            <Route path='/mentor/dashboard' element={<MentorDashboard />} />
            <Route path='/mentor/edit-course/:id' element={<EditCourse/>} />
            </Routes>
        </div>
    )
}

export default MentorRouting;