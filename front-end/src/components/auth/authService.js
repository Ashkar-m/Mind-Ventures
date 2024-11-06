import axios from 'axios';
import { logout, setCredentials } from '../../features/authReducer'
import store from '../../store/store';

export const baseUrl='http://127.0.0.1:8000';

const login = async (email,password) => {
    try {
        const response = await axios.post(`${baseUrl}/users/token-view/`,{
            email,password 
        });

        if (response.status === 200) {
            const data = response.data
            const { access, refresh } = data;
        
            const tokenData = JSON.parse(atob(access.split('.')[1]));
            
            const userDetailsResponse = await axios.get(`${baseUrl}/users/user-detail/${tokenData.user_id}/`);

            if (userDetailsResponse.status === 200) {
                const userDetails = userDetailsResponse.data;

                if (userDetails.role === 'admin') {
                    return { error: { message: 'Admins can not login using this page.' } };
                }

                if (userDetails.is_verified){
                    localStorage.setItem('ACCESS_TOKEN', JSON.stringify(data.access));
                    localStorage.setItem('REFRESH_TOKEN', JSON.stringify(data.refresh));
                    localStorage.setItem('user', JSON.stringify({
                        user_id : tokenData.user_id,
                        email : tokenData.email,
                        role : tokenData.role,
                        is_verified : tokenData.is_verified
                    }));
                    store.dispatch(setCredentials({
                        user : {
                            user_id : tokenData.user_id,
                            email : tokenData.email,
                            role : tokenData.role,
                            is_verified : tokenData.is_verified
                        },
                        accessToken : access,
                        refreshToken : refresh,
                    }));
                    console.log('Login success');
                    
                    return tokenData;
                } else {
                    return { error: { message: 'Your account is blocked or unverified' } };
                }
            } else {
                throw new Error('Failed to fetch user details');
            }
            
        }
        } catch (error) {
            console.error('Error logging in:', error.response?.data?.detail || 'unknown error');
            return { error:error };
        }
};

const signUp = async (email, username, password, password2, role) => {
    try {
        const response = await axios.post(`${baseUrl}/users/register/`,{
            email, username, password, password2, role });
        if (response.status >= 200 && response.status < 300) {
            console.log('User registered successfully');
        } else {
            console.error('Error occured while registering');
        }
    } catch (error) {
        if (error.response) {
            const errorData = error.response.data;
            if (errorData.email) {
                console.log(errorData.email.join(', '));
            } else if (errorData.username) {
                console.log(errorData.username.join(', '));
            } else if (errorData.password) {
                console.log(errorData.password.join(', '));
            } else {
                console.log('Error response: ' + JSON.stringify(errorData));
            }
        } else if (error.request) {
            console.log('Error request: ' + error.request);
        } else {
            console.log('Error: ' + error.message);
        }
        throw error;
    }
};

const adminLogin = async (email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/users/token-view/`, {
            email,
            password
        });

        if (response.status === 200) {
            const data = response.data;
            const { access, refresh } = data;

            const tokenData = JSON.parse(atob(access.split('.')[1]));

            const userDetailsResponse = await axios.get(`${baseUrl}/users/user-detail/${tokenData.user_id}/`);

            if (userDetailsResponse.status === 200) {
                const userDetails = userDetailsResponse.data;

                if (userDetails.role === 'student') {
                    return { error: { message: 'Students can not login using this page.' } };
                } else if (userDetails.role === 'mentor') {
                    return { error: { message: 'Mentors can not login using this page.' } };
                } else if (userDetails.role === 'admin' && userDetails.is_verified) {
                    localStorage.setItem('ACCESS_TOKEN', JSON.stringify(data.access));
                    localStorage.setItem('REFRESH_TOKEN', JSON.stringify(data.refresh));
                    localStorage.setItem('user', JSON.stringify({
                        user_id: tokenData.user_id,
                        email: tokenData.email,
                        role: tokenData.role
                    }));
                    store.dispatch(setCredentials({
                        user: {
                            user_id: tokenData.user_id,
                            email: tokenData.email,
                            role: tokenData.role
                        },
                        accessToken: access,
                        refreshToken: refresh,
                    }));
                    console.log('Admin login success');

                    return tokenData;
                } else {
                    return { error: { message: 'Invalid admin credentials' } };
                }
            } else {
                throw new Error('Failed to fetch user details');
            }
        }
    } catch (error) {
        console.error('Error logging in:', error.response?.data?.detail || 'unknown error');
        return { error: error };
    }
};


// export const checkVerificationStatus = async () => {
//      const user = JSON.parse(localStorage.getItem('user'));
//      if (!user) return;

//      try {
//         const response = await axios.get(`${baseUrl}/users/user-detail/${user.user_id}/`);
//         if (response.status === 200) {
//             const {is_verified} = response.data;
//             if (user.is_verified !== is_verified) {
//                 const updatedUser = { ...user, is_verified };
//                 localStorage.setItem('user', JSON.stringify(updatedUser));
//                 store.dispatch(setCredentials({
//                     user : updatedUser,
//                     accessToken : JSON.parse(localStorage.getItem('ACCESS_TOKEN')),
//                     refreshToken : JSON.stringify(JSON.parse(localStorage.getItem('REFRESH_TOKEN'))),
//                 }));

//                 if (!is_verified) {
//                     console.log('Your account has been blocked by admin');
//                     store.dispatch(logout());
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error while fetching verificaiton status', error.response?.data || error.message);
        
//     }
// }

const checkVerificationStatus = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
        const response = await axios.get(`${baseUrl}/users/user-detail/${user.user_id}/`);
        if (response.status === 200) {
            const { is_verified } = response.data;

            if (user.is_verified !== is_verified) {
                const updatedUser = { ...user, is_verified };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                store.dispatch(setCredentials({
                    user: updatedUser,
                    accessToken: JSON.parse(localStorage.getItem('ACCESS_TOKEN')),
                    refreshToken: JSON.parse(localStorage.getItem('REFRESH_TOKEN')),
                }));

                // Dispatch setUserBlockedStatus based on verification status
                const isBlocked = (updatedUser.role === 'mentor' || updatedUser.role === 'student') && !is_verified;
                store.dispatch(setUserBlockedStatus(isBlocked));

                if (isBlocked) {
                    console.log('Your account has been blocked by admin');
                    store.dispatch(logout());
                }
            }
        }
    } catch (error) {
        console.error('Error while fetching verification status:', error.response?.data || error.message);
    }
};

export { signUp, login, adminLogin, checkVerificationStatus }