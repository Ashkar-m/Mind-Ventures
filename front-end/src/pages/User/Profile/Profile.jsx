import React, { useEffect, useRef, useState } from "react";
import UserNavbar from "../Navbar/Navbar";
import UserSidebar from "../Sidebar/Sidebar";
import { baseUrl } from "../../../components/auth/authService";
import { useSelector } from "react-redux";
import axiosInstance from "../../../components/Bearer/axiosInterceptor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

    const [userProfile, setUserProfile] = useState([]);
    const formRef = useRef(null);
    const { accessToken, user } = useSelector( state => state.auth );
    const userId = user.user_id ;
    const navigate = useNavigate();

    useEffect( () => {
        const fetchUserProfile = async () => {
            try{
                const response = await axiosInstance.get(`${baseUrl}/users/user-profile/${userId}/`);
                const list = response.data;
                setUserProfile(list);
            } catch (error) {
                console.error("Error while fetching details",error);
            }
        }
        fetchUserProfile();
    },[])
    console.log(userProfile);
  
    const validationSchema = Yup.object().shape({
        profile_picture: Yup.mixed()
          .nullable() // Allow null or empty values if needed
          .test(
            "fileFormat",
            "Unsupported Format",
            value => !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
          ), // Validate the image format
        first_name: Yup.string()
          .matches(/^[A-Za-z]+$/, "First name must contain only letters")
          .required("First name is required"),
        last_name: Yup.string()
          .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
          .required("Last name is required"),
        gender: Yup.string()
          .required("Gender is required"),
        date_of_birth: Yup.date()
          .typeError("Invalid date of birth")
          .required("Date of birth is required"),
        bio: Yup.string()
          .max(500, "Bio can't be longer than 500 characters")
          .required("Bio is required"),
        highest_education_qualification: Yup.string().required("Highest education qualification is required"),
        current_education_qualification: Yup.string().required("Current education qualification is required"),
        expected_graduation_date: Yup.date()
          .typeError("Invalid expected graduation date")
          .required("Expected graduation date is required"),
      });
     
    
    function ParseDate(dateInput) {
        const date = new Date(dateInput);
        return date.toISOString().split('T')[0]; // For 'YYYY-MM-DD' format
    }
    
    
    return (
        <div className="min-w-full flex flex-col" >
            {/* Navbar */}
            <UserNavbar />

            <div className="flex w-full h-full">
                <div className="w-1/4 lg:w-1/5">
                <UserSidebar />
                </div>
                <div className="w-3/4 lg:w-4/5">
                { userProfile && (
                    <Formik
                        initialValues={{
                            profile_picture : '',
                            first_name: userProfile.first_name || '',
                            last_name : userProfile.last_name || '',
                            gender : userProfile.gender ||  '',
                            date_of_birth : userProfile.date_of_birth ||  '',
                            bio : userProfile.bio || '',
                            highest_education_qualification : userProfile.highest_education_qualification || '',
                            current_education_qualification : userProfile.current_education_qualification || '',
                            expected_graduation_date : userProfile.expected_graduation_date || '',
                            
                        }}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={ async (values) => {
                            const formDataToSend = new FormData();
                            formDataToSend.append('first_name', values.first_name);
                            formDataToSend.append('last_name', values.last_name);
                            formDataToSend.append('gender', values.gender);
                            formDataToSend.append('date_of_birth',ParseDate(values.date_of_birth));
                            formDataToSend.append('bio',values.bio);
                            formDataToSend.append('highest_education_qualification',values.highest_education_qualification);
                            formDataToSend.append('current_education_qualification', values.current_education_qualification);
                            formDataToSend.append('expected_graduation_date',ParseDate(values.expected_graduation_date));  
                            if (values.profile_picture) {
                                formDataToSend.append('profile_picture', values.profile_picture);
                            }
                            try {

                                await axiosInstance.patch(`${baseUrl}/users/user-profile/`, formDataToSend, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        // Do not set Content-Type for FormData, browser will set it automatically
                                        Authorization: `Bearer ${accessToken}`, // Include token if using authentication
                                    },
                                });
                                navigate('/mentor/dashboard')
                            } catch (error) {
                                console.error('Error updating profile:', error);
                            }
                        }}
                        >

                            {({ setFieldValue, values}) => (
                                <section className="py-10 my-auto dark:bg-gray-900">
                                <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                                <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                                    <div className="">
                                    <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                                        Profile
                                    </h1>
                                    <Form >
                                        
                                        <div  className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                                            style={{
                                                backgroundImage: `url(${
                                                    userProfile?.profile_picture
                                                    ? userProfile.profile_picture
                                                    : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080"
                                                })`,
                                                }}>

                                        </div>
                                        <input
                                        type="file"
                                        name="profile_picture"
                                        id="profile_picture"
                                        accept="image/jpeg, image/png, image/gif, image/jpg"
                                        onChange={(event) => {
                                            setFieldValue("profile_picture", event.currentTarget.files[0]);
                                        }}
                                        className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm
                                        file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                                        file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 file:cursor-pointer text-white"
                                        />
                                        <ErrorMessage name="profile_picture" component="div" className="text-red-600" />
            
                                        {/* Name Fields */}
                                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                        <div className="w-full mb-4 mt-6">
                                            <label className="mb-2 dark:text-gray-300">First Name</label>
                                            <Field
                                            type="text"
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="First Name"
                                            name="first_name"
                                            />
                                        </div>
                                        <ErrorMessage name="first_name" component="div" className="text-red-600" />
                       
                                        <div className="w-full mb-4 lg:mt-6">
                                            <label className="dark:text-gray-300">Last Name</label>
                                            <Field
                                            type="text"
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="Last Name"
                                            name="last_name"
                                            />
                                        </div>
                                        <ErrorMessage name="last_name" component="div" className="text-red-600" />
                       
                                        </div>
            
                                        {/* Gender and Date of Birth */}
                                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                        <div className="w-full">
                                            <h3 className="dark:text-gray-300 mb-2">Gender</h3>
                                            <Field as="select"
                                            className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            name="gender"
                                            value = { values.gender }
                                            onChange={(e) => {
                                                setFieldValue("gender", e.target.value); // Update Formik state on change
                                                // Displaying selected category ID to the user
                                                const selectedId = e.target.value; // Change this to display as needed
                                              }}
                                            >
                                            <option disabled value="">
                                                Select Gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="memale">Female</option>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" className="text-red-600" />
                       
                                        </div>
                                        <div className="w-full">
                                            <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                                            <Field as="input"
                                            type="date"
                                            name="date_of_birth"
                                            className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            />
                                        </div>
                                        <ErrorMessage name="date_of_birth" component="div" className="text-red-600" />
                       
                                        </div>
            
                                        {/* Bio */}
                                        <div className="w-full mb-4 mt-6">
                                        <label className="mb-2 dark:text-gray-300">Bio</label>
                                        <Field as="textarea"
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="Bio"
                                            name="bio"
                                            />
                                            <ErrorMessage name="bio" component="div" className="text-red-600" />
                       
                                        </div>
            
                                        {/* Education Fields */}
                                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                        <div className="w-full">
                                            <h3 className="dark:text-gray-300 mb-2">Highest Education Qualification</h3>
                                            <Field as="select"
                                            className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            name="highest_education_qualification"
                                            value={ values.highest_education_qualification } // populate dynamically
                                            onChange = { (e) => {
                                                setFieldValue("highest_education_qualification", e.target.value);
                                                const selectedId = e.target.value;
                                            }}
                                            >
                                            <option disabled value="">
                                                Select Qualification
                                            </option>
                                            <option value="sslc">SSLC</option>
                                            <option value="highersecondary">Higher Secondary</option>
                                            <option value="diploma">Diploma</option>
                                            <option value="undergraduate">Under Graduate</option>
                                            <option value="postgraduate">Post Graduate</option>
                                            </Field>
                                            <ErrorMessage name="highest_education_qualification" component="div" className="text-red-600" />
                       
                                        </div>
                                        <div className="w-full">
                                            <h3 className="dark:text-gray-300 mb-2">Current Education Qualification</h3>
                                            <Field as="select"
                                            className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            name="current_education_qualification"
                                            value= { values.current_education_qualification }
                                            onChange = { (e) => {
                                                setFieldValue("current_education_qualification", e.target.value);
                                                const selectedId = e.target.value;
                                            }}>
                                            <option disabled value="">
                                                Select Qualification
                                            </option>
                                            <option value="sslc">SSLC</option>
                                            <option value="highersecondary">Higher Secondary</option>
                                            <option value="diploma">Diploma</option>
                                            <option value="undergraduate">Under Graduate</option>
                                            <option value="postgraduate">Post Graduate</option>
                                            </Field>
                                        </div>
                                        <ErrorMessage name="current_education_qualification" component="div" className="text-red-600" />
                       
                                        </div>
            
                                        {/* Expected Graduation Date */}
                                        <div className="w-full mb-4 mt-6">
                                        <label className="mb-2 dark:text-gray-300">Expected Graduation Date</label>
                                        <Field as="input"
                                            type="date"
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            name="expected_graduation_date"
                                            />
                                            <ErrorMessage name="expected_graduation_date" component="div" className="text-red-600" />
                       
                                        </div>
                                        <div class="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                                            <button type="submit" class="w-full p-4">Save</button>
                                        </div>
                                    </Form>
                                    </div>
                                </div>
                                </div>
                            </section>
                            )}
                        </Formik>
                )}
                </div>

            </div>
        </div>
    )
}

export default UserProfile;