"use client";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { TOrder } from "@/types";
import { AdmOrdersContext, type TAdmOrdersContextState } from "@/providers";
import { ordersColumns, orderActionOptions, ROUTES, OrderStatuses, UI_CONTENT } from "@/data";
import { fetchDataByRoute, formatOrders } from "@/helpers";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { useToast } from "@/components/Toast";

// * Default page - Orders
export default function Orders() {
    const { addToast } = useToast();
    const [admOrders, setAdmOrders] = useContext(AdmOrdersContext) as TAdmOrdersContextState;
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const handleAddOrder = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await fetch(ROUTES.addOrder, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dish: "Test dish",
                    quantity: 1,
                    price: 100,
                    status: OrderStatuses.payed,
                    user: "67ab421b75b3fffa6d404e05",
                    createdAt: Date.now(),
                }),
            });

            if (res.ok) {
                addToast(UI_CONTENT.success.order.added, "success");
                return;
            }
        } catch (error) {
            console.error("Error when adding order:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleAction = async (status: string, order: TOrder) => {
        const id = String(order._id) || "";
        await handleUpdateStatus(id, status);
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
                    className="max-w-48 my-4 btn--sm btn--auth"
                    onClick={handleTableUpdate}
                >
                    {UI_CONTENT.btn.update.default}
                </button>
                <button
                    type="button"
                    onClick={handleAddOrder}
                    className="max-w-48 my-4 btn--sm btn--auth"
                >
                    {isLoading ? UI_CONTENT.btn.add.loading : UI_CONTENT.btn.add.default}
                </button>
            </div>
            <ResponsiveTable
                options={orderActionOptions}
                dropdownLabel="Сменить статус"
                columns={ordersColumns}
                data={admOrders}
                onAction={handleAction}
            />
        </div>
    );
}
