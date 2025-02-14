"use client";
import React, { useContext, useEffect } from "react";
import { TDish } from "@/types";
import { MenuItem } from "@/components/MenuItem";
import { fetchDataByRoute } from "@/helpers";
import { ROUTES } from "@/data";
import { DishesContext, TDishesContextState } from "@/providers";

// * Default page - Cafe Menu
export default function CafeMenu() {
    const [dishes, setDishes] = useContext(DishesContext) as TDishesContextState;

    const handleAddToCart = (dish: TDish) => {
        console.log("Добавлено в корзину:", dish);
    };

    useEffect(() => {
        fetchDataByRoute(
            ROUTES.getAllDish,
            {
                method: "GET",
                next: { revalidate: 1200 }, 
            },
            setDishes
        );
    }, []);

    return (
        <div className="w-full">
            <div className="form-elem-size flex gap-5">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {dishes && dishes.map((dish) => (
                            <MenuItem
                                key={dish._id?.toString()}
                                item={dish}
                                isAuthenticated={true}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
