import React from "react";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'; // <-- use the hook

const Settings = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, updateUser } = useAuth(); // <-- use the hook

    const handleSubmit = (e) => {
        e.preventDefault();
        // Example: Update user logic
        const updatedUser = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        updateUser(updatedUser);
        alert('Settings updated successfully!');
    };

    return (
        <div style={{ padding: '20px', backgroundColor: theme.background, color: theme.color }}>
            <h1>Settings</h1>
            <p>Manage your application settings here.</p>
            <div style={{ marginTop: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={user.username}
                            placeholder="Enter your username"
                            style={{ padding: '8px', width: '100%' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={user.email}
                            placeholder="Enter your email"
                            style={{ padding: '8px', width: '100%' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            style={{ padding: '8px', width: '100%' }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    >
                        Save Changes
                    </button>
                </form>
                <button
                    onClick={toggleTheme}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#28A745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    Toggle Theme
                </button>
            </div>
        </div>
    );
};

export default Settings;