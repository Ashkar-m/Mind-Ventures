import React from "react";
import { Route, Routes } from "react-router-dom";
import MentorHome from "../pages/Mentor/Home/MentorHome";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AddCourse from "../pages/Mentor/AddCourse/AddCourse";


const MentorRouting = () => {
    return (
        <div>
            <Routes>
            <Route path='/mentor/home' element={<ProtectedRoute><MentorHome/></ProtectedRoute>} />
            <Route path='/mentor/add-course' element={<ProtectedRoute><AddCourse/></ProtectedRoute>} />
            </Routes>
        </div>
    )
}

export default MentorRouting;