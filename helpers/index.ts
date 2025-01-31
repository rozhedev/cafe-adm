import React from "react";
import { TG_METHOD_NAMES } from "@/data/init-data";

// --> Logger to Telegram
export const getBotBaseUrl = (token: string, methodName: string): string => `https://api.telegram.org/bot${token}/${methodName}`;

export const sendLog = async (token: string, chatId: string, log: string): Promise<void> => {
    const url: string = `${getBotBaseUrl(token, TG_METHOD_NAMES.sendMessage)}?chat_id=${chatId}&parse_mode=HTML&text=${log}`;
    const res: Response = await fetch(url);

    if (!res.ok) {
        const error = await res.json();
        await Promise.reject(error.description || "Invalid url data (API link or chat ID, or headers values)");
    }
};

// --> Get current Date & Time
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

