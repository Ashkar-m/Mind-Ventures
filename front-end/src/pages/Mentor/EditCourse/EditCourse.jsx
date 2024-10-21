import React, { useEffect, useState } from "react";
import MentorNavbar from "../Navbar/Navbar";
import MentorSidebar from "../Sidebar/Sidebar";
import { baseUrl } from "../../../components/auth/authService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../components/Bearer/axiosInterceptor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function EditCourse() {

    const [course, setCourse] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const { id } = useParams();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();
    
    useEffect( () => {

        const fetchCourse = async () => {
            try{
                const response = await axiosInstance.get(`${baseUrl}/courses/course-detail/${id}/`,{
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                      },
                    });
                setCourse(response.data);

            } catch (error) {
                console.error('Error while fetching course',error);
            }
        }
        fetchCourse();
    }, [id]);
    console.log(course);

    // useEffect( () => {
    //     const fetchCategoryList = async () => {
    //         try {
    //             const response = await axiosInstance.get(`${baseUrl}/courses/category-list/`);
    //             setCategoryList(response.data);

    //         } catch (error) {
    //             console.error("Error:",error);
                
    //         }
    //     }
    //     fetchCategoryList();
    // }, []);
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
    console.log(categoryList);
    

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
      });

      

    // const [formData, setFormData] = useState({
    //     title: "",
    //     description: "",
    //     category: "",
    //     duration: "",
    //     price: "",
    //     preview_image: null,
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    // const handleImageChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         preview_image: e.target.files[0],
    //     });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const submitData = new FormData();
    //     submitData.append("title", formData.title);
    //     submitData.append("description", formData.description);
    //     submitData.append("category", formData.category);
    //     submitData.append("duration", formData.duration);
    //     submitData.append("price", formData.price);
    //     submitData.append("preview_image", formData.preview_image);

    //     try {
    //         const response = await axios.post(`${baseUrl}/courses/course-list/`, submitData, {
    //             headers : {
    //                 "Content-Type" : "multipart/form-data",
    //             },
    //         });
    //         console.log("Course created", response.data);
    //     } catch (error) {
    //         console.error("There was an error creating the course", error);
            
    //     }
    // };

    // const [userDetails, setUserDetails] = useState(null);
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     setUserDetails(user);
    // }, []);
    

  return (
    <div className="w-full">
        {/* Navbar */}
        <MentorNavbar />

        {/* Sidebar */}
        <MentorSidebar />

        {/* <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
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
                            value={course.title}
                            onChange={handleChange}
                            id="course-name"
                            autoComplete="course-name"
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter course name"
                        />
                        </div>
                    </div>
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
                            value={course.category}
                            onChange={handleChange}
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a category</option>
                            {categoryList && categoryList.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name} 
                                </option>
                            ))}
                        </select>
                        </div>
                    </div>

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
                            value={course.duration}
                            onChange={handleChange}
                            id="duration"
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter course duration"
                        />
                        </div>
                    </div>

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
                            value={course.price}
                            onChange={handleChange}
                            className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter course price"
                        />
                        </div>
                    </div>
                    </div>

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
                        value={course.description}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Write a brief description of the course"
                        ></textarea>
                    </div>
                    </div>
                    <div className="mt-8">
                    <label
                        htmlFor="course-image"
                        className="block text-sm font-medium text-gray-700 text-left"
                    >
                        Upload Course Image
                    </label>
                    <div className="mt-2 flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <img
                            src={course?.preview_image 
                                ? `${baseUrl}${course.preview_image}`
                                : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                            } alt="course-image"
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
        </div> */}
        <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
        {course && (
          <Formik
            initialValues={{
              title: course.title || '',
              description: course.description || '',
              duration: course.duration || '',
              price: course.price || '',
              category: course.category_id || '',
              preview_image: '', 
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
                navigate('/mentor/home');
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
                            <option disabled>Select a category</option>
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

                        <input
                          type="file"
                          name="preview_image"
                          id="preview_image"
                          accept="image/jpeg, image/png, image/gif, image/jpg"
                          onChange={(event) => {
                            setFieldValue("preview_image", event.currentTarget.files[0]);
                          }}
                          className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="preview_image" component="div" className="text-red-600" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                      >
                        Submit Course
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
  )
}

