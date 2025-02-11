import React, { FC, PropsWithChildren } from "react";
import { AiOutlineClose } from "react-icons/ai";

// * Base modal
type BaseModalProps = {
    title: string;
    isOpen: boolean;
    onClose?: () => void;
};

// * Modal with footer
type FooterProps = {
    actionLabel: string;
    haveCloseBtn?: boolean;
    onAction: () => void;
};

// * Common props
export type ModalWrapperProps<P, HasFooter extends boolean> = P & BaseModalProps & (HasFooter extends true ? FooterProps : {});

function withModal<P extends object, HasFooter extends boolean = true>(WrappedComponent: React.ComponentType<P>, includeFooter: HasFooter) {
    return function ModalHOC(props: ModalWrapperProps<P, HasFooter>) {
        const { title, isOpen, onClose, ...componentProps } = props;

        // * Extract footer props if it exist
        const footerProps = includeFooter ? (props as FooterProps) : null;

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

                    {/* Don't delete anchor */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    ></span>
                    {/* -------- */}

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="flex justify-between items-center">
                                <h2
                                    className="text-lg leading-6 font-semibold text-gray-900"
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
                            <div className="mt-2">
                                <WrappedComponent {...(componentProps as P)} />
                            </div>
                        </div>

                        {includeFooter && footerProps && (
                            <div className="bg-gray-50 px-4 py-3 gap-6 sm:px-6 sm:flex justify-end">
                                <button
                                    type="button"
                                    className="btn--sm btn--primary-red"
                                    onClick={footerProps.onAction}
                                >
                                    {footerProps.actionLabel}
                                </button>
                                {footerProps.haveCloseBtn !== false && (
                                    <button
                                        type="button"
                                        className="btn--sm btn--primary-blue"
                                        onClick={onClose}
                                    >
                                        Закрыть
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };
}

const ModalContent: FC<PropsWithChildren> = ({ children }) => {
    return <div>{children}</div>;
};

export const ModalWithFooter = withModal(ModalContent, true);
export const ModalWithoutFooter = withModal(ModalContent, false);
