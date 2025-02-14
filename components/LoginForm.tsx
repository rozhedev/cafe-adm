"use client";
import React, { ChangeEvent, FC, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthSwitch, FormController } from "@/ui";
import { UI_CONTENT, AUTH_FORM_INIT } from "@/data";

type TLoginForm = {
    registerRoute?: string;
};

export const LoginForm: FC<TLoginForm> = ({ registerRoute = "" }) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(AUTH_FORM_INIT);
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
                setFormData(AUTH_FORM_INIT);
                setIsLoading(false);
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            setFormData(AUTH_FORM_INIT);
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
            <FormController
                htmlLabel="Логин"
                id="login"
                name="login"
                type="text"
                required
                placeholder="team_manager"
                minLength={5}
                aria-label="Логин"
                value={formData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
            />
            <FormController
                htmlLabel="Пароль"
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                minLength={8}
                aria-label="Пароль"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
            />

            {error && <small className="err-output">{UI_CONTENT.err.auth.invalidCredentials}</small>}
            <div>
                <button
                    type="submit"
                    className="btn btn--accent"
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
