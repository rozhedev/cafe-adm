import { ModalWithFooter, ModalWithoutFooter } from "@/ui";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { BaseModalProps, FooterProps } from "@/ui/Modal";
import { ModalId, ModalState, ModalContextType } from "./types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// TODO Integrate in future releases

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState<Record<ModalId, ModalState>>({});

    const openModal = (modalId: ModalId, data?: any) => {
        setModals((prev) => ({
            ...prev,
            [modalId]: { isOpen: true, data },
        }));
    };

    const closeModal = (modalId: ModalId) => {
        setModals((prev) => ({
            ...prev,
            [modalId]: { isOpen: false },
        }));
    };

    const getModalState = (modalId: ModalId): ModalState => {
        return modals[modalId] || { isOpen: false };
    };

    return <ModalContext.Provider value={{ modals, openModal, closeModal, getModalState }}>{children}</ModalContext.Provider>;
};

export const useModal = (modalId: ModalId) => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }

    const { openModal, closeModal, getModalState } = context;
    const modalState = getModalState(modalId);

    return {
        isOpen: modalState.isOpen,
        data: modalState.data,
        openModal: (data?: any) => openModal(modalId, data),
        closeModal: () => closeModal(modalId),
    };
};

type ModalComponentProps = {
    title: string;
} & Record<string, any>;

type WithFooterProps<P extends ModalComponentProps> = P & FooterProps;
type WithoutFooterProps<P extends ModalComponentProps> = P;

export function withModalContext<P extends ModalComponentProps>(WrappedComponent: React.ComponentType<P>, includeFooter: boolean, modalId: string) {
    return function ModalHOCWithContext(props: typeof includeFooter extends true ? WithFooterProps<P> : WithoutFooterProps<P>) {
        const { isOpen, closeModal } = useModal(modalId);

        if (includeFooter) {
            const { actionLabel, actionBtnClassname, onAction, haveCloseBtn, title, ...componentProps } = props as WithFooterProps<P>;

            return (
                <ModalWithFooter
                    title={title}
                    isOpen={isOpen}
                    onClose={closeModal}
                    actionLabel={actionLabel}
                    actionBtnClassname={actionBtnClassname}
                    onAction={onAction}
                    haveCloseBtn={haveCloseBtn}
                >
                    <WrappedComponent {...(componentProps as any)} />
                </ModalWithFooter>
            );
        }

        const { title, ...componentProps } = props;

        return (
            <ModalWithoutFooter
                title={title}
                isOpen={isOpen}
                onClose={closeModal}
            >
                <WrappedComponent {...(componentProps as P)} />
            </ModalWithoutFooter>
        );
    };
}

// --------------------
// interface ConfirmOrderModalProps {
//     title: string; // Required
//     orderDetails: string;
// }
// const ConfirmOrderModal = withModalContext<ConfirmOrderModalProps>(() => <div className="my-4">{UI_CONTENT.confirmActionDescr.buy}</div>, true, "confirm-action");

// const { openModal } = useModal('add-order');

