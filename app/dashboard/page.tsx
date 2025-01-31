"use client";
import React from "react";
import { Navbar } from "@/ui";
import { Accordion } from "@/components";
import { APP_NAME } from "@/data/init-data";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-screen-xl mx-auto">
                <div className="my-12">
                    <div className="m-auto flex flex-col items-center mt-6 gap-4 max-w-[420px]">{APP_NAME}</div>
                </div>
            </div>
        </div>
    );
}
