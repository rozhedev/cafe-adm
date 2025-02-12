import React from "react";
import { StateAction } from "@/types";

export const cleanObjFromEmptyVal = (obj: any) => Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== ""));

// TODO Create hook useFetch
export const fetchDataByRoute = async (apiRoute: string, options: RequestInit, stateAction: StateAction<() => any[]>) => {
    try {
        const res = await fetch(apiRoute, options);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        stateAction(() => [...data]);
    } catch (error) {
        console.error("Get dish list error:", error);
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
