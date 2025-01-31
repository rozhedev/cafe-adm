"use client";
import React, { FC, useState } from "react";

type TAccordion = {
    title: string;
    children: React.ReactNode;
};

export const Accordion: FC<TAccordion> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => setIsOpen(!isOpen);
    return (
        <div className="md:max-w-full max-w-[330px] form-elem-size w-full border border-gray-300 rounded-lg mb-4">
            <div
                onClick={toggleAccordion}
                className="flex justify-between items-center p-4 rounded-lg cursor-pointer bg-zinc-100/40 font-medium shadow-md ring-inset transition-colors"
            >
                <span>{title}</span>
                <span className={`transform text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>+</span>
            </div>
            {isOpen && <div className="form-elem-size p-4 bg-white rounded-br-lg rounded-bl-lg text-gray-900">{children}</div>}
        </div>
    );
};
