import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-[#ECEFCA] dark:bg-[#213448] p-5 sm:p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
                <h2 className="text-lg sm:text-xl font-semibold text-[#213448] dark:text-[#ECEFCA] mb-3 sm:mb-4">
                    Login Required
                </h2>
                <p className="text-sm sm:text-base text-[#547792] dark:text-[#94B4C1] mb-5 sm:mb-6">
                    You need to log in to add this country to your favorites.
                </p>
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-[#547792] hover:bg-[#213448] text-[#ECEFCA] px-4 py-2 rounded-md order-2 sm:order-1"
                    >
                        Login
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-[#94B4C1] dark:bg-[#213448] hover:bg-[#547792] text-[#213448] dark:text-[#ECEFCA] dark:hover:bg-[#547792] px-4 py-2 rounded-md order-1 sm:order-2"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPromptModal;