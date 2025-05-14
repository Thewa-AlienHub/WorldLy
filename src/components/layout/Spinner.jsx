// src/components/layout/Spinner.jsx
import React, { useEffect, useState } from "react";

const Spinner = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-transparent bg-opacity-10 backdrop-blur-sm z-100">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute h-40 w-40 rounded-full border-4 border-blue-400 opacity-50 animate-ping"></div>

        {/* Rotating globe */}
        <div className="relative h-32 w-32">
          {/* World map SVG */}
          <svg
            className="absolute inset-0"
            viewBox="0 0 100 100"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />

            {/* "Latitude" circles */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="18"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="0.5"
            />

            {/* "Longitude" lines */}
            <line
              x1="2"
              y1="50"
              x2="98"
              y2="50"
              stroke="#3B82F6"
              strokeWidth="0.5"
            />
            <line
              x1="50"
              y1="2"
              x2="50"
              y2="98"
              stroke="#3B82F6"
              strokeWidth="0.5"
            />
            <line
              x1="14.5"
              y1="14.5"
              x2="85.5"
              y2="85.5"
              stroke="#3B82F6"
              strokeWidth="0.5"
            />
            <line
              x1="14.5"
              y1="85.5"
              x2="85.5"
              y2="14.5"
              stroke="#3B82F6"
              strokeWidth="0.5"
            />

            {/* Continents (simplified) */}
            <path
              d="M60,30 Q40,20 50,25 T70,30 Q75,40 70,50 T50,60 Q40,65 30,50 T30,30"
              fill="#60A5FA"
              opacity="0.6"
            />
            <path
              d="M55,40 Q65,45 70,50 T65,65 Q55,70 50,65 T55,40"
              fill="#60A5FA"
              opacity="0.6"
            />
          </svg>

          {/* Inner sphere gradient effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-900 opacity-10"></div>

          {/* Orbital ring */}
          <div
            className="absolute inset-0 rounded-full border border-blue-300 opacity-50"
            style={{ transform: `rotateX(75deg)` }}
          ></div>
        </div>
      </div>

      {/* Loading text with animated dots */}
      <div className="mt-8 text-blue-500 font-medium tracking-widest">
        <span className="inline-flex items-center">
          <span className="text-lg">Loading Wordly</span>
          <span className="ml-1 flex space-x-1">
            <span
              className="h-2.5 w-1.5 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="h-2.5 w-1.5 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: "200ms" }}
            ></span>
            <span
              className="h-2.5 w-1.5 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: "400ms" }}
            ></span>
            <span
              className="h-2.5 w-1.5 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: "600ms" }}
            ></span>
            <span
              className="h-2.5 w-1.5 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: "800ms" }}
            ></span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Spinner;