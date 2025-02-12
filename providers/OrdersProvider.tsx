"use client"
import { createContext, PropsWithChildren, useState } from "react";
import { StateAction, TOrderArr } from "@/types";

// --> Admin
export type TAdmOrdersContextState = [TOrderArr, StateAction<TOrderArr>];
type TAdmOrdersContext = TAdmOrdersContextState | undefined;

export const AdmOrdersContext = createContext<TAdmOrdersContext>(undefined);

export const AdmOrdersProvider = ({ children }: PropsWithChildren) => {
    const [admOrders, setAdmOrders] = useState<TOrderArr>([]);

    return <AdmOrdersContext.Provider value={[admOrders, setAdmOrders]}>{children}</AdmOrdersContext.Provider>;
};

// --> User
export type TUserOrdersContextState = [TOrderArr, StateAction<TOrderArr>];
type TUserOrdersContext = TUserOrdersContextState | undefined;

export const UserOrdersContext = createContext<TUserOrdersContext>(undefined);

export const UserOrdersProvider = ({ children }: PropsWithChildren) => {
    const [userOrders, setUserOrders] = useState<TOrderArr>([]);

    return <UserOrdersContext.Provider value={[userOrders, setUserOrders]}>{children}</UserOrdersContext.Provider>;
};
