"use client";
import React, { useEffect, useState, type FormEvent } from "react";
import { BooleanValObjMap, StringValObjMap } from "@/types";
import { ROUTES, UI_CONTENT, DISH_FORM_INIT, dishInfoColumns, dishFormControllers, dishActionOptions, DISH_MODALS_INIT, ModalIds } from "@/data";
import { cleanObjFromEmptyVal } from "@/helpers";
import { useDishes } from "@/providers";
import { ModalWithoutFooter, ModalWithFooter } from "@/ui";
import { useToast } from "@/components/Toast";
import { DishForm } from "@/components/DishForm";
import { ResponsiveTable } from "@/components/ResponsiveTable";

export default function EditMenu() {
    const { addToast } = useToast();
    const [dishes, , refreshDishes] = useDishes();

    const [dishId, setDishId] = useState<string>("");
    const [addFormData, setAddFormData] = useState<StringValObjMap>(DISH_FORM_INIT);
    const [editFormData, setEditFormData] = useState<StringValObjMap>(DISH_FORM_INIT);

    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(DISH_MODALS_INIT);
    const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
    const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

    // --> Handlers
    const handleTableUpdate = () => refreshDishes();

    const handleAction = (action: string, item: any) => {
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
                addToast(UI_CONTENT.success.dish.added, "success");
                setAddFormData(DISH_FORM_INIT);
                await refreshDishes();
                return;
            }
            addToast(UI_CONTENT.err.dish.added, "error");
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
            addToast(UI_CONTENT.err.dish.emptyForm, "error");
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
                addToast(UI_CONTENT.success.dish.updated, "success");
                setEditFormData(DISH_FORM_INIT);
                setIsModalOpen(DISH_MODALS_INIT);
                await refreshDishes();
                return;
            }
            addToast(UI_CONTENT.err.dish.updated, "error");
            setEditFormData(DISH_FORM_INIT);
        } catch (error) {
            console.error("Edit dish error:", error);
        } finally {
            setIsEditLoading(false);
        }
    };
    // * Delete dish
    const handleDelete = async () => {
        setIsDeleteLoading(true);
        try {
            const res = await fetch(`${ROUTES.deleteDish}/${dishId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                addToast(UI_CONTENT.success.dish.deleted, "success");
                setIsModalOpen(DISH_MODALS_INIT);
                await refreshDishes();
                return;
            }
            addToast(UI_CONTENT.err.dish.deleted, "error");
        } catch (error) {
            console.error("Delete dish error:", error);
        } finally {
            setIsDeleteLoading(false);
        }
    };

    // -----------------------------
    return (
        <div className="mb-8 w-full flex gap-10 justify-between items-start">
            <div className="w-full flex flex-col">
                <button
                    type="button"
                    className="max-w-48 my-4 btn--sm btn--accent"
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
                title={UI_CONTENT.confirmAction.delete.dish}
                onClose={() => setIsModalOpen({ ...isModalOpen, [ModalIds.delete]: false })}
                isOpen={isModalOpen[ModalIds.delete]}
                actionLabel={isDeleteLoading ? UI_CONTENT.btn.delete.loading : UI_CONTENT.btn.delete.default}
                actionBtnClassname="btn--primary-red"
                onAction={handleDelete}
            >
                <div className="my-4">{UI_CONTENT.confirmActionDescr.delete.dish}</div>
            </ModalWithFooter>
            <ModalWithoutFooter
                title={UI_CONTENT.confirmAction.edit.dish}
                onClose={() => setIsModalOpen({ ...isModalOpen, [ModalIds.edit]: false })}
                isOpen={isModalOpen[ModalIds.edit]}
            >
                <div className="my-4">{UI_CONTENT.confirmActionDescr.edit.dish}</div>

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
