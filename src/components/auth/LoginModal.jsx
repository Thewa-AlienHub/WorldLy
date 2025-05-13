import React from "react";
import { useNavigate } from "react-router-dom";

const colors = {
  darkTeal: "#053742",
  blue: "#39A2DB",
  lightBlue: "#A2DBFA",
  paleBlue: "#E8F0F2",
};

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onClose(); // Close the modal first
    navigate("/login"); // Then navigate to login screen
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl border-t-4"
        style={{ borderColor: colors.blue }}
      >
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: colors.darkTeal }}
        >
          Login Required
        </h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in to add countries to your favorites list.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border text-sm font-medium transition duration-200"
            style={{ borderColor: colors.blue, color: colors.blue }}
          >
            Cancel
          </button>
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 rounded-full text-white text-sm font-medium transition duration-200"
            style={{ backgroundColor: colors.blue }}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
