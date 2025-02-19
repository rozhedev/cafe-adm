export enum OrderStatuses {
    ordered = "ordered",
    payed = "payed",
    delivered = "delivered",
    completed = "completed",
    cancelled = "cancelled",
    unknown = "unknown",
}
export enum Actions {
    delete = "delete",
}

export enum OrderStatusesLabels {
    ordered = "Заказано",
    payed = "Оплачено",
    delivered = "Доставлено",
    cancelled = "Отменён",
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
