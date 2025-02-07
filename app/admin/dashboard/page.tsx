"use client";
import React from "react";
import { TOrder } from "@/types";
import { ResponsiveTable, TableColumnProps } from "@/components/AdaptiveTable";

// * Default page - Orders
export default function Orders() {
    const columns: TableColumnProps<TOrder>[] = [
        { key: "client", header: "Клиент" },
        { key: "dish", header: "Блюдо" },
        { key: "quantity", header: "Количество" },
        { key: "price", header: "Цена" },
        { key: "status", header: "Статус" },
        { key: "date", header: "Дата создания" },
    ];
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
                columns={columns}
                data={orders}
                onAction={handleAction}
            />
        </div>
    );
}
