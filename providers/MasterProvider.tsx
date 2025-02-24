"use client";
import React, { PropsWithChildren } from "react";
import { ToastProvider } from "@/components/Toast";
import { ModalProvider } from "@/components/Modal";
import { AuthProvider } from "./AuthProvider";
import { DishesProvider } from "./DishesProvider";
import { BusketProvider } from "./BusketProvider";
import { UsersInfoProvider } from "./UsersInfoProvider";
import { OrdersProvider } from "./OrdersProvider";

export const MasterProvider = ({ children }: PropsWithChildren) => {
    return (
        <ToastProvider>
            <ModalProvider>
                <AuthProvider>
                    <DishesProvider>
                        <OrdersProvider>
                            <UsersInfoProvider>
                                <BusketProvider>{children}</BusketProvider>
                            </UsersInfoProvider>
                        </OrdersProvider>
                    </DishesProvider>
                </AuthProvider>
            </ModalProvider>
        </ToastProvider>
    );
};
