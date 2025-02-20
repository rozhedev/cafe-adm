import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Dish } from "@/models";
import { ROUTES } from "@/data";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    try {
        const deletedDish = await Dish.findByIdAndDelete(params.id, {
            runValidators: true,
        });

        if (!deletedDish) {
            return NextResponse.json({ error: "Dish not found" }, { status: 404 });
        }

        revalidatePath(ROUTES.admDashEditMenu);
        return NextResponse.json({ message: "Dish deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Deleted dish error:", error);
        return NextResponse.json({ message: "Error when deleting dish:" }, { status: 500 });
    }
}
