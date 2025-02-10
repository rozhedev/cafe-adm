"use client";
import React, { useEffect, useState } from "react";
import { ResponsiveTable, type TableColumnProps } from "@/components/AdaptiveTable";
import { TDish } from "@/types";
import { ROUTES, UI_CONTENT, ADD_ORDER_FORM_INIT, dishActionOptions, DISH_MODALS_INIT } from "@/data";
import { FormController, Modal } from "@/ui";

type TModalsAction = {
    edit: boolean;
    del: boolean;
};

const columns: TableColumnProps<TDish>[] = [
    { key: "dish", header: "Блюдо" },
    { key: "ingredients", header: "Ингредиенты" },
    { key: "quantity", header: "Количество" },
    { key: "price", header: "Цена" },
];

export default function EditMenu() {
    const [dishList, setDishList] = useState<TDish[]>([]);
    const [formData, setFormData] = useState<Omit<TDish, "id">>(ADD_ORDER_FORM_INIT);
    const [editFormData, setEditFormData] = useState<Omit<TDish, "id">>(ADD_ORDER_FORM_INIT);
    const [error, setError] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<TModalsAction>(DISH_MODALS_INIT);

    // * Handlers
    const handleAddOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(ROUTES.addOrders, {
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

    const handleAction = (action: string, item: TDish) => {
        if (action === "delete") {
            setIsModalOpen({ ...DISH_MODALS_INIT, del: true });
        }
        if (action === "edit") {
            setIsModalOpen({ ...DISH_MODALS_INIT, edit: true });
        }
    };
    const handleDelete = async () => {};
    const handleChange = () => {};

    // * Data fetching
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const res = await fetch(ROUTES.getOrders, {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setDishList(data);
            } catch (error) {
                console.error("Get dish list error:", error);
            }
        };
        fetchDishes();
    }, []);

    return (
        <div className="mb-8 w-full flex gap-10 justify-between items-start">
            <ResponsiveTable
                dropdownLabel="Действия"
                columns={columns}
                data={dishList}
                options={dishActionOptions}
                onAction={handleAction}
            />

            <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Добавить блюдо</h2>
                <form
                    className="flex flex-col items-center gap-4"
                    onSubmit={handleAddOrder}
                >
                    {isVisible && <div className="form-elem-size border-2 border-green-300 rounded-lg shadow-md font-medium bg-green-200 text-green-800 p-3">{UI_CONTENT.success.dishAdded}</div>}

                    <FormController
                        htmlLabel="Название"
                        id="dish"
                        name="dish"
                        type="text"
                        required
                        placeholder="Спагетти с мясом"
                        minLength={5}
                        aria-label="Название"
                        value={formData.dish}
                        onChange={(e) => setFormData({ ...formData, dish: e.target.value })}
                    />
                    <div>
                        <label htmlFor="ingredients">Ингредиенты</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            required
                            placeholder="Спагетти, сыр, мясо"
                            className="mt-1 inp form-elem-size"
                            aria-label="Ингредиенты"
                            value={formData.ingredients}
                            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                        />
                    </div>
                    <FormController
                        htmlLabel="Цена"
                        id="price"
                        name="price"
                        type="number"
                        required
                        placeholder="149.99"
                        min={0}
                        max={9999}
                        aria-label="Цена"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <FormController
                        htmlLabel="Количество"
                        id="quantity"
                        name="quantity"
                        type="number"
                        required
                        placeholder="12"
                        min={0}
                        max={999}
                        aria-label="Количество"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                    {error && <small className="err-output">{UI_CONTENT.err.unknownError}</small>}
                    <button
                        className="mt-4 btn btn--auth"
                        onClick={handleAddOrder}
                    >
                        {isLoading ? UI_CONTENT.btn.addDish.loading : UI_CONTENT.btn.addDish.default}
                    </button>
                </form>
            </div>
            <Modal
                title="Вы точно хотите удалить блюдо?"
                actionLabel="Удалить"
                onAction={handleDelete}
                onClose={() => setIsModalOpen({ ...isModalOpen, del: false })}
                isOpen={isModalOpen.del}
            >
                <div>Эту операцию нельзя отменить</div>
            </Modal>
            <Modal
                title="Изменить блюдо"
                actionLabel="Изменить"
                onAction={handleChange}
                onClose={() => setIsModalOpen({ ...isModalOpen, edit: false })}
                isOpen={isModalOpen.edit}
            >
                <h2 className="text-xl font-semibold mb-4">Выберите поле что нужно изменить</h2>
                <div>
                    <FormController
                        htmlLabel="Название"
                        id="dish"
                        name="dish"
                        type="text"
                        required
                        placeholder="Спагетти с мясом"
                        minLength={5}
                        aria-label="Название"
                        value={editFormData.dish}
                        onChange={(e) => setEditFormData({ ...editFormData, dish: e.target.value })}
                    />
                    <div>
                        <label htmlFor="ingredients">Ингредиенты</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            required
                            placeholder="Спагетти, сыр, мясо"
                            className="mt-1 inp form-elem-size"
                            aria-label="Ингредиенты"
                            value={editFormData.ingredients}
                            onChange={(e) => setEditFormData({ ...editFormData, ingredients: e.target.value })}
                        />
                    </div>
                    <FormController
                        htmlLabel="Цена"
                        id="price"
                        name="price"
                        type="number"
                        required
                        placeholder="149.99"
                        min={0}
                        max={9999}
                        aria-label="Цена"
                        value={editFormData.price}
                        onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    />
                    <FormController
                        htmlLabel="Количество"
                        id="quantity"
                        name="quantity"
                        type="number"
                        required
                        placeholder="12"
                        min={0}
                        max={999}
                        aria-label="Количество"
                        value={editFormData.quantity}
                        onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })}
                    />
                </div>
            </Modal>
        </div>
    );
}
