import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../components/auth/authService";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../components/Bearer/axiosInterceptor";

const CoursePreview = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  // Fetch category list
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await axiosInstance.get(`${baseUrl}/courses/category-list/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setCategoryList(response.data);
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    };
    fetchCategoryList();
  }, [accessToken]);

  // Fetch course details by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`${baseUrl}/courses/course-detail/${id}/`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error while fetching course', error);
      }
    };
    fetchCourse();
  }, [id]);
  
  console.log(course);
  

  // Form validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .matches(/^[A-Za-z].*$/, "Give a valid course name")
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
    category: Yup.number(),
    preview_image: Yup.mixed()
  });
  

  return (
    <div>
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Course Form */}
      <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
        {course && (
          <Formik
            initialValues={{
              title: course.title || '',
              description: course.description || '',
              duration: course.duration || '',
              price: course.price || '',
              category: course.category_id || '',
              preview_image: '', // We set this on file upload
              mentor: course.mentor || '',
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const formDataToSend = new FormData();
              formDataToSend.append('title', values.title);
              formDataToSend.append('description', values.description);
              formDataToSend.append('duration', parseFloat(values.duration));
              formDataToSend.append('price', parseFloat(values.price));
              formDataToSend.append('category', parseInt(values.category, 10));
              formDataToSend.append('mentor', values.mentor);
              // formDataToSend.append('preview_image', values.preview_image);
              if (values.preview_image) {
                formDataToSend.append('preview_image', values.preview_image);
              }

              try {
                await axiosInstance.patch(`${baseUrl}/courses/course-list/${id}/`, formDataToSend, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                  },
                });
                navigate('/admin/course-management');
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            {({ setFieldValue, values }) => (
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
                          <Field
                            as="select"
                            name="category"
                            id="category"
                            value={values.category} // Bind to Formik state
                            onChange={(e) => {
                              setFieldValue("category", e.target.value); // Update Formik state on change
                              // Displaying selected category ID to the user
                              const selectedId = e.target.value; // Change this to display as needed
                            }}
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          >
                            {/* <option disabled>Select a category</option> */}
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
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-800">Price ($)</label>
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

                      <div>
                        <label htmlFor="mentor" className="block text-sm font-medium leading-6 text-gray-800">Mentor</label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            name="mentor"
                            id="mentor"
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter course price"
                          />
                          <ErrorMessage name="mentor" component="div" className="text-red-600" />
                        </div>
                      </div>
                    </div>

                    {/* Course Description */}
                    <div className="col-span-full mt-8">
                      <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-800">Description</label>
                      <div className="mt-2">
                        <Field
                          as="textarea"
                          name="description"
                          id="description"
                          rows="4"
                          className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter course description"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-600" />
                      </div>
                    </div>

                    {/* Course Preview Image */}
                    <div className="col-span-full mt-8">
                      <label htmlFor="preview_image" className="block text-sm font-medium leading-6 text-gray-800">Preview Image</label>
                      <div className="mt-2">
                        
                        {course.preview_image && (
                          <img
                            src={course?.preview_image
                              ? `http://localhost:8000${course.preview_image}`
                              : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080"
                            }
                            alt="Current Preview"
                            className="mb-4 rounded-lg shadow-sm w-40 h-40"
                          />
                        )}

                        {/* <input
                          type="file"
                          name="preview_image"
                          id="preview_image"
                          accept="image/jpeg, image/png, image/gif, image/jpg"
                          onChange={(event) => {
                            setFieldValue("preview_image", event.currentTarget.files[0]);
                          }}
                          className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        /> */}
                        <ErrorMessage name="preview_image" component="div" className="text-red-600" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        onClick={ () => navigate('/admin/course-management')}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CoursePreview;
