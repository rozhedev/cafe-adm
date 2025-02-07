"use client";
import { AuthWrapper } from "@/ui/AuthWrapper";
import { LoginForm } from "@/components/LoginForm";
import { ROUTES } from '@/data/init-data';

export default function SignIn() {
    return (
        <AuthWrapper title="Войти в кабинет">
            <LoginForm registerRoute={ROUTES.registerUser} />
        </AuthWrapper>
    );
}
