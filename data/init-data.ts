export const APP_NAME = "Teiwaz Cafe";
export const NEXT_REVALIDATE_INTERVAL = 0; // value in seconds

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

export const BUSKET_MODALS_INIT = {
    confirm: false,
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
        checkout: {
            default: "Оформить заказ",
            loading: "Оформление...",
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
            payed: "Заказ успешно оплачен",
            deleted: "Заказ удалён, обновите таблицу",
            statusChanged: "Статус изменён, обновите таблицу",
            addedToCard: "Товар добавлен в корзину",
            removedFromCart: "Товар удален из корзины",
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
            required: "Необходимо авторизоваться",
        },
        cart: {
            unknown: "Ошибка при добавлении в корзину",
            clear: "Ошибка при очистке корзины",
            empty: "Корзина пуста",
            unknownAddress: "Товар в корзине, адрес не указан",
        },
        order: {
            unknown: "Ошибка при оформлении заказа",
            listEmpty: "Вы ещё не сделали ни одного заказа",
        },
        balanceChanged: "Ошибка изменения баланса, попробуйте снова",
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
        buy: "Вы подтверждаете заказ?",
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
        buy: "Товар попадёт в корзину, в которой Вы оплачиваете товар со своего баланса.",
        addressNotice: "Укажите адрес, без него заказ не будет обработан"
    },
};
