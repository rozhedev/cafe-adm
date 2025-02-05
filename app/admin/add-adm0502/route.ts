import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
    try {
        const { name, password } = await req.json();
        await connectDB();
        const existAdmin = await Admin.findOne({ name }).select("_id");

        if (existAdmin) return NextResponse.json({ existAdmin });

        const hashedPass = await bcrypt.hash(password, 16);
        await Admin.create({ name, password: hashedPass });

        return NextResponse.json({ message: "Admin registered" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occured while register" }, { status: 500 });
    }
}
