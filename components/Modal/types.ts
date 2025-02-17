export type ModalId = string;

export interface ModalState {
    isOpen: boolean;
    data?: any;
}

export interface ModalContextType {
    modals: Record<ModalId, ModalState>;
    openModal: (modalId: ModalId, data?: any) => void;
    closeModal: (modalId: ModalId) => void;
    getModalState: (modalId: ModalId) => ModalState;
}
