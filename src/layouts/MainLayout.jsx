import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '20px' }}>
                <h2>Sidebar</h2>
                <ul>
                    <li>Dashboard</li>
                    <li>Settings</li>
                    <li>Profile</li>
                </ul>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Navbar */}
                <header style={{ height: '60px', backgroundColor: '#34495e', color: '#ecf0f1', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
                    <h1>Dashboard</h1>
                </header>

                {/* Page Content */}
                <main style={{ flex: 1, padding: '20px', backgroundColor: '#ecf0f1' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;