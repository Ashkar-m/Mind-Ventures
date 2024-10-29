import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageRedirect = ({ allowedRoles = [], children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Or fetch from context/state
  const userRole = user ? user.role : null;

  useEffect(() => {
    if (!user) {
      // Redirect unauthenticated users based on the required roles
      if (allowedRoles.includes('student')) {
        navigate('/login');
      } else if (allowedRoles.includes('mentor')) {
        navigate('/login');
      } else if (allowedRoles.includes('admin')) {
        navigate('/admin/login');
      }
    } else {
      // Redirect logged-in users based on their role if they don't have access
      if (userRole === 'mentor' && !allowedRoles.includes('mentor')) {
        navigate('/mentor/home');
      } else if (userRole === 'student' && !allowedRoles.includes('student')) {
        navigate('/home');
      } else if (userRole === 'admin' && !allowedRoles.includes('admin')) {
        navigate('/admin/home');
      }
    }
  }, [user, userRole, navigate, allowedRoles]);

  // Render children only if the user's role is allowed
  return allowedRoles.includes(userRole) ? <>{children}</> : null;
};

export default PageRedirect;
