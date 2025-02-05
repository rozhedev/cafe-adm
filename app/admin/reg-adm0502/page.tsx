import { RegisterForm } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { AuthWrapper } from "@/ui";

export default async function Register() {
    const session = await getServerSession(authOptions);
    if (session) {
        const role = session?.user as any;
        if (role === "admin") redirect("/admin/dashboard");
    }
    return (
        <main>
            <AuthWrapper title="Register new admin">
                <RegisterForm
                    apiRoute="/admin/add-adm0502"
                    authRoute="/admin/auth"
                />
            </AuthWrapper>
        </main>
    );
}
