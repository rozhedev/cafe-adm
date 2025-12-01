"use client";
import React, { useState, type FormEvent } from "react";
import { ROUTES, UI_CONTENT, DISH_FORM_INIT, dishInfoColumns, dishFormControllers, dishActionOptions, ModalIds } from "@/data";
import { appendFormData, clearFormData, clearImgPreview, cleanObjFromEmptyVal } from "@/helpers";
import { useDishes } from "@/providers";
import { useToast } from "@/components/Toast";
import { DishForm } from "@/components/DishForm";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { useModal, DeleteDishModal, EditDishModal } from "@/components/Modal";
import { StringValObjMap } from "@/types";

export default function EditMenu() {
    // function clearEditData() {
    //     console.log("closed in clearEditData");
    //     // clearImgPreview(setEditPreview, setEditFile, "fileInput", 2000);
    //     closeEditModal();
    // }

    // Hooks
    const [dishes, , refreshDishes] = useDishes();
    const { addToast } = useToast();
    const { openModal: openEditModal, closeModal: closeEditModal } = useModal(ModalIds.editDish);
    const { openModal: openDeleteModal, isOpen: isDeleteModalOpen, closeModal: closeDeleteModal } = useModal(ModalIds.deleteDish);

    // State
    const [dishId, setDishId] = useState<string>("");
    const [addFormData, setAddFormData] = useState<StringValObjMap>(DISH_FORM_INIT);
    const [editFormData, setEditFormData] = useState<StringValObjMap>(DISH_FORM_INIT);

    const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
    const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

    // File handling states
    const [addPreview, setAddPreview] = useState<string | null>(null);
    const [addFile, setAddFile] = useState<File | null>(null);
    const [editPreview, setEditPreview] = useState<string | null>(null);
    const [editFile, setEditFile] = useState<File | null>(null);

    // --> Handlers
    const handleTableUpdate = () => refreshDishes();

    const handleAction = (action: string, item: any) => {
        const id = String(item._id) || "";
        setDishId(id);

        if (action === ModalIds.editDish) openEditModal();
        if (action === ModalIds.deleteDish) openDeleteModal();
    };

    // * Add dish
    const handleAddDish = async (e: FormEvent) => {
        e.preventDefault();
        if (!addFile) return;

        setIsAddLoading(true);

        try {
            const formData = new FormData();
            appendFormData(formData, { ...addFormData, image: addFile });

            const res = await fetch(ROUTES.addDish, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (res.ok) {
                addToast(UI_CONTENT.success.dish.added, "success");
                // clearFormData(setAddFormData, DISH_FORM_INIT);
                setAddFormData(DISH_FORM_INIT);

                // Clear preview after 2 seconds
                clearImgPreview(setAddPreview, setAddFile, "fileInput", 2000);

                await refreshDishes();
                return;
            }
            addToast(UI_CONTENT.err.dish.added, "error");

            // clearFormData(setAddFormData, DISH_FORM_INIT);
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
                // clearEditData();
                await refreshDishes();
                return;
            }
            addToast(UI_CONTENT.err.dish.updated, "error");

            // clearFormData(setAddFormData, DISH_FORM_INIT);
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
                closeDeleteModal();

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
                    label={isAddLoading ? UI_CONTENT.btn.add.loading : UI_CONTENT.btn.add.default}
                    preview={addPreview}
                    setPreview={setAddPreview}
                    file={addFile}
                    setFile={setAddFile}
                />
            </div>

            {/* // * Modals */}
            <DeleteDishModal
                title={UI_CONTENT.confirmAction.delete.dish}
                onClose={openDeleteModal}
                isOpen={isDeleteModalOpen}
                actionLabel={isDeleteLoading ? UI_CONTENT.btn.delete.loading : UI_CONTENT.btn.delete.default}
                actionBtnClassname="btn--primary-red"
                onAction={handleDelete}
            />
            <EditDishModal
                title={UI_CONTENT.confirmAction.edit.dish}
                confirmDescr={UI_CONTENT.confirmActionDescr.edit.dish}
                formData={editFormData}
                setEditFormData={setEditFormData}
                label={isEditLoading ? UI_CONTENT.btn.edit.loading : UI_CONTENT.btn.edit.default}
                onSubmit={handleEditDish}
                preview={editPreview}
                setPreview={setEditPreview}
                file={editFile}
                setFile={setEditFile}
            />
        </div>
    );
}
