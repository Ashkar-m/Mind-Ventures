import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import profileReducer from "../features/profileReducer";

const store = configureStore({
    reducer : {
        auth : authReducer,
        profile : profileReducer,
    }
})

export default store;