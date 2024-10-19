import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../components/auth/authService";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../components/Bearer/axiosInterceptor";

const CoursePreview = () => {
    const { id } = useParams();
    const [course, setCourse] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const accessToken = useSelector((state) => state.auth.accessToken);
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
    
    useEffect( () => {

        const fetchCourse = async () => {
            try{
                const response = await fetch(`${baseUrl}/courses/course-detail/${id}/`)

                if (!response.ok) {
                    throw new Error('Course does not exist');
                }
                
                const data = await response.json();
                setCourse(data);

            } catch (error) {
                console.error('Error while fetching course',error);
            }
        }
        fetchCourse();
    }, []);
    console.log(course);

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
            {/* Admin Navbar */}
            <AdminNavbar/>
            {/* Admin Sidebar */}
            <AdminSidebar/>

            {/* course preview */}
            {/* <div className="p-4 sm:ml-64 mt-20">
            <section className="py-8 mt-20 bg-white md:py-16 dark:bg-gray-900 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                
                <img className="w-full hidden dark:block" 
                src={course?.preview_image 
                    ? `${baseUrl}${course.preview_image}`
                    : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                } alt="course-image" />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1
                    className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                >
                    {course.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                    <p
                    className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                    >
                    {course.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                    </div>
                    <p
                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                    >
                        (5.0)
                    </p>
                    <a
                        href="#"
                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                    >
                        345 Reviews
                    </a>
                    </div>
                </div>

                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                    <a
                    href="#"
                    title=""
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    role="button"
                    >
                    <svg
                        className="w-5 h-5 -ms-2 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                    </svg>
                    Add to favorites
                    </a>

                    <a
                    href="#"
                    title=""
                    className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                    role="button"
                    >
                    <svg
                        className="w-5 h-5 -ms-2 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                        />
                    </svg>

                    Add to cart
                    </a>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <p className="mb-6 text-gray-500 dark:text-gray-400">
                    {course.description}                
                </p>
                </div>
            </div>
            </div>
            </section>
            </div> */}
            <div className="p-4 sm:ml-64 mt-20">
    <section className="py-8 mt-20 bg-white shadow-lg rounded-lg md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                    <img 
                        className="w-full hidden dark:block rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                        src={course?.preview_image 
                            ? `${baseUrl}${course.preview_image}`
                            : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                        }
                        alt="course-image" 
                    />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        {course.title}
                    </h1>
                    <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                        <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                            {course.price}
                        </p>

                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <div className="flex items-center gap-1">
                                {/* Rating stars */}
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                                (5.0)
                            </p>
                            <a
                                href="#"
                                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                            >
                                345 Reviews
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                        <button
                            onClick={() => toggleCourseStatus(course)}
                            className={`py-2.5 px-5 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-4 ${
                                course.isBlocked
                                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-200'
                                    : 'bg-green-600 hover:bg-green-700 focus:ring-green-200'
                            }`}
                        >
                            {course.isBlocked ? 'Unblock Course' : 'Block Course'}
                        </button>
                    </div>

                    <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                        {course.description}
                    </p>
                </div>
            </div>
        </div>
    </section>
</div>
            

        </div>
    )
}

export default CoursePreview;