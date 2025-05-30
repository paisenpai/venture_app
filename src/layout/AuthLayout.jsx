import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="auth-layout__header">
                <h1>Welcome to Venture</h1>
                <p>Please log in or register to continue</p>
            </div>
            <div className="auth-layout__content">
                <Outlet />
            </div>
            <div className="auth-layout__footer">
                <p>&copy; {new Date().getFullYear()} Venture. All rights reserved.</p>
            </div>
        </div>
    );
};

export default AuthLayout;