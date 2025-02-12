"use client";
import React, { useEffect, useState, type FormEvent } from "react";
import { BooleanValObjMap, TDish } from "@/types";
import { ROUTES, UI_CONTENT, DISH_FORM_INIT, dishInfoColumns, dishFormControllers, dishActionOptions, DISH_MODALS_INIT, ModalIds } from "@/data";
import { ModalWithoutFooter, ModalWithFooter } from "@/ui";
import { cleanObjFromEmptyVal, fetchDataByRoute } from "@/helpers";
import { DishForm } from "@/components/DishForm";
import { ResponsiveTable } from "@/components/ResponsiveTable";

export default function EditMenu() {
    const [dishId, setDishId] = useState<string>("");
    const [dishList, setDishList] = useState<TDish[]>([]);
    const [addFormData, setAddFormData] = useState<TDish>(DISH_FORM_INIT);
    const [editFormData, setEditFormData] = useState<TDish>(DISH_FORM_INIT);

    const [addStatus, setAddStatus] = useState<string>("");
    const [editStatus, setEditStatus] = useState<string>("");
    const [deleteStatus, setDeleteStatus] = useState<string>("");

    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(DISH_MODALS_INIT);
    const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
    const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

    // --> Handlers
    const handleTableUpdate = () => {
        fetchDataByRoute(
            ROUTES.getDish,
            {
                method: "GET",
                next: { revalidate: 1200 },
            },
            setDishList
        );
    };
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
                setAddStatus(UI_CONTENT.success.dishAdded);
                setEditFormData(DISH_FORM_INIT);
                return;
            }
            setAddStatus(UI_CONTENT.err.dishAddedErr);
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
            setEditStatus(UI_CONTENT.err.dishEmptyForm);
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
                setEditStatus(UI_CONTENT.success.dishUpdated);
                setEditFormData(DISH_FORM_INIT);
                return;
            }
            setEditStatus(UI_CONTENT.err.dishUpdatedErr);
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
                setDeleteStatus("Блюдо удалено");
                return;
            }
            setDeleteStatus("Ошибка при удалении блюда");
        } catch (error) {
            console.error("Delete dish error:", error);
        } finally {
            setIsEditLoading(false);
        }
    };

    // --> Data fetching
    useEffect(() => {
        fetchDataByRoute(
            ROUTES.getDish,
            {
                method: "GET",
                next: { revalidate: 1200 }, // revalidate every 2 minutes
            },
            setDishList
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
                    data={dishList}
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
                    dishStatus={addStatus}
                    btnLoadLabel={UI_CONTENT.btn.addDish.loading}
                    btnDefaultLabel={UI_CONTENT.btn.addDish.default}
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

                {deleteStatus && <div className="form-elem-size border-2 border-blue-300 rounded-lg shadow-md font-medium bg-blue-200 text-blue-800 p-3">{deleteStatus}</div>}
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
                    dishStatus={editStatus}
                    btnLoadLabel={UI_CONTENT.btn.edit.loading}
                    btnDefaultLabel={UI_CONTENT.btn.edit.default}
                />
            </ModalWithoutFooter>
        </div>
    );
}
