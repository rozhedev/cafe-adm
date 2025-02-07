import React, { PropsWithChildren } from "react";

export const AuthWrapper = ({ children, title }: PropsWithChildren & { title: string }) => {
    return (
        <div className="grid place-items-center">
            <div className="border border-gray-100 bg-white rounded-xl shadow-2xl px-5 py-10 lg:px-8 lg:py-6">
                <div className="sm:mx-auto sm:w-full">
                    <h2 className="text-center text-xl font-semibold leading-9 tracking-normal text-gray-900">{title}</h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full">{children}</div>
            </div>
        </div>
    );
};
