import api from "../../utils/api";
import { setProfile } from '../../features/profileReducer'
import store from "../../store/store";

const baseURL = 'http://127.0.0.1:8000/'

const getProfile = async () => {
    try {
        const response = await api.get('/api/profile/');
        if (response.status === 200) {
            const data = response.data;
            localStorage.setItem('profile', JSON.stringify(data))

            store.dispatch(setProfile({
                username : data.username,
                fullname : data.fullname,
                email : data.email,
                image : data.image,
                bio : data.bio,
            }));
            return true
        }
    }catch (error) {
        console.log('Error fetching profile');
        throw error;
    }
}

export { getProfile }