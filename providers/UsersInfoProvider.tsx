// ? Need to store public user information (name, balance, activeOrders). See: types/index.ts

"use client";
import { createContext, PropsWithChildren, useState } from "react";
import { StateAction, TUserInfoArr } from "@/types";

export type TUsersInfoContextState = [TUserInfoArr, StateAction<TUserInfoArr>];
type TUsersInfoContext = TUsersInfoContextState | undefined;

export const UsersInfoContext = createContext<TUsersInfoContext>([[], () => null]);

export const UsersInfoProvider = ({ children }: PropsWithChildren) => {
    const [usersInfo, setUsersInfo] = useState<TUserInfoArr>([]);

    return <UsersInfoContext.Provider value={[usersInfo, setUsersInfo]}>{children}</UsersInfoContext.Provider>;
};
