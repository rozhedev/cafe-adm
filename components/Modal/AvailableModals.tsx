import React, { type FormEvent } from "react";
import { dishFormControllers, ModalIds } from "@/data";
import { StringValObjMap } from "@/types";
import { withModalContext } from "./ModalContext";
import { DishForm } from "@/components/DishForm";
import { FormController } from "@/ui";

type DeleteModalProps = {
    title: string;
    onClose: () => void;
    isOpen: boolean;
    actionLabel: string;
    actionBtnClassname: string;
    onAction: () => void;
};

// --> Delete modals
export const DeleteDishModal = withModalContext(({ title }: DeleteModalProps) => <div className="my-4">{title}</div>, true, ModalIds.deleteDish);

export const DeleteOrderModal = withModalContext(({ title }: DeleteModalProps) => <div className="my-4">{title}</div>, true, ModalIds.deleteOrder);

// ! Don't forget adding title prop if modal doesn't contain footer
// --> Edit balance
type EditBalanceModalProps = {
    title: string;
    onSubmit: (e: FormEvent) => Promise<void>;
    htmlLabel: string;
    balance: string;
    onBalanceChange: any;
    label: string;
};

export const EditBalanceModal = withModalContext(
    ({ onSubmit, htmlLabel, balance, onBalanceChange, label }: EditBalanceModalProps) => (
        <form onSubmit={onSubmit}>
            <FormController
                htmlLabel={htmlLabel}
                value={balance}
                onChange={onBalanceChange}
            />
            <div className="form-elem-size">
                <button
                    type="submit"
                    className="mt-4 btn btn--accent"
                >
                    {label}
                </button>
            </div>
        </form>
    ),
    false,
    ModalIds.editBalance
);

// --> Edit dish
type EditDishModalProps = {
    title: string;
    confirmDescr: string;
    label: string;
    formData: StringValObjMap;
    onSubmit: (e: FormEvent<Element>) => Promise<void>;
    setEditFormData: any;
};
export const EditDishModal = withModalContext(
    ({ confirmDescr, formData, setEditFormData, label, onSubmit }: EditDishModalProps) => (
        <>
            <div className="my-4">{confirmDescr}</div>
            <DishForm
                formData={formData}
                setFormData={setEditFormData}
                onSubmit={onSubmit}
                formFields={dishFormControllers}
                label={label}
            />
        </>
    ),
    false,
    ModalIds.editDish
);

// --> Confirm order
type ConfirmOrderProps = {
    title: string;
    confirmDescr: string;
    label: string;
    inpVal: string;
    onSubmit: (e: FormEvent<Element>) => void;
    onInpChange: any;
    isLoading: boolean;
};
export const ConfirmOrderModal = withModalContext(
    ({ confirmDescr, label, inpVal, onSubmit, onInpChange, isLoading }: ConfirmOrderProps) => (
        <div className="my-4">
            <h3>{confirmDescr}</h3>
            <form
                onSubmit={onSubmit}
                className="flex flex-col items-center mt-3 gap-4"
            >
                <FormController
                    wrapperClass="w-full"
                    className="w-full"
                    htmlLabel=""
                    id="address"
                    name="address"
                    type="text"
                    required
                    placeholder="ул. Ростиславская 15..."
                    minLength={10}
                    aria-label="Адрес"
                    value={inpVal}
                    onChange={onInpChange}
                />
                <div className="w-full flex justify-around gap-4">
                    <button
                        type="submit"
                        className="flex-1 btn--sm btn--primary-blue"
                        disabled={isLoading}
                    >
                        {label}
                    </button>
                </div>
            </form>
        </div>
    ),
    false,
    ModalIds.confirmOrder
);
