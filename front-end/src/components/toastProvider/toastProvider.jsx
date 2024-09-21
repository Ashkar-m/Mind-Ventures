import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "../../utils/validation/Toast";
import { removeToast } from "../../features/toastReducer";

const ToastProvider = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.toast.messages);

    const handleToastclose = (index) => {
        dispatch(removeToast(index));
    };

    return (
        <div className="toast-container">
            { messages.map((toast, index) => (
                <Toast key={index} type={toast.type} message={toast.message} onClose={handleToastclose(index)} />
            ))}
        </div>
    );
};

export default ToastProvider;