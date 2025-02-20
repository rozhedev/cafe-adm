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
    // * Dish
    addDish: "/api/dishes/add",
    getAllDish: "/api/dishes/getAll",
    editDish: "/api/dishes/edit",
    deleteDish: "/api/dishes/delete",
    // * Users
    getUsersRole: "/api/users/getUsersRole",
    editUser: "/api/users/edit",
    // * Orders
    addOrder: "/api/orders/add",
    getAllOrders: "/api/orders/getAll",
    getByUserName: "/api/orders/getByUserName",
    editStatus: "/api/orders/editStatus",
    deleteOrder: "/api/orders/delete",
    checkoutOrder: "/api/orders/checkout",
    rollbackOrder: "/api/orders/rollback",
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
        label: "Меню",
    },
    {
        href: ROUTES.dashOrders,
        label: "История заказов",
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
