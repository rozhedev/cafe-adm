import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models";

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const ordersList = await Order.find({});
        return NextResponse.json(ordersList, { status: 200 });
    } catch (error) {
        console.error("Get dish list error:", error);
        return NextResponse.json({ message: "Error when getting dish list" }, { status: 500 });
    }
}
