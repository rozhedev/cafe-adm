import { ObjectId } from "mongoose";

export type TUser = {
    _id?: ObjectId;
    name: string;
    password: string;
};

export type TOrder = {
    _id?: ObjectId;
    client: string;
    dish: string;
    quantity: string;
    price: number;
    status: string;
    date: string;
};

export type TUserInfo = {
    _id?: ObjectId;
    name: string;
    balance: number;
    activeOrders: number;
};
