import { COL_ADMIN } from "@/data/env";
import { TUser } from "@/types";
import mongoose, { models } from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        // * For get username from session in next-auth, use "name" instead username or fullname field
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: COL_ADMIN }
);

const Admin = mongoose.models?.Admin || mongoose.model<TUser>("Admin", adminSchema);
export default Admin;
