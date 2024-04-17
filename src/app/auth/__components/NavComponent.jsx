"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const NavComponent = ({userData}) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('typeToken');
        localStorage.removeItem('userData');
        router.push('/auth/login');
    }
    return (
        <nav className="flex items-center justify-between h-16 bg-gray-800 text-white px-4">
            <div className="flex items-center">
                <h1 className="text-xl font-bold mr-4">Bienvenido</h1>
            </div>
            <div className="flex items-center space-x-4">
                <p className="text-base font-medium">{userData.name}</p>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default NavComponent;