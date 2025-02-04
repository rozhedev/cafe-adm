"use client";
import React from "react";
import { ResponsiveTable } from "@/components/AdaptiveTable";
import { TableColumn } from "@/components/AdaptiveTable";
import { TUserInfo } from "@/types/index";

export default function Users() {
    const columns: TableColumn<TUserInfo>[] = [
        { key: "name", header: "Имя" },
        { key: "balance", header: "Баланс" },
        { key: "activeOrders", header: "Активных заказов" },
    ];
    const users: TUserInfo[] = [
        {
            name: "Дима ИФ",
            balance: 100,
            activeOrders: 2,
        },
        {
            name: "Даша ТИ",
            balance: 150,
            activeOrders: 3,
        },
    ];
    const handleAction = (action: string, content: TUserInfo) => {
        console.log(`Action ${action} for order from ${content.name}`);
    };
    return (
        <div>
            <ResponsiveTable
                columns={columns}
                data={users}
                onAction={handleAction}
            />
        </div>
    );
}
