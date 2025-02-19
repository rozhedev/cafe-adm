import { TableColumnProps } from "@/components/ResponsiveTable";
import { TActionOptionsArr, TDish, TOrder, TUserInfo } from "@/types";
import { UI_CONTENT } from "./init-data";
import { ModalIds, OrderStatuses, OrderStatusesLabels } from "./enums";

export const userInfoColumns: TableColumnProps<TUserInfo>[] = [
    { key: "name", header: "Имя" },
    { key: "balance", header: "Баланс" },
    { key: "activeOrders", header: "Активных заказов" },
];

export const dishInfoColumns: TableColumnProps<TDish>[] = [
    { key: "dish", header: "Блюдо" },
    { key: "ingredients", header: "Ингредиенты" },
    { key: "quantity", header: "Количество" },
    { key: "price", header: "Цена" },
];

export const ordersColumns: TableColumnProps<TOrder>[] = [
    { key: "user", header: "Клиент" },
    { key: "dish", header: "Блюдо" },
    { key: "quantity", header: "Количество" },
    { key: "price", header: "Цена" },
    { key: "status", header: "Статус" },
    { key: "address", header: "Адрес" },
    { key: "createdAt", header: "Дата создания" },
];

export const dishFormControllers = [
    {
        htmlLabel: "Название",
        id: "dish",
        type: "text",
        placeholder: "Спагетти с мясом",
        minLength: 5,
        "aria-label": "Название",
    },
    {
        htmlLabel: "Цена",
        id: "price",
        type: "number",
        placeholder: "149.99",
        min: 0,
        max: 9999,
        "aria-label": "Цена",
    },
    {
        htmlLabel: "Количество",
        id: "quantity",
        type: "number",
        placeholder: "12",
        min: 0,
        max: 999,
        "aria-label": "Количество",
    },
];

// --> Action Dropdown options
export const orderActionOptions: TActionOptionsArr = [
    {
        id: OrderStatuses.ordered,
        label: OrderStatusesLabels.ordered,
    },
    {
        id: OrderStatuses.payed,
        label: OrderStatusesLabels.payed,
    },
    {
        id: OrderStatuses.delivered,
        label: OrderStatusesLabels.delivered,
    },
    {
        id: OrderStatuses.completed,
        label: OrderStatusesLabels.completed,
    },
    {
        id: "delete",
        label: "Удалить",
    },
];
export const dishActionOptions: TActionOptionsArr = [
    {
        id: ModalIds.edit,
        label: UI_CONTENT.btn.edit.default,
    },
    {
        id: ModalIds.delete,
        label: UI_CONTENT.btn.delete.default,
    },
];
export const editUserActionOptions = [
    // TODO Add change orders functionality in next release
    {
        id: ModalIds.balance,
        label: UI_CONTENT.btn.editBalance.default,
    },
];
