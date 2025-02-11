"use client";
import React, { useEffect, useState, type FormEvent } from "react";
import { BooleanValObjMap, TUserInfo } from "@/types";
import { EDIT_USER_MODALS_INIT, userInfoColumns, editUserActionOptions, ModalIds, ROUTES, UI_CONTENT } from "@/data";
import { FormController, ModalWithoutFooter } from "@/ui";
import { ResponsiveTable } from "@/components/ResponsiveTable";

export default function Users() {
    const [userId, setUserId] = useState<string>("");
    const [balance, setBalance] = useState<string>("");
    const [editStatus, setEditStatus] = useState<string>("");

    const [usersList, setUsersList] = useState<TUserInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(EDIT_USER_MODALS_INIT);

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
                setEditStatus("Баланс изменён");
                setBalance("");
                return;
            }
            setEditStatus("Ошибка при изменении баланса");
        } catch (error) {
            console.error("Edit user balance error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // --> Data fetching
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(ROUTES.getUsersRole, {
                    method: "GET",
                    next: { revalidate: 1200 }, // revalidate every 2 minutes
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setUsersList([...data]);
            } catch (error) {
                console.error("Get dish list error:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleAction = (action: string, item: TUserInfo) => {
        const id = String(item._id) || "";
        setUserId(id);
        if (action === ModalIds.balance) {
            setIsModalOpen({ ...EDIT_USER_MODALS_INIT, [ModalIds.balance]: true });
        }
    };

    // * -----------------------------
    return (
        <div>
            <ResponsiveTable
                dropdownLabel="Действия"
                columns={userInfoColumns}
                data={usersList}
                onAction={handleAction}
                options={editUserActionOptions}
            />
            <ModalWithoutFooter
                title="Изменить баланс"
                onClose={() => setIsModalOpen({ ...isModalOpen, [ModalIds.balance]: false })}
                isOpen={isModalOpen[ModalIds.balance]}
            >
                <form onSubmit={handleEditBalance}>
                    {editStatus && <div className="form-elem-size border-2 border-blue-300 rounded-lg shadow-md font-medium bg-blue-200 text-blue-800 p-3">{editStatus}</div>}
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
