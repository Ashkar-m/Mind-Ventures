import { useEffect } from "react";
import './Login.css';
import { login } from '../../../components/auth/authService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginPage = () => {
    const { accessToken } = useSelector(state => state.auth);
    const navigate = useNavigate();


useEffect( () => {
    if (accessToken) {
        navigate('/login')
    }
}, [])

const handleSubmit = async (e) => {
    e.preventDefault()

    if (e.target.email.value.trim === "") {
        window.alert('Enter valid Mail id')
    }

    try {
        const email = e.target.email.value;  // Accesses the value of the 'email' input
        const password = e.target.password.value;  // Accesses the value of the 'password' input
  
        const tokenData = await login(email,password)
        // await getProfile()
        // if (tokenData.is_superuser) {
        //     navigate ('/adminpanel')
        // } else {
        //     navigate ('/login')
        // }
        if (tokenData) {
            navigate('/')
        } else {
            console.error('Login failed');
            
        }
        
    } catch (error) {
        console.log(error);
        window.alert(error);
        
    }
}

return (
    <div className='signup-container flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Login</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className='space-y-6' onSubmit={handleSubmit}>

                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">Email</label>
                <input type="email" id="email" name='email'  
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">Password</label>
                <input type="password" id="password" name='password' 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
export default LoginPage