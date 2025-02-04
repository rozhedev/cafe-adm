import React from "react";

export type TTableColumn<T> = {
    key: keyof T;
    header: string;
    width?: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
}

export type TResponsiveTableProps<T> = {
    columns: TTableColumn<T>[];
    data: T[];
    className?: string;
}

export function ResponsiveTable<T extends Record<string, any>>({ columns, data, className = "" }: TResponsiveTableProps<T>) {
    return (
        <div className="w-full overflow-x-auto shadow-sm rounded-lg">
            <table className={`w-full min-w-[640px] table-auto ${className}`}>
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                                style={column.width ? { width: column.width } : undefined}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            {columns.map((column) => (
                                <td
                                    key={String(column.key)}
                                    className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap"
                                >
                                    {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
