// ? Need to store orders added to cart (status - ordered)

"use client";
import { createContext, PropsWithChildren, useState } from "react";
import { StateAction, TOrderArr } from "@/types";

export type TPurchaseContextState = [TOrderArr, StateAction<TOrderArr>];
type TPurchaseContext = TPurchaseContextState | undefined;

export const PurchaseContext = createContext<TPurchaseContext>([[], () => null]);

export const PurchaseProvider = ({ children }: PropsWithChildren) => {
    const [purchase, setPurchase] = useState<TOrderArr>([]);

    return <PurchaseContext.Provider value={[purchase, setPurchase]}>{children}</PurchaseContext.Provider>;
};
