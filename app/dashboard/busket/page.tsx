"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useBusket, useDishes } from "@/providers";
import { useSession } from "next-auth/react";
import { StringValObjMap, TDish } from "@/types";
import { ModalIds, UI_CONTENT } from "@/data";
import { ConfirmOrderModal, useModal } from "@/components/Modal";

export default function Busket() {
    const [, , refreshDishes] = useDishes();
    const { data: session } = useSession();
    const userBalance = session?.user?.balance || 0;

    const { openModal: openConfirmOrder } = useModal(ModalIds.confirmOrder);
    const { items, removeItem, totalPrice, checkout, isLoading } = useBusket();
    const [formData, setFormData] = useState<StringValObjMap>({
        address: "",
    });

    const handleDelete = (item: TDish) => {
        removeItem(item._id?.toString() as string);
        refreshDishes();
    };

    const handleCheckout = () => {
        openConfirmOrder();
    };
    const handleConfirm = (e: FormEvent) => {
        e.preventDefault();
        checkout(formData);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Корзина</h1>
            {items.length > 0 ? (
                <>
                    <div className="bg-white rounded-lg shadow-md mb-6">
                        {items.map((item: TDish) => (
                            <div
                                key={item._id?.toString()}
                                className="border-b last:border-b-0 p-4 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-semibold">{item.dish}</h3>
                                    <p className="text-gray-600 text-sm">{item.price} грн.</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={isLoading}
                                >
                                    {UI_CONTENT.btn.delete.default}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg">Итого:</span>
                            <span className="text-xl font-bold">{totalPrice.toFixed(2)} грн.</span>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg">Ваш баланс:</span>
                            <span className={`text-lg font-semibold ${userBalance < totalPrice ? "text-red-500" : "text-green-500"}`}>{userBalance.toFixed(2)} грн.</span>
                        </div>

                        {userBalance < totalPrice && <div className="text-red-500 mb-4">Недостаточно средств на балансе</div>}
                        <div className="flex justify-center">
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading || userBalance < totalPrice}
                                className={`${isLoading || userBalance < totalPrice ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white px-6 py-3 rounded-md transition-colors duration-200`}
                            >
                                {isLoading ? UI_CONTENT.btn.checkout.loading : UI_CONTENT.btn.checkout.default}
                            </button>
                        </div>
                    </div>

                    {/* // * Modal */}
                    <ConfirmOrderModal
                        title={UI_CONTENT.confirmAction.buy}
                        confirmDescr={UI_CONTENT.confirmActionDescr.addressNotice}
                        label={isLoading ? UI_CONTENT.btn.confirm.loading : UI_CONTENT.btn.confirm.default}
                        inpVal={formData.address}
                        onSubmit={handleConfirm}
                        onInpChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
                        isLoading={isLoading}
                    />
                </>
            ) : (
                <div className="text-center text-gray-500">Корзина пуста</div>
            )}
        </div>
    );
}
