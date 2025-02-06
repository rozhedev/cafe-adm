import mongoose from "mongoose";
import { DB_URI } from "@/data/env";

export const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) return;

        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};
