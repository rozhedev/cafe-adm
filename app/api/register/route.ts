import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
    try {
        const { name, password } = await req.json();
        await connectDB();
        const existUser = await User.findOne({ name }).select("_id");

        if (existUser) return NextResponse.json({ existUser });

        const hashedPass = await bcrypt.hash(password, 16);
        await User.create({ name, password: hashedPass });

        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occured while register" }, { status: 500 });
    }
}
