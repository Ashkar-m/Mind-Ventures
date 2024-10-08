import React, { useEffect, useState } from "react";
import MentorNavbar from "../Navbar/Navbar";
import MentorSidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { baseUrl } from "../../../components/auth/authService";

export default function AddCourse() {

    const [categoryList, setCategoryList] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [mentorDetails, setMentorDetails] = useState(null);
    const [isFormReadyToSubmit, setIsFormReadyToSubmit] = useState(false);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserDetails(user.user_id);
    }, []);
    console.log(userDetails);
    

    useEffect( () => {
        const fetchMentorDetail = async () => {
            try {
                if (userDetails) {
                    const response = await fetch(`${baseUrl}/users/user-detail/${userDetails}/`)
                
                    if (!response.ok) {
                        throw new Error ('Error while fetching category')
                    }
                    
                    const data = await response.json();

                    setMentorDetails(data);
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

    console.log(categoryList);
    

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        duration: "",
        price: "",
        preview_image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            preview_image: e.target.files[0],
        });
    };

    useEffect(() => {
        if (isFormReadyToSubmit && mentorDetails) {
            submitForm();
        }
    }, [mentorDetails, isFormReadyToSubmit]);

    const submitForm = async (e) => {

        const submitData = new FormData();
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
        submitData.append("category", formData.category);
        submitData.append("duration", formData.duration);
        submitData.append("price", formData.price);
        submitData.append("preview_image", formData.preview_image);

        if (mentorDetails && mentorDetails.user_id) {
            submitData.append("mentor", mentorDetails.user_id);
        } else {
            console.error("mentor details are not available");
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/courses/course-list/`, submitData, {
                headers : {
                    "Content-Type" : "multipart/form-data",
                },
            });
            console.log("Course created", response.data);
        } catch (error) {
            console.error("There was an error creating the course", error);
            
        }

        setIsFormReadyToSubmit(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if mentorDetails are already available
        if (mentorDetails) {
            submitForm();
        } else {
            // Set a flag to wait for mentorDetails
            setIsFormReadyToSubmit(true);
        }
    };
    

  return (
    <div className="w-full">
        {/* Navbar */}
        <MentorNavbar />

        {/* Sidebar */}
        <MentorSidebar />

        <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
            <form className="bg-white p-8 rounded-lg shadow-md mt-12" onSubmit={handleSubmit}>
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
                            value={formData.title}
                            onChange={handleChange}
                            id="course-name"
                            autoComplete="course-name"
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
                            value={formData.category}
                            onChange={handleChange}
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a category</option>
                            {categoryList && categoryList.map((category) => (
                                <option key={category.id} value={category.name}>
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
                            value={formData.duration}
                            onChange={handleChange}
                            id="duration"
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
                            value={formData.price}
                            onChange={handleChange}
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
                        value={formData.description}
                        onChange={handleChange}
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
                        <input
                            id="course-image"
                            name="course-image"
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            className="hidden"
                            onChange={handleImageChange} // You'll implement this function
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
}

