"use client";
import { createContext, PropsWithChildren, useState } from "react";
import { StateAction, TDishArr } from "@/types";

export type TDishesContextState = [TDishArr, StateAction<TDishArr>];
type TDishesContext = TDishesContextState | undefined;

export const DishesContext = createContext<TDishesContext>(undefined);

export const DishesProvider = ({ children }: PropsWithChildren) => {
    const [dishes, setDishes] = useState<TDishArr>([]);

    return <DishesContext.Provider value={[dishes, setDishes]}>{children}</DishesContext.Provider>;
};
