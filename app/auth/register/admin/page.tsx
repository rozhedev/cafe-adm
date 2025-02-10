"use client";
import { AuthWrapper } from "@/ui";
import { RegisterForm } from "@/components/RegisterForm";
import { ROLES } from '@/data';

export default function AdminRegistration() {
    return (
        <AuthWrapper title="Зарегистрировать админа">
            <RegisterForm role={ROLES.admin}/>
        </AuthWrapper>
    );
}
