"use client"
import React from "react";
import { ActionDropdown } from "./ActionDropdown";

export type TableColumnProps<T> = {
    key: string;
    header: string;
    width?: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
};

export type ResponsiveTableProps<T> = {
    columns: TableColumnProps<T>[];
    data: T[];
    className?: string;
    onAction?: (action: string, item: T) => void;
};

export function ResponsiveTable<T extends Record<string, any>>({ columns, data, className = "", onAction }: ResponsiveTableProps<T>) {
    return (
        <div className="w-full overflow-x-auto rounded-lg bg-white shadow">
            <table className={`w-full table-auto ${className}`}>
                <thead>
                    <tr className="border-b border-gray-200">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-3 py-3 text-sm text-center font-medium text-gray-900"
                                style={column.width ? { width: column.width } : undefined}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="px-3 py-3 text-sm text-center text-gray-700"
                                >
                                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                                </td>
                            ))}
                            <td className="px-3 py-3">
                                {/* <ActionDropdown onSelect={(action) => onAction?.(action, item)} /> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
