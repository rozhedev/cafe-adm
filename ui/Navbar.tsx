"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ROLES, ROUTES } from "@/data";

type TLinksArr = { href: string; label: string }[];
type NavlinkProps = {
    title: string;
    linksArr: TLinksArr;
};

const Navlink = ({ href, label }: { href: string; label: string }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <li className="cursor-pointer">
            <Link
                href={href}
                className={`link ${isActive ? "text-blue-600" : "text-gray-900"}`}
            >
                {label}
            </Link>
        </li>
    );
};

export const Navbar: FC<NavlinkProps> = ({ title, linksArr }) => {
    const { data: session } = useSession();
    const role = session?.user.role;
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <nav className="border-gray-200 bg-white shadow-md">
            <div className="flex flex-wrap items-center justify-between mx-auto px-6 py-3 lg:px-12 lg:py-6 md:border-b-1 md:border-gray-200">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Link
                        href={"/"}
                        className="self-center text-2xl font-semibold whitespace-nowrap"
                    >
                        {title}
                    </Link>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    data-collapse-toggle="navbar-solid-bg"
                    type="button"
                    className="burger-btn"
                    aria-controls="navbar-solid-bg"
                    aria-expanded="false"
                >
                    <span className="sr-only">Меню</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`}
                    id="navbar-solid-bg"
                >
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-100 text-center py-2 rtl:space-x-reverse md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent md:text-left md:py-0">
                        {!session && (
                            <Navlink
                                href="/"
                                label={"Меню"}
                            />
                        )}
                        {linksArr.map((link, index) => (
                            <Navlink
                                key={index}
                                href={link.href}
                                label={link.label}
                            />
                        ))}
                        {role === ROLES.user && (
                            <span className="py-2 px-3 md:p-0">
                                Баланс: <span className="font-semibold">{session?.user?.balance || 0}</span>
                            </span>
                        )}
                        {session && (
                            <>
                                <span className="font-semibold py-2 px-3 md:p-0">{session?.user?.name || "User"}</span>
                                <li className="flex md:justify-start justify-center">
                                    <button
                                        onClick={() => signOut({ callbackUrl: ROUTES.signin })}
                                        className="link"
                                    >
                                        <span>Выйти</span>
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
