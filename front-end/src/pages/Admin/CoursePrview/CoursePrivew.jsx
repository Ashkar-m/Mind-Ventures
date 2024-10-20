// import React, { useEffect, useState } from "react";
// import AdminNavbar from "../AdminNavbar/AdminNavbar";
// import AdminSidebar from "../AdminSidebar/AdminSidebar";
// import { useParams } from "react-router-dom";
// import { baseUrl } from "../../../components/auth/authService";
// import { useSelector } from "react-redux";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../../components/Bearer/axiosInterceptor";

// const CoursePreview = () => {
//     const { id } = useParams();
//     const [course, setCourse] = useState('');
//     const [categoryList, setCategoryList] = useState([]);
//     const accessToken = useSelector((state) => state.auth.accessToken);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCategoryList = async () => {
//             try {
//                 const response = await axiosInstance.get(`${baseUrl}/courses/category-list/`, {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`, 
//                     },
//                 });

//                 const data = response.data; 
//                 setCategoryList(data); 
//             } catch (error) {
//                 console.error("Error fetching category list:", error);
//             }
//         };

//         fetchCategoryList();
//     }, [accessToken]);
    
//     useEffect( () => {

//         const fetchCourse = async () => {
//             try{
//                 const response = await axiosInstance.get(`${baseUrl}/courses/course-detail/${id}/`)
//                 console.log(response.data);  // Check the fetched data here
//                 setCourse(response.data);   // Update state with course data

//             } catch (error) {
//                 console.error('Error while fetching course',error);
//             }
//         }
//         fetchCourse();
//     }, []);
//     console.log(course);

//     const validationSchema = Yup.object().shape({
//         title: Yup.string()
//         .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, "Course name must start with a letter and can contain only alphanumeric characters and spaces")
//         .required("Course title is required"),
//         description: Yup.string().required("Description is required"),
//         duration: Yup.number()
//             .typeError("Duration must be a number")
//             .required("Duration is required")
//             .positive("Duration must be greater than zero"),
//         price: Yup.number()
//             .typeError("Price must be a number")
//             .required("Price is required")
//             .positive("Price must be greater than zero"),
//         category: Yup.number().required("Category is required"),
//         preview_image: Yup.mixed()
//         .required("An image file is required")
//         .test("fileType", "Only image files are allowed", (value) => {
//             // Check if a file is selected
//             if (!value) return false; // If no file, validation fails

//             // Check if the file type is an image
//             const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
//             return supportedFormats.includes(value.type);
//         }),
//     });

//     return (
//         <div>
//             {/* Admin Navbar */}
//             <AdminNavbar/>
//             {/* Admin Sidebar */}
//             <AdminSidebar/>
//             {/* <div className="p-4 sm:ml-64 mt-20">
//     <section className="py-8 mt-20 bg-white shadow-lg rounded-lg md:py-16 dark:bg-gray-900 antialiased">
//         <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
//             <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
//                 <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
//                     <img 
//                         className="w-full hidden dark:block rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
//                         src={course?.preview_image 
//                             ? `${baseUrl}${course.preview_image}`
//                             : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
//                         }
//                         alt="course-image" 
//                     />
//                 </div>

//                 <div className="mt-6 sm:mt-8 lg:mt-0">
//                     <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
//                         {course.title}
//                     </h1>
//                     <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
//                         <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
//                             {course.price}
//                         </p>

//                         <div className="flex items-center gap-2 mt-2 sm:mt-0">
//                             <div className="flex items-center gap-1">
//                                 {[...Array(5)].map((_, i) => (
//                                     <svg
//                                         key={i}
//                                         className="w-4 h-4 text-yellow-300"
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="24"
//                                         height="24"
//                                         fill="currentColor"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                                     </svg>
//                                 ))}
//                             </div>
//                             <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
//                                 (5.0)
//                             </p>
//                             <a
//                                 href="#"
//                                 className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
//                             >
//                                 345 Reviews
//                             </a>
//                         </div>
//                     </div>

//                     <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
//                         <button
//                             onClick={() => toggleCourseStatus(course)}
//                             className={`py-2.5 px-5 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-4 ${
//                                 course.isBlocked
//                                     ? 'bg-red-600 hover:bg-red-700 focus:ring-red-200'
//                                     : 'bg-green-600 hover:bg-green-700 focus:ring-green-200'
//                             }`}
//                         >
//                             {course.isBlocked ? 'Unblock Course' : 'Block Course'}
//                         </button>
//                     </div>

//                     <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

