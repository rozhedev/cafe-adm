"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { formatOrders } from "@/helpers";
import { OrderStatuses, ROUTES, StorageKeys, UI_CONTENT } from "@/data";
import { TOrder } from "@/types";
import { useOrders } from "@/providers";
import { UserOrderItem } from "@/components/UserOrderItem";

export default function Orders() {
    const { data: session, status } = useSession();
    const username = session?.user?.name as string;
    const [userOrders, setUserOrders] = useOrders();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchOrdersByUserName = async (username: string) => {
        try {
            setIsLoading(true);
            const res = await fetch(ROUTES.getByUserName, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, status: [OrderStatuses.cancelled, OrderStatuses.completed, OrderStatuses.payed] }),
            });
            const data = await res.json();

            if (res.ok) {
                setUserOrders(() => formatOrders(data));
            } else {
                console.error("Fetch error:", res.status, data);
            }
        } catch (error) {
            console.error("Get orders by user ID error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // √ Correct updated
    useEffect(() => {
        if (!username && status !== "authenticated") return;
        if (localStorage.getItem(StorageKeys.orders)) {
            setUserOrders(JSON.parse(localStorage.getItem(StorageKeys.orders) as string));
        } else fetchOrdersByUserName(username);
    }, [status, session?.user?.name]);

    const handleOrdersUpdate = () => {
        fetchOrdersByUserName(username);
        localStorage.setItem(StorageKeys.orders, JSON.stringify(userOrders));
    };

    return (
        <div className="w-full">
            <div className="form-elem-size flex gap-5 my-4">
                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={handleOrdersUpdate}
                        className="max-w-48 btn--sm btn--accent"
                    >
                        {UI_CONTENT.btn.update.default}
                    </button>
                    <span className="text-sm">* Неоплаченные заказы отображаюся в корзине</span>
                </div>
            </div>
            <div>
                {isLoading ? (
                    <div>Загрузка...</div>
                ) : (
                    <>
                        {userOrders.length > 0 ? (
                            userOrders.map((order: TOrder) => (
                                <UserOrderItem
                                    key={uuidv4()}
                                    order={order}
                                />
                            ))
                        ) : (
                            <div>{UI_CONTENT.err.order.listEmpty}</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
