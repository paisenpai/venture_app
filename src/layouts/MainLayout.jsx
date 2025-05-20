import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen w-full bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            {/* Add left margin to avoid content being hidden behind fixed sidebar */}
            <div className="flex-1 ml-[7rem] md:ml-[20rem] p-6 min-h-screen w-full">
                {/* Navbar */}
                <header
                    style={{
                        height: '4rem', // 64px
                        backgroundColor: '#34495e',
                        color: '#ecf0f1',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 1.25rem', // 20px
                        width: '100%',
                    }}
                >
                    <h1>Dashboard</h1>
                </header>

                {/* Page Content */}
                <main
                    style={{
                        flex: 1,
                        padding: '1.25rem', // 20px
                        backgroundColor: '#ecf0f1',
                        minHeight: 'calc(100vh - 4rem)',
                        width: '100%',
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;