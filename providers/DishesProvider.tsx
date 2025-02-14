// ? Need to store cafe menu

"use client";
import { createContext, PropsWithChildren, useState } from "react";
import { StateAction, TDishArr } from "@/types";

export type TDishesContextState = [TDishArr, StateAction<TDishArr>];
type TDishesContext = TDishesContextState | undefined;

export const DishesContext = createContext<TDishesContext>([[], () => []]);

export const DishesProvider = ({ children }: PropsWithChildren) => {
    const [dishes, setDishes] = useState<TDishArr>([]);

    return <DishesContext.Provider value={[dishes, setDishes]}>{children}</DishesContext.Provider>;
};
