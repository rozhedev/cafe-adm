"use client";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { TOrder } from "@/types";
import { AdmOrdersContext, TAdmOrdersContextState } from "@/providers";
import { ordersColumns, orderActionOptions, ROUTES, OrderStatuses } from "@/data";
import { fetchDataByRoute } from "@/helpers";
import { ResponsiveTable } from "@/components/ResponsiveTable";

// * Default page - Orders
export default function Orders() {
    const [admOrders, setAdmOrders] = useContext(AdmOrdersContext) as TAdmOrdersContextState;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");

    // --> Data fetching
    useEffect(() => {
        fetchDataByRoute(
            ROUTES.getAllOrders,
            {
                method: "GET",
                next: { revalidate: 1200 }, // revalidate every 2 minutes
            },
            setAdmOrders
        );
    }, []);

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
                console.log("Dish added successfully");
                return;
            }
        } catch (error) {
            console.error("Error when adding order:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = (action: string, order: TOrder) => {
        console.log(`Action ${action} for order from ${order._id}`);
        setUserId(order.user);
    };
    return (
        <div className="w-full">
            <button
                type="button"
                onClick={handleAddOrder}
                className="max-w-48 my-4 btn--sm btn--auth"
            >
                {isLoading ? "Добавляю..." : "Добавить заказ"}
            </button>
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
