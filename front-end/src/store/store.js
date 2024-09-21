import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import profileReducer from "../features/profileReducer";
import toastReducer from "../features/toastReducer";

const store = configureStore({
    reducer : {
        auth : authReducer,
        profile : profileReducer,
        toast : toastReducer,
    }
})

export default store;