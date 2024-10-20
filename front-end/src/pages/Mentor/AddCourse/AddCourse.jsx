
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../components/auth/authService";
import axiosInstance from "../../../components/Bearer/axiosInterceptor";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import MentorNavbar from "../Navbar/Navbar";
import MentorSidebar from "../Sidebar/Sidebar";

const AdminAddCourse = () => {
    const [categoryList, setCategoryList] = useState([]);
    const { accessToken } = useSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const response = await axiosInstance.get(`${baseUrl}/courses/category-list/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                });

                const data = response.data; 
                setCategoryList(data); 
            } catch (error) {
                console.error("Error fetching category list:", error);
            }
        };

        fetchCategoryList();
    }, [accessToken]);

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        title: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, "Course name must start with a letter and can contain only alphanumeric characters and spaces")
        .required("Course title is required"),
        description: Yup.string().required("Description is required"),
        duration: Yup.number()
            .typeError("Duration must be a number")
            .required("Duration is required")
            .positive("Duration must be greater than zero"),
        price: Yup.number()
            .typeError("Price must be a number")
            .required("Price is required")
            .positive("Price must be greater than zero"),
        category: Yup.number().required("Category is required"),
        preview_image: Yup.mixed()
        .required("An image file is required")
        .test("fileType", "Only image files are allowed", (value) => {
            // Check if a file is selected
            if (!value) return false; // If no file, validation fails

            // Check if the file type is an image
            const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            return supportedFormats.includes(value.type);
        }),
    });

    return (
        <div>
            < MentorNavbar />
            < MentorSidebar />
            <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        duration: "",
                        price: "",
                        category: "",
                        preview_image: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const formDataToSend = new FormData();
                        formDataToSend.append('title', values.title);
                        formDataToSend.append('description', values.description);
                        formDataToSend.append('duration', parseFloat(values.duration));
                        formDataToSend.append('price', parseFloat(values.price));
                        formDataToSend.append('category', parseInt(values.category, 10));
                        formDataToSend.append('preview_image', values.preview_image);

                        try {
                            const response = await axiosInstance.post(`${baseUrl}/courses/course-list/`, formDataToSend, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'Authorization': `Bearer ${accessToken}`,
                                },
                            });
                            // Handle success (e.g., show a success message or redirect)
                            navigate('/mentor/home')
                        } catch (error) {
                            console.error("Error:", error);
                        }
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="bg-white p-8 rounded-lg shadow-md mt-12">
                            <div className="space-y-12">
                                <div className="border-b border-gray-300 pb-8">
                                    <h2 className="text-xl font-semibold leading-7 text-gray-800">Course Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about the course you're offering.</p>

                                    <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                        {/* Course Name */}
                                        <div className="col-span-2">
                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-800">Course Name</label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Enter course name"
                                                />
                                                <ErrorMessage name="title" component="div" className="text-red-600" />
                                            </div>
                                        </div>

                                        {/* Course Category */}
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-800">Category</label>
                                            <div className="mt-2">
                                                <Field as="select" name="category" id="category" className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                                                    <option value="">Select a category</option>
                                                    {categoryList.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="category" component="div" className="text-red-600" />
                                            </div>
                                        </div>

                                        {/* Course Duration */}
                                        <div>
                                            <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-800">Duration (hours)</label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    name="duration"
                                                    id="duration"
                                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Enter course duration"
                                                />
                                                <ErrorMessage name="duration" component="div" className="text-red-600" />
                                            </div>
                                        </div>

                                        {/* Course Price */}
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-800">Price (₹)</label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    name="price"
                                                    id="price"
                                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Enter course price"
                                                />
                                                <ErrorMessage name="price" component="div" className="text-red-600" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Description */}
                                    <div className="col-span-full mt-8">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-800">Description</label>
                                        <div className="mt-2">
                                            <Field
                                                as="textarea"
                                                id="description"
                                                name="description"
                                                rows="5"
                                                className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Write a brief description of the course"
                                            />
                                            <ErrorMessage name="description" component="div" className="text-red-600" />
                                        </div>
                                    </div>

                                    {/* Course Image */}
                                    <div className="mt-8">
                                        <label htmlFor="preview_image" className="block text-sm font-medium text-gray-700 text-left">Upload Course Image</label>
                                        <div className="mt-2 flex items-center">
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
                                                    id="preview_image"
                                                    name="preview_image"
                                                    type="file"
                                                    accept="image/png, image/jpeg, image/gif"
                                                    className="hidden"
                                                    onChange={(event) => {
                                                        setFieldValue("preview_image", event.currentTarget.files[0]);
                                                        const reader = new FileReader();
                                                        reader.onload = () => {
                                                            const img = document.getElementById('course-image-preview');
                                                            img.src = reader.result;
                                                        };
                                                        reader.readAsDataURL(event.currentTarget.files[0]);
                                                    }}
                                                />
                                                <label htmlFor="preview_image" className="inline-block rounded-md border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                                                    Choose an image
                                                </label>
                                                <ErrorMessage name="preview_image" component="div" className="text-red-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                    Add Course
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminAddCourse;
