import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models";

export async function POST(req: Request) {
    try {
        const { name, password, role } = await req.json();
        if (!name || !password || !role) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        await connectDB();

        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            password: hashedPassword,
            role,
        });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
}
