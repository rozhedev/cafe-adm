import { APP_NAME, publicLinksArr, ROLES, ROUTES } from "@/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/ui";
import { authOptions } from "@/lib/nextauth";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
            <div className="mx-auto">
                <div className="my-12">
                    <div className="m-auto flex flex-col items-center mt-16 xl:mt-32 lg:mt-24 md:mt-20">{children}</div>
                </div>
            </div>
        </div>
    );
}
