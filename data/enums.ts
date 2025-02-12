export enum OrderStatuses {
    ordered = "ordered",
    payed = "payed",
    completed = "completed",
    unknown = "unknown",
}
export enum OrderStatusesLabels {
    ordered = "Заказано",
    payed = "Оплачено",
    completed = "Выдано",
    unknown = "Нет данных",
}

export enum ROLES {
    user = "user",
    admin = "admin",
}
export type RolesUnion = `${ROLES}`;

export enum ModalIds {
    balance = "balance",
    delete = "delete",
    edit = "edit",
}
export type ModalIdsUnion = `${ModalIds}`;
