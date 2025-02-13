import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { UserOrdersProvider } from "@/providers";
import { ROLES, ROUTES, APP_NAME, userLinksArr } from "@/data";
import { Navbar } from "@/ui";

export default async function UserDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    if (!session) redirect(ROUTES.signin);
    if (session.user.role === ROLES.admin) redirect(ROUTES.admDash);

    return (
        <UserOrdersProvider>
            <div className="min-h-screen bg-gray-50">
                <Navbar
                    title={APP_NAME}
                    linksArr={userLinksArr}
                />
                <div className="mx-auto flex flex-col items-center lg:mt-12 mt-8 gap-4 max-w-[420px] lg:max-w-screen-xl md:max-w-screen-lg sm:max-w-screen-md">{children}</div>
            </div>
        </UserOrdersProvider>
    );
}
