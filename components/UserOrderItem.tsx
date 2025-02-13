import React from "react";
import { TOrder } from "@/types";
import { OrderStatuses } from "@/data";

type UserOrderItemProps = {
    order: TOrder;
    onCancelOrder: (order: TOrder) => void;
    onRepeatOrder: (order: TOrder) => void;
};

export const UserOrderItem: React.FC<UserOrderItemProps> = ({ order, onCancelOrder, onRepeatOrder }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">{order.dish}</h3>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <p className="text-gray-600">Цена: {order.price} грн.</p>
                    <p className="text-gray-600">Количество: {order.quantity}</p>
                    <p className="text-gray-600">Статус: {order.status}</p>
                    <p className="text-gray-600">Дата заказа: {order.createdAt}</p>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === OrderStatuses.ordered ? "bg-yellow-200 text-yellow-700" : order.status === OrderStatuses.payed ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                        }`}
                    >
                        {order.status}
                    </span>
                    <div className="flex mt-2 space-x-2">
                        {order.status === OrderStatuses.ordered && (
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs"
                                onClick={() => onCancelOrder(order)}
                            >
                                Отменить заказ
                            </button>
                        )}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs"
                            onClick={() => onRepeatOrder(order)}
                        >
                            Повторить заказ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
