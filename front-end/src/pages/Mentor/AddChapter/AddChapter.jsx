
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../components/auth/authService";
import axiosInstance from "../../../components/Bearer/axiosInterceptor";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import MentorNavbar from "../Navbar/Navbar";
import MentorSidebar from "../Sidebar/Sidebar";

const AddChapter = () => {
    const [courseList, setCourseList] = useState([]);
    const { accessToken } = useSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseList = async () => {
            try {
                const response = await axiosInstance.get(`${baseUrl}/courses/course-list/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                });

                const data = response.data; 
                setCourseList(data); 
            } catch (error) {
                console.error("Error fetching course list:", error);
            }
        };

        fetchCourseList();
    }, [accessToken]);

    console.log(courseList);
    

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        title: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, "Chapter name must start with a letter and can contain only alphanumeric characters and spaces")
        .required("Chpater title is required Field"),
        content: Yup.string(),
        video_url: Yup.string()
        .matches(
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
            "Please enter a valid YouTube URL"
        )
        .required("YouTube URL is required"),
        order: Yup.number()
            .typeError("Order must be a number")
            .required("Order is required")
            .positive("Order must be greater than zero"),
    });

    return (
        <div>
            < MentorNavbar />
            < MentorSidebar />
            <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
                <Formik
                    initialValues={{
                        title: "",
                        content: "",
                        video_url: "",
                        order: "",
                        course: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const formDataToSend = new FormData();
                        formDataToSend.append('title', values.title);
                        formDataToSend.append('content', values.content);
                        formDataToSend.append('video_url', values.video_url);
                        formDataToSend.append('order', parseFloat(values.order));
                        formDataToSend.append('course', parseInt(values.course, 10));

                        try {
                            const response = await axiosInstance.post(`${baseUrl}/courses/chapter-list/`, formDataToSend, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'Authorization': `Bearer ${accessToken}`,
                                },
                            });
                            // Handle success (e.g., show a success message or redirect)
                            navigate('/mentor/dashboard')
                        } catch (error) {
                            console.error("Error:", error);
                        }
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="bg-white p-8 rounded-lg shadow-md mt-12">
                            <div className="space-y-12">
                                <div className="border-b border-gray-300 pb-8">
                                    <h2 className="text-xl font-semibold leading-7 text-gray-800">Chapter Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about the chapter you're offering.</p>

                                    <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                        {/* Chapter Name */}
                                        <div className="col-span-2">
                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-800">Chapter Name</label>
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

                                        {/* Course */}
                                        <div>
                                            <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-800">Courses</label>
                                            <div className="mt-2">
                                                <Field as="select" name="course" id="course" className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                                                    <option value="">Select a course</option>
                                                    {courseList.map((course) => (
                                                        <option key={course.id} value={course.id}>
                                                            {course.title}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="course" component="div" className="text-red-600" />
                                            </div>
                                        </div>

                                        

                                       
                                    </div>
                                    {/* Chapter Order */}
                                    <div>
                                            <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-800">Order</label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    name="order"
                                                    id="order"
                                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Enter chapter order"
                                                />
                                                <ErrorMessage name="order" component="div" className="text-red-600" />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="video_url" className="block text-sm font-medium leading-6 text-gray-800">Video Reference Link</label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    name="video_url"
                                                    id="video_url"
                                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Enter chapter Url"
                                                />
                                                <ErrorMessage name="video_url" component="div" className="text-red-600" />
                                            </div>
                                        </div>

                                    {/* Chapter Description */}
                                    <div className="col-span-full mt-8">
                                        <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-800">Description</label>
                                        <div className="mt-2">
                                            <Field
                                                as="textarea"
                                                id="content"
                                                name="content"
                                                rows="5"
                                                className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Write a brief description of the Chapter"
                                            />
                                            <ErrorMessage name="content" component="div" className="text-red-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                    Add Chapter
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddChapter;
