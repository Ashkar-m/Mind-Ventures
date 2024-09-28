import { useEffect, useState } from "react";
import { login } from '../../../components/auth/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail,validatePassword } from "../../../utils/validation/user/loginValidation";
import Toast from "../../../utils/validation/Toast";
import './Login.css';
import { addToast } from "../../../features/toastReducer";

const LoginPage = () => {
    const dispatch = useDispatch();
    const [toastMessages, setToastMessage] = useState([]);

    const { accessToken } = useSelector(state => state.auth);
    const navigate = useNavigate();
    

useEffect( () => {
    if (accessToken) {
        navigate('/')
    }
}, [accessToken])

const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    let messages = [] ;
    
    if (!email) {
        messages.push({ message : 'Email field is required', type : 'danger'});
    } else if (!validateEmail(email)) {
        messages.push({ message : 'Please enter a valid email address', type : 'danger'});
    }

    if (!password) {
        messages.push({ message : 'Password field is required', type : 'danger' });
    } else if (!validatePassword(password)) {
        messages.push({ message : 'Password should contain atleast 8 characters', type : 'warning'});
    }

    if (messages.length > 0) {
        setToastMessage(messages);
        return;
    }

    setToastMessage([]);

    try {
        const email = e.target.email.value;  // Accesses the value of the 'email' input
        const password = e.target.password.value;  // Accesses the value of the 'password' input
  
        const tokenData = await login(email,password)
        if (tokenData) {
            const userId = tokenData.user_id;
            const userDetailsResponse = await fetch(`http://127.0.0.1:8000/users/user-detail/${userId}/`);
        
            if (!userDetailsResponse.ok) {
                throw new Error('Failed to fetch user details');
            }
    
            const userDetails = await userDetailsResponse.json();
            
            if (userDetails) {
                if (userDetails.role === 'student') {
                    navigate('/home')
                    messages.push({ message : 'Successfully logged in', type : 'suceess'})
                } else if (userDetails.role === 'mentor') {
                    navigate('/mentor/home')
                    messages.push({ message : 'Successfully logged in as mentor', type : 'success'})
                } else if (userDetails.role === 'admin') {
                    messages.push({ message : "Admin can't able to login using this page. You can choose admin login.", type : 'warning'});
                } else {
                    messages.push({ message : 'unknown role', type : 'danger'});
                }  
            }
        } else {
            // messages.push({ message : 'Invalid username or password', type : 'danger'})
            setToastMessage([{ message : 'Invalid username or password', type : 'danger'}])
            
        }
        
    } catch (error) {
        // console.log(error);
        // messages.push({ message : error.message || 'Login failed', type : 'danger'})
        setToastMessage([{ message : error.message || 'Login failed', type : 'danger'}])
    }
};

const handleToastClose =(indexToRemove) => {
    setToastMessage(prevMessages => 
        prevMessages.filter((_, index) => index !== indexToRemove )
    );
}

return (
    <div className='signup-container flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
            <div className="toast-container">
                { toastMessages.length >0  && toastMessages.map((toast, index) => (
                    <Toast key={index} type={toast.type} message={toast.message} onClose={() => handleToastClose(index)} />
                )) }
            </div>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-lg shadow-lg p-6'>
                <h2 className='text-4xl font-bold text-center text-gray-800 mb-6 uppercase tracking-wide'>Login</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-lg shadow-lg p-6">
                <form className='space-y-2' onSubmit={handleSubmit}>

                <label className="block text-left text-sm font-medium leading-6 text-gray-900  " htmlFor="email">Email</label>
                <input type="text" id="email" name='email'  style={{ marginBottom: '20px' }}
                className="block pl-2 w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                <label className="block text-left text-sm font-medium leading-6 text-gray-900" htmlFor="password">Password</label>
                <input type="password" id="password" name='password' style={{ marginBottom: '20px' }}
                className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                <button className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                 type="submit">Login</button>
                 <p className="mt-10 text-center text-sm text-gray-500" >
                Don't have an account
                <a onClick={()=> navigate('/register')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2">Register</a>
                </p>
                </form>

            </div>
        
    </div>
)
}
export default LoginPage;