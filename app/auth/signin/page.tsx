"use client";
import { AuthWrapper } from "@/ui/AuthWrapper";
import { LoginForm } from "@/components/LoginForm";

export default function SignIn() {
    return (
        <AuthWrapper title="Войти в кабинет">
            <LoginForm registerRoute="/auth/register/user" />
        </AuthWrapper>
    );
}
