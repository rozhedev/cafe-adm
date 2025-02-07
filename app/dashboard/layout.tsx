import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { ROLES, ROUTES, APP_NAME, userLinksArr } from "@/data/init-data";
import { Navbar } from '@/ui/Navbar';

export default async function UserDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    if (!session) redirect(ROUTES.signin);
    if (session.user.role === ROLES.admin) redirect(ROUTES.admDash);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                title={APP_NAME}
                linksArr={userLinksArr}
            />
            <div className="mx-auto my-12">
                <div className="m-auto flex flex-col items-center mt-16 xl:mt-32 lg:mt-24 md:mt-20 gap-4 max-w-[420px] lg:max-w-screen-xl md:max-w-screen-lg sm:max-w-screen-md">{children}</div>
            </div>
        </div>
    );
}
