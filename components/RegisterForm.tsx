"use client";
import React, { useState, ChangeEvent, FC } from "react";
import { useRouter } from "next/navigation";
import { UI_CONTENT, INIT_FORM_DATA, RolesUnion } from "@/data/init-data";
import { AuthForm, AuthSwitch } from "@/ui";

type RegisterFormProps = {
    authRoute?: string;
    role: RolesUnion;
};

export const RegisterForm: FC<RegisterFormProps> = ({ role, authRoute = "" }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(INIT_FORM_DATA);
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
                setFormData(INIT_FORM_DATA);
                return;
            }
            if (res.ok) {
                setIsLoading(false);
                setFormData(INIT_FORM_DATA);
                router.push("/auth/signin");
            }
        } catch (error) {
            setError("Возникла ошибка, попробуйте снова");
            setFormData(INIT_FORM_DATA);
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
