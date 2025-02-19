// ? Need to store cafe menu

"use client";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { StateAction, TDishArr } from "@/types";
import { ROUTES } from "@/data";

export type TDishesContextState = [TDishArr, StateAction<TDishArr>, () => Promise<void>];

export const DishesContext = createContext<TDishesContextState>([[], () => [], async () => {}]);

export const DishesProvider = ({ children }: PropsWithChildren) => {
    const [dishes, setDishes] = useState<TDishArr>([]);

    const refreshDishes = useCallback(async () => {
        try {
            const res = await fetch(ROUTES.getAllDish, {
                method: "GET",
                next: { revalidate: 0 },
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error(`HTTP error, status: ${res.status}`);
            }

            const data = await res.json();
            setDishes(data);
        } catch (error) {
            console.error("Get dish list error:", error);
        }
    }, []);

    useEffect(() => {
        refreshDishes();
    }, [refreshDishes]);

    return <DishesContext.Provider value={[dishes, setDishes, refreshDishes]}>{children}</DishesContext.Provider>;
};

export const useDishes = () => {
    const context = useContext(DishesContext);
    if (!context) {
        throw new Error("useDishes must be used within a DishesProvider");
    }
    return context;
};
