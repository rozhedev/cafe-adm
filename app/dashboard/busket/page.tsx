"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useBusket, useDishes } from "@/providers";
import { useSession } from "next-auth/react";
import { BooleanValObjMap, StringValObjMap, TDish } from "@/types";
import { BUSKET_MODALS_INIT, UI_CONTENT } from "@/data";
import { FormController, ModalWithoutFooter } from "@/ui";

export default function Busket() {
    const [, , refreshDishes] = useDishes();
    const { data: session } = useSession();
    const { items, removeItem, totalPrice, checkout, isLoading } = useBusket();
    const userBalance = session?.user?.balance || 0;

    const handleDelete = (item: TDish) => {
        removeItem(item._id?.toString() as string);
        refreshDishes();
    };

    const [formData, setFormData] = useState<StringValObjMap>({
        address: "",
    });
    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(BUSKET_MODALS_INIT);

    const handleCheckout = () => {
        setIsModalOpen({ ...BUSKET_MODALS_INIT, confirm: true });
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
                                className={`${
                                    isLoading || userBalance < totalPrice ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                                } text-white px-6 py-3 rounded-md transition-colors duration-200`}
                            >
                                {isLoading ? UI_CONTENT.btn.checkout.loading : UI_CONTENT.btn.checkout.default}
                            </button>
                        </div>
                    </div>
                    <ModalWithoutFooter
                        title={UI_CONTENT.confirmAction.buy}
                        onClose={() => setIsModalOpen({ ...BUSKET_MODALS_INIT, confirm: false })}
                        isOpen={isModalOpen.confirm}
                    >
                        <div className="my-4">
                            <h3>{UI_CONTENT.confirmActionDescr.addressNotice}</h3>
                            <form
                                onSubmit={handleConfirm}
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
                                    value={formData.address}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
                                />
                                <div className="w-full flex justify-around gap-4">
                                    <button
                                        type="button"
                                        className="flex-1 btn--sm !text-gray-800 font-medium border-2 bg-slate-100 border-blue-800 hover:border-blue-600"
                                        onClick={() => setIsModalOpen({ ...BUSKET_MODALS_INIT, confirm: false })}
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
                </>
            ) : (
                <div className="text-center text-gray-500">Корзина пуста</div>
            )}
        </div>
    );
}
