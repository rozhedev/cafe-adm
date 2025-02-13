"use client";
import React, { useContext, useEffect, useState, type FormEvent } from "react";
import { BooleanValObjMap, TDish } from "@/types";
import { ROUTES, UI_CONTENT, DISH_FORM_INIT, dishInfoColumns, dishFormControllers, dishActionOptions, DISH_MODALS_INIT, ModalIds } from "@/data";
import { cleanObjFromEmptyVal, fetchDataByRoute } from "@/helpers";
import { DishesContext, TDishesContextState } from "@/providers";
import { ModalWithoutFooter, ModalWithFooter } from "@/ui";
import { useToast } from "@/components/Toast";
import { DishForm } from "@/components/DishForm";
import { ResponsiveTable } from "@/components/ResponsiveTable";

export default function EditMenu() {
    const { addToast } = useToast();
    const [dishes, setDishes] = useContext(DishesContext) as TDishesContextState;

    const [dishId, setDishId] = useState<string>("");
    const [addFormData, setAddFormData] = useState<TDish>(DISH_FORM_INIT);
    const [editFormData, setEditFormData] = useState<TDish>(DISH_FORM_INIT);

    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(DISH_MODALS_INIT);
    const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
    const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

    // --> Handlers
    const handleTableUpdate = () =>
        fetchDataByRoute(
            ROUTES.getAllDish,
            {
                method: "GET",
                next: { revalidate: 1200 },
            },
            setDishes
        );

    const handleAction = (action: string, item: TDish) => {
        const id = String(item._id) || "";
        setDishId(id);
        if (action === ModalIds.delete) {
            setIsModalOpen({ ...DISH_MODALS_INIT, [ModalIds.delete]: true });
        }
        if (action === ModalIds.edit) {
            setIsModalOpen({ ...DISH_MODALS_INIT, [ModalIds.edit]: true });
        }
    };

    // * Add dish
    const handleAddDish = async (e: FormEvent) => {
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
                addToast(UI_CONTENT.success.dishAdded, "success");
                setEditFormData(DISH_FORM_INIT);
                return;
            }
            addToast(UI_CONTENT.err.dishAddedErr, "error");
            setAddFormData(DISH_FORM_INIT);
        } catch (error) {
            console.error("Create new dish error:", error);
        } finally {
            setIsAddLoading(false);
        }
    };
    // * Edit dish
    const handleEditDish = async (e: FormEvent) => {
        e.preventDefault();
        if (Object.values(editFormData).every((item) => (item as string).trim() === "")) {
            addToast(UI_CONTENT.err.dishEmptyForm, "error");
            return;
        }

        // Filter formData object from empty values
        const filtered = cleanObjFromEmptyVal(editFormData);

        setIsEditLoading(true);
        try {
            const res = await fetch(ROUTES.editDish, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...filtered, dishId }),
            });

            if (res.ok) {
                addToast(UI_CONTENT.success.dishUpdated, "success");
                setEditFormData(DISH_FORM_INIT);
                setIsModalOpen(DISH_MODALS_INIT);
                return;
            }
            addToast(UI_CONTENT.err.dishUpdatedErr, "error");
            setEditFormData(DISH_FORM_INIT);
        } catch (error) {
            console.error("Edit dish error:", error);
        } finally {
            setIsEditLoading(false);
        }
    };
    // * Delete dish
    const handleDelete = async () => {
        setIsEditLoading(true);
        try {
            const res = await fetch(`${ROUTES.deleteDish}/${dishId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                addToast(UI_CONTENT.success.dishDeleted, "success");
                setIsModalOpen(DISH_MODALS_INIT);
                return;
            }
            addToast(UI_CONTENT.err.dishDeletedErr, "error");
        } catch (error) {
            console.error("Delete dish error:", error);
        } finally {
            setIsEditLoading(false);
        }
    };

    // --> Data fetching
    useEffect(() => {
        fetchDataByRoute(
            ROUTES.getAllDish,
            {
                method: "GET",
                next: { revalidate: 1200 }, // revalidate every 2 minutes
            },
            setDishes
        );
    }, []);

    // * -----------------------------
    return (
        <div className="mb-8 w-full flex gap-10 justify-between items-start">
            <div className="w-full flex flex-col">
                <button
                    type="button"
                    className="max-w-48 my-4 btn--sm btn--auth"
                    onClick={handleTableUpdate}
                >
                    {UI_CONTENT.btn.update.default}
                </button>
                <ResponsiveTable
                    dropdownLabel="Действия"
                    columns={dishInfoColumns}
                    data={dishes}
                    options={dishActionOptions}
                    onAction={handleAction}
                />
            </div>
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Добавить блюдо</h2>
                <DishForm
                    formData={addFormData}
                    setFormData={setAddFormData}
                    onSubmit={handleAddDish}
                    formFields={dishFormControllers}
                    isLoading={isAddLoading}
                    btnLoadLabel={UI_CONTENT.btn.add.loading}
                    btnDefaultLabel={UI_CONTENT.btn.add.default}
                />
            </div>

            {/* // --> Modals */}
            <ModalWithFooter
                title="Вы точно хотите удалить блюдо?"
                onClose={() => setIsModalOpen({ ...isModalOpen, [ModalIds.delete]: false })}
                isOpen={isModalOpen[ModalIds.delete]}
                actionLabel={UI_CONTENT.btn.delete.default}
                onAction={handleDelete}
            >
                <div className="my-4">Эту операцию нельзя отменить. После удаления перезагрузите страницу</div>
            </ModalWithFooter>
            <ModalWithoutFooter
                title="Изменить блюдо"
                onClose={() => setIsModalOpen({ ...isModalOpen, [ModalIds.edit]: false })}
                isOpen={isModalOpen[ModalIds.edit]}
            >
                <div className="my-4">Введите новые значения в одно или несколько полей</div>

                {/* //* Edit form */}
                <DishForm
                    formData={editFormData}
                    setFormData={setEditFormData}
                    onSubmit={handleEditDish}
                    formFields={dishFormControllers}
                    isLoading={isEditLoading}
                    btnLoadLabel={UI_CONTENT.btn.edit.loading}
                    btnDefaultLabel={UI_CONTENT.btn.edit.default}
                />
            </ModalWithoutFooter>
        </div>
    );
}
