import { COL_DISHES } from "@/data/env";
import { TDish } from "@/types";
import mongoose, { models } from "mongoose";

const dishSchema = new mongoose.Schema(
    {
        // * For get username from session in next-auth, use "name" instead username or fullname field
        dish: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        ingredients: {
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
    },
    { timestamps: true, collection: COL_DISHES }
);

export const Dish = mongoose.models?.Dish || mongoose.model<TDish>("Dish", dishSchema);
