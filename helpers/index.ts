import React from "react";
import { StateAction } from "@/types";
import { OrderStatuses, OrderStatusesLabels } from "@/data";

export const cleanObjFromEmptyVal = (obj: any) => Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== ""));

type TFetchDataByRoute = <T>(apiRoute: string, options: RequestInit, stateAction: StateAction<T[]>, transformData?: (data: T[] | []) => T[]) => Promise<void>;

// TODO Create hook useFetch
export const fetchDataByRoute: TFetchDataByRoute = async (apiRoute, options, stateAction, transformData) => {
    try {
        const res = await fetch(apiRoute, options);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const processedData = transformData ? transformData(data) : data;

        // Use any for prevent use unnecessary callbacks in state action
        stateAction([...processedData] as any[]);
    } catch (error) {
        console.error("Get dish list error:", error);
    }
};

// Format orders in admin dashboard (route: /admin/dashboard/ )
export const formatOrders = (orders: any[] | []) =>
    orders.map((order) => ({
        ...order,
        // user is Object contains: {_id: string, name: string}
        user: (order.user as any)?.name || "Имя не найдено",
        status: replaceStatusLabels(order.status),
        createdAt: formatUnixTimestamp(order.createdAt, ".", ":"),
    }));

// * Replace status labels
export const replaceStatusLabels = (status: string): string => {
    if (status === OrderStatuses.ordered) return OrderStatusesLabels.ordered;
    if (status === OrderStatuses.payed) return OrderStatusesLabels.payed;
    if (status === OrderStatuses.completed) return OrderStatusesLabels.completed;
    if (status === OrderStatuses.delivered) return OrderStatusesLabels.delivered;
    return OrderStatusesLabels.unknown;
};

// --> Get current Date & Time
export function formatUnixTimestamp(unixTimestamp: string | number, dateSep: string, timeSep: string): string {
    // Check the data type
    if (typeof unixTimestamp !== "number") {
        unixTimestamp = Number(unixTimestamp);

        // If the result is not a number (NaN), throw an error
        if (isNaN(unixTimestamp)) {
            throw new Error("Invalid data type: expected a number or a string that can be converted to a number");
        }
    }

    // Check the length of the timestamp
    if (String(unixTimestamp).length === 13) {
        // Convert milliseconds to seconds
        unixTimestamp = Math.floor(unixTimestamp / 1000);
    } else if (String(unixTimestamp).length !== 10) {
        throw new Error("Invalid UNIX timestamp format");
    }

    const date = new Date(unixTimestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}${dateSep}${month}${dateSep}${year} | ${hours}${timeSep}${minutes}`;
}

const formatted = (value: number) => (value < 10 ? `0${value}` : `${value}`);

export const getCurrentDateFormat = (): string => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${formatted(day)}.${formatted(month)}.${year}`;
};

export const getCurrentTimeFormat = (): string => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${formatted(hours)}:${formatted(minutes)}`;
};
