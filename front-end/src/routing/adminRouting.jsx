import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import AdminUserManagement from "../pages/Admin/UserManagement/UserManagement";
import AdminMentorManagement from "../pages/Admin/MentorManagement/MentorManagement";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AdminCategoryManagement from "../pages/Admin/AdminCategoryManagement/AdminCategoryManagement";
import AdminCourseManagement from "../pages/Admin/Course/Course";
import PageRedirect from "../components/PageRedirect/PageRedirect";
import CoursePreview from "../pages/Admin/CoursePrview/CoursePrivew";
import AdminAddCourse from "../pages/Admin/AddCourse/AddCourse";


const AdminRouting = () => {

    return (
        <div>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />}></Route>
                <Route path="/admin/home" element={<PageRedirect allowedRoles={['admin']}><AdminHome /></PageRedirect>} />
                <Route path='/admin/dashboard' element={<PageRedirect allowedRoles={['admin']}><AdminDashboard /></PageRedirect>} />
                <Route path='/admin/user-management' element={<PageRedirect allowedRoles={['admin']}><AdminUserManagement /></PageRedirect>} />
                <Route path='/admin/mentor-management' element={<PageRedirect allowedRoles={['admin']}><AdminMentorManagement /></PageRedirect>} />
                <Route path='/admin/category-management' element={<PageRedirect allowedRoles={['admin']}><AdminCategoryManagement /></PageRedirect>} />
                <Route path='/admin/course-management' element={<PageRedirect allowedRoles={['admin']}><AdminCourseManagement/></PageRedirect>} />
                <Route path='/admin/course-preview/:id' element={<PageRedirect allowedRoles={['admin']}><CoursePreview /></PageRedirect>} />
                <Route path="/admin/add-course" element={<PageRedirect allowedRoles={['admin']}><AdminAddCourse/></PageRedirect>} />
            </Routes>
        </div>
    )
}

export default AdminRouting;