"use client";
import React, { useState } from "react";
import { BooleanValObjMap, TUserInfo } from "@/types";
import { EDIT_USER_MODALS_INIT, userInfoColumns, editUserActionOptions, ModalIds } from "@/data";
import { ModalWithoutFooter } from "@/ui";
import { ResponsiveTable } from "@/components/AdaptiveTable";

export default function Users() {
    const [userId, setUserId] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<BooleanValObjMap>(EDIT_USER_MODALS_INIT);

    const users: TUserInfo[] = [
        {
            _id: "1234" as any,
            name: "Дима ИФ",
            balance: 100,
            activeOrders: 2,
        },
        {
            _id: "4321" as any,
            name: "Даша ТИ",
            balance: 150,
            activeOrders: 3,
        },
    ];
    const handleAction = (action: string, item: TUserInfo) => {
        const id = String(item._id) || "";
        setUserId(id);
        if (action === ModalIds.balance) {
            setIsModalOpen({ ...EDIT_USER_MODALS_INIT, [ModalIds.balance]: true });
        }
    };
    return (
        <div>
            <ResponsiveTable
                dropdownLabel="Действия"
                columns={userInfoColumns}
                data={users}
                onAction={handleAction}
                options={editUserActionOptions}
            />
            <ModalWithoutFooter
                title="Введите новый баланс"
                onClose={() => setIsModalOpen({ ...isModalOpen, [ModalIds.balance]: false })}
                isOpen={isModalOpen[ModalIds.balance]}
            >
                <div className="my-4">Введите новый баланс</div>
                <div>{userId}</div>
            </ModalWithoutFooter>
        </div>
    );
}
