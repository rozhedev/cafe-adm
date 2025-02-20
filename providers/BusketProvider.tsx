"use client";
import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TDish, TDishArr } from "@/types";
import { useToast } from "@/components/Toast";
import { OrderStatuses, ROUTES, UI_CONTENT } from "@/data";

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
export const BusketContext = createContext<TBusketContextState | undefined>(undefined);

// --> Provider
export const BusketProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<TDishArr>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: session, update } = useSession();
    const { addToast } = useToast();
    const userId = session?.user?.id;
    const username = session?.user?.name;

    const fetchOrders = useCallback(async () => {
        if (!username) return;

        try {
            setIsLoading(true);
            const res = await fetch(ROUTES.getByUserName, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    status: [OrderStatuses.ordered],
                }),
            });

            if (res.ok) {
                const orderData = await res.json();
                setItems(orderData);
            } else if (res.status === 404) setItems([]);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    }, [username, addToast]);

    // Initial loading of cart items
    useEffect(() => {
        if (username) {
            fetchOrders();
        } else {
            // If no user is logged in, try to get items from localStorage
            const savedItems = localStorage.getItem("busket");
            if (!savedItems) return;

            try {
                const parsedItems = JSON.parse(savedItems);
                // Additional check for prevent mismatch types
                setItems(Array.isArray(parsedItems) ? parsedItems : []);
            } catch (e) {
                console.error("Error parsing saved cart items:", e);
                localStorage.removeItem("busket");
            }
        }
    }, [username, fetchOrders]);

    // Update localStorage and calculate total price when items change
    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem("busket", JSON.stringify(items));
        } else {
            localStorage.removeItem("busket");
        }

        const total = items.reduce((sum, item) => sum + +(item.price || 0), 0);
        setTotalPrice(total);
    }, [items]);

    const addItem = async (item: TDish) => {
        try {
            if (!userId) {
                addToast(UI_CONTENT.err.auth.required, "error");
                return;
            }

            setIsLoading(true);
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
                const err = await res.json();
                addToast(err.message || UI_CONTENT.err.cart.unknown, "error");
                return;
            }
            const newItem = await res.json();
            setItems((prev) => [...prev, newItem]);
            addToast(UI_CONTENT.success.order.addedToCard, "success");
        } catch (error) {
            console.error("Error adding item to cart:", error);
            addToast(UI_CONTENT.err.cart.unknown, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const removeItem = async (itemId: string) => {
        try {
            if (!userId) {
                addToast(UI_CONTENT.err.auth.required, "error");
                return;
            }
            const itemToRemove = items.find((item) => item._id?.toString() === itemId);

            if (!itemToRemove || !itemToRemove._id) {
                // If no orderId or item not found, just remove from local state
                setItems((prev) => prev.filter((item) => item._id?.toString() !== itemId));
                return;
            }

            setIsLoading(true);
            const res = await fetch(ROUTES.rollbackOrder, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: itemToRemove._id, dish: itemToRemove.dish }),
            });

            if (!res.ok) {
                const err = await res.json();
                addToast(err.message || UI_CONTENT.err.cart.unknown, "error");
                return;
            }

            setItems((prev) => prev.filter((item) => item._id?.toString() !== itemId));
            addToast(UI_CONTENT.success.order.removedFromCart, "success");
        } catch (error) {
            console.error("Error removing item from cart:", error);
            addToast(UI_CONTENT.err.cart.unknown, "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Make function async  for prevent errors for other async operations
    const clearBusket = async () => {
        try {
            setIsLoading(true);

            if (items.length > 0) setItems([]);
            if (localStorage.getItem("busket")) localStorage.removeItem("busket");
        } catch (error) {
            console.error("Error clearing basket:", error);
            addToast(UI_CONTENT.err.cart.clear, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const checkout = async () => {
        try {
            if (!userId) {
                addToast(UI_CONTENT.err.auth.required, "error");
                return;
            }
            if (items.length === 0) {
                addToast(UI_CONTENT.err.cart.empty, "error");
                return;
            }

            setIsLoading(true);
            const orderIds = items.map((item) => item._id).filter((id) => id !== undefined);

            const res = await fetch(ROUTES.checkoutOrder, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderIds,
                    totalPrice,
                    userId,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                update({
                    ...session,
                    user: {
                        ...session?.user,
                        balance: session?.user.balance - data.price,
                    },
                });
                addToast(UI_CONTENT.success.order.payed, "success");
                clearBusket();
                return;
            }
            if (!res.ok) {
                const err = await res.json();
                addToast(err.message || UI_CONTENT.err.order.unknown, "error");
            }
        } catch (error) {
            console.error("Error checking out:", error);
            addToast(UI_CONTENT.err.order.unknown, "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Function for manual synchronization with server
    const refreshCart = useCallback(() => {
        fetchOrders();
    }, [fetchOrders]);

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
