import { connectDB } from "@/lib/mongodb";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const updateData = await req.json();
        const { userId, balance } = updateData;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { balance } },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
