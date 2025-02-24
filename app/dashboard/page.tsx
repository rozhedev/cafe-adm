"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { TDish } from "@/types";
import { useBusket, useDishes } from "@/providers";
import { OrderStatuses, ROUTES, UI_CONTENT } from "@/data";
import { useToast } from "@/components/Toast";
import { MenuItem } from "@/components/MenuItem";

// * Default page - Cafe Menu
export default function CafeMenu() {
    const { data: session } = useSession();
    const userid = session?.user?.id;
    const { addToast } = useToast();
    const { refreshCart } = useBusket();

    const [dishes, , refreshDishes] = useDishes();

    const handleAddOrder = async (item: TDish) => {
        try {
            addToast("Добавление заказа...", "info");

            const res = await fetch(ROUTES.addOrder, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dish: item.dish,
                    quantity: 1,
                    price: item.price,
                    status: OrderStatuses.ordered,
                    user: userid,
                    address: UI_CONTENT.err.cart.unknownAddress,
                    createdAt: Date.now(),
                }),
            });

            if (res.ok) {
                addToast(UI_CONTENT.success.order.added, "success");
                refreshCart();
                refreshDishes();
                return;
            }
        } catch (error) {
            console.error("Error when adding order:", error);
        }
    };
    const handleAddToCart = (dish: TDish) => {
        handleAddOrder(dish);
    };

    return (
        <div className="w-full">
            <div className="flex gap-5">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {dishes.length > 0 &&
                            dishes.map((dish) => (
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
