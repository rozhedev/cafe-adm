import { ObjectId } from "mongoose";
import { Dispatch, SetStateAction } from "react";

export type TUser = {
    _id?: ObjectId;
    name: string;
    role: string;
    balance: number;
    activeOrders: TDish[] | [];
    password: string;
};

export type TAdmin = {
    _id?: ObjectId;
    name: string;
    role: string;
    password: string;
};

export type TOrder = {
    _id?: ObjectId;
    // * Don't change key prop from "dish" to "name" for prevent render bug
    dish: string;
    price: number;
    quantity: string;
    status: string;
    user: string;
    createdAt: number;
};

export type TDish = {
    _id?: ObjectId;
    dish: string;
    ingredients: string;
    price: string;
    quantity: string;
};

export type TUserInfo = {
    _id?: ObjectId;
    name: string;
    balance: number;
    activeOrders: number;
};

export type TActionOption = { id: string; label: string };
export type TActionOptionsArr = TActionOption[];

export type StateAction<T> = SetStateAction<Dispatch<T>>;

export type StringValObjMap = { [key: string]: string };

export type BooleanValObjMap = {
    [key: string]: boolean;
};
