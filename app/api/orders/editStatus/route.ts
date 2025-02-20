import { ROUTES } from "@/data";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const updateData = await req.json();
        const { id, status } = updateData;
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { $set: { status } },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        revalidatePath(ROUTES.admDash, "layout");
        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
