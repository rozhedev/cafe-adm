import { ObjectId } from "mongoose";
import { Dispatch, SetStateAction } from "react";

// * Utility types
export type StateAction<T> = Dispatch<SetStateAction<T>>;

export type StringValObjMap = { [key: string]: string };

export type BooleanValObjMap = {
    [key: string]: boolean;
};

// * Models
export type TUser = {
    _id?: ObjectId;
    name: string;
    role: string;
    balance: number;
    activeOrders: TDish[] | [];
    password: string;
};
export type TUserArr = TUser[];

export type TAdmin = {
    _id?: ObjectId;
    name: string;
    role: string;
    password: string;
};
export type TAdminArr = TAdmin[];

export type TOrder = {
    _id?: ObjectId;
    // * Don't change key prop from "dish" to "name" for prevent render bug
    dish: string;
    price: number;
    quantity: number;
    status: string;
    user: string;
    address: string;
    createdAt: number | string;
};
export type TOrderArr = TOrder[];

export type TDish = {
    _id?: ObjectId;
    dish: string;
    ingredients: string;
    price: number;
    quantity: number;
    // image: string;
};
export type TDishArr = TDish[];

export type TUserInfo = {
    _id?: ObjectId;
    name: string;
    balance: number;
    activeOrders: number;
};
export type TUserInfoArr = TUserInfo[];

export type TActionOption = { id: string; label: string };
export type TActionOptionsArr = TActionOption[];
