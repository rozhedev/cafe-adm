// ? Need to store orders added to cart (status - ordered)

"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { StateAction, TOrderArr } from "@/types";

export type TPurchaseContextState = [TOrderArr, StateAction<TOrderArr>];

export const PurchaseContext = createContext<TPurchaseContextState>([[], () => null]);

export const PurchaseProvider = ({ children }: PropsWithChildren) => {
    const [purchase, setPurchase] = useState<TOrderArr>([]);

    return <PurchaseContext.Provider value={[purchase, setPurchase]}>{children}</PurchaseContext.Provider>;
};

export const usePurchase = () => {
    const context = useContext(PurchaseContext);
    if (!context) {
        throw new Error("usePurchase must be used within a PurchaseContext");
    }
    return context;
};
