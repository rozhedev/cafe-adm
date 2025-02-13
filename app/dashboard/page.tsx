"use client";
import React from "react";
import { TOrder } from "@/types";
import { ResponsiveTable, TableColumnProps } from "@/components/ResponsiveTable";
import { UI_CONTENT } from "@/data";

// * Default page - Cafe Menu
export default function CafeMenu() {
    return (
        <div className="w-full">
            <div className="form-elem-size flex gap-5">
                <button
                    type="button"
                    className="max-w-48 my-4 btn--sm btn--auth"
                >
                    {UI_CONTENT.btn.update.default}
                </button>
                
            </div>
            <div>Cafe menu</div>
        </div>
    );
}
