import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageRedirect = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Or fetch from context/state
  const userRole = user ? user.role : null;

  useEffect(() => {
    if (userRole) {
      // Redirect based on user role
      if (userRole === 'mentor' && !allowedRoles.includes('mentor')) {
        navigate('/mentor/home');
      } else if (userRole === 'student' && !allowedRoles.includes('student')) {
        navigate('/home');
      } else if (userRole === 'admin' && !allowedRoles.includes('admin')) {
        navigate('/admin/home');
      }
    }
  }, [userRole, navigate, allowedRoles]);

  // If the user's role is allowed to access the children, render them
  return <>{allowedRoles.includes(userRole) ? children : null}</>;
};

export default PageRedirect;
