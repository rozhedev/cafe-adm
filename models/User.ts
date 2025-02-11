import { COL_USERS } from "@/data";
import { TUser } from "@/types";
import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // * For get username from session in next-auth, use "name" instead username or fullname field
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
            default: 0,
        },
        activeOrders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
                default: [],
            },
        ],
    },
    { timestamps: true, collection: COL_USERS }
);

export const User = mongoose.models?.User || mongoose.model<TUser>("User", userSchema);
