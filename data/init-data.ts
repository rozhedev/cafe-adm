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

export const DISH_FORM_INIT = {
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
        edit: {
            default: "Изменить",
            loading: "Изменяю...",
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
