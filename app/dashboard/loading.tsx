import React from "react";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <svg
                className="w-16 h-16 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="none"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e0e0e0"
                    strokeWidth="8"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#2563EB"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
