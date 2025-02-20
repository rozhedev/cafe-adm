// ? Need to store full list of orders

"use client";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { StateAction, TOrderArr } from "@/types";
import { ROUTES } from "@/data";
import { formatOrders } from "@/helpers";

export type TOrdersContextState = [TOrderArr, StateAction<TOrderArr>, () => Promise<void>];

export const OrdersContext = createContext<TOrdersContextState>([[], () => [], async () => {}]);

export const OrdersProvider = ({ children }: PropsWithChildren) => {
    const [orders, setOrders] = useState<TOrderArr>([]);

    const refreshOrders = useCallback(async () => {
        try {
            const res = await fetch(ROUTES.getAllOrders, {
                method: "GET",
                next: { revalidate: 0 },
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error(`HTTP error, status: ${res.status}`);
            }

            const data = await res.json();
            setOrders(() => formatOrders(data));
        } catch (error) {
            console.error("Get orders list error", error);
        }
    }, []);

    useEffect(() => {
        refreshOrders();
    }, [refreshOrders]);

    return <OrdersContext.Provider value={[orders, setOrders, refreshOrders]}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error("useOrders must be used within a AdmOrdersProvider");
    }
    return context;
};
