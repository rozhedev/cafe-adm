"use client";
import React, { useEffect, useState } from "react";
import { ResponsiveTable } from "@/components/AdaptiveTable";
import { TDish } from "@/types";
import { ROUTES, UI_CONTENT, DISH_FORM_INIT, dishInfoColumns, dishFormControllers, dishActionOptions, DISH_MODALS_INIT } from "@/data";
import { Modal } from "@/ui";
import { DishForm } from "@/components/DishForm";

export type TModalsAction = {
    edit: boolean;
    del: boolean;
};

export default function EditMenu() {
    const [dishId, setDishId] = useState<string>("");
    const [dishList, setDishList] = useState<TDish[]>([]);
    const [addFormData, setAddFormData] = useState<TDish>(DISH_FORM_INIT);
    const [editFormData, setEditFormData] = useState<TDish>(DISH_FORM_INIT);

    const [addDishStatus, setAddDishStatus] = useState<string>("");
    const [editDishStatus, setEditDishStatus] = useState<string>("");

    const [isModalOpen, setIsModalOpen] = useState<TModalsAction>(DISH_MODALS_INIT);
    const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
    const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

    // --> Handlers
    const handleAction = (action: string, item: TDish) => {
        const id = String(item._id) || "";
        setDishId(id);
        if (action === "delete") {
            setIsModalOpen({ ...DISH_MODALS_INIT, del: true });
        }
        if (action === "edit") {
            setIsModalOpen({ ...DISH_MODALS_INIT, edit: true });
        }
    };

    // * Add dish
    const handleAddDish = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddLoading(true);
        try {
            const res = await fetch(ROUTES.addDish, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addFormData),
            });

            if (res.ok) {
                setAddDishStatus(UI_CONTENT.success.dishAdded);
                setIsAddLoading(false);
                setEditFormData(DISH_FORM_INIT);
                return;
            }
            setAddDishStatus(UI_CONTENT.err.dishAddedErr);
            setAddFormData(DISH_FORM_INIT);
            setIsAddLoading(false);
        } catch (error) {
            setIsAddLoading(false);
            console.error("Create new dish error:", error);
        }
    };
    // * Edit dish
    const handleEditDish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(editFormData).every((item) => (item as string).trim() === "")) {
            setEditDishStatus(UI_CONTENT.err.dishEmptyForm);
            return;
        }
        setIsEditLoading(true);
        try {
            const res = await fetch(ROUTES.editDish, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...editFormData, dishId }),
            });
            console.log(res.body);

            if (res.ok) {
                setEditDishStatus(UI_CONTENT.success.dishUpdated);
                setIsEditLoading(false);
                setEditFormData(DISH_FORM_INIT);
                return;
            }
            setEditDishStatus(UI_CONTENT.err.dishUpdatedErr);
            setEditFormData(DISH_FORM_INIT);
            setIsEditLoading(false);
        } catch (error) {
            setIsEditLoading(false);
            console.error("Edit dish error:", error);
        }
    };

    // * Delete dish
    const handleDelete = async () => {};

    // * Data fetching
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const res = await fetch(ROUTES.getDish, {
                    method: "GET",
                    next: { revalidate: 1200 }, // revalidate every 2 minutes
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
                columns={dishInfoColumns}
                data={dishList}
                options={dishActionOptions}
                onAction={handleAction}
            />

            <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Добавить блюдо</h2>
                <DishForm
                    formData={addFormData}
                    setFormData={setAddFormData}
                    onSubmit={handleAddDish}
                    formFields={dishFormControllers}
                    isLoading={isAddLoading}
                    dishStatus={addDishStatus}
                    btnLoadLabel={UI_CONTENT.btn.addDish.loading}
                    btnDefaultLabel={UI_CONTENT.btn.addDish.default}
                />
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
                haveCloseBtn={false}
                onClose={() => setIsModalOpen({ ...isModalOpen, edit: false })}
                isOpen={isModalOpen.edit}
            >
                <div className="my-4">Введите новые значения в одно или несколько полей</div>

                {/* //* Edit form */}
                <DishForm
                    formData={editFormData}
                    setFormData={setEditFormData}
                    onSubmit={handleEditDish}
                    formFields={dishFormControllers}
                    isLoading={isEditLoading}
                    dishStatus={editDishStatus}
                    btnLoadLabel={UI_CONTENT.btn.edit.loading}
                    btnDefaultLabel={UI_CONTENT.btn.edit.default}
                />
            </Modal>
        </div>
    );
}
