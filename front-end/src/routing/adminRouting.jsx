import React from "react";
import { Route, Routes } from "react-router-dom";


const AdminRouting = () => {

    return (
        <div>
            <Routes>
                <Route path="/amdin/loggin" element={<AdminLogin/>} />

            </Routes>
        </div>
    )
}

export default AdminRouting;