"use client";
import React, { useEffect, useState } from "react";
import { ResponsiveTable } from "@/components/AdaptiveTable";
import { TDish, ObjectMap } from "@/types";
import { ROUTES, UI_CONTENT, DISH_ORDER_FORM_INIT, dishInfoColumns, dishFormControllers, dishActionOptions, DISH_MODALS_INIT } from "@/data";
import { FormController, Modal } from "@/ui";

export type TModalsAction = {
    edit: boolean;
    del: boolean;
};

export default function EditMenu() {
    const [dishList, setDishList] = useState<TDish[]>([]);
    const [addFormData, setAddFormData] = useState<ObjectMap>(DISH_ORDER_FORM_INIT);
    const [editFormData, setEditFormData] = useState<ObjectMap>(DISH_ORDER_FORM_INIT);
    const [error, setError] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<TModalsAction>(DISH_MODALS_INIT);

    // * Handlers
    const handleAddDish = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(ROUTES.addDish, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addFormData),
            });

            if (res.ok) {
                setError("");
                setIsLoading(false);
                setEditFormData(DISH_ORDER_FORM_INIT);
                setIsVisible(true);
                setError("");
                return;
            }
            setError("Ошибка создания, попробуйте снова");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setAddFormData(DISH_ORDER_FORM_INIT);
            console.error("Create new order error:", error);
        }
    };
    const handleEditDish = () => {
        if (Object.values(addFormData).every((item) => item.trim() === "")) {
            console.log("form not entered");
            return;
        }
        // console.log(name); 
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
                const res = await fetch(ROUTES.getDish, {
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
    }, [dishList, setDishList]);

    return (
        <div className="mb-8 w-full flex gap-10 justify-between items-start">
            <ResponsiveTable
                dropdownLabel="Действия"
                columns={dishInfoColumns}
                data={dishList}
                options={dishActionOptions}
                onAction={handleAction}
            />

            <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Добавить блюдо</h2>
                <form
                    className="flex flex-col items-center gap-4"
                    onSubmit={handleAddDish}
                >
                    {isVisible && <div className="form-elem-size border-2 border-green-300 rounded-lg shadow-md font-medium bg-green-200 text-green-800 p-3">{UI_CONTENT.success.dishAdded}</div>}

                    {dishFormControllers.map((controller) => (
                        <FormController
                            key={controller.id}
                            {...controller}
                            value={addFormData[controller.id as any]}
                            onChange={(e) =>
                                setAddFormData({
                                    ...addFormData,
                                    [controller.id]: e.target.value,
                                })
                            }
                        />
                    ))}
                    <div>
                        <label htmlFor="ingredients">Ингредиенты</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            required
                            placeholder="Спагетти, сыр, мясо"
                            className="mt-1 inp form-elem-size"
                            aria-label="Ингредиенты"
                            value={addFormData.ingredients}
                            onChange={(e) => setAddFormData({ ...addFormData, ingredients: e.target.value })}
                        />
                    </div>
                    {error && <small className="err-output">{UI_CONTENT.err.unknownError}</small>}
                    <button
                        type="submit"
                        className="mt-4 btn btn--auth"
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
                <div className="my-4">Введите новые значения в одно или несколько полей</div>
                <form
                    className="flex flex-col items-center gap-4"
                    onSubmit={handleEditDish}
                >
                    {dishFormControllers.map((controller) => (
                        <FormController
                            key={controller.id}
                            
                            {...controller}
                            value={editFormData[controller.id as any]}
                            onChange={(e) =>
                                setEditFormData({
                                    ...editFormData,
                                    [controller.id]: e.target.value,
                                })
                            }
                        />
                    ))}
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
                </form>
            </Modal>
        </div>
    );
}
