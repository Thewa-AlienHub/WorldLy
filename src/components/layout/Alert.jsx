// src/components/layout/Alert.jsx
import React from 'react';

const Alert = ({ alert }) => {
    if (!alert) return null;

    const { msg, type } = alert;
    const alertClass = type === 'danger' ? 'bg-red-500' : 'bg-green-500';

    return (
        <div className={`${alertClass} text-white p-3 mb-4 text-center`}>
            <p>{msg}</p>
        </div>
    );
};

export default Alert;