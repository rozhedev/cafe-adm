// ? Need to store cafe menu

"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { StateAction, TDishArr } from "@/types";

export type TDishesContextState = [TDishArr, StateAction<TDishArr>];

export const DishesContext = createContext<TDishesContextState>([[], () => []]);

export const DishesProvider = ({ children }: PropsWithChildren) => {
    const [dishes, setDishes] = useState<TDishArr>([]);

    return <DishesContext.Provider value={[dishes, setDishes]}>{children}</DishesContext.Provider>;
};

export const useDishes = () => {
    const context = useContext(DishesContext);
    if (!context) {
        throw new Error("useDishes must be used within a DishesProvider");
    }
    return context;
};
