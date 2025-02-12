import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Dish } from "@/models";

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const dishList = await Dish.find({});
        return NextResponse.json(dishList, { status: 200 });
    } catch (error) {
        console.error("Get dish list error:", error);
        return NextResponse.json({ message: "Error when getting dish list" }, { status: 500 });
    }
}
