"use client";
import React, { useState } from "react";
import { TOrder } from "@/types";
import { useOrders } from "@/providers";
import { ordersColumns, orderActionOptions, ROUTES, UI_CONTENT, ModalIds } from "@/data";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { useToast } from "@/components/Toast";
import { DeleteOrderModal, useModal } from "@/components/Modal";

// * Default page - Orders
export default function Orders() {
    const { addToast } = useToast();
    const { openModal: openDeleteOrder, isOpen: isDeleteOrderOpen, closeModal: closeDeleteOrder } = useModal(ModalIds.deleteOrder);
    const [admOrders, , refreshOrders] = useOrders();

    const [orderId, setOrderId] = useState<string>("");
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

    // --> Handlers
    const handleTableUpdate = () => refreshOrders();

    // * Update
    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(ROUTES.editStatus, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) {
                addToast(UI_CONTENT.success.order.statusChanged, "success");
            }
        } catch (error) {
            console.error("Get dish list error:", error);
        }
    };

    // * Delete
    const handleDeleteOrder = async () => {
        setIsDeleteLoading(true);
        try {
            const res = await fetch(`${ROUTES.deleteOrder}/${orderId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                addToast(UI_CONTENT.success.dish.deleted, "success");
                closeDeleteOrder();
                return;
            }
            addToast(UI_CONTENT.err.dish.deleted, "error");
        } catch (error) {
            console.error("Delete dish error:", error);
        } finally {
            setIsDeleteLoading(false);
        }
    };

    const handleAction = async (status: string, order: TOrder) => {
        const id = String(order._id) || "";
        setOrderId(id);
        if (status !== ModalIds.deleteOrder) await handleUpdateStatus(id, status);
        else {
            console.log(id);
            openDeleteOrder();
        }
    };

    // -----------------------------
    return (
        <div className="w-full">
            <div className="form-elem-size flex gap-5">
                <button
                    type="button"
                    className="max-w-48 my-4 btn--sm btn--accent"
                    onClick={handleTableUpdate}
                >
                    {UI_CONTENT.btn.update.default}
                </button>
            </div>
            <ResponsiveTable
                options={orderActionOptions}
                dropdownLabel="Сменить статус"
                columns={ordersColumns}
                data={admOrders}
                onAction={handleAction}
            />

            {/* // * Modal */}
            <DeleteOrderModal
                title={UI_CONTENT.confirmActionDescr.delete.order}
                onClose={closeDeleteOrder}
                isOpen={isDeleteOrderOpen}
                actionLabel={isDeleteLoading ? UI_CONTENT.btn.delete.loading : UI_CONTENT.btn.delete.default}
                actionBtnClassname="btn--primary-red"
                onAction={handleDeleteOrder}
            />
        </div>
    );
}
