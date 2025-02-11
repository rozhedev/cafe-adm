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
    addDish: "/api/dishes/add",
    getDish: "/api/dishes/get",
    editDish: "/api/dishes/edit",
};

// --> Links
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