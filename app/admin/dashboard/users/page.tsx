"use client";
import React, { useContext, useEffect, useState, type FormEvent } from "react";
import { TUsersInfoContextState, UsersInfoContext } from "@/providers";
import { BooleanValObjMap, TUserInfo } from "@/types";
import { EDIT_USER_MODALS_INIT, userInfoColumns, editUserActionOptions, ModalIds, ROUTES, UI_CONTENT } from "@/data";
import { fetchDataByRoute } from "@/helpers";
import { FormController, ModalWithoutFooter } from "@/ui";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { useToast } from "@/components/Toast";

export default function Users() {
    const { addToast } = useToast();

    const [usersInfo, setUsersInfo] = useContext(UsersInfoContext) as TUsersInfoContextState;
    const [userId, setUserId] = useState<string>("");
    const [balance, setBalance] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(EDIT_USER_MODALS_INIT);

    // * Data fetching
    useEffect(() => {
        fetchDataByRoute(
            ROUTES.getUsersRole,
            {
                method: "GET",
                next: { revalidate: 1200 }, // revalidate every 2 minutes
            },
            setUsersInfo
        );
    }, []);
    const handleTableUpdate = () => {
        fetchDataByRoute(
            ROUTES.getUsersRole,
            {
                method: "GET",
                next: { revalidate: 1200 },
            },
            setUsersInfo
        );
    };

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
                setIsModalOpen(EDIT_USER_MODALS_INIT);
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
        if (action === ModalIds.balance) {
            setIsModalOpen({ ...EDIT_USER_MODALS_INIT, [ModalIds.balance]: true });
        }
    };

    // * -----------------------------
    return (
        <div className="w-[50%]">
            <div className="form-elem-size">
                <button
                    type="button"
                    className="max-w-48 my-4 btn--sm btn--auth"
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
            <ModalWithoutFooter
                title="Изменить баланс"
                onClose={() => setIsModalOpen({ ...isModalOpen, [ModalIds.balance]: false })}
                isOpen={isModalOpen[ModalIds.balance]}
            >
                <form onSubmit={handleEditBalance}>
                    <FormController
                        htmlLabel="Введите новый баланс"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />
                    <div className="form-elem-size">
                        <button
                            type="submit"
                            className="mt-4 btn btn--auth"
                        >
                            {isLoading ? UI_CONTENT.btn.editBalance.loading : UI_CONTENT.btn.editBalance.default}
                        </button>
                    </div>
                </form>
            </ModalWithoutFooter>
        </div>
    );
}
