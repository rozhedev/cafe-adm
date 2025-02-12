import { connectDB } from "@/lib/mongodb";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    try {
        const name = await User.findById(params.id).select("name -_id");
        return NextResponse.json(name, { status: 200 });
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
