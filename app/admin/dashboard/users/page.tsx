"use client";
import React, { useState, type FormEvent } from "react";
import { useUsersInfo } from "@/providers";
import { TUserInfo } from "@/types";
import { userInfoColumns, editUserActionOptions, ModalIds, ROUTES, UI_CONTENT } from "@/data";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { useToast } from "@/components/Toast";
import { useModal } from "@/components/Modal";
import { EditBalanceModal } from "@/components/Modal/AvailableModals";

export default function Users() {
    const { addToast } = useToast();
    const { openModal: openBalanceModal, closeModal: closeBalanceModal } = useModal(ModalIds.editBalance);
    const [usersInfo, , refreshUsersInfo] = useUsersInfo();

    const [userId, setUserId] = useState<string>("");
    const [balance, setBalance] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // * Data fetching
    const handleTableUpdate = () => refreshUsersInfo();

    // * Edit balance
    const handleEditBalance = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(ROUTES.editUser, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, balance }),
            });
            if (res.ok) {
                addToast(UI_CONTENT.success.balanceChanged, "success");
                setBalance("");
                closeBalanceModal();
                return;
            }
            addToast(UI_CONTENT.err.balanceChanged, "error");
        } catch (error) {
            console.error("Edit user balance error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = (action: string, item: TUserInfo) => {
        const id = String(item._id) || "";
        setUserId(id);

        if (action === ModalIds.editBalance) openBalanceModal();
    };

    // -----------------------------
    return (
        <div className="w-[50%]">
            <div className="form-elem-size">
                <button
                    type="button"
                    className="max-w-48 my-4 btn--sm btn--accent"
                    onClick={handleTableUpdate}
                >
                    {UI_CONTENT.btn.update.default}
                </button>
            </div>
            <ResponsiveTable
                dropdownLabel="Действия"
                columns={userInfoColumns}
                data={usersInfo}
                onAction={handleAction}
                options={editUserActionOptions}
            />
            <EditBalanceModal
                title={UI_CONTENT.confirmAction.edit.balance}
                onClose={closeBalanceModal}
                onSubmit={handleEditBalance}
                htmlLabel={UI_CONTENT.confirmActionDescr.edit.balance}
                balance={balance}
                onBalanceChange={(e: any) => setBalance(e.target.value)}
                label={isLoading ? UI_CONTENT.btn.editBalance.loading : UI_CONTENT.btn.editBalance.default}
            />
        </div>
    );
}
