import { TModalsAction } from "@/app/admin/dashboard/edit-menu/page";
import { TDish, ObjectMap } from "@/types";
import React, { useState } from "react";
import { ROUTES } from "./routes";

export const APP_NAME = "Teiwaz Cafe";

// --> Action Dropdown options
export const orderActionOptions: { status: string; label: string }[] = [
    {
        status: "ordered",
        label: "Заказано",
    },
    {
        status: "payed",
        label: "Оплачено",
    },
    {
        status: "delivered",
        label: "Выдано",
    },
];
export const dishActionOptions: { status: string; label: string }[] = [
    {
        status: "edit",
        label: "Изменить",
    },
    {
        status: "delete",
        label: "Удалить",
    },
];

// --> INIT STATES
export const DISH_MODALS_INIT = {
    edit: false,
    del: false,
};

export const AUTH_FORM_INIT = {
    name: "",
    password: "",
};

export const DISH_ORDER_FORM_INIT = {
    dish: "",
    ingredients: "",
    price: "",
    quantity: "",
};

export const UI_CONTENT = {
    btn: {
        login: {
            default: "Войти",
            loading: "Проверка данных...",
        },
        register: {
            default: "Зарегистрироватся",
            loading: "Регистрация...",
        },
        addDish: {
            default: "Добавить блюдо",
            loading: "Добавляю...",
        },
    },
    success: {
        dishAdded: "Блюдо успешно добавлено",
    },
    err: {
        invalidAuthCredentials: "Логин или пароль введён неверно",
        userExist: "Пользователь с таким именём уже существует",
        unknownError: "Возникла ошибка, попробуйте снова",
    },
};
