import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { ROLES, APP_NAME, ROUTES, publicLinksArr } from "@/data";
import { Navbar } from "@/ui";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) {
        if (session.user.role === ROLES.user) redirect(ROUTES.dash);
        if (session.user.role === ROLES.admin) redirect(ROUTES.admDash);
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                title={APP_NAME}
                linksArr={publicLinksArr}
            />
            <main className="mx-auto my-12 px-12 py-6">
                <div className="m-auto flex flex-col items-center mt-6">
                    <h1 className="font-bold leading-snug tracking-normal text-slate-800 my-3 w-full text-lg lg:max-w-xl lg:text-2xl">Меню</h1>
                </div>
            </main>
        </div>
    );
}
