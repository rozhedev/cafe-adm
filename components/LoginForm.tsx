"use client";

import React, { ChangeEvent, FC, useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { NEXT_PUBLIC_ADMIN_LOG_CHANNEL, NEXT_PUBLIC_TG_BOT_TOKEN } from "@/data/env";
import { UI_CONTENT } from "@/data/init-data";
import { AuthForm } from "@/ui";
import { AuthWrapper } from "@/ui/AuthWrapper";

type TLoginForm = {};

const FORM_INIT_VALUES = {
    name: "",
    password: "",
};

export const LoginForm: FC<TLoginForm> = ({}) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Record<"name" | "password", string>>(FORM_INIT_VALUES);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, password } = formData;
        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                name,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials");
                setIsLoading(false);
                return;
            }
            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthWrapper>
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
                {error && <small className="text-red-600 font-semibold">{UI_CONTENT.err.invalidAuthCredentials}</small>}
                <div>
                    <button
                        type="submit"
                        className="btn btn--auth"
                        disabled={isLoading}
                    >
                        {isLoading ? UI_CONTENT.btn.login.loading : UI_CONTENT.btn.login.default}
                    </button>
                </div>
            </form>
        </AuthWrapper>
    );
};
