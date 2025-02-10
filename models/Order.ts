import { COL_ORDERS } from "@/data";
import { TOrder } from "@/types";
import mongoose, { models } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        // * For get username from session in next-auth, use "name" instead username or fullname field
        dish: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: COL_ORDERS }
);

export const Order = mongoose.models?.Order || mongoose.model<TOrder>("Order", orderSchema);
