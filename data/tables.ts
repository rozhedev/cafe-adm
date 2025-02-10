import { TableColumnProps } from "@/components/AdaptiveTable";
import { TDish, TOrder, TUserInfo } from "@/types";
import React from "react";

export const userInfoColumns: TableColumnProps<TUserInfo>[] = [
        { key: "name", header: "Имя" },
        { key: "balance", header: "Баланс" },
        { key: "activeOrders", header: "Активных заказов" },
    ];

export const dishInfoColumns: TableColumnProps<TDish>[] = [
    { key: "dish", header: "Блюдо" },
    { key: "ingredients", header: "Ингредиенты" },
    { key: "quantity", header: "Количество" },
    { key: "price", header: "Цена" },
];

export const ordersColumns: TableColumnProps<TOrder>[] = [
        { key: "client", header: "Клиент" },
        { key: "dish", header: "Блюдо" },
        { key: "quantity", header: "Количество" },
        { key: "price", header: "Цена" },
        { key: "status", header: "Статус" },
        { key: "date", header: "Дата создания" },
    ];

export const dishFormControllers = [
    {
        htmlLabel: "Название",
        id: "dish",
        type: "text",
        required: true,
        placeholder: "Спагетти с мясом",
        minLength: 5,
        "aria-label": "Название",
    },
    {
        htmlLabel: "Цена",
        id: "price",
        type: "number",
        required: true,
        placeholder: "149.99",
        min: 0,
        max: 9999,
        "aria-label": "Цена",
    },
    {
        htmlLabel: "Количество",
        id: "quantity",
        type: "number",
        required: true,
        placeholder: "12",
        min: 0,
        max: 999,
        "aria-label": "Количество",
    },
];
