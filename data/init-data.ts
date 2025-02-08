export const APP_NAME = "Teiwaz Cafe";

export enum OrderStatuses {
    ordered = "ordered",
    payed = "payed",
    completed = "completed",
}
export enum OrderStatusesLabels {
    ordered = "Заказано",
    payed = "Оплачено",
    completed = "Выдано",
}
export const orderStatusesLabelsArr: string[] = ["Заказано", "Оплачено", "Выдано"];

export enum ROLES {
    user = "user",
    admin = "admin",
}
export type RolesUnion = `${ROLES}`;

export const ROUTES = {
    // --> Public
    registerAdmin: "/auth/register/admin",
    registerUser: "/auth/register/user",
    signin: "/auth/signin",
    // --> Protected
    // * User role
    dash: "/dashboard",
    dashOrders: "/dashboard/orders",
    dashBusket: "/dashboard/busket",
    dashReplenish: "/dashboard/replenish",
    // * Admin role
    admDash: "/admin/dashboard",
    admDashUsers: "/admin/dashboard/users",
    admDashEditMenu: "/admin/dashboard/edit-menu",
    //  --> API
    apiRegister: "/api/auth/register",
    apiSignin: "/api/auth/signin",
    addOrders: "/api/orders/add",
    getOrders: "/api/dishes/",
};

export const publicLinksArr = [
    {
        href: ROUTES.signin,
        label: "Войти",
    },
    {
        href: ROUTES.registerUser,
        label: "Зарегистрироватся",
    },
];

export const userLinksArr = [
    {
        href: ROUTES.dash,
        label: "Меню блюд",
    },
    {
        href: ROUTES.dashOrders,
        label: "Мои заказы",
    },
    {
        href: ROUTES.dashBusket,
        label: "Корзина",
    },
    {
        href: ROUTES.dashReplenish,
        label: "Пополнить",
    },
];

export const adminLinksArr = [
    {
        href: ROUTES.admDash,
        label: "Заказы",
    },
    {
        href: ROUTES.admDashUsers,
        label: "Пользователи",
    },
    {
        href: ROUTES.admDashEditMenu,
        label: "Изменить меню",
    },
];

export const AUTH_FORM_INIT = {
    name: "",
    password: "",
};

export const ADD_ORDER_FORM_INIT = {
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
