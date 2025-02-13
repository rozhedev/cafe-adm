import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order, User } from "@/models";

export async function POST(req: Request) {
    try {
        const { dish, quantity, price, status, user, createdAt } = await req.json();
        if (!dish || !quantity || !price || !status || !user) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        await connectDB();

        const newOrder = await Order.create({
            dish,
            quantity,
            price,
            status,
            user,
            createdAt,
        });
        await User.findByIdAndUpdate(
            user,
            {
                $push: { activeOrders: newOrder._id },
            },
            {
                new: true,
            }
        );

        return NextResponse.json({ message: "Order created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Error creating Order" }, { status: 500 });
    }
}
