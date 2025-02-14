import { ROLES } from "@/data";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const usersList = await User.find({ role: ROLES.user }).select("name balance activeOrders").populate("activeOrders");
        return NextResponse.json(usersList, { status: 200 });
    } catch (error) {
        console.error("Get users list error:", error);
        return NextResponse.json(
            { message: "Error when getting dish list" },
            {
                status: 500,
            }
        );
    }
}
