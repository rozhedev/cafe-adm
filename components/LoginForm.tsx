"use client";

import React, { ChangeEvent, FC, useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { AuthForm } from "@/ui";
import { UI_CONTENT } from "@/data/init-data";

type TLoginForm = {
    registerRoute?: string;
};

const FORM_INIT_VALUES = {
    name: "",
    password: "",
};

export const LoginForm: FC<TLoginForm> = ({ registerRoute = "" }) => {
    const router = useRouter();
    const pathname = usePathname();

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

            pathname === "/admin/auth" ? router.push("/admin/dashboard") : router.push("/dashboard");
            router.refresh();
        } catch (error) {
            console.log(error);
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
            {error && <small className="text-red-600 font-semibold">{UI_CONTENT.err.invalidAuthCredentials}</small>}
            <div>
                <button
                    type="submit"
                    className="btn btn--auth"
                    disabled={isLoading}
                >
                    {isLoading ? UI_CONTENT.btn.login.loading : UI_CONTENT.btn.login.default}
                </button>

                {registerRoute && (
                    <Link
                        href={registerRoute}
                        className="block mt-4 text-center"
                    >
                        Ещё нету аккаунта? <span className="underline font-semibold cursor-pointer">Зарегистрироватся</span>
                    </Link>
                )}
            </div>
        </form>
    );
};
