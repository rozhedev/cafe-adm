"use client";
import React from "react";
import { ActionDropdown } from "./ActionDropdown";
import { TActionOptionsArr } from "@/types";

export type TableColumnProps<T> = {
    key: string;
    header: string;
    width?: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
};

export type ResponsiveTableProps<T> = {
    dropdownLabel: string;
    columns: TableColumnProps<T>[];
    data: T[];
    options?: TActionOptionsArr;
    className?: string;
    onAction?: (action: string, item: T) => void;
};

export function ResponsiveTable<T extends Record<string, any>>({ dropdownLabel, columns, data, className = "", onAction, options }: ResponsiveTableProps<T>) {
    return (
        <div className="w-full overflow-x-auto rounded-lg bg-white shadow">
            <table className={`w-full table-auto ${className}`}>
                <thead>
                    <tr className="border-b border-gray-400">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="font-semibold px-3 py-3 text-sm text-center  text-gray-700"
                                style={column.width ? { width: column.width } : undefined}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 p-4">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-3 py-3 text-sm text-center text-gray-900"
                                    >
                                        {/* // * Hard check to Object for prevent render error in output orders array */}

                                        {typeof item[column.key] === "object" && item[column.key] !== null
                                            ? item[column.key].length
                                            : column.render
                                            ? // Default render
                                              column.render(item[column.key], item)
                                            : item[column.key]}
                                    </td>
                                ))}
                                {options && (
                                    <td className="px-3 py-3">
                                        <ActionDropdown
                                            options={options}
                                            label={dropdownLabel}
                                            onSelect={(action) => onAction?.(action, item)}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr className="block p-4">
                            <td>Данных не найдено...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
