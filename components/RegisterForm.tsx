"use client";
import React, { useState, ChangeEvent, FC } from "react";
import { useRouter } from "next/navigation";
import { UI_CONTENT, ROUTES, AUTH_FORM_INIT, RolesUnion } from "@/data/init-data";
import { AuthForm, AuthSwitch } from "@/ui";

type RegisterFormProps = {
    authRoute?: string;
    role: RolesUnion;
};

export const RegisterForm: FC<RegisterFormProps> = ({ role, authRoute = "" }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(AUTH_FORM_INIT);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    role: role,
                }),
            });

            if (res?.status === 409) {
                setError(UI_CONTENT.err.userExist);
                setIsLoading(false);
                setFormData(AUTH_FORM_INIT);
                return;
            }
            if (res.ok) {
                setIsLoading(false);
                setFormData(AUTH_FORM_INIT);
                router.push(ROUTES.signin);
            }
        } catch (error) {
            setError(UI_CONTENT.err.unknownError);
            setFormData(AUTH_FORM_INIT);
            setIsLoading(false);
            console.error("Registration error:", error);
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
            {error && <small className="err-output">{error}</small>}
            <div>
                <button
                    type="submit"
                    className="btn btn--auth"
                    disabled={isLoading}
                >
                    {isLoading ? UI_CONTENT.btn.register.loading : UI_CONTENT.btn.register.default}
                </button>

                {authRoute && (
                    <AuthSwitch
                        ctaLabel={"Уже есть аккаунт?"}
                        authLabel={"Войти"}
                        route={authRoute}
                    />
                )}
            </div>
        </form>
    );
};
