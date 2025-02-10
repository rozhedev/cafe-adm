import React, { FC, PropsWithChildren } from "react";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = PropsWithChildren & {
    title: string;
    actionLabel?: string;
    isOpen: boolean;
    onAction?: () => void;
    onClose: () => void;
};

export const Modal: FC<ModalProps> = ({ isOpen, onAction, onClose, title, actionLabel = "", children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center">
                            <h2
                                className="text-lg leading-6 font-medium text-gray-900"
                                id="modal-title"
                            >
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <AiOutlineClose size={24} />
                            </button>
                        </div>
                        <div className="mt-2">{children}</div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 gap-6 sm:px-6 sm:flex justify-end">
                        {actionLabel && onAction && (
                            <button
                                type="button"
                                className="btn--sm btn--primary-red"
                                onClick={onAction}
                            >
                                {actionLabel}
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn--sm btn--primary-blue"
                            onClick={onClose}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
