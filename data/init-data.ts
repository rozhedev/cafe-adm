import React, { useState } from "react";

export const APP_NAME = "Teiwaz Cafe";

// --> INIT STATES
// * Forms
export const AUTH_FORM_INIT = {
    name: "",
    password: "",
};

export const DISH_FORM_INIT = {
    dish: "",
    ingredients: "",
    price: "",
    quantity: "",
};

// * Modals
export const DISH_MODALS_INIT = {
    edit: false,
    delete: false,
};

export const EDIT_USER_MODALS_INIT = {
    balance: false,
};

// --> Content
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
        edit: {
            default: "Изменить",
            loading: "Изменяю...",
        },
        editBalance: {
            default: "Изменить баланс",
            loading: "Изменение баланса...",
        },
        delete: {
            default: "Удалить",
            loading: "Удаляю...",
        },
        update: {
            default: "Обновить",
            loading: "Обновляю...",
        },
    },
    success: {
        dishAdded: "Блюдо успешно добавлено",
        dishUpdated: "Блюдо успешно изменено",
    },
    err: {
        dishEmptyForm: "Введите значение хотя бы в одно поле",
        dishAddedErr: "Ошибка создания, попробуйте снова",
        dishUpdatedErr: "Ошибка редактирования, попробуйте снова",
        invalidAuthCredentials: "Логин или пароль введён неверно",
        userExist: "Пользователь с таким именём уже существует",
        unknownError: "Возникла ошибка, попробуйте снова",
    },
};
