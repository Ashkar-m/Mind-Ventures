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
          .oneOf(["male", "female", "other"], "Invalid gender")
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
        <div className="min-w-full" >
            {/* Navbar */}
            <UserNavbar />

            {/* Sidebar */}
            <UserSidebar />

            <div className="p-4 sm:ml-64 mt-16">
    {userProfile && (
        <Formik
            initialValues={{
                profile_picture: '',
                first_name: userProfile.first_name || '',
                last_name: userProfile.last_name || '',
                gender: userProfile.gender || '',
                date_of_birth: userProfile.date_of_birth || '',
                bio: userProfile.bio || '',
                highest_education_qualification: userProfile.highest_education_qualification || '',
                current_education_qualification: userProfile.current_education_qualification || '',
                expected_graduation_date: userProfile.expected_graduation_date || '',
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (key === 'date_of_birth' || key === 'expected_graduation_date') {
                        formData.append(key, ParseDate(value));
                    } else {
                        formData.append(key, value);
                    }
                });
                if (values.profile_picture) {
                    formData.append('profile_picture', values.profile_picture);
                }
                try {
                    await axiosInstance.patch(`${baseUrl}/users/user-profile/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    navigate('/mentor/home');
                } catch (error) {
                    console.error('Error updating profile:', error);
                }
            }}
        >
            {({ setFieldValue, values }) => (
                <section className="py-10 my-auto dark:bg-gray-900">
                    <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">Profile</h1>
                            <Form>
                                {userProfile.profile_picture && (
                                    <img
                                        src={userProfile?.profile_picture ? `http://localhost:8000${userProfile.profile_picture}` : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080"}
                                        alt="Current Preview"
                                        className="mb-4 rounded-lg shadow-sm w-40 h-40"
                                    />
                                )}
                                <input
                                    type="file"
                                    name="profile_picture"
                                    id="profile_picture"
                                    accept="image/jpeg, image/png, image/gif, image/jpg"
                                    onChange={(event) => setFieldValue("profile_picture", event.currentTarget.files[0])}
                                    className="block w-full rounded-lg border-2 py-2 px-4 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="profile_picture" component="div" className="text-red-600" />

                                {/* Name Fields */}
                                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <FieldLabel name="first_name" placeholder="First Name" />
                                    <FieldLabel name="last_name" placeholder="Last Name" />
                                </div>

                                {/* Gender and Date of Birth */}
                                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <FieldSelect name="gender" options={[{ value: '', label: 'Select Gender' }, { value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]} />
                                    <FieldInput name="date_of_birth" type="date" />
                                </div>

                                {/* Bio */}
                                <FieldTextArea name="bio" placeholder="Bio" />

                                {/* Education Fields */}
                                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <FieldSelect
                                        name="highest_education_qualification"
                                        options={[
                                            { value: '', label: 'Select Qualification' },
                                            { value: 'diploma', label: 'Diploma' },
                                            { value: 'sslc', label: 'SSLC' },
                                            { value: 'highersecondary', label: 'Higher Secondary' },
                                            { value: 'undergraduate', label: 'Under Graduate' },
                                            { value: 'postgraduate', label: 'Post Graduate' },
                                        ]}
                                    />
                                    {/* Additional education fields can be added here */}
                                </div>
                            </Form>
                        </div>
                    </div>
                </section>
            )}
        </Formik>
    )}
</div>

        </div>
    )
}

export default UserProfile;