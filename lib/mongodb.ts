import { DB_URI } from "@/data/env";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
    } catch (error) {
        console.log("Database error connection:", error);
    }
};
