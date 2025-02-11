import { ObjectId } from "mongoose";
import { Dispatch, SetStateAction } from "react";

export type TUser = {
    _id?: ObjectId;
    name: string;
    role: string;
    password: string;
};

export type TOrder = {
    _id?: ObjectId;
    client: string;
    // * Don't change key prop from "dish" to "name" for prevent render bug
    dish: string;
    quantity: string;
    price: number;
    status: string;
    date: string;
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

export type TActionOption = { status: string; label: string };
export type TActionOptionsArr = TActionOption[];

export type StateAction<T> = SetStateAction<Dispatch<T>>;

export type ObjectMap = { [key: string]: string };
