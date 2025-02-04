export const APP_NAME = "Cafe Admin";
export const orderStatuses = ["Оплачено", "Приготовлено", "Выдано"];

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
        send: {
            default: "Отправить",
            loading: "Отправка...",
        },
    },
    err: {
        invalidAuthCredentials: "Логин или пароль введён неверно",
        invalidMailRes: "Ошибка отправки. Очисти куки и попробуй снова или обратись к тимлиду",
        userExist: "Пользователь с такими данными уже существует",
        requiredFields: "Все поля обязательны",
    },
};

export const tailwindMailConfig = {
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
