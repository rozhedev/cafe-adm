"use client";
import React from "react";
import { TUserInfo } from "@/types";
import { ResponsiveTable } from "@/components/AdaptiveTable";
import { userInfoColumns } from "@/data";

export default function Users() {
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
        console.log(`Action ${action} for user from ${content.name}`);
    };
    return (
        <div>
            <ResponsiveTable
                dropdownLabel="Действия"
                columns={userInfoColumns}
                data={users}
                onAction={handleAction}
            />
        </div>
    );
}
