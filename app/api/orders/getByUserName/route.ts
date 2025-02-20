import { connectDB } from "@/lib/mongodb";
import { Order, User } from "@/models";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { username, status } = await req.json();

        if (!username) {
            return NextResponse.json({ message: "Name is required" }, { status: 400 });
        }
        await connectDB();
        const user = await User.findOne({ name: username }).select("_id");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const orders = await Order.find({ user: user._id, status: { $in: [...status] } });
    
        revalidatePath("/", "layout");
        return NextResponse.json(orders || [], { status: 200 });
    } catch (error) {
        console.error("Get users list error:", error);
        return NextResponse.json(
            { message: "Error when getting users list" },
            {
                status: 500,
            }
        );
    }
}
