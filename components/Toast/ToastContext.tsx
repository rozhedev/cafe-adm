"use client";
import React, { createContext, useState, useCallback, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { ToastProps, ToastPropsContextType } from "./types";

const ToastContext = createContext<ToastPropsContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = useCallback((message: string, type: ToastProps["type"] = "success") => {
        const id = uuidv4();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Automatically delete after 4 seconds
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`form-elem-size border-2 rounded-lg shadow-md p-3 ${
                            toast.type === "error"
                                ? "border-red-300 bg-red-200 text-red-800"
                                : toast.type === "info"
                                ? "border-blue-300 bg-blue-200 text-blue-800"
                                : "border-green-300 bg-green-200 text-green-800"
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span>{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="ml-4 p-1 hover:bg-opacity-20 hover:bg-black rounded-full"
                            >
                                <IoMdClose size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

// --> Hook
export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
