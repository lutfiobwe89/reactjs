import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [dataProfile, setDataProfile] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setDataProfile(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const navigate = useNavigate();

    function handleLogout() {
        axios.get('http://localhost:8000/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            localStorage.removeItem('access_token');
            navigate('/login');
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center p-6">
                        <div className="flex items-center w-full">
                            <div className="relative w-24 h-24 overflow-hidden bg-white-100 rounded dark:bg-gray-600" style={{ borderRadius: '0.375rem' }}>
                                <svg className="absolute w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div className="ml-4 p-4 bg-white border border-white-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 flex-grow">
                                <h5 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">{dataProfile.username}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{dataProfile.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-white justify-between w-full px-6 py-4 bg-white-100 border-t border-white-200 rounded-b-lg bg-white-700 dark:border-white-600 ">
                        <a href="#" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-cream-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">Dashboard</a>
                        <button onClick={handleLogout} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-cream-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
}
