import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import axios from "axios";
import { baseUrl } from "../../../components/auth/authService";


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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const getToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
        setToken(getToken)
        setUserDetails(user);
    }, []);
    console.log(token);
    

    useEffect( () => {
        const fetchMentorDetail = async () => {
            try {
                if (userDetails) {
                    const response = await fetch(`${baseUrl}/users/user-detail/${userDetails.user_id}/`)
                
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
    
    
    
    useEffect( () => {
        const fetchCategoryList = async () => {
            try {
                const response = await fetch(`${baseUrl}/courses/category-list/`)
                
                if (!response.ok) {
                    throw new Error ('Error while fetching category')
                }
                
                const data = await response.json();

                setCategoryList(data);

            } catch (error) {
                console.error("Error:",error);
                
            }
        }
        fetchCategoryList();
    }, []);
    
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     const postData = {
    //         title: formData.title,
    //         description: formData.description,
    //         duration: parseFloat(formData.duration),
    //         price: parseFloat(formData.price),
    //         category: parseInt(formData.category, 10),
    //         mentor: parseInt(formData.mentor, 10),
    //     };

    //     if (formData.preview_image) {
    //         postData.preview_image = formData.preview_image;
    //     }
    
    //     // Ensure preview_image is a valid file
    //     // if (formData.preview_image && formData.preview_image instanceof File) {
    //     //     postData.append("preview_image", formData.preview_image);
    //     // } else {
    //     //     console.warn("Preview image is not valid or not a file:", formData.preview_image);
    //     // }
    //     try {
    //         console.log("Posting data:", Object.fromEntries(postData.entries()));
            
            
    //         const response = await fetch(`${baseUrl}/courses`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(postData),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log("Course created:", data);
    //         } else {
    //             console.error("Error creating course");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const postData = {
            title: formData.title,
            description: formData.description,
            duration: parseFloat(formData.duration),
            price: parseFloat(formData.price),
            category: parseInt(formData.category, 10),
            mentor: parseInt(formData.mentor, 10),
        };
    
        if (formData.preview_image) {
            postData.preview_image = formData.preview_image;
        }
    
        try {
            console.log(postData);
            const response = await fetch(`${baseUrl}/courseview`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Course created:", data);
            } else {
                console.error("Error creating course");
                console.log("Response status:", response.status);
            }
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