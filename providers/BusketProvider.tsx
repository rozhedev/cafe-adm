"use client";
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TDish, TDishArr } from "@/types";
import { useToast } from "@/components/Toast";
import { OrderStatuses, ROUTES } from "@/data";

export type TBusketContextState = {
    items: TDishArr;
    addItem: (item: TDish) => Promise<void>;
    removeItem: (itemId: string) => void;
    clearBusket: () => void;
    totalPrice: number;
    checkout: () => Promise<void>;
    isLoading: boolean;
    refreshCart: () => void;
};

// Context
export const BusketContext = createContext<TBusketContextState | undefined>(undefined);

// Provider
export const BusketProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<TDishArr>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: session } = useSession();
    const { addToast } = useToast();
    const userId = session?.user?.id;
    const username = session?.user?.name;

    const fetchOrders = async () => {
        if (!username) return;

        try {
            setIsLoading(true);

            const response = await fetch(ROUTES.getByUserName, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    status: [OrderStatuses.ordered],
                }),
            });

            if (response.ok) {
                const orderData = await response.json();
                setItems(Array.isArray(orderData) ? orderData : []);
            } else if (response.status === 404) setItems([]);
            else console.error("Error fetching orders:", response.statusText);
        } catch (error) {
            console.error("Error fetching orders:", error);

            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const savedItems = localStorage.getItem("busket");
        if (savedItems) {
            setItems(JSON.parse(savedItems));
        }
        if (username) {
            fetchOrders();
        }
    }, [username]);

    useEffect(() => {
        localStorage.setItem("busket", JSON.stringify(items));

        const total = items.reduce((sum, item) => sum + +item.price, 0) || 0;
        setTotalPrice(total);
    }, [items]);

    const addItem = async (item: TDish) => {
        try {
            setIsLoading(true);
            if (!userId) {
                addToast("Необходимо авторизоваться", "error");
                return;
            }

            const res = await fetch(ROUTES.addOrder, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dish: item.dish,
                    price: item.price,
                    quantity: 1,
                    status: OrderStatuses.ordered,
                    user: userId,
                    createdAt: Date.now(),
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                addToast(error.message || "Ошибка при добавлении в корзину", "error");
                return;
            }

            setItems((prev) => [...prev, item]);
            addToast("Товар добавлен в корзину", "success");
        } catch (error) {
            console.error("Error adding item to cart:", error);
            addToast("Ошибка при добавлении в корзину", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const removeItem = async (itemId: string) => {
        try {
            const itemToRemove = items.find((item) => item._id?.toString() === itemId);

            if (!itemToRemove || !itemToRemove._id) {
                // Если нет orderId или элемент не найден, просто удаляем из локального состояния
                setItems((prev) => prev.filter((item) => item._id?.toString() !== itemId));
                return;
            }

            if (!userId) {
                addToast("Необходимо авторизоваться", "error");
                return;
            }

            setIsLoading(true);

            // Удаляем заказ на сервере
            const res = await fetch(`${ROUTES.deleteOrder}/${itemToRemove._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const error = await res.json();
                addToast(error.message || "Ошибка при удалении из корзины", "error");
                return;
            }

            // Удаляем элемент из локального состояния
            setItems((prev) => prev.filter((item) => item._id?.toString() !== itemId));
            addToast("Товар удален из корзины", "success");
        } catch (error) {
            console.error("Error removing item from cart:", error);
            addToast("Ошибка при удалении из корзины", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const clearBusket = async () => {
        if (userId && items.length > 0) {
            try {
                setIsLoading(true);

                // Получаем все ID заказов
                const orderIds = items && items.map((item) => item._id).filter((id) => id !== undefined);
                console.log(orderIds);

                // Удаляем все заказы на сервере (для каждого заказа делаем отдельный запрос)
                const deletePromises = orderIds.map((orderId) =>
                    fetch(`${ROUTES.deleteOrder}/${orderId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                );

                await Promise.all(deletePromises);
            } catch (error) {
                console.error("Error clearing basket:", error);
                addToast("Ошибка при очистке корзины", "error");
            } finally {
                setIsLoading(false);
            }
        }

        // В любом случае очищаем локальное состояние
        setItems([]);
        localStorage.removeItem("busket");
    };

    const checkout = async () => {
        try {
            setIsLoading(true);
            if (!userId) {
                addToast("Необходимо авторизоваться", "error");
                return;
            }

            if (items.length === 0) {
                addToast("Корзина пуста", "error");
                return;
            }
            const orderIds = items && items.filter((item) => item._id !== undefined);

            // Меняем статус на "payed" и списываем баланс
            const res = await fetch(ROUTES.checkoutOrder, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderIds,
                    totalPrice,
                    userId: userId,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                addToast(error.message || "Ошибка при оформлении заказа", "error");
                return;
            }

            const data = await res.json();
            addToast("Заказ успешно оформлен", "success");
            clearBusket();

            // Обновляем баланс сессии, если доступен
            if (session && data.balance !== undefined) {
                session.user.balance = data.balance;
            }
        } catch (error) {
            console.error("Error checking out:", error);
            addToast("Ошибка при оформлении заказа", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Добавляем функцию для ручной синхронизации с сервером
    const refreshCart = () => {
        fetchOrders();
    };

    return (
        <BusketContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                clearBusket,
                totalPrice,
                checkout,
                isLoading,
                refreshCart,
            }}
        >
            {children}
        </BusketContext.Provider>
    );
};

export const useBusket = () => {
    const context = useContext(BusketContext);
    if (!context) {
        throw new Error("useBusket must be used within a BusketProvider");
    }
    return context;
};
