import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { Navbar } from "@/ui";
import { userLinksArr, APP_NAME, ROLES } from "@/data/init-data";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/signin");

    if (session.user.role === ROLES.admin) redirect("/admin/dashboard");

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                title={APP_NAME}
                linksArr={userLinksArr}
            />

            <div className="max-w-screen-xl mx-auto">
                <div className="my-12">
                    <div className="m-auto flex flex-col items-center mt-6 gap-4 max-w-[420px]">{children}</div>
                </div>
            </div>
        </div>
    );
}
