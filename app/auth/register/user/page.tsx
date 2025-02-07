"use client";
import { RegisterForm } from "@/components/RegisterForm";
import { AuthWrapper } from "@/ui/AuthWrapper";
import { ROLES, ROUTES } from '@/data/init-data';

export default function UserRegistration() {
    return (
        <AuthWrapper title="Зарегистрировать пользователя">
            <RegisterForm role={ROLES.user} authRoute={ROUTES.signin}/>
        </AuthWrapper>
    );
}
