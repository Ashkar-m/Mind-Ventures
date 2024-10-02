import { useEffect, useState } from "react";
import { login } from '../../../components/auth/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Toast from "../../../utils/validation/Toast";
import { useFormik } from "formik";
import * as Yup from 'yup';

const AdminLogin = () => {
    const dispatch = useDispatch();
    const [toastMessages, setToastMessage] = useState([]);
    const { accessToken } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect( () => {
        if (accessToken) {
            navigate('/admin/home')
        }
    }, [accessToken])
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email field is required'),
        password: Yup.string()
            .min(4, 'Password should contain at least 4 characters')
            .required('Password field is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const tokenData = await login(values.email, values.password);
                if (tokenData) {
                    const userId = tokenData.user_id;
                    const userDetails = await fetch(`http://127.0.0.1:8000/users/user-detail/${userId}/`).then(response => response.json());
                    navigate('/admin/home');
                    setToastMessage([{ message: 'Successfully logged in', type: 'success' }]);
                } else {
                    setToastMessage([{ message: 'Invalid username or password', type: 'danger' }]);
                }
            } catch (error) {
                console.log(error);
                setToastMessage([{ message: error.message || 'Login failed', type: 'danger' }]);
            }
        }
    });

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value.trim();
//     const password = e.target.password.value.trim();
//     let messages = [] ;
    
//     if (!email) {
//         messages.push({ message : 'Email field is required', type : 'danger'});
//     } else if (!validateEmail(email)) {
//         messages.push({ message : 'Please enter a valid email address', type : 'danger'});
//     }

//     if (!password) {
//         messages.push({ message : 'Password field is required', type : 'danger' });
//     } 
//     // else if (!validatePassword(password)) {
//     //     messages.push({ message : 'Password should contain atleast 8 characters', type : 'warning'});
//     // }

//     if (messages.length > 0) {
//         setToastMessage(messages);
//         return;
//     }

//     setToastMessage([]);

//     try {
//         const email = e.target.email.value;  // Accesses the value of the 'email' input
//         const password = e.target.password.value;  // Accesses the value of the 'password' input
  
//         const tokenData = await login(email,password)
//         if (tokenData) {
//             const userId = tokenData.user_id;
//             const userDetails = await fetch(`http://127.0.0.1:8000/users/user-detail/${userId}/`).then(response => response.json());
            
//             navigate('/admin/home')
//             setToastMessage([{ message : 'Successfully logged in', type : 'success'}])
//             // dispatch(addToast({ message : 'Successfully logged in', type : 'sucees'}))
//         } else {
//             // dispatch(addToast({ message : 'Invalid username or password', type : 'danger'}))
//             setToastMessage([{ message : 'Invalid username or password', type : 'danger'}])
            
//         }
        
//     } catch (error) {
//         console.log(error);
//         // dispatch(addToast({ message : error.message || 'Login failed', type : 'danger'}))
//         setToastMessage([{ message : error.message || 'Login failed', type : 'danger'}])
//     }
// };

    const handleToastClose =(indexToRemove) => {
        setToastMessage(prevMessages => 
            prevMessages.filter((_, index) => index !== indexToRemove )
        );
    }

return (
    <div className="w-full min-h-screen absolute left-0 right-0 top-0 bg-gray-200">
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
        
        {/* Admin Login */}
        <div className='signup-container flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20'>
            <div className="toast-container">
                { toastMessages.length >0  && toastMessages.map((toast, index) => (
                    <Toast key={index} type={toast.type} message={toast.message} onClose={() => handleToastClose(index)} />
                )) }
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900' style={{fontFamily: 'Pacifico', fontSize: '24px'}}>Admin Login</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className='space-y-2' onSubmit={formik.handleSubmit}>

                <label className="block text-left pl-2 text-sm font-medium leading-6 text-gray-900" htmlFor="email">Email</label>
                <input type="text" id="email" name='email'  style={{ marginBottom: '20px' }}
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {formik.touched.email && formik.errors.email ? <div className="text-red-600 text-sm">{formik.errors.email}</div> : null }

                <label className="block text-left pl-2 text-sm font-medium leading-6 text-gray-900" htmlFor="password">Password</label>
                <input type="password" id="password" name='password'  style={{ marginBottom: '20px' }}
                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {formik.touched.password && formik.errors.password ? <div className="text-red-600 text-sm">{formik.errors.password}</div> : null }

                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                 type="submit">Login</button>
                 <p className="mt-10 text-center text-sm text-gray-500" >
                Login as an user
                <a onClick={()=> navigate('/login')} className="font-semibold cursor-pointer leading-6 text-indigo-600 hover:text-indigo-500 ml-2">Login</a>
                </p>
                </form>

            </div>
            </div>
            
        
        </div>
    </div>
    
)
}
export default AdminLogin;