"use client";
import React from "react";
import { ResponsiveTable } from "@/components/ResponsiveTable";

export default function Replenish() {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Для пополнения баланса:</h2>
            <ol className="list-decimal pl-5 text-gray-800">
                <li className="mb-2 font-medium">Обратись к человеку, что заведует кафе</li>
                <li className="mb-2 font-medium">Отдай наличными сумму пополнения</li>
                <li className="mb-2 font-medium">Проследи, чтобы новый баланс был внесён в твой аккаунт</li>
            </ol>
        </div>
    );
}
