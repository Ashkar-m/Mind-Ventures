// import React, { useEffect, useState } from 'react'
// import AdminNavbar from '../AdminNavbar/AdminNavbar';
// import AdminSidebar from '../AdminSidebar/AdminSidebar';
// import { useSelector } from 'react-redux';
// import { baseUrl } from "../../../components/auth/authService";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage  } from 'formik';
// import * as Yup from 'yup';


// const AdminAddCategory = () => {

//     const { accessToken } = useSelector( state => state.auth )
//     const [ categoryList, setCategoryList ] = useState([]);
//     const [formData, setFormData] = useState({
//         categoryName: '',
//         parentCategory: '',
//         description: ''
//     });

//     const navigate = useNavigate();

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     useEffect(() => {
//         const fetchCategoryList = async () => {
//           try { 
//             const response = await axios.get(`${baseUrl}/courses/category-list/`, {
//               headers: {
//                 'Authorization': `Bearer ${accessToken}`, // Use accessToken here
//               },
//             });
    
//             // Axios automatically throws errors for non-2xx status codes, so no need for manual checks
//             const data = response.data; // This contains the actual response data
//             setCategoryList(data); // Assuming setCategoryList is a state setter function
//           } catch (error) {
//             console.error("Error fetching category list:", error);
//           }
//         };
    
//         fetchCategoryList();
//     }, []);
//     const handleSubmit = async (e) => {
//         const { categoryName, parentCategory, description } = formData;
//         console.log(categoryName,parentCategory,description);
        
//         try {
//             const response = await axios.post(
//                 `${baseUrl}/courses/category-list/`,
//                 { 
//                     name: categoryName, 
//                     parent: parentCategory, 
//                     description: description 
//                 }, // This is the payload (data you are sending)
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`, // Ensure accessToken is valid
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
            
//             console.log("Category successfully added:", response.data);
//             // Optionally reset the form or handle success UI updates here

//             navigate('/admin/category-management')
//         } catch (error) {
//             console.error("Error adding category:", error);
//         }
//     };

//     const validationSchema = Yup.object().shape({
//         categoryName: Yup.string()
//             .required('Category name is required')
//             .matches(/^[A-Za-z\s]+$/, 'Category name must contain only letters'),
//         description: Yup.string()
//             .required('Description is required'),
//         parentCategory: Yup.string()
//             .nullable(), // parentCategory can be empty
//     });


//   return (
//     <div>

//         <AdminNavbar/>

//         <AdminSidebar/>


//         <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
//         <Formik
//                     initialValues={{
//                         categoryName: '',
//                         parentCategory: '',
//                         description: ''
//                     }}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//             {({ isSubmitting }) => (
//             <Form className="bg-white p-8 rounded-lg shadow-md mt-12" onSubmit={handleSubmit}>
//                 <div className="space-y-12">
//                 <div className="border-b border-gray-300 pb-8">
//                     <h2 className="text-xl font-semibold leading-7 text-gray-800">
//                     Add Category
//                     </h2>
//                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                     Provide details about the category you're offering.
//                     </p>

//                     <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
//                     {/* Course Name */}
//                     <div className="col-span-2">
//                         <label
//                         htmlFor="categoryName"
//                         className="block text-sm text-left font-medium leading-6 text-gray-800"
//                         >
//                         Category Name
//                         </label>
//                         <div className="mt-2">
//                         <Field
//                             type="text"
//                             name="categoryName"
//                             id="categoryName"
//                             value={formData.categoryName}
//                             onChange={handleInputChange}
//                             className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                             placeholder="Enter course name"
//                         />
//                         <ErrorMessage name="categoryName" component="div" className="text-red-500 text-sm mt-1" />
//                     </div>

//                     {/* Course Category */}
//                     <div>
//                         <label
//                         htmlFor="parentCategory"
//                         className="block text-sm text-left font-medium leading-6 text-gray-800"
//                         >
//                         Category
//                         </label>
//                         <div className="mt-2">
//                         <Field
//                             as= "select"
//                             id="parentCategory"
//                             name="parentCategory"
//                             value={formData.parentCategory}
//                             onChange={handleInputChange}
//                             className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                         >
//                             <option value="">Select a category</option>
//                             {categoryList.map((category) => (
//                                 <option key={category.id} value={category.id}>
//                                     {category.name}
//                                 </option>
//                             ))}
                            
//                         </Field>
//                         <ErrorMessage name="parentCategory" component="div" className="text-red-500 text-sm mt-1" />
//                         </div>
//                     </div>
                    
//                     </div>
//                     </div>

//                     {/* Course Description */}
//                     <div className="col-span-full mt-8">
//                     <label
//                         htmlFor="description"
//                         className="block text-sm text-left font-medium leading-6 text-gray-800"
//                     >
//                         Description
//                     </label>
//                     <div className="mt-2">
//                         <Field
//                         as="textarea"
//                          id="description"
//                          name="description"
//                          rows="5"
//                          value={formData.description}
//                          onChange={handleInputChange}
//                         className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                         placeholder="Write a brief description of the course"
//                         />
//                         <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
//                     </div>
//                     </div>
//                 </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-6 flex items-center justify-end gap-4">
//                 <button
//                     type="button"
//                     className="text-sm font-semibold text-gray-700 hover:text-gray-900"
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     type="submit"
//                     className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//                     disabled={isSubmitting}
//                 >
//                     Save Course
//                 </button>
//                 </div>
//             </Form>
//             )}
//             </Formik>
//         </div>
      
//     </div>
//   )
// }

// export default AdminAddCategory;

import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { useSelector } from 'react-redux';
import { baseUrl } from "../../../components/auth/authService";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AdminAddCategory = () => {

    const { accessToken } = useSelector(state => state.auth)
    const [categoryList, setCategoryList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const response = await axios.get(`${baseUrl}/courses/category-list/`, {
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

    const handleSubmit = async (values) => {
        const { categoryName, parentCategory, description } = values;
        console.log(categoryName, parentCategory, description);

        try {
            const response = await axios.post(
                `${baseUrl}/courses/category-list/`,
                {
                    name: categoryName,
                    parent: parentCategory,
                    description: description
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Category successfully added:", response.data);
            navigate('/admin/category-management');
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        categoryName: Yup.string()
            .required('Category name is required')
            .matches(/^[A-Za-z\s]+$/, 'Category name must contain only letters'),
        description: Yup.string()
            .required('Description is required'),
        parentCategory: Yup.string()
            .nullable(), // parentCategory can be empty
    });

    return (
        <div>
            <AdminNavbar />
            <AdminSidebar />

            <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
                <Formik
                    initialValues={{
                        categoryName: '',
                        parentCategory: '',
                        description: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="bg-white p-8 rounded-lg shadow-md mt-12">
                            <div className="space-y-12">
                                <div className="border-b border-gray-300 pb-8">
                                    <h2 className="text-xl font-semibold leading-7 text-gray-800">
                                        Add Category
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Provide details about the category you're offering.
                                    </p>

                                    <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                                        {/* Category Name */}
                                        <div className="col-span-2">
                                            <label htmlFor="categoryName" className="block text-sm text-left font-medium leading-6 text-gray-800">
                                                Category Name
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    name="categoryName"
                                                    id="categoryName"
                                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Enter category name"
                                                />
                                                <ErrorMessage name="categoryName" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>

                                        {/* Parent Category */}
                                        <div>
                                            <label htmlFor="parentCategory" className="block text-sm text-left font-medium leading-6 text-gray-800">
                                                Parent Category
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    as="select"
                                                    name="parentCategory"
                                                    id="parentCategory"
                                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">Select a category</option>
                                                    {categoryList.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="parentCategory" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-full mt-8">
                                            <label htmlFor="description" className="block text-sm text-left font-medium leading-6 text-gray-800">
                                                Description
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    id="description"
                                                    rows="5"
                                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Write a brief description of the category"
                                                />
                                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
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
                                    disabled={isSubmitting}
                                >
                                    Save Category
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminAddCategory;
