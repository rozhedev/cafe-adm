"use client";
import React, { FC, createContext, useContext, useEffect, useState } from "react";
import { TDish } from "@/types";
import { useToast } from "@/components/Toast";
import { OrderStatuses, ROUTES } from "@/data";
import { useSession } from "next-auth/react";

// Types
export type CartItem = TDish & {
    orderId?: string;
};

export type TBusketContextState = {
    items: CartItem[];
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
export const BusketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const { addToast } = useToast();
    const userid = session?.user?.id;
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

            const orderData = await response.json();

            const cartItems: CartItem[] = orderData.map((order: any) => ({
                _id: order.dish._id || order.dish,
                dish: order.dish.name || order.dishName || order.dish,
                price: order.price,
                description: order.dish.description || "",
                image: order.dish.image || "",
                orderId: order._id,
            }));

            setItems(cartItems);
        } catch (error) {
            console.error("Error fetching orders:", error);
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
        // Обновляем localStorage когда изменяются айтемы
        localStorage.setItem("busket", JSON.stringify(items));

        // Рассчитываем общую стоимость
        const total = items && items.reduce((sum, item) => sum + +item.price, 0);
        setTotalPrice(total);
    }, [items]);

    const addItem = async (item: TDish) => {
        try {
            setIsLoading(true);
            if (!userid) {
                addToast("Необходимо авторизоваться", "error");
                return;
            }

            // Создаем заказ со статусом "ordered"
            const res = await fetch(ROUTES.addOrder, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dish: item.dish || item._id,
                    quantity: "1", // Предполагаем, что количество 1 на каждое добавление
                    price: item.price,
                    status: OrderStatuses.ordered,
                    user: userid,
                    createdAt: Date.now(),
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                addToast(error.message || "Ошибка при добавлении в корзину", "error");
                return;
            }

            const data = await res.json();
            const cartItem: CartItem = {
                ...item,
                orderId: data.orderId || data._id, // API может вернуть orderId или _id
            };

            setItems((prev) => [...prev, cartItem]);
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

            if (!itemToRemove || !itemToRemove.orderId) {
                // Если нет orderId или элемент не найден, просто удаляем из локального состояния
                setItems((prev) => prev.filter((item) => item._id?.toString() !== itemId));
                return;
            }

            if (!userid) {
                addToast("Необходимо авторизоваться", "error");
                return;
            }

            setIsLoading(true);

            // Удаляем заказ на сервере
            const res = await fetch(`/api/orders/${itemToRemove.orderId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: itemToRemove.orderId,
                    userId: userid,
                }),
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
        if (userid && items.length > 0) {
            try {
                setIsLoading(true);

                // Получаем все ID заказов
                const orderIds = items && items.map((item) => item.orderId).filter((id) => id !== undefined) as string[];

                // Удаляем все заказы на сервере (для каждого заказа делаем отдельный запрос)
                const deletePromises = orderIds.map((orderId) =>
                    fetch(`${ROUTES.deleteOrder}/${orderId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            orderId: orderId,
                            userId: userid,
                        }),
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
            if (!userid) {
                addToast("Необходимо авторизоваться", "error");
                return;
            }

            if (items.length === 0) {
                addToast("Корзина пуста", "error");
                return;
            }

            // Получаем все ID заказов
            const orderIds = items && items.map((item) => item.orderId).filter((id) => id !== undefined) as string[];

            // Меняем статус на "payed" и списываем баланс
            const res = await fetch("/api/orders/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderIds,
                    totalPrice,
                    userId: userid,
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
            if (session && data.updatedBalance !== undefined) {
                session.user.balance = data.updatedBalance;
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
      throw new Error('useBusket must be used within a BusketProvider');
    }
    return context;
  };
