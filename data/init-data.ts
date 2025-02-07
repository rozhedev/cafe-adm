export const APP_NAME = "Teiwaz Cafe";
export const orderStatuses = ["Оплачено", "Приготовлено", "Выдано"];

export const INIT_FORM_DATA = {
    name: "",
    password: "",
};

export enum ROLES {
    user = "user",
    admin = "admin",
}
export type RolesUnion = `${ROLES}`;

export const userLinksArr = [
    {
        href: "/dashboard",
        label: "Меню блюд",
    },
    {
        href: "/dashboard/orders",
        label: "Мои заказы",
    },
    {
        href: "/dashboard/busket",
        label: "Корзина",
    },
    {
        href: "/dashboard/replenish",
        label: "Пополнить",
    },
];

export const adminLinksArr = [
    {
        href: "/admin/dashboard",
        label: "Заказы",
    },
    {
        href: "/admin/dashboard/users",
        label: "Пользователи",
    },
    {
        href: "/admin/dashboard/edit-menu",
        label: "Изменить меню",
    },
];

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
    },
    err: {
        invalidAuthCredentials: "Логин или пароль введён неверно",
        userExist: "Пользователь с таким именём уже существует",
    },
};

export const tailwindConfig = {
    theme: {
        extend: {
            colors: {
                fontBlack: "#1E2026",
                accent: "#F0B90B",
                linkBlue: "#1E90FF",
            },
        },
    },
};
