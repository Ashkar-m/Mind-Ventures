import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import profileReducer from "../features/profileReducer";
import toastReducer from "../features/toastReducer";
import userStatusReducer from "../features/userStatusReducer";

const store = configureStore({
    reducer : {
        auth : authReducer,
        profile : profileReducer,
        toast : toastReducer,
        userStatus: userStatusReducer,
    }
})

export default store;