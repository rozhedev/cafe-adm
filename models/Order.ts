import { COL_ORDERS } from "@/data";
import { TOrder } from "@/types";
import mongoose, { models } from "mongoose";

export const orderSchema = new mongoose.Schema(
    {
        dish: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Number,
            required: true,
        },
    },
    { timestamps: false, collection: COL_ORDERS }
);

export const Order = mongoose.models?.Order || mongoose.model<TOrder>("Order", orderSchema);
