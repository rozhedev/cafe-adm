import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Dish, Order } from "@/models";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectDB();
    try {
        const { id, dish } = await req.json();

        const deletedOrder = await Order.findByIdAndDelete(id, {
            runValidators: true,
        });

        await Dish.findOneAndUpdate({ dish: dish }, { $inc: { quantity: 1 } });

        if (!deletedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        revalidatePath("/", "layout");
        return NextResponse.json({ message: "Successfully rollback" }, { status: 200 });
    } catch (error) {
        console.error("Deleted order error:", error);
        return NextResponse.json({ message: "Error when deleting order:" }, { status: 500 });
    }
}
