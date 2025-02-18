"use client";
import React, { useEffect, useState } from "react";
import { BooleanValObjMap, TDish } from "@/types";
import { useDishes } from "@/providers";
import { fetchDataByRoute } from "@/helpers";
import { MENU_MODALS_INIT, OrderStatuses, ROUTES, UI_CONTENT } from "@/data";
import { MenuItem } from "@/components/MenuItem";
import { ModalWithFooter } from "@/ui";
import { useToast } from "@/components/Toast";
import { useSession } from "next-auth/react";

// * Default page - Cafe Menu
export default function CafeMenu() {
    const { data: session } = useSession();
    const userid = session?.user?.id;
    const { addToast } = useToast();

    const [dishes, setDishes] = useDishes();
    const [orderedProduct, setOrderedProduct] = useState<TDish | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(MENU_MODALS_INIT);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddOrder = async () => {
        try {
            setIsLoading(true);
            if (orderedProduct === null) return console.log("Dish not added");

            const res = await fetch(ROUTES.addOrder, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dish: orderedProduct.dish,
                    quantity: 1,
                    price: orderedProduct.price,
                    status: OrderStatuses.ordered,
                    user: userid,
                    createdAt: Date.now(),
                }),
            });

            if (res.ok) {
                addToast(UI_CONTENT.success.order.added, "success");
                setIsModalOpen(MENU_MODALS_INIT);
                return;
            }
        } catch (error) {
            console.error("Error when adding order:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleAddToCart = (dish: TDish) => {
        setIsModalOpen({ ...isModalOpen, add: true });
        setOrderedProduct(dish);
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
            <div className="flex gap-5">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {dishes &&
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
            <ModalWithFooter
                title={UI_CONTENT.confirmAction.buy}
                onClose={() => setIsModalOpen({ ...isModalOpen, add: false })}
                isOpen={isModalOpen.add}
                actionLabel={isLoading ? UI_CONTENT.btn.confirm.loading : UI_CONTENT.btn.confirm.default}
                actionBtnClassname="btn--primary-blue"
                onAction={handleAddOrder}
            >
                <div className="my-4">{UI_CONTENT.confirmActionDescr.buy}</div>
            </ModalWithFooter>
        </div>
    );
}
