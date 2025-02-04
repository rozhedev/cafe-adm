import React, { FC, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { orderStatuses } from '@/data/init-data';

interface ActionDropdownProps {
    onSelect: (action: string) => void;
}

export const ActionDropdown: FC<ActionDropdownProps> = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const PADDING_TOP = 8;

    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const updateDropdownPosition = () => {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + window.scrollY + PADDING_TOP,
                    left: rect.right - (dropdownRef.current?.offsetWidth || 0),
                });
            }
        };

        if (isOpen) {
            updateDropdownPosition();
            window.addEventListener("scroll", updateDropdownPosition);
            window.addEventListener("resize", updateDropdownPosition);
        }

        return () => {
            window.removeEventListener("scroll", updateDropdownPosition);
            window.removeEventListener("resize", updateDropdownPosition);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node) && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
            >
                Сменить статус
                <RiArrowDropDownLine className="ml-2 h-8 w-8" />
            </button>

            {isOpen &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        style={{
                            position: "absolute",
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                        }}
                        className="bg-white rounded-lg shadow-lg border border-gray-200 w-44"
                    >
                        {orderStatuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => {
                                    onSelect(status);
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                            >
                                {status}
                            </button>
                        ))}
                    </div>,
                    document.body
                )}
        </>
    );
};
