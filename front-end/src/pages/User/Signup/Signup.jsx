import { useNavigate } from 'react-router-dom'
import { signUp } from '../../../components/auth/authService'
import './signup.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Toast from '../../../utils/validation/Toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Signup = () => {
    const [role, setRole] = useState('student');
    const [toastMessages, setToastMessages] = useState([]);
    const { accessToken } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect( () => {
        if (accessToken) {
            navigate('/login')
            console.log(accessToken);  
        }
    }, [accessToken])

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Enter a valid email id.")
            .required('Email field is required.'),
        username: Yup.string()
            .min(6, 'Username must contain atleast 6 characters')
            .matches(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters allowed')
            .required('Username field is required.'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/\d/, 'Password must contain at least one digit')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Password field is required'),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password field is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
            password2: ''
        },
        validationSchema,
        onSubmit: async (values, {resetForm}) => {
            setToastMessages([]);
            const { email, username, password, role } = values;
            try {
                const response = await signUp(email, username, password, password2, role);
                console.log('Registered successfully', response);
                resetForm();
                navigate('/login');
            } catch (error) {
                setToastMessages([{ message: 'Error while registering', type: 'danger'}])
                console.error("Error occured", error);
            }
        }
    })
    
    const handleToastClose = (indexToRemove) => {
        setToastMessages( prevMessages => 
            prevMessages.filter((_, index) => index !== indexToRemove)
        )
    }

    return (
        <div className='w-full min-h-screen absolute left-0 right-0 top-0 bg-gray-200'>
            {/* Navbar */}
            <nav className=" w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-10">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-center">
                <div className="flex items-center justify-start rtl:justify-end">
                    <a  className="flex">
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">MindVentures</span>
                    </a>
                </div>
                <div className="flex items-center">
                    </div>
                </div>

            </div>
            </nav>
        
            {/* Register form */}
            <div className='signup-container flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-16'>
                <div className="toast-container">
                    { toastMessages.length >0  && toastMessages.map((toast, index) => (
                        <Toast key={index} type={toast.type} message={toast.message} onClose={() => handleToastClose(index)} />
                    )) }
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900' style={{fontFamily: 'Pacifico', fontSize: '24px'}}>Register</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className='space-y-1' onSubmit={formik.handleSubmit}>
                    
                    <label htmlFor="email" className="block text-left text-sm font-medium leading-6 text-gray-900" >Email</label>
                    <input type="text" id='email' name='email' style={{ marginBottom: '12px' }}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    { formik.touched.email && formik.errors.email ? (
                        <div className='text-red-600 text-sm'>{ formik.errors.email }</div>
                    ) : null }

                    <label className="block text-left text-sm font-medium leading-6 text-gray-900" htmlFor="username">Username</label>
                    <input type="text" id='username' name='username' style={{ marginBottom: '12px' }}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username}
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    { formik.touched.username && formik.errors.username ? (
                        <div className='text-red-600 text-sm'>{ formik.errors.username }</div>
                    ) : null }
                    
                    <label className="block text-left text-sm font-medium leading-6 text-gray-900" htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' style={{ marginBottom: '12px' }}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    { formik.touched.password && formik.errors.password ? (
                        <div className='text-red-600 text-sm'>{ formik.errors.password }</div>
                    ) : null }

                    <label className="block text-left text-sm font-medium leading-6 text-gray-900" htmlFor="password2">Confirm Password</label>
                    <input type="password" id='password2' name='password2' style={{ marginBottom: '12px' }}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password2}
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    { formik.touched.password2 && formik.errors.password2 ? (
                        <div className='text-red-600 text-sm'>{ formik.errors.password2 }</div>
                    ) : null }

                    <fieldset className='mt-4'>
                        <legend className='block text-sm font-medium leading-6 text-gray-900'>Register As</legend>
                        <div className='mt-3'>
                        <label>
                            <input type="radio" value='student' checked={ role === 'student' }
                            onChange={(e) => setRole(e.target.value)} /> Student
                        </label>
                        <label className="ml-4">
                                <input type="radio" value='mentor' checked={role === 'mentor'} 
                                onChange={(e) => setRole(e.target.value)} /> Mentor
                        </label>
                        </div>
                    </fieldset>

                    <button type='submit' className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Register</button>
                    <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member
                    <a onClick={()=> navigate('/login')} className="font-semibold cursor-pointer leading-6 text-indigo-600 hover:text-indigo-500 ml-2">Login</a>
                    </p>
                </form>
                </div>
                </div>
            </div>
        </div>
        
    )
}
export default Signup;