//                     <p className="mb-6 text-gray-500 dark:text-gray-400">
//                         {course.description}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     </section>
// </div> */}      
//             <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
//                 <Formik
//                     initialValues={{
//                         title: course.title || '',
//                         description: course.description ||  '',
//                         duration: course.duration || '',
//                         price: course.price || '',
//                         category: course.category ? course.category.id : '',
//                         preview_image: '',
//                     }}
//                     validationSchema={validationSchema}
//                     onSubmit={async (values) => {
//                         const formDataToSend = new FormData();
//                         formDataToSend.append('title', values.title);
//                         formDataToSend.append('description', values.description);
//                         formDataToSend.append('duration', parseFloat(values.duration));
//                         formDataToSend.append('price', parseFloat(values.price));
//                         formDataToSend.append('category', parseInt(values.category, 10));
//                         formDataToSend.append('preview_image', values.preview_image);

//                         try {
//                             const response = await axiosInstance.post(`${baseUrl}/courses/course-list/`, formDataToSend, {
//                                 headers: {
//                                     'Content-Type': 'multipart/form-data',
//                                     'Authorization': `Bearer ${accessToken}`,
//                                 },
//                             });
//                             // Handle success (e.g., show a success message or redirect)
//                             navigate('/admin/course-management')
//                         } catch (error) {
//                             console.error("Error:", error);
//                         }
//                     }}
//                 >
//                     {({ setFieldValue }) => (
//                         <Form className="bg-white p-8 rounded-lg shadow-md mt-12">
//                             <div className="space-y-12">
//                                 <div className="border-b border-gray-300 pb-8">
//                                     <h2 className="text-xl font-semibold leading-7 text-gray-800">Course Information</h2>
//                                     <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about the course you're offering.</p>

//                                     <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//                                         {/* Course Name */}
//                                         <div className="col-span-2">
//                                             <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-800">Course Name</label>
//                                             <div className="mt-2">
//                                                 <Field
//                                                     type="text"
//                                                     name="title"
//                                                     id="title"
//                                                     className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                                                     placeholder="Enter course name"
//                                                 />
//                                                 <ErrorMessage name="title" component="div" className="text-red-600" />
//                                             </div>
//                                         </div>

//                                         {/* Course Category */}
//                                         <div>
//                                             <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-800">Category</label>
//                                             <div className="mt-2">
//                                                 <Field as="select" name="category" id="category" className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                                                  
//                                                     <option value=''>Select a category</option>
//                                                     {categoryList.map((category) => (
//                                                         <option key={category.id} value={category.id}>
//                                                             {category.name}
//                                                         </option>
//                                                     ))}
//                                                 </Field>
//                                                 <ErrorMessage name="category" component="div" className="text-red-600" />
//                                             </div>
//                                         </div>

//                                         {/* Course Duration */}
//                                         <div>
//                                             <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-800">Duration (hours)</label>
//                                             <div className="mt-2">
//                                                 <Field
//                                                     type="text"
//                                                     name="duration"
//                                                     id="duration"
//                                                     className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                                                     placeholder="Enter course duration"
//                                                 />
//                                                 <ErrorMessage name="duration" component="div" className="text-red-600" />
//                                             </div>
//                                         </div>

//                                         {/* Course Price */}
//                                         <div>
//                                             <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-800">Price ($)</label>
//                                             <div className="mt-2">
//                                                 <Field
//                                                     type="text"
//                                                     name="price"
//                                                     id="price"
//                                                     className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                                                     placeholder="Enter course price"
//                                                 />
//                                                 <ErrorMessage name="price" component="div" className="text-red-600" />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Course Description */}
//                                     <div className="col-span-full mt-8">
//                                         <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-800">Description</label>
//                                         <div className="mt-2">
//                                             <Field
//                                                 as="textarea"
//                                                 id="description"
//                                                 name="description"
//                                                 rows="5"
//                                                 className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                                                 placeholder="Write a brief description of the course"
//                                             />
//                                             <ErrorMessage name="description" component="div" className="text-red-600" />
//                                         </div>
//                                     </div>

