import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminLogin from "../pages/Admin/Login/AdminLogin";


const AdminRouting = () => {

    return (
        <div>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />}></Route>
                <Route path="/admin/home" element={<AdminHome/>} />

            </Routes>
        </div>
    )
}

export default AdminRouting;