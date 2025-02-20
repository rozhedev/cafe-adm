// ? Need to store public user information (name, balance, activeOrders). See: types/index.ts

"use client";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { StateAction, TUserInfoArr } from "@/types";
import { ROUTES } from "@/data";

export type TUsersInfoContextState = [TUserInfoArr, StateAction<TUserInfoArr>, () => Promise<void>];

export const UsersInfoContext = createContext<TUsersInfoContextState>([[], () => null, async () => {}]);

export const UsersInfoProvider = ({ children }: PropsWithChildren) => {
    const [usersInfo, setUsersInfo] = useState<TUserInfoArr>([]);

    const refreshUsersInfo = useCallback(async () => {
        try {
            const res = await fetch(ROUTES.getUsersRole, {
                method: "GET",
                next: { revalidate: 0 },
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error(`HTTP error, status: ${res.status}`);
            }

            const data = await res.json();
            setUsersInfo(data);
        } catch (error) {
            console.error("Get users list error:", error);
        }
    }, []);

    useEffect(() => {
        refreshUsersInfo();
    }, [refreshUsersInfo]);

    return <UsersInfoContext.Provider value={[usersInfo, setUsersInfo, refreshUsersInfo]}>{children}</UsersInfoContext.Provider>;
};

export const useUsersInfo = () => {
    const context = useContext(UsersInfoContext);
    if (!context) {
        throw new Error("useUsersInfo must be used within a UsersInfoProvider");
    }
    return context;
};
