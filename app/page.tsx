import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { ROLES } from '@/data/init-data';

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) {
        if (session.user.role === ROLES.user) redirect("/dashboard");
        if (session.user.role === ROLES.admin) redirect("/admin/dashboard");
    }
    // TODO Сделать отображение меню
    return (
        <main className="px-12 py-6">
            <h1 className="font-bold leading-snug tracking-normal text-slate-800 my-3 w-full text-lg lg:max-w-xl lg:text-2xl">Hello, go to page using URL path:</h1>
            <ul className="p-4 list-disc list-inside bg-blue-100 rounded shadow-md">
                <li className="mb-2 text-blue-700">/auth/register/admin</li>
                <li className="mb-2 text-blue-700">/auth/register/user</li>
                <li className="mb-2 text-blue-700">/auth/signin</li>
                <li className="mb-2 text-blue-700">/dashboard</li>
                <li className="mb-2 text-blue-700">/admin/dashboard</li>
            </ul>
        </main>
    );
}
