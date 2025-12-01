// ? Prop drilling AvailableModals -> ModalContext -> Modal 

export { ModalProvider, withModalContext, useModal } from "./ModalContext";
export { type ModalState, type ModalContextType } from "./types";
export { EditDishModal, DeleteDishModal, DeleteOrderModal, ConfirmOrderModal } from "./AvailableModals";
export { ModalWithFooter, ModalWithoutFooter, type ModalWrapperProps } from "./Modal";
