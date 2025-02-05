import { COL_DISHES } from "@/data/env";
import { TDish } from "@/types";
import mongoose, { models } from "mongoose";

const dishSchema = new mongoose.Schema(
    {
        // * For get username from session in next-auth, use "name" instead username or fullname field
        name: {
            type: String,
            required: true,
        },
        ingridients: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        availableCount: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: COL_DISHES }
);

const Dish = mongoose.models?.Dish || mongoose.model<TDish>("Dish", dishSchema);
export default Dish;
