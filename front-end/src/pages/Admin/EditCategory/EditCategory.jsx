import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { useSelector } from 'react-redux';
import { baseUrl } from "../../../components/auth/authService";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// const AdminEditCategory = () => {
//     const { accessToken } = useSelector(state => state.auth);
//     const [category, setCategory] = useState(null); // Start with null
//     const [categoryList, setCategoryList] = useState([]);
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();
//     const { id } = useParams();
    
//     useEffect(() => {
//         const fetchCategory = async () => {
//             try {
//                 const response = await axios.get(`${baseUrl}/courses/category-list/${id}/`, {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`,
//                     },
//                 });

//                 const data = response.data;
//                 setCategory(data);
//             } catch (error) {
//                 console.error("Error fetching category:", error);
//             }
//         };

//         fetchCategory();
//     }, [accessToken, id]); // Make sure to include `id` in the dependency array
//     console.log(category);
    
//     const handleSubmit = async (values) => {
//         const { categoryName, parentCategory, description } = values;

//         try {
//             const response = await axios.patch( // Use PATCH instead of POST for editing
//                 `${baseUrl}/courses/category-list/${id}/`,
//                 {
//                     name: categoryName,
//                     parent: parentCategory,
//                     description: description
//                 },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             console.log("Category successfully updated:", response.data);
//             navigate('/admin/category-management');
//         } catch (error) {
//             console.error("Error updating category:", error);
//             if (error.response.data.name) {
//                 setErrorMessage(error.response.data.name[0]);
//             }
//         }
//     };

//     useEffect(() => {
//         const fetchCategoryList = async () => {
//             try {
//                 const response = await axios.get(`${baseUrl}/courses/category-list/`, {
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

//     // Yup validation schema
//     const validationSchema = Yup.object().shape({
//         categoryName: Yup.string()
//             .required('Category name is required')
//             .matches(/^[A-Za-z\s]+$/, 'Category name must contain only letters'),
//         description: Yup.string()
//             .required('Description is required'),
//         parentCategory: Yup.string()
//             .nullable(), // parentCategory can be empty
//     });

//     return (
//         <div>
//             <AdminNavbar />
//             <AdminSidebar />

//             <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">
//                 {category && ( // Ensure category is loaded before rendering the form
//                     <Formik
//                         initialValues={{
//                             categoryName: category.name || '',
//                             parentCategory: category.parent || '',
//                             description: category.description || ''
//                         }}
//                         validationSchema={validationSchema}
//                         onSubmit={handleSubmit}
//                         enableReinitialize={true} // Allow reinitialization of form values
//                     >
//                         {({ isSubmitting, values, setFieldValue }) => (
//                             <Form className="bg-white p-8 rounded-lg shadow-md mt-12">
//                                 <div className="space-y-12">
//                                     <div className="border-b border-gray-300 pb-8">
//                                         <h2 className="text-xl font-semibold leading-7 text-gray-800">
//                                             Edit Category
//                                         </h2>
//                                         <p className="mt-1 text-sm leading-6 text-gray-600">
//                                             Update the details about the category.
//                                         </p>

//                                         <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
//                                             {/* Category Name */}
//                                             <div className="col-span-2">
//                                                 <label htmlFor="categoryName" className="block text-sm text-left font-medium leading-6 text-gray-800">
//                                                     Category Name
//                                                 </label>
//                                                 <div className="mt-2">
//                                                     <Field
//                                                         type="text"
//                                                         name="categoryName"
//                                                         id="categoryName"
//                                                         className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                                                         placeholder="Enter category name"
//                                                     />
//                                                     <ErrorMessage name="categoryName" component="div" className="text-red-500 text-sm mt-1" />
//                                                     {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//                                                 </div>
//                                             </div>

//                                             {/* Parent Category */}
//                                             <div>
//                                                 <label htmlFor="parentCategory" className="block text-sm text-left font-medium leading-6 text-gray-800">
//                                                     Parent Category
//                                                 </label>
//                                                 <div className="mt-2">
//                                                     <Field
//                                                         as="select"
//                                                         name="parentCategory"
//                                                         id="parentCategory"
//                                                         value={values.parentCategory}
//                                                         className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                                                         onChange={ (e) => {
//                                                             setFieldValue("parentCategory", e.target.value)
//                                                         }}
//                                                     >
//                                                         <option value="">Select a category</option>
//                                                         {categoryList.map((category) => (
//                                                             <option key={category.id} value={category.id}>
//                                                                 {category.name}
//                                                             </option>
//                                                         ))}
//                                                     </Field>
//                                                     <ErrorMessage name="parentCategory" component="div" className="text-red-500 text-sm mt-1" />
//                                                 </div>
//                                             </div>

//                                             {/* Description */}
//                                             <div className="col-span-full mt-8">
//                                                 <label htmlFor="description" className="block text-sm text-left font-medium leading-6 text-gray-800">
//                                                     Description
//                                                 </label>
//                                                 <div className="mt-2">
//                                                     <Field
//                                                         as="textarea"
//                                                         name="description"
//                                                         id="description"
//                                                         rows="5"
//                                                         className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
//                                                         placeholder="Write a brief description of the category"
//                                                     />
//                                                     <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Action Buttons */}
//                                 <div className="mt-6 flex items-center justify-end gap-4">
//                                     <button
//                                         type="button"
//                                         className="text-sm font-semibold text-gray-700 hover:text-gray-900"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//                                         disabled={isSubmitting}
//                                     >
//                                         Save Category
//                                     </button>
//                                 </div>
//                             </Form>
//                         )}
//                     </Formik>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default AdminEditCategory;

const AdminEditCategory = () => {
    const { accessToken } = useSelector(state => state.auth);
    const [category, setCategory] = useState(null); // Start with null
    const [categoryList, setCategoryList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${baseUrl}/courses/category-list/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                const data = response.data;
                setCategory(data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, [accessToken, id]);

    const handleSubmit = async (values) => {
        const { categoryName, parentCategory, description } = values;

        try {
            const response = await axios.patch(
                `${baseUrl}/courses/category-list/${id}/`,
                {
                    name: categoryName,
                    parent: parentCategory, // Make sure this sends the correct value (string or ID)
                    description: description
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Category successfully updated:", response.data);
            navigate('/admin/category-management');
        } catch (error) {
            console.error("Error updating category:", error);
            if (error.response.data.name) {
                setErrorMessage(error.response.data.name[0]);
            }
        }
    };

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
                {category && (
                    <Formik
                        initialValues={{
                            categoryName: category.name || '',
                            parentCategory: category.parent || '', // Use the parent's name if necessary
                            description: category.description || ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({ isSubmitting, values, setFieldValue }) => (
                            <Form className="bg-white p-8 rounded-lg shadow-md mt-12">
                                <div className="space-y-12">
                                    <div className="border-b border-gray-300 pb-8">
                                        <h2 className="text-xl font-semibold leading-7 text-gray-800">
                                            Edit Category
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Update the details about the category.
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
                                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                                                        onChange={(e) => {
                                                            setFieldValue("parentCategory", e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Select a category</option>
                                                        {categoryList.map((category) => (
                                                            <option key={category.id} value={category.name}> {/* Use category.name instead of id */}
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
                )}
            </div>
        </div>
    );
}

export default AdminEditCategory;
