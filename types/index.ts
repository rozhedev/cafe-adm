import { ObjectId } from "mongoose";

export type TUser = {
    _id?: ObjectId;
    name: string;
    password: string;
};