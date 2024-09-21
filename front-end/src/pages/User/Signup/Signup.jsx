import { useNavigate } from 'react-router-dom'
import { signUp } from '../../../components/auth/authService'
import './signup.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


const Signup = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [role, setRole] = useState('student');

const { accessToken } = useSelector(state => state.auth )
const navigate = useNavigate()

useEffect( () => {
    if (accessToken) {
        navigate('/login')
        console.log(accessToken);  
    }
}, [])

const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
        window.alert('Enter a valid email id')
        return
    }
    if (password !==password2) {
        window.alert('Password do not match')
        return
    }

    try {
        const response = await signUp(email, username, password, password2, role)
        console.log('Registered succefully', response);
        navigate('/login')
        
    } catch (error) {
        console.log('Error while registering', error.message);
        
    }
}

    return (
        <div className='signup-container flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Register</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className='space-y-3' onSubmit={handleSubmit}>
                
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" >Email</label>
                <input type="email" id='email' name='email'  onChange={(e) => setEmail(e.target.value)} 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                   
                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">Username</label>
                <input type="text" id='username' name='username'  onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                
                
                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">Password</label>
                <input type="password" id='password' name='password'  onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            
                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password2">Confirm Password</label>
                <input type="password" id='password2' name='password2'  onChange={(e) => setPassword2(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                
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
                <a onClick={()=> navigate('/login')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2">Login</a>
                </p>
            </form>
            </div>
            
        </div>
    )
}
export default Signup;