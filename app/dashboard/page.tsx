"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BooleanValObjMap, StringValObjMap, TDish } from "@/types";
import { useBusket, useDishes } from "@/providers";
import { fetchDataByRoute } from "@/helpers";
import { MENU_MODALS_INIT, NEXT_REVALIDATE_INTERVAL, OrderStatuses, ROUTES, UI_CONTENT } from "@/data";
import { FormController, ModalWithoutFooter } from "@/ui";
import { useToast } from "@/components/Toast";
import { MenuItem } from "@/components/MenuItem";

// * Default page - Cafe Menu
export default function CafeMenu() {
    const { data: session } = useSession();
    const userid = session?.user?.id;
    const { addToast } = useToast();
    const { refreshCart } = useBusket();

    const [dishes, setDishes, refreshDishes] = useDishes();
    const [orderedProduct, setOrderedProduct] = useState<TDish | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(MENU_MODALS_INIT);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<StringValObjMap>({
        address: "",
    });

    const handleAddOrder = async (e: FormEvent) => {
        e.preventDefault();
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
                    address: formData.address,
                    createdAt: Date.now(),
                }),
            });

            if (res.ok) {
                addToast(UI_CONTENT.success.order.added, "success");
                setIsModalOpen(MENU_MODALS_INIT);
                refreshCart();
                await refreshDishes();
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
                next: { revalidate: NEXT_REVALIDATE_INTERVAL },
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
            <ModalWithoutFooter
                title={UI_CONTENT.confirmAction.buy}
                onClose={() => setIsModalOpen({ ...isModalOpen, add: false })}
                isOpen={isModalOpen.add}
            >
                <div className="my-4">
                    <h3>
                        {UI_CONTENT.confirmActionDescr.buy} {UI_CONTENT.confirmActionDescr.addressNotice}
                    </h3>
                    <form
                        onSubmit={handleAddOrder}
                        className="flex flex-col items-center mt-3 gap-4"
                    >
                        <FormController
                            wrapperClass="w-full"
                            className="w-full"
                            htmlLabel=""
                            id="address"
                            name="address"
                            type="text"
                            required
                            placeholder="ул. Ростиславская 15..."
                            minLength={10}
                            aria-label="Адрес"
                            value={formData.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
                        />
                        <div className="w-full flex justify-around gap-4">
                            <button
                                type="button"
                                className="flex-1 btn--sm !text-gray-800 font-medium border-2 bg-slate-100 border-blue-800 hover:border-blue-600"
                                onClick={() => setIsModalOpen({ ...isModalOpen, add: false })}
                            >
                                Закрыть
                            </button>
                            <button
                                type="submit"
                                className="flex-1 btn--sm btn--primary-blue"
                                disabled={isLoading}
                            >
                                {isLoading ? UI_CONTENT.btn.confirm.loading : UI_CONTENT.btn.confirm.default}
                            </button>
                        </div>
                    </form>
                </div>
            </ModalWithoutFooter>
        </div>
    );
}
