import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/nextauth";
import { Dish, Order, User } from "@/models";
import { TDish, TUser } from "@/types";

export async function POST(req: Request) {
    try {
        const { dish, quantity, price, status, user, createdAt } = await req.json();
        if (!dish || !quantity || !price || !status || !user) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        await connectDB();

        // Existing check if sended incorrect userId
        const existedUser = (await User.findById(user)) as TUser;
        if (!existedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (existedUser.balance < price) {
            return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
        }

        // Existing check if sended incorrect name
        const existedDish = (await Dish.findOne({ dish })) as TDish;
        if (!existedDish) {
            return NextResponse.json({ message: "Dish not found" }, { status: 404 });
        }

        // Existing check if quantity equal 0
        if (+existedDish.quantity === 0) {
            return NextResponse.json({ message: "Not enough dishes available" }, { status: 400 });
        }

        const editedDish = await Dish.findOneAndUpdate({ dish }, { $inc: { quantity: -quantity } }, { runValidators: true, new: true });

        const newOrder = await Order.create({
            dish,
            quantity,
            price,
            status,
            user,
            createdAt,
        });

        // Update user orders & decrease price
        const updatedUser = await User.findByIdAndUpdate(
            user,
            {
                $push: { activeOrders: newOrder._id },
                $inc: { balance: -price },
            },
            {
                new: true,
            }
        ) as TUser;

        // If user update fails, rollback the previous operations
        if (!updatedUser) {
            await Order.findByIdAndDelete(newOrder._id);
            await Dish.findOneAndUpdate({ dish }, { $inc: { quantity: quantity } });

            return NextResponse.json({ message: "Erro when updating user" }, { status: 500 });
        }

        // Update session
        const session = await getServerSession(authOptions);
        if (session) {
            session.user.balance = updatedUser.balance;
        }

        return NextResponse.json({ message: "Order created successfully", updatedBalance: updatedUser.balance }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Error creating Order" }, { status: 500 });
    }
}
