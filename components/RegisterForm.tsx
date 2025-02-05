"use client";

import React, { useState, ChangeEvent, SyntheticEvent, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/ui";
import { UI_CONTENT } from "@/data/init-data";

const INIT_FORM_VALUES = {
    name: "",
    password: "",
};

export const RegisterForm: FC<{}> = ({}) => {
    const [formData, setFormData] = useState<Record<"name" | "password", string>>(INIT_FORM_VALUES);
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.password) {
            setError(UI_CONTENT.err.requiredFields);
            return;
        }
        try {
            setIsLoading(true);
            // * Register responce
            const registerRes = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const { existUser } = await registerRes.json();

            // * Check exist user
            if (existUser) {
                setError(UI_CONTENT.err.userExist);
                setIsLoading(false);
                return;
            }
            if (registerRes.ok || !existUser) {
                setFormData(INIT_FORM_VALUES);
                setError("");
                setIsLoading(false);
                router.push("/");
            } else {
                console.log("User registartion failed.");
            }
        } catch (error) {
            console.error("Error during registration: ", error);
        }
    };

    return (
            <form
                className="space-y-6"
                method="POST"
                onSubmit={handleSubmit}
            >
                <AuthForm
                    loginOnChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    loginVal={formData.name}
                    passwordOnChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                    passwordVal={formData.password}
                />
                <div>
                    <button
                        type="submit"
                        className="btn btn--auth"
                        disabled={isLoading}
                    >
                        {isLoading ? UI_CONTENT.btn.register.loading : UI_CONTENT.btn.register.default}
                    </button>

                    {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>}

                    <Link
                        href={"/"}
                        className="block mt-4 text-center"
                    >
                        Уже есть аккаунт? <span className="underline font-semibold cursor-pointer">Войти</span>
                    </Link>
                </div>
            </form>
    );
};
