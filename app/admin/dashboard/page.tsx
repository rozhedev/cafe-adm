"use client";
import React from "react";
import { TOrder } from "@/types";
import { ResponsiveTable } from "@/components/AdaptiveTable";
import { ordersColumns, orderActionOptions } from "@/data";

// * Default page - Orders
export default function Orders() {
    const orders: TOrder[] = [
        {
            client: "Дима ИФ",
            dish: "бутерброд",
            quantity: "1шт.",
            price: 100,
            status: "Оплачено",
            date: "12:46 | 03.02.2025",
        },
        {
            client: "Даша ТИ",
            dish: "сок",
            quantity: "1шт.",
            price: 40,
            status: "Оплачено",
            date: "12:46 | 03.02.2025",
        },
    ];

    const handleAction = (action: string, order: TOrder) => {
        console.log(`Action ${action} for order from ${order.client}`);
    };
    return (
        <div className="min-w-full">
            <ResponsiveTable
                options={orderActionOptions}
                dropdownLabel="Сменить статус"
                columns={ordersColumns}
                data={orders}
                onAction={handleAction}
            />
        </div>
    );
}
