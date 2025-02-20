"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ROLES, APP_NAME, ROUTES, publicLinksArr } from "@/data";
import { TDish } from "@/types";
import { Navbar } from "@/ui";
import { useDishes } from "@/providers";
import { MenuItem } from "@/components/MenuItem";

export default function Home() {
    const { data: session } = useSession();
    const [dishes] = useDishes();
    const role = session?.user?.role;

    // Handler is required for MenuItem component
    const handleAddToCart = (dish: TDish) => {};
    if (session) {
        if (role === ROLES.user) redirect(ROUTES.dash);
        if (role === ROLES.admin) redirect(ROUTES.admDash);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                title={APP_NAME}
                linksArr={publicLinksArr}
            />
            <main className="flex gap-5">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {dishes &&
                            dishes.map((dish) => (
                                <MenuItem
                                    key={dish._id?.toString()}
                                    item={dish}
                                    isAuthenticated={false}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
