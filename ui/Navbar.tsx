"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { APP_NAME } from '@/data/init-data';

type TNavbar = {};
export const Navbar: FC<TNavbar> = ({}) => {
    return (
        <nav className="w-full bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-xl font-bold">{APP_NAME}</span>
                    </div>

                    {/* Logout Button */}
                    <div className="flex items-center">
                        <button
                            onClick={() => signOut()}
                            className="inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
