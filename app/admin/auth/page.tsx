import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { LoginForm } from "@/components";
import { AuthWrapper } from '@/ui';

export default async function AdminAuth() {
    const session = await getServerSession(authOptions);
    if (session) redirect("/admin/dashboard");

    return (
        <main>
            <AuthWrapper title="Cafe Admin">
                <LoginForm />
            </AuthWrapper>
        </main>
    );
}
