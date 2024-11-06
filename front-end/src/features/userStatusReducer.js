import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isBlocked: false,
};


const userStatusReducer = createSlice({
    name: 'userStatus',
    initialState,
    reducers: {
        setUserBlockedStatus: (status, action) => {
            state.isBlocked = action.payload;
        },
        initializeUserStatus: (state) => {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            
            if (user) {
                const isBlocked = 
                    (user.role === 'mentor' || user.role === 'student') && !user.is_verified;
                    state.isBlocked = isBlocked;
                }
        }
    },
})

export const { setUserBlockedStatus, initializeUserStatus } = userStatusReducer.actions;
export default userStatusReducer.reducer;
