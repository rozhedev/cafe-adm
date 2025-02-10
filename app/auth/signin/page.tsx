"use client";
import { AuthWrapper } from "@/ui";
import { LoginForm } from "@/components/LoginForm";
import { ROUTES } from '@/data';

export default function SignIn() {
    return (
        <AuthWrapper title="Войти в кабинет">
            <LoginForm registerRoute={ROUTES.registerUser} />
        </AuthWrapper>
    );
}
