import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
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

        // Update user orders (without changing balance)
        const updatedUser = (await User.findByIdAndUpdate(
            user,
            {
                $push: { activeOrders: newOrder._id },
            },
            {
                new: true,
            }
        )) as TUser;

        // If user update fails, rollback the previous operations
        if (!updatedUser) {
            await Order.findByIdAndDelete(newOrder._id);
            await Dish.findOneAndUpdate({ dish }, { $inc: { quantity: quantity } });

            return NextResponse.json({ message: "Error when updating user" }, { status: 500 });
        }

        return NextResponse.json({ message: "Order created successfully", orderId: newOrder._id }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Error creating Order" }, { status: 500 });
    }
}
