// ? Need to store orders added to cart (status - ordered)

"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { StateAction, TOrderArr } from "@/types";

export type TBusketContextState = [TOrderArr, StateAction<TOrderArr>];

export const BusketContext = createContext<TBusketContextState>([[], () => null]);

export const BusketProvider = ({ children }: PropsWithChildren) => {
    const [Busket, setBusket] = useState<TOrderArr>([]);

    return <BusketContext.Provider value={[Busket, setBusket]}>{children}</BusketContext.Provider>;
};

export const useBusket = () => {
    const context = useContext(BusketContext);
    if (!context) {
        throw new Error("useBusket must be used within a BusketContext");
    }
    return context;
};
