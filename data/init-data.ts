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

export const ORDER_MODALS_INIT = {
    delete: false,
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
        confirm: {
            default: "Подтверждаю",
            loading: "Подтверждение...",
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
        orderListEmpty: "Вы ещё не сделали ни одного заказа",
        unknownError: "Возникла ошибка, попробуйте снова",
    },
    confirmAction: {
        delete: {
            dish: "Вы точно хотите удалить блюдо?",
            order: "Вы точно хотите удалить заказ?",
        },
        edit: {
            dish: "Изменить блюдо",
            balance: "Изменить баланс",
        },
        buy: "Вы подтверждаете заказ?"
    },
    confirmActionDescr: {
        delete: {
            dish: "Эту операцию нельзя отменить. После удаления перезагрузите страницу",
            order: "Эту операцию нельзя отменить. Заказ также будет удалён в клиента",
        },
        edit: {
            dish: "Введите новые значения в одно или несколько полей",
            balance: "Введите новый баланс",
        },
        buy: "Товар попадёт в корзину, в которой Вы оплачиваете товар со своего баланса."
    },
};
