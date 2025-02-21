import { NextRequest, NextResponse } from "next/server";
import { ROLES } from "@/data";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models";
import { revalidateLayout } from "@/app/actions";

// ! force-dynamic flag is necessary for correct data update in production build
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const usersList = await User.find({ role: ROLES.user }).select("name balance activeOrders").populate("activeOrders");

        await revalidateLayout();
        return NextResponse.json(usersList, {
            status: 200,
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
