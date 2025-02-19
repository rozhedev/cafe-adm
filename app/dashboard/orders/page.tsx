"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { formatOrders } from "@/helpers";
import { OrderStatuses, ROUTES, UI_CONTENT } from "@/data";
import { TOrder } from "@/types";
import { useUserOrders } from "@/providers";
import { UserOrderItem } from "@/components/UserOrderItem";

export default function Orders() {
    const { data: session, status } = useSession();
    const [userOrders, setUserOrders] = useUserOrders();

    const [name, setName] = useState<string>("");
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

    useEffect(() => {
        if (status === "authenticated") {
            const username = session?.user?.name as string;
            if (username) {
                fetchOrdersByUserName(username);
                setName(username);
                localStorage.setItem("orders", JSON.stringify(userOrders));
            }
        }
    }, [status, session?.user?.name]);

    const handleOrdersUpdate = () => {
        fetchOrdersByUserName(name);
    };

    return (
        <div className="w-full">
            <div className="form-elem-size flex gap-5">
                <button
                    type="button"
                    onClick={handleOrdersUpdate}
                    className="max-w-48 my-4 btn--sm btn--accent"
                >
                    {UI_CONTENT.btn.update.default}
                </button>
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
                            <div>{UI_CONTENT.err.orderListEmpty}</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
