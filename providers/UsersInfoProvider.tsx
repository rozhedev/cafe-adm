// ? Need to store public user information (name, balance, activeOrders). See: types/index.ts

"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { StateAction, TUserInfoArr } from "@/types";

export type TUsersInfoContextState = [TUserInfoArr, StateAction<TUserInfoArr>];

export const UsersInfoContext = createContext<TUsersInfoContextState>([[], () => null]);

export const UsersInfoProvider = ({ children }: PropsWithChildren) => {
    const [usersInfo, setUsersInfo] = useState<TUserInfoArr>([]);

    return <UsersInfoContext.Provider value={[usersInfo, setUsersInfo]}>{children}</UsersInfoContext.Provider>;
};

export const useUsersInfo = () => {
    const context = useContext(UsersInfoContext);
    if (!context) {
        throw new Error("useUsersInfo must be used within a UsersInfoProvider");
    }
    return context;
};
