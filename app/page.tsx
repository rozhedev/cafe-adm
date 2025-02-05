import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { LoginForm } from "@/components";
import { AuthWrapper } from "@/ui";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) redirect("/dashboard/orders");

    return (
        <main>
            <AuthWrapper title="Welcome to the Cafe">
                <LoginForm registerRoute="/register" />
            </AuthWrapper>
        </main>
    );
}
