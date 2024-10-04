import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import AdminUserManagement from "../pages/Admin/UserManagement/UserManagement";
import AdminMentorManagement from "../pages/Admin/MentorManagement/MentorManagement";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";


const AdminRouting = () => {

    return (
        <div>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />}></Route>
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/user-management' element={<AdminUserManagement />} />
                <Route path='/admin/mentor-management' element={<AdminMentorManagement />} />
            </Routes>
        </div>
    )
}

export default AdminRouting;