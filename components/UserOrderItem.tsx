import React from "react";
import { TOrder } from "@/types";

type UserOrderItemProps = {
    order: TOrder;
    // TODO Create in future releases
    // onCancelOrder: (order: TOrder) => void;
    // onRepeatOrder: (order: TOrder) => void;
};

export const UserOrderItem: React.FC<UserOrderItemProps> = ({ order }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">{order.dish}</h3>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <p className="text-gray-600">Цена: {order.price} грн.</p>
                    <p className="text-gray-600">Количество: {order.quantity}</p>
                    <p className="text-gray-600">Статус: {order.status}</p>
                    <p className="text-gray-600">Адрес: {order.address}</p>
                    <p className="text-gray-600">Дата заказа: {order.createdAt}</p>
                </div>
            </div>
        </div>
    );
};
