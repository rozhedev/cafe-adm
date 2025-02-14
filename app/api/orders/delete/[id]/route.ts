import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    try {
        const deletedOrder = await Order.findByIdAndDelete(params.id, {
            runValidators: true,
        });

        if (!deletedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Deleted order error:", error);
        return NextResponse.json({ message: "Error when deleting order:" }, { status: 500 });
    }
}
