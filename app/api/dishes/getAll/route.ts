import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Dish } from "@/models";
import { revalidateLayout } from "@/app/actions";

// ! force-dynamic flag is necessary for correct data update in production build
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const dishList = await Dish.find({});

        await revalidateLayout();
        return NextResponse.json(dishList, {
            status: 200,
        });
    } catch (error) {
        console.error("Get dish list error:", error);
        return NextResponse.json({ message: "Error when getting dish list" }, { status: 500 });
    }
}
