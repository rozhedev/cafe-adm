"use client";
import React, { useEffect, useState } from "react";
import { BooleanValObjMap, TOrder } from "@/types";
import { useAdmOrders } from "@/providers";
import { ordersColumns, orderActionOptions, ROUTES, UI_CONTENT, ModalIds, DISH_MODALS_INIT, ORDER_MODALS_INIT } from "@/data";
import { fetchDataByRoute, formatOrders } from "@/helpers";
import { ModalWithFooter } from "@/ui";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { useToast } from "@/components/Toast";

// * Default page - Orders
export default function Orders() {
    const { addToast } = useToast();
    const [admOrders, setAdmOrders] = useAdmOrders();
    const [orderId, setOrderId] = useState<string>("");

    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(ORDER_MODALS_INIT);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

    // --> Handlers
    const handleTableUpdate = () =>
        fetchDataByRoute(
            ROUTES.getAllOrders,
            {
                method: "GET",
                next: { revalidate: 1200 }, // revalidate every 2 minutes
            },
            setAdmOrders,
            (orders) => formatOrders(orders)
        );

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
            });
            if (res.ok) {
                addToast(UI_CONTENT.success.dish.deleted, "success");
                setIsModalOpen(DISH_MODALS_INIT);
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
        console.log(status);
        if (status !== ModalIds.delete) await handleUpdateStatus(id, status);
        else {
            setIsModalOpen({ ...ORDER_MODALS_INIT, delete: true });
        }
    };

    // --> Data fetching
    useEffect(() => {
        fetchDataByRoute(
            ROUTES.getAllOrders,
            {
                method: "GET",
                next: { revalidate: 1200 }, // revalidate every 2 minutes
            },
            setAdmOrders,
            (orders) => formatOrders(orders)
        );
    }, []);

    // * -----------------------------
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
            <ModalWithFooter
                title={UI_CONTENT.confirmAction.delete.order}
                onClose={() => setIsModalOpen({ ...isModalOpen, [ModalIds.delete]: false })}
                isOpen={isModalOpen[ModalIds.delete]}
                actionLabel={isDeleteLoading ? UI_CONTENT.btn.delete.loading : UI_CONTENT.btn.delete.default}
                actionBtnClassname="btn--primary-red"
                onAction={handleDeleteOrder}
            >
                <div className="my-4">{UI_CONTENT.confirmActionDescr.delete.order}</div>
            </ModalWithFooter>
        </div>
    );
}
