import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import axios from "axios";
import { baseUrl } from "../../../components/auth/authService";
import axiosInstance from "../../../components/Bearer/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";


const AdminAddCourse = () => {
    const [categoryList, setCategoryList] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [mentorDetails, setMentorDetails] = useState(null);
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        price: "",
        category: "",
        preview_image: null,
        mentor: "",
    });
    // const { accessToken, refreshToken } = useSelector(state => state.auth)
    const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);
    const dispatch = useDispatch();
    const refreshToken = useSelector((state) => state.auth.refreshToken);
    const accessToken = useSelector((state) => state.auth.accessToken);
    console.log(accessToken);
    console.log(refreshToken);
    
    
    if (accessToken === refreshToken){
        console.log('2');
    } else {
        console.log('3');
        
    }

//   useEffect(() => {
//     if (!accessToken && refreshToken) {
//       setIsTokenRefreshing(true);
//       fetch(`${baseUrl}/token/refresh/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           grant_type: 'refresh_token',
//           refresh_token: refreshToken,
//         }),
//       })
//       .then(response => response.json())
//       .then(data => {
//         const newAccessToken = data.access_token;
//         dispatch(updateAccessToken(newAccessToken));
//         setIsTokenRefreshing(false);
//       })
//       .catch(error => {
//         console.error('Error refreshing token:', error);
//         setIsTokenRefreshing(false);
//       });
//     }
//   }, [accessToken, refreshToken, dispatch]);
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const getToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
        setToken(getToken)
        setUserDetails(user);
    }, []);
    console.log(accessToken);
    
    

    useEffect( () => {
        const fetchMentorDetail = async () => {
            try {
                if (userDetails) {
                    const response = await fetch(`${baseUrl}/users/user-detail/${userDetails.user_id}/`,{
                        headers: {
                            'Authorization': `Bearer ${accessToken}`, // Include the token
                        },
                    })
                
                    if (!response.ok) {
                        throw new Error ('Error while fetching category')
                    }
                    
                    const data = await response.json();

                    setMentorDetails(data);

                    setFormData( (prevFormData) => ({
                        ...prevFormData,
                        mentor: data.id,  // Set mentor ID in formData
                    }));
                }

            } catch (error) {
                console.error("Error:",error);
            }
        }
        fetchMentorDetail();
    }, [userDetails]);
    console.log(mentorDetails);
    
    
    
    
    // useEffect( () => {
    //     const fetchCategoryList = async () => {
    //         try {
    //             // const response = await axiosInstance.get(`${baseUrl}/courses/category-list/`,{
    //             //     headers: {
    //             //         'Authorization': `Bearer ${token}`, // Include the token
    //             //     },
    //             const token = localStorage.getItem('access_token'); // Or wherever you are storing the token
    //             const response = await axios.get('http://127.0.0.1:8000/courses/category-list/', {
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}` // Assuming you're using JWT tokens
    //             }
    //             })
                
    //             if (!response.ok) {
    //                 const errorMessage = `Error fetching category list: ${response.status} ${response.statusText}`;
    //     console.error(errorMessage);
    //             }
                
    //             const data = await response.json();

    //             setCategoryList(data);

    //         } catch (error) {
    //             console.error("Error:",error);
                
    //         }
    //     }
    //     fetchCategoryList();
    // }, []);
    useEffect(() => {
        const fetchCategoryList = async () => {
          try { 
            const response = await axios.get('http://127.0.0.1:8000/courses/category-list/', {
              headers: {
                'Authorization': `Bearer ${accessToken}`, // Use accessToken here
              },
            });
    
            // Axios automatically throws errors for non-2xx status codes, so no need for manual checks
            const data = response.data; // This contains the actual response data
            setCategoryList(data); // Assuming setCategoryList is a state setter function
          } catch (error) {
            console.error("Error fetching category list:", error);
          }
        };
    
        fetchCategoryList();
    }, []);
    console.log(categoryList);
    
    
      
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    if (name === "category" || name === "mentor") {
        const intValue = parseInt(value, 10);
        if (isNaN(intValue)) {
            console.error(`Invalid integer value for ${name}: ${value}`);
            return;
        }
        setFormData({
            ...formData,
            [name]: intValue,
        });
    } else {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            preview_image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('duration', parseFloat(formData.duration));
    formDataToSend.append('price', parseFloat(formData.price));
    formDataToSend.append('category', parseInt(formData.category, 10));
    formDataToSend.append('mentor', parseInt(formData.mentor, 10));

    // Add the image file if it exists
    if (formData.preview_image) {
        formDataToSend.append('preview_image', formData.preview_image);
    }

    for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value, `(Type: ${typeof value})`);
        
        // If the value is a File object, you can specifically check its type
        if (value instanceof File) {
            console.log(`${key} is a File with name: ${value.name}`);
        }
    }
    
    
        try {
            const response = await axiosInstance.post('/courses/courseview/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type for form data
                    'Authorization': `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div>

            {/* navbar */}
            <AdminNavbar />

            {/* Sidebar */}
            <AdminSidebar />

            {/* Add Course Body part */}
            <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
            <form className="bg-white p-8 rounded-lg shadow-md mt-12" onSubmit={handleSubmit} >
                <div className="space-y-12">
                <div className="border-b border-gray-300 pb-8">
                    <h2 className="text-xl font-semibold leading-7 text-gray-800">
                    Course Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                    Provide details about the course you're offering.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Course Name */}
                    <div className="col-span-2">
                        <label
                        htmlFor="course-name"
                        className="block text-sm font-medium leading-6 text-gray-800"
                        >
                        Course Name
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="title"
                            id="course-name"
                            autoComplete="course-name"
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter course name"
                        />
                        </div>
                    </div>

                    {/* Course Category */}
                    <div>
                        <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-800"
                        >
                        Category
                        </label>
                        <div className="mt-2">
                        <select
                            id="category"
                            name="category"
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a category</option>
                            {categoryList && categoryList.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name} {/* Use the appropriate property to display */}
                                </option>
                            ))}
                        </select>
                        </div>
                    </div>

                    {/* Course Duration */}
                    <div>
                        <label
                        htmlFor="duration"
                        className="block text-sm font-medium leading-6 text-gray-800"
                        >
                        Duration (hours)
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="duration"
                            id="duration"
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter course duration"
                        />
                        </div>
                    </div>

                    {/* Course Price */}
                    <div>
                        <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-800"
                        >
                        Price ($)
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="price"
                            id="price"
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter course price"
                        />
                        </div>
                    </div>
                    </div>

                    {/* Course Description */}
                    <div className="col-span-full mt-8">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-800"
                    >
                        Description
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="description"
                        name="description"
                        rows="5"
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Write a brief description of the course"
                        ></textarea>
                    </div>
                    </div>

                    {/* Course Image */}
                    <div className="mt-8">
                    <label
                        htmlFor="course-image"
                        className="block text-sm font-medium text-gray-700 text-left"
                    >
                        Upload Course Image
                    </label>
                    <div className="mt-2 flex items-center">
                        {/* Image Preview (optional) */}
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <img
                            src="https://via.placeholder.com/64"
                            alt="Course preview"
                            id="course-image-preview"
                            className="h-full w-full object-cover"
                        />
                        </div>
                        <div className="ml-4 flex flex-col">

                        {/* Hidden field */}
                        {/* {userDetails && (
                            <input type="hidden" name="mentor" value={userDetails.user_id} />
                        )} */}

                        <input
                            id="course-image"
                            name="preview_image"
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="course-image"
                            className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Select Image
                        </label>
                        <p className="mt-1 text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB.
                        </p>
                        </div>
                    </div>
                    </div>

                </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-end gap-4">
                <button
                    type="button"
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                    Save Course
                </button>
                </div>
            </form>
        </div>
        </div>
    )
};

export default AdminAddCourse;