import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { Dish } from "@/models";

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const dishList = await Dish.find({});

        revalidatePath("/", "layout");
        return NextResponse.json(dishList, {
            status: 200,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate",
                Expires: "0",
            },
        });
    } catch (error) {
        console.error("Get dish list error:", error);
        return NextResponse.json({ message: "Error when getting dish list" }, { status: 500 });
    }
}
