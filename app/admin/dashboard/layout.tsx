import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { ROLES, ROUTES, APP_NAME, adminLinksArr } from "@/data";
import { Navbar } from "@/ui";

export default async function AdmDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    if (!session) redirect(ROUTES.signin);
    if (session.user.role !== ROLES.admin) redirect(ROUTES.dash);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                title={APP_NAME}
                linksArr={adminLinksArr}
            />
            <div className="mx-auto my-12 px-3">
                <div className="mx-auto flex flex-col items-center gap-4 max-w-[420px] lg:max-w-screen-xl md:max-w-screen-lg sm:max-w-screen-md">{children}</div>
            </div>
        </div>
    );
}
