"use client";
import React from "react";
import { ResponsiveTable } from "@/components/ResponsiveTable";

export default function Replenish() {
    return (
        <div>
            <span>Для пополнения баланса:</span>
            <ol>
                <li>Обратись к человеку, что заведует кафе</li>
                <li>Отдай наличными сумму пополнения</li>
                <li>Проследи, чтобы новый баланс был внесён в твой аккаунт</li>
            </ol>
        </div>
    );
}
