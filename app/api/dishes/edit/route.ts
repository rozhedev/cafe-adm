import { connectDB } from "@/lib/mongodb";
import { Dish } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const updateData = await req.json();
        const { dishId } = updateData;
        const updatedDish = await Dish.findByIdAndUpdate(dishId, updateData, {
            runValidators: true,
        });

        if (!updatedDish) {
            return NextResponse.json({ error: "Dish not found" }, { status: 404 });
        }

        return NextResponse.json(updatedDish, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
