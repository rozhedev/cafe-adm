// ? Need to store full list of orders (separate client & admin context for prevent unwished state changees)

"use client"
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { StateAction, TOrderArr } from "@/types";

// --> Admin
export type TOrdersContextState = [TOrderArr, StateAction<TOrderArr>];

export const AdmOrdersContext = createContext<TOrdersContextState>([[], () => []]);

export const AdmOrdersProvider = ({ children }: PropsWithChildren) => {
    const [admOrders, setAdmOrders] = useState<TOrderArr>([]);

    return <AdmOrdersContext.Provider value={[admOrders, setAdmOrders]}>{children}</AdmOrdersContext.Provider>;
};

export const useAdmOrders = () => {
    const context = useContext(AdmOrdersContext);
    if (!context) {
        throw new Error("useAdmOrders must be used within a AdmOrdersProvider");
    }
    return context;
};

// --> User
export const UserOrdersContext = createContext<TOrdersContextState>([[], () => []]);

export const UserOrdersProvider = ({ children }: PropsWithChildren) => {
    const [userOrders, setUserOrders] = useState<TOrderArr>([]);

    return <UserOrdersContext.Provider value={[userOrders, setUserOrders]}>{children}</UserOrdersContext.Provider>;
};

export const useUserOrders = () => {
    const context = useContext(UserOrdersContext);
    if (!context) {
        throw new Error("useUserOrders must be used within a UserOrdersProvider");
    }
    return context;
};