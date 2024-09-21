import React from "react";
import { Route, Routes } from "react-router-dom";
import MentorHome from "../pages/Mentor/Home/MentorHome";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";


const MentorRouting = () => {
    return (
        <div>
            <Routes>
            <Route path='/mentor/home' element={<ProtectedRoute><MentorHome/></ProtectedRoute>} />
            </Routes>
        </div>
    )
}

export default MentorRouting;