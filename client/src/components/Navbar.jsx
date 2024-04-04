import React, { useEffect, useState } from 'react';
const SERVER_BASE_URL = "http://localhost:3000";
import axios from 'axios';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userExit, setUserExit] = useState(false);
    const [userName, setUserName] = useState('');

    const fetchUserInfo = async () => {
        try {
            const { data } = await axios.get(`${SERVER_BASE_URL}/userinfo`, {headers : {
                'authorization': localStorage.getItem('token')
            }});
            setUserExit(true);
            setUserName(data.name);
        } catch (error) {
            setUserExit(false);
            console.error("User not loged in");
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [userExit]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => window.location.href = '/'}
            >
                <img className="h-8 w-8" src="/logo.png" alt="Company Logo" />
                <span className="text-white text-lg font-bold">MarketPlace</span>
            </div>
            {userExit && (
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 text-white focus:outline-none"
                        >
                            <img
                                className="h-8 w-8 rounded-full"
                                src="/userIcon.png"
                                alt="User Icon"
                            />
                            <span>{userName}</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                <ul className="py-2">
                                    <li>
                                        <button
                                            onClick={() => window.location.href = '/cart'}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                        >
                                            Show Cart
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                        className="block px-4 py-2 text-red-800 hover:bg-gray-200 w-full text-left"
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            window.location.reload();
                                        }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!userExit && (
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => window.location.href = '/signup'}
                        className="text-white hover:underline"
                    >
                        Signup
                    </button>
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="text-white hover:underline"
                    >
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
