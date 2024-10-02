import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from "../../../utils/validation/Toast";
import { baseUrl } from "../../../components/auth/authService";


const OtpPage = () => {
    const [toastMessages, setToastMessage] = useState([]);
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    console.log(JSON.stringify({ email }));
    

    const handleSendOtp = async () => {
        try {
            const response = await fetch(`${baseUrl}/users/send-otp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            console.log(data);
            

            if (response.ok) {
                setToastMessage([{ message: 'OTP sent successfully', type: 'success' }]);
            } else {
                setToastMessage([{ message: 'Failed to send OTP', type: 'danger' }]);
            }
        } catch (error) {
            setToastMessage([{ message: error.message || 'Error sending OTP', type: 'danger' }]);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/users/verify-otp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                setToastMessage([{ message: 'OTP verified successfully', type: 'success' }]);
                console.log('successfully verified');
                
                navigate('/home'); // Redirect after verification
            } else {
                console.log('eror while registering');
                
                setToastMessage([{ message: 'Failed to verify OTP', type: 'danger' }]);
            }
        } catch (error) {
            setToastMessage([{ message: error.message || 'Error verifying OTP', type: 'danger' }]);
        }
    };

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
                <a className="flex">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">MindVentures</span>
                </a>
            </div>
            <div className="flex items-center">
                </div>
            </div>

        </div>
        </nav>

        

        {/* Login form */}
        <div className='signup-container flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20 '>

        <div className="toast-container">
            { toastMessages.length >0  && toastMessages.map((toast, index) => (
                <Toast key={index} type={toast.type} message={toast.message} onClose={() => handleToastClose(index)} />
            )) }
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
        <div className='sm:mx-auto sm:w-full sm:max-w-sm '>
            <h2 className='text-4xl font-bold text-center text-gray-800 mb-6 uppercase tracking-wide' style={{fontFamily: 'Pacifico', fontSize: '24px'}}>Verify Otp</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <button onClick={handleSendOtp}>send</button>
            <form className='space-y-2' onSubmit={handleVerifyOtp}>
                

            <label className="block text-left text-sm font-medium leading-6 text-gray-900  " htmlFor="email">Enter OTP recieved on Email.</label>
            <input type="text" id="email" name='email'  style={{ marginBottom: '20px' }}
            value={otp} onChange={ (e) => setOtp(e.target.value) }
            className="block pl-2 w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            
            <button  className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit">Verify</button>
            <p className="mt-10 text-center text-sm text-gray-500" >
            Didn't revieve OTP?
            <a onClick={()=> navigate('/register')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2 cursor-pointer">Resend OTP</a>
            </p>
            </form>

        </div>
        </div>


        </div>

    </div>
    
)
}
export default OtpPage;

// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Toast from "../../../utils/validation/Toast";

// const OtpPage = () => {
//     const dispatch = useDispatch();
//     const [toastMessages, setToastMessage] = useState([]);
//     const [otp, setOtp] = useState('');
//     const [email, setEmail] = useState('');
//     const navigate = useNavigate();

//     const { accessToken } = useSelector(state => state.auth);

//     const handleSendOtp = async () => {
//         try {
//             const response = await fetch('http://127.0.0.1:8000/send-otp/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email }),
//             });

//             if (response.ok) {
//                 setToastMessage([{ message: 'OTP sent successfully', type: 'success' }]);
//             } else {
//                 setToastMessage([{ message: 'Failed to send OTP', type: 'danger' }]);
//             }
//         } catch (error) {
//             setToastMessage([{ message: error.message || 'Error sending OTP', type: 'danger' }]);
//         }
//     };

//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://127.0.0.1:8000/verify-otp/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, otp }),
//             });

//             if (response.ok) {
//                 setToastMessage([{ message: 'OTP verified successfully', type: 'success' }]);
//                 navigate('/home'); // Redirect after verification
//             } else {
//                 setToastMessage([{ message: 'Failed to verify OTP', type: 'danger' }]);
//             }
//         } catch (error) {
//             setToastMessage([{ message: error.message || 'Error verifying OTP', type: 'danger' }]);
//         }
//     };

//     const handleToastClose = (indexToRemove) => {
//         setToastMessage(prevMessages =>
//             prevMessages.filter((_, index) => index !== indexToRemove)
//         );
//     };

//     return (
//         <div className="w-full min-h-screen absolute left-0 right-0 top-0 bg-gray-200">
//             <nav className="w-full bg-white border-b border-gray-200 fixed left-0 right-0 top-0 z-10">
//                 <div className="px-3 py-3 lg:px-5 lg:pl-3">
//                     <div className="flex items-center justify-center">
//                         <div className="flex items-center justify-start">
//                             <a className="flex">
//                                 <span className="self-center text-xl font-semibold sm:text-2xl">MindVentures</span>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <div className='signup-container flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20'>
//                 <div className="toast-container">
//                     {toastMessages.length > 0 && toastMessages.map((toast, index) => (
//                         <Toast key={index} type={toast.type} message={toast.message} onClose={() => handleToastClose(index)} />
//                     ))}
//                 </div>

//                 <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
//                     <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
//                         <h2 className='text-4xl font-bold text-center text-gray-800 mb-6 uppercase tracking-wide'>Verify OTP</h2>
//                     </div>

//                     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                         <form className='space-y-2' onSubmit={handleVerifyOtp}>
//                             <label className="block text-left text-sm font-medium text-gray-900" htmlFor="email">
//                                 Enter OTP received on Email.
//                             </label>
//                             <input
//                                 type="text"
//                                 id="otp"
//                                 name='otp'
//                                 style={{ marginBottom: '20px' }}
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
//                             />

//                             <button className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
//                                 type="submit">Verify</button>
//                         </form>

//                         <p className="mt-10 text-center text-sm text-gray-500">
//                             Didn't receive OTP?
//                             <button
//                                 className="font-semibold text-indigo-600 hover:text-indigo-500 ml-2"
//                                 onClick={handleSendOtp}
//                             >
//                                 Resend OTP
//                             </button>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default OtpPage;
