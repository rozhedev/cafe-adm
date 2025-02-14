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
        add: {
            default: "Добавить",
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
        dish: {
            added: "Блюдо успешно добавлено",
            deleted: "Блюдо удалено, обновите таблицу",
            updated: "Блюдо успешно изменено",
        },
        order: {
            added: "Заказ успешно добавлен",
            deleted: "Заказ удалён, обновите таблицу",
            statusChanged: "Статус изменён, обновите таблицу",
        },

        balanceChanged: "Баланс изменён, обновите таблицу",
    },
    err: {
        dish: {
            emptyForm: "Введите значение хотя бы в одно поле",
            added: "Ошибка создания, попробуйте снова",
            updated: "Ошибка редактирования, попробуйте снова",
            deleted: "Ошибка удаления, попробуйте снова",
        },
        auth: {
            invalidCredentials: "Логин или пароль введён неверно",
            userExist: "Пользователь с таким именём уже существует",
        },
        balanceChanged: "Ошибка изменения баланса, попробуйте снова",
        unknownError: "Возникла ошибка, попробуйте снова",
    },
};
