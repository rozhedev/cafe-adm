import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { OrderStatuses } from "@/data";
import { connectDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/nextauth";
import { Order, User } from "@/models";

export async function POST(req: Request) {
    try {
        const { orderIds, totalPrice, userId } = await req.json();

        if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0 || !userId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        await connectDB();

        // Check user balance
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (user.balance < totalPrice) {
            return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
        }

        // Update all orders to "payed" status
        const updatePromises = orderIds.map((orderId) => Order.findByIdAndUpdate(orderId, { status: OrderStatuses.payed }));

        await Promise.all(updatePromises);

        // Deduct balance from user
        const updatedUser = await User.findByIdAndUpdate(userId, { $inc: { balance: -totalPrice } }, { new: true });

        // Update session if necessary
        const session = await getServerSession(authOptions);
        if (session && session.user.id === userId) {
            session.user.balance = updatedUser.balance;
        }

        return NextResponse.json(
            {
                message: "Orders processed successfully",
                updatedBalance: updatedUser.balance,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json({ message: "Error processing checkout" }, { status: 500 });
    }
}
