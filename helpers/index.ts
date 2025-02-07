import React from "react";

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

