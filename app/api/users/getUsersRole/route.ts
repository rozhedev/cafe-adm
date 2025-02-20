import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ROLES } from "@/data";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models";

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const usersList = await User.find({ role: ROLES.user }).select("name balance activeOrders").populate("activeOrders");

        revalidatePath("/", "layout");
        return NextResponse.json(usersList, {
            status: 200,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate",
                Expires: "0",
            },
        });
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
