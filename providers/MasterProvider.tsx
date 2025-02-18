"use client";
import React, { PropsWithChildren } from "react";
import { ToastProvider } from "@/components/Toast";
import { AuthProvider } from "./AuthProvider";
import { DishesProvider } from "./DishesProvider";
import { BusketProvider } from "./BusketProvider";

export const MasterProvider = ({ children }: PropsWithChildren) => {
    return (
        <ToastProvider>
            <AuthProvider>
                <DishesProvider>
                    <BusketProvider>{children}</BusketProvider>
                </DishesProvider>
            </AuthProvider>
        </ToastProvider>
    );
};
