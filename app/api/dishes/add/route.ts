import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Dish } from "@/models";

export async function POST(req: Request) {
    try {
        const { dish, ingredients, price, quantity } = await req.json();

        if (!dish || !ingredients || !price || !quantity) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        await connectDB();

        const existingDish = await Dish.findOne({ dish });
        if (existingDish) {
            return NextResponse.json({ message: "Dish already exists" }, { status: 409 });
        }
        const newDish = await Dish.create({
            dish,
            ingredients,
            price,
            quantity,
        });

        return NextResponse.json({ message: "Dish created succesfully" }, { status: 201 });
    } catch (error) {
        console.error("Creating dish error:", error);
        return NextResponse.json({ message: "Error, when creating new dish:" }, { status: 500 });
    }
}
