import React, { useEffect, useState } from "react";
import MentorNavbar from "../Navbar/Navbar";
import MentorSidebar from "../Sidebar/Sidebar";
import { baseUrl } from "../../../components/auth/authService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MentorDashboard = () => {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const getToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
        setUserDetails(user);
    }, []);
    console.log(accessToken);
    
    useEffect( () => {
        const fetchCourses = async () => {
            if(userDetails){
                try{
                    const response = await fetch(`${baseUrl}/courses/course-list/`,{
                        headers: {
                            'Authorization': `Bearer ${accessToken}`, // Include the token
                        },
                    })
    
                    if (!response.ok) {
                        throw new Error("Error while fetching ")
                    }
    
                    const course = await response.json();
                    setCourses(course);
                } catch (error) {
                    console.error("Error while fetching the course:",error);
                }
            }
            
        }
        fetchCourses();
    },[accessToken, userDetails])
    console.log(courses);

    const handleButton = (id) => {
        navigate(`/mentor/edit-course/${id}`)
    }

    const handleChapters = (id) => {
        navigate(`/mentor/chapters/${id}`)
    }

    return (
        <div>

            {/* Navbar */}
            <MentorNavbar />

            {/* Sidebar */}
            <MentorSidebar />

            {/* Dashboard */}
            <div className="p-4 sm:ml-64 mt-16">
            <main className="flex-1 p-6 bg-gray-100">
                <h2 className="text-xl font-bold mb-4">Courses Created By You</h2>

                {/* Grid for cards with fixed size and 3 columns on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4">

                    {/* Fixed image size for consistency */}
                    <img
                        src={course?.preview_image 
                        ? `${baseUrl}${course.preview_image}`
                        : "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                        }
                        alt="course-image"
                        className="w-full h-48 object-cover rounded-lg mb-4" // Fixed height, full width, and object cover for proper image sizing
                    />

                    {/* Course details */}
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.description}</p>
                    <p className="text-sm text-gray-600">{course.price} (₹)</p>
                    <p className="text-sm text-gray-600">{course.duration} hours</p>
                    { course.status === 'approval' &&(
                        <p className="text-sm text-green-600">{course.status}</p>
                    )}
                    { course.status === 'pending' &&(
                        <p className="text-sm text-gray-900">{course.status}</p>
                    )}
                    { course.status === 'rejected' &&(
                        <p className="text-sm text-red-600">{course.status}</p>
                    )}
                    
                    

                    {/* Edit button */}
                    <button onClick={ () => handleButton(course.id) } className="bg-blue-500 text-white py-1 px-3 rounded mt-2 hover:bg-blue-600">
                        Edit Course
                    </button>
                    <button onClick={ () => handleChapters(course.id) } className="bg-blue-500 text-white py-1 px-3 rounded mt-2 hover:bg-blue-600">
                        Show Chapters
                    </button>
                    </div>
                ))}
                </div>
            </main>
            </div>
        </div>
    )
}

export default MentorDashboard;