"use client";
import React, { useState } from "react";
import { ResponsiveTable } from "@/components/AdaptiveTable";
import { TDish } from "@/types/index";
import { UI_CONTENT, ADD_ORDER_FORM_INIT } from "@/data/init-data";

export default function EditMenu() {
    const [formData, setFormData] = useState<Omit<TDish, "id">>(ADD_ORDER_FORM_INIT);
    const [error, setError] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAddOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/orders/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setError("");
                setIsLoading(false);
                setFormData(ADD_ORDER_FORM_INIT);
                setIsVisible(true);
                setError("");
                return;
            }
            setError("Ошибка создания, попробуйте снова");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setFormData(ADD_ORDER_FORM_INIT);
            console.error("Create new order error:", error);
        }
    };

    return (
        <div className="mb-8 w-full flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-5">Добавить блюдо</h2>
            <form
                className="flex flex-col items-center gap-4"
                onSubmit={handleAddOrder}
            >
                {isVisible && <div className="form-elem-size border-2 border-green-300 rounded-lg shadow-md font-medium bg-green-200 text-green-800 p-3">Блюдо успешно добавлено</div>}
                <div>
                    <label htmlFor="dish">Название</label>
                    <input
                        id="dish"
                        name="dish"
                        type="text"
                        required
                        placeholder="Спагетти с мясом"
                        minLength={5}
                        className="mt-1 inp form-elem-size"
                        value={formData.dish}
                        onChange={(e) => setFormData({ ...formData, dish: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="ingredients">Ингредиенты</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        required
                        placeholder="Спагетти, сыр, мясо"
                        className="mt-1 inp form-elem-size"
                        value={formData.ingredients}
                        onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="price">Цена</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        required
                        placeholder="149.99"
                        min={0}
                        max={9999}
                        className="mt-1 inp form-elem-size"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Количество</label>
                    <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        required
                        placeholder="12"
                        min={0}
                        max={999}
                        className="mt-1 inp form-elem-size"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                </div>
                {error && <small className="err-output">{UI_CONTENT.err.unknownError}</small>}
                <button
                    className="mt-4 btn btn--auth"
                    onClick={handleAddOrder}
                >
                    {isLoading ? "Добавляю..." : "Добавить блюдо"}
                </button>
            </form>
        </div>
    );
}
