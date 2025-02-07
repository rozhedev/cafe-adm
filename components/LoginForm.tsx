"use client";
import React, { ChangeEvent, FC, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthForm, AuthSwitch } from "@/ui";
import { UI_CONTENT, INIT_FORM_DATA } from "@/data/init-data";

type TLoginForm = {
    registerRoute?: string;
};

export const LoginForm: FC<TLoginForm> = ({ registerRoute = "" }) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(INIT_FORM_DATA);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await signIn("credentials", {
                name: formData.name,
                password: formData.password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
                setFormData(INIT_FORM_DATA);
                setIsLoading(false);
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            setFormData(INIT_FORM_DATA);
            setIsLoading(false);
            console.error("Login error:", error);
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
            {error && <small className="err-output">{UI_CONTENT.err.invalidAuthCredentials}</small>}
            <div>
                <button
                    type="submit"
                    className="btn btn--auth"
                    disabled={isLoading}
                >
                    {isLoading ? UI_CONTENT.btn.login.loading : UI_CONTENT.btn.login.default}
                </button>

                {registerRoute && (
                    <AuthSwitch
                        ctaLabel={"Ещё нету аккаунта?"}
                        authLabel={"Зарегистрироватся"}
                        route={registerRoute}
                    />
                )}
            </div>
        </form>
    );
};
