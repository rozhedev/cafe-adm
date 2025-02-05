import { ObjectId } from "mongoose";

export type TUser = {
    _id?: ObjectId;
    name: string;
    password: string;
};

export type TOrder = {
    _id?: ObjectId;
    client: string;
    name: string;
    quantity: string;
    price: number;
    status: string;
    date: string;
};

export type TDish = {
    _id?: ObjectId;
    name: string;
    ingridients: string;
    price: string;
    availableCount: string;
};

export type TUserInfo = {
    _id?: ObjectId;
    name: string;
    balance: number;
    activeOrders: number;
};
