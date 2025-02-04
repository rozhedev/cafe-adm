import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { LoginForm } from "@/components";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) redirect("/dashboard/orders");

    return (
        <main>
            <LoginForm />
        </main>
    );
}
