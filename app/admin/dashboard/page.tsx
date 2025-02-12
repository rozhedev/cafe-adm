"use client";
import React, { SyntheticEvent, useContext, useEffect, useMemo, useState } from "react";
import { StringValObjMap, TOrder } from "@/types";
import { AdmOrdersContext, TAdmOrdersContextState } from "@/providers";
import { ordersColumns, orderActionOptions, ROUTES, OrderStatuses, UI_CONTENT } from "@/data";
import { fetchDataByRoute, formatUnixTimestamp, replaceStatusLabels } from "@/helpers";
import { ResponsiveTable } from "@/components/ResponsiveTable";

// * Default page - Orders
export default function Orders() {
    const [admOrders, setAdmOrders] = useContext(AdmOrdersContext) as TAdmOrdersContextState;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");
    const [userNames, setUserNames] = useState<StringValObjMap>({});

    const findUserById = async (id: string) => {
        try {
            const res = await fetch(`${ROUTES.findById}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                const data = await res.json();
                setUserNames((prev: any) => ({
                    ...prev,
                    [id]: data.name,
                }));
            } else {
                return "Имя не найдено";
            }
        } catch (error) {
            console.error("Find name error:", error);
        }
    };

    const formattedOrders = useMemo(() => {
        return admOrders.map((order: TOrder) => ({
            // Don't change order of props
            ...order,
            user: userNames[order.user] || order.user,
            status: replaceStatusLabels(order.status),
            createdAt: formatUnixTimestamp(order.createdAt, ".", ":"),
        }));
    }, [admOrders]);

    // --> Data fetching
    useEffect(() => {
        const userIds = Array.from(new Set(admOrders.map((order: TOrder) => order.user)).values()) as string[];

        // Load name for every ID
        userIds.forEach((id) => {
            if (!userNames[id]) {
                // Load if name don't exist in cache
                findUserById(id);
            }
        });
        fetchDataByRoute(
            ROUTES.getAllOrders,
            {
                method: "GET",
                next: { revalidate: 1200 }, // revalidate every 2 minutes
            },
            setAdmOrders
        );
    }, [admOrders]);

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
    };
    return (
        <div className="w-full">
            <button
                type="button"
                onClick={handleAddOrder}
                className="max-w-48 my-4 btn--sm btn--auth"
            >
                {isLoading ? UI_CONTENT.btn.add.loading : UI_CONTENT.btn.add.default}
            </button>
            <ResponsiveTable
                options={orderActionOptions}
                dropdownLabel="Сменить статус"
                columns={ordersColumns}
                data={formattedOrders}
                onAction={handleAction}
            />
        </div>
    );
}
