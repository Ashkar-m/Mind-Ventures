import axios from 'axios';
import { setCredentials } from '../../features/authReducer'
import store from '../../store/store';

const baseUrl='http://127.0.0.1:8000';

const login = async (email,password) => {
    try {
        const response = await axios.post(`${baseUrl}/users/token/`,{
            email,password
        });

        if (response.status === 200) {
            const data = response.data
            const { access, refresh } = data;
        
        const tokenData = JSON.parse(atob(access.split('.')[1]));

        console.log('tokenDataValue',tokenData.user_id);
        
        
        localStorage.setItem('ACCESS_TOKEN', JSON.stringify(data.access));
        localStorage.setItem('REFRESH_TOKEN', JSON.stringify(data.refresh));
        localStorage.setItem('user', JSON.stringify({
            user_id : tokenData.user_id
        }));
        store.dispatch(setCredentials({
            user : {
                user_id : tokenData.user_id
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
            window.alert('User registered successfully');
        } else {
            console.error('Error occured while registering');
        }
    } catch (error) {
        if (error.response) {
            let messages = []
            const errorData = error.response.data;
            if (errorData.email) {
                window.alert(errorData.email.join(', '));
            } else if (errorData.username) {
                window.alert(errorData.username.join(', '));
            } else if (errorData.password) {
                window.alert(errorData.password.join(', '));
            } else {
                window.alert('Error response: ' + JSON.stringify(errorData));
            }
        } else if (error.request) {
            window.alert('Error request: ' + error.request);
        } else {
            window.alert('Error: ' + error.message);
        }
        throw error;
    }
};

export {signUp,login}