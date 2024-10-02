import axios from 'axios';
import { setCredentials } from '../../features/authReducer'
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
        
        localStorage.setItem('ACCESS_TOKEN', JSON.stringify(data.access));
        localStorage.setItem('REFRESH_TOKEN', JSON.stringify(data.refresh));
        localStorage.setItem('user', JSON.stringify({
            user_id : tokenData.user_id,
            email : tokenData.email,
            role : tokenData.role
        }));
        store.dispatch(setCredentials({
            user : {
                user_id : tokenData.user_id,
                email : tokenData.email,
                role : tokenData.role
            },
            accessToken : access,
            refreshToken : refresh,
        }));
        console.log('Login success');
        
        return tokenData;
    }
    } catch (error) {
        console.error ('Error loging in ', error);
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

export {signUp,login}