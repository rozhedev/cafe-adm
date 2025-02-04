"use client";
import React from "react";
import { ResponsiveTable } from "@/components/AdaptiveTable";
import { TTableColumn } from '@/components/AdaptiveTable';

// Пример использования
type TUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
}

export default function EditMenu() {
    const users: TUser[] = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "active",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            status: "inactive",
        },
    ];

    const columns: TTableColumn<TUser>[] = [
        { key: "id", header: "ID", width: "80px" },
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
        {
            key: "status",
            header: "Status",
            render: (value) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{value}</span>,
        },
    ];
    return (
        <div>
            <ResponsiveTable
                columns={columns}
                data={users}
            />
        </div>
    );
}
