import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Dish } from "@/models";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/data";

export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();
        const { dish, ingredients, price, quantity, image } = {
            dish: formData.get("dish") as string,
            ingredients: formData.get("ingredients") as string,
            price: formData.get("price") as string,
            quantity: formData.get("quantity") as string,
            image: formData.get("image") as File,
        };

        if (!dish || !ingredients || !price || !quantity || !image) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Existing check
        const existingDish = await Dish.findOne({ dish });
        if (existingDish) {
            return NextResponse.json({ message: "Dish already exists" }, { status: 409 });
        }

        // Bufferizing img
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const newDish = await Dish.create({
            dish,
            ingredients,
            price,
            quantity,
            img_title: image.name,
            data: buffer,
            contentType: image.type,
            size: buffer.length,
        });

        revalidatePath(ROUTES.admDashEditMenu);
        return NextResponse.json({ message: "Dish created succesfully" }, { status: 201 });
    } catch (error) {
        console.error("Creating dish error:", error);
        return NextResponse.json({ message: "Error, when creating new dish:" }, { status: 500 });
    }
}
