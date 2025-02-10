"use client";
import { RegisterForm } from "@/components/RegisterForm";
import { AuthWrapper } from "@/ui";
import { ROLES, ROUTES } from '@/data';

export default function UserRegistration() {
    return (
        <AuthWrapper title="Зарегистрировать пользователя">
            <RegisterForm role={ROLES.user} authRoute={ROUTES.signin}/>
        </AuthWrapper>
    );
}
