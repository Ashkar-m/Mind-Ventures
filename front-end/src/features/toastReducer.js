import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name : 'toast',
    initialState : {
        messages : [],
    },
    reducers : {
        addToast : (state, action) => {
            state.messages.push(action.payload)
        },
        removeToast : (state, action) => {
            state.messages = state.messages.filter((_, index) => index !== action.payload);
        },
        clearToasts : (state) => {
            state.messages = [];
        },
    },
})

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;