//                                     {/* Course Image */}
//                                     <div className="mt-8">
//                                         <label htmlFor="preview_image" className="block text-sm font-medium text-gray-700 text-left">Upload Course Image</label>
//                                         <div className="mt-2 flex items-center">
//                                             <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
//                                                 <img
//                                                     src="https://via.placeholder.com/64"
//                                                     alt="Course preview"
//                                                     id="course-image-preview"
//                                                     className="h-full w-full object-cover"
//                                                 />
//                                             </div>
//                                             {/* <div className="ml-4 flex flex-col">
//                                                 <input
//                                                     id="preview_image"
//                                                     name="preview_image"
//                                                     type="file"
//                                                     accept="image/png, image/jpeg, image/gif"
//                                                     className="hidden"
//                                                     onChange={(event) => {
//                                                         setFieldValue("preview_image", event.currentTarget.files[0]);
//                                                         const reader = new FileReader();
//                                                         reader.onload = () => {
//                                                             const img = document.getElementById('course-image-preview');
//                                                             img.src = reader.result;
//                                                         };
//                                                         reader.readAsDataURL(event.currentTarget.files[0]);
//                                                     }}
//                                                 />
//                                                 <label htmlFor="preview_image" className="inline-block rounded-md border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 shadow-sm hover:bg-gray-50">
//                                                     Choose an image
//                                                 </label>
//                                                 <ErrorMessage name="preview_image" component="div" className="text-red-600" />
//                                             </div> */}
//                                             <div className="ml-4 flex flex-col">
//                                             <input
//                                                 id="preview_image"
//                                                 name="preview_image"
//                                                 type="file"
//                                                 accept="image/png, image/jpeg, image/gif"
//                                                 className="hidden"
//                                                 onChange={(event) => {
//                                                     setFieldValue("preview_image", event.currentTarget.files[0]);
//                                                     const reader = new FileReader();
//                                                     reader.onload = () => {
//                                                         const img = document.getElementById('course-image-preview');
//                                                         img.src = reader.result;
//                                                     };
//                                                     reader.readAsDataURL(event.currentTarget.files[0]);
//                                                 }}
//                                             />
//                                             <label
//                                                 htmlFor="preview_image"
//                                                 className="inline-block rounded-md border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 shadow-sm hover:bg-gray-50"
//                                             >
//                                                 Choose an image
//                                             </label>
//                                             <ErrorMessage name="preview_image" component="div" className="text-red-600" />
//                                         </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Submit Button */}
//                             <div className="mt-8 flex justify-end">
//                                 <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
//                                     Add Course
//                                 </button>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
            

//         </div>
//     )
// }

// export default CoursePreview;

// import React, { useEffect, useState } from "react";
// import AdminNavbar from "../AdminNavbar/AdminNavbar";
// import AdminSidebar from "../AdminSidebar/AdminSidebar";
// import { useParams, useNavigate } from "react-router-dom";
// import { baseUrl } from "../../../components/auth/authService";
// import { useSelector } from "react-redux";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axiosInstance from "../../../components/Bearer/axiosInterceptor";

// const CoursePreview = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState('');
//   const [categoryList, setCategoryList] = useState([]);
//   const accessToken = useSelector((state) => state.auth.accessToken);
//   const navigate = useNavigate();

//   // Fetch category list
//   useEffect(() => {
//     const fetchCategoryList = async () => {
//       try {
//         const response = await axiosInstance.get(`${baseUrl}/courses/category-list/`, {
//           headers: {
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         });
//         const data = response.data;
//         setCategoryList(data);
//       } catch (error) {
//         console.error("Error fetching category list:", error);
//       }
//     };
//     fetchCategoryList();
//   }, [accessToken]);
  

//   // Fetch course details by ID
//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const response = await axiosInstance.get(`${baseUrl}/courses/course-detail/${id}/`);
//         setCourse(response.data);
//       } catch (error) {
//         console.error('Error while fetching course', error);
//       }
//     };
//     fetchCourse();
//   }, [id]);
//   console.log(course);
  

//   // Form validation schema
//   const validationSchema = Yup.object().shape({
//     title: Yup.string()
//       .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, "Course name must start with a letter and can contain only alphanumeric characters and spaces")
//       .required("Course title is required"),
//     description: Yup.string().required("Description is required"),
//     duration: Yup.number()
//       .typeError("Duration must be a number")
//       .required("Duration is required")
//       .positive("Duration must be greater than zero"),
//     price: Yup.number()
//       .typeError("Price must be a number")
//       .required("Price is required")
//       .positive("Price must be greater than zero"),
//     category: Yup.number().required("Category is required"),
//     preview_image: Yup.mixed()
//       .required("An image file is required")
//       .test("fileType", "Only image files are allowed", (value) => {
//         if (!value) return false;
//         const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
//         return supportedFormats.includes(value.type);
//       }),
//   });

//   return (
//     <div>
//       {/* Admin Navbar */}
//       <AdminNavbar />

//       {/* Admin Sidebar */}
//       <AdminSidebar />

