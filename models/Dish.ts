import { COL_DISHES } from "@/data/env";
import { TDish } from "@/types";
import mongoose, { models } from "mongoose";

// Utility type for correct typisation editDishSchema
type SchemaField = {
    type: typeof String | typeof Number;
    required?: boolean;
    [key: string]: any;
};

const dishSchema = new mongoose.Schema(
    {
        dish: {
            type: String,
            required: true,
        },
        ingredients: {
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
    },
    { timestamps: true, collection: COL_DISHES }
);

export const Dish = mongoose.models?.Dish || mongoose.model<TDish>("Dish", dishSchema);

const editDishSchema = new mongoose.Schema(Object.fromEntries(Object.entries(dishSchema.obj).map(([key, value]) => [key, { ...(value as SchemaField), required: false }])), {
    timestamps: true,
    collection: COL_DISHES,
});

export const EditDish = mongoose.models?.EditDish || mongoose.model<Partial<TDish>>("EditDish", editDishSchema);
