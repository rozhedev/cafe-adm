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

export enum StorageKeys {
    orders = "orders",
    busket = "busket",
};
export type StorageKeysUnion = `${StorageKeys}`;

export enum ROLES {
    user = "user",
    admin = "admin",
}
export type RolesUnion = `${ROLES}`;

export enum ModalIds {
    confirmOrder = "confirm-order",
    editBalance = "edit-balance",
    deleteOrder = "delete-order",
    deleteDish = "delete-dish",
    editDish = "edit-dish",
}
export type ModalIdsUnion = `${ModalIds}`;