//       {/* Course Form */}
//       <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
//         <Formik
//           initialValues={{
//             title: course.title || '',
//             description: course.description || '',
//             duration: course.duration || '',
//             price: course.price || '',
//             category: course.category || '',
//             preview_image: '',
//           }}
//           enableReinitialize
//           validationSchema={validationSchema}
//           onSubmit={async (values) => {
//             const formDataToSend = new FormData();
//             formDataToSend.append('title', values.title);
//             formDataToSend.append('description', values.description);
//             formDataToSend.append('duration', parseFloat(values.duration));
//             formDataToSend.append('price', parseFloat(values.price));
//             formDataToSend.append('category', parseInt(values.category, 10));
//             formDataToSend.append('preview_image', values.preview_image);

//             try {
//               await axiosInstance.post(`${baseUrl}/courses/course-list/`, formDataToSend, {
//                 headers: {
//                   'Content-Type': 'multipart/form-data',
//                   'Authorization': `Bearer ${accessToken}`,
//                 },
//               });
//               navigate('/admin/course-management');
//             } catch (error) {
//               console.error("Error:", error);
//             }
//           }}
//         >
//           {({ setFieldValue }) => (
//             <Form className="bg-white p-8 rounded-lg shadow-md mt-12">
//               <div className="space-y-12">
//                 <div className="border-b border-gray-300 pb-8">
//                   <h2 className="text-xl font-semibold leading-7 text-gray-800">Course Information</h2>
//                   <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about the course you're offering.</p>

//                   <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//                     {/* Course Name */}
//                     <div className="col-span-2">
//                       <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-800">Course Name</label>
//                       <div className="mt-2">
//                         <Field
//                           type="text"
//                           name="title"
//                           id="title"
//                           className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                           placeholder="Enter course name"
//                         />
//                         <ErrorMessage name="title" component="div" className="text-red-600" />
//                       </div>
//                     </div>

//                     {/* Course Category */}
//                     <div>
//                       <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-800">Category</label>
//                       <div className="mt-2">
//                         <Field as="select" name="category" id="category" className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm">
//                           <option value="">Select a category</option>
//                           {categoryList.map((category) => (
//                             <option key={category.id} value={category.id}>
//                               {category.name}
//                             </option>
//                           ))}
//                         </Field>
//                         <ErrorMessage name="category" component="div" className="text-red-600" />
//                       </div>
//                     </div>

//                     {/* Course Duration */}
//                     <div>
//                       <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-800">Duration (hours)</label>
//                       <div className="mt-2">
//                         <Field
//                           type="text"
//                           name="duration"
//                           id="duration"
//                           className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                           placeholder="Enter course duration"
//                         />
//                         <ErrorMessage name="duration" component="div" className="text-red-600" />
//                       </div>
//                     </div>

//                     {/* Course Price */}
//                     <div>
//                       <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-800">Price ($)</label>
//                       <div className="mt-2">
//                         <Field
//                           type="text"
//                           name="price"
//                           id="price"
//                           className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                           placeholder="Enter course price"
//                         />
//                         <ErrorMessage name="price" component="div" className="text-red-600" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Course Description */}
//                   <div className="col-span-full mt-8">
//                     <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-800">Description</label>
//                     <div className="mt-2">
//                       <Field
//                         as="textarea"
//                         name="description"
//                         id="description"
//                         rows="4"
//                         className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                         placeholder="Enter course description"
//                       />
//                       <ErrorMessage name="description" component="div" className="text-red-600" />
//                     </div>
//                   </div>

//                   {/* Course Preview Image */}
//                   <div className="col-span-full mt-8">
//                     <label htmlFor="preview_image" className="block text-sm font-medium leading-6 text-gray-800">Preview Image</label>
//                     <div className="mt-2">
//                       <input
//                         type="file"
//                         id="preview_image"
//                         name="preview_image"
//                         accept="image/*"
//                         onChange={(event) => setFieldValue('preview_image', event.target.files[0])}
//                         className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
//                       />
//                       <ErrorMessage name="preview_image" component="div" className="text-red-600" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="col-span-full mt-8">
//                   <button
//                     type="submit"
//                     className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                   >
//                     Update Course
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default CoursePreview;


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

  // Form validation schema
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
        if (!value) return false;
        const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        return supportedFormats.includes(value.type);
      }),
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
              category: course.category || '',
              preview_image: '', // We set this on file upload
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
              formDataToSend.append('preview_image', values.preview_image);

              try {
                await axiosInstance.post(`${baseUrl}/courses/course-list/`, formDataToSend, {
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
                            src={course.preview_image} // Assuming this is a valid URL
                            alt="Current Preview"
                            className="mb-4 rounded-lg shadow-sm"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        )}
                        <input
                          type="file"
                          name="preview_image"
                          id="preview_image"
                          accept="image/*"
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
  );
};

export default CoursePreview;
