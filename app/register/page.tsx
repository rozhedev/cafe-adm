import { RegisterForm } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { AuthWrapper } from "@/ui";

export default async function Register() {
    const session = await getServerSession(authOptions);
    if (session) redirect("/dashboard");

    return (
        <main>
            <AuthWrapper title="Register new user">
                <RegisterForm
                    apiRoute="/api/register"
                    authRoute="/"
                />
            </AuthWrapper>
        </main>
    );
}
