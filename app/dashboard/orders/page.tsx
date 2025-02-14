"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { ROUTES, UI_CONTENT } from "@/data";
import { TOrdersContextState, UserOrdersContext } from "@/providers";
import { TOrder } from "@/types";
import { UserOrderItem } from "@/components/UserOrderItem";

export default function Orders() {
    const { data: session, status } = useSession();
    const [name, setName] = useState<string>("");

    const [userOrders, setUserOrders] = useContext(UserOrdersContext) as TOrdersContextState;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchOrdersByUserName = async (username: string) => {
        try {
            setIsLoading(true);
            const res = await fetch(ROUTES.getByUserName, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });
            const data = await res.json();

            if (res.ok) {
                setUserOrders(data);
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
                setName(username);
                fetchOrdersByUserName(username);
            }
        }
    }, [status, session?.user?.name]);

    const handleOrdersUpdate = () => {
        fetchOrdersByUserName(name);
    };
    const handleCancelOrder = (order: any) => {
        console.log(`Отмена заказа: ${order.dish}`);
    };
    const handleRepeatOrder = (order: any) => {
        console.log(`Повтор заказа: ${order.dish}`);
    };

    return (
        <div className="w-full">
            <div className="form-elem-size flex gap-5">
                <button
                    type="button"
                    onClick={handleOrdersUpdate}
                    className="max-w-48 my-4 btn--sm btn--auth"
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
                                    onCancelOrder={handleCancelOrder}
                                    onRepeatOrder={handleRepeatOrder}
                                />
                            ))
                        ) : (
                            <div>Вы ещё не сделали ни одного заказа</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
