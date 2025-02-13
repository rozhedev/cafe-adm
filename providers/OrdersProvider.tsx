"use client"
import { createContext, PropsWithChildren, useState } from "react";
import { StateAction, TOrderArr } from "@/types";

// --> Admin
export type TOrdersContextState = [TOrderArr, StateAction<TOrderArr>];
type TOrdersContext = TOrdersContextState | undefined;

export const AdmOrdersContext = createContext<TOrdersContext>(undefined);

export const AdmOrdersProvider = ({ children }: PropsWithChildren) => {
    const [admOrders, setAdmOrders] = useState<TOrderArr>([]);

    return <AdmOrdersContext.Provider value={[admOrders, setAdmOrders]}>{children}</AdmOrdersContext.Provider>;
};

// --> User
export const UserOrdersContext = createContext<TOrdersContext>(undefined);

export const UserOrdersProvider = ({ children }: PropsWithChildren) => {
    const [userOrders, setUserOrders] = useState<TOrderArr>([]);

    return <UserOrdersContext.Provider value={[userOrders, setUserOrders]}>{children}</UserOrdersContext.Provider>;
};
