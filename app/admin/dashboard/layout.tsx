import { Navbar } from "@/ui";
import { APP_NAME, adminLinksArr } from "@/data/init-data";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title={"Cafe Admin"} linksArr={adminLinksArr} />

            <div className="max-w-screen-xl mx-auto">
                <div className="my-12">
                    <div className="m-auto flex flex-col items-center mt-6 gap-4 max-w-[420px]">{children}</div>
                </div>
            </div>
        </div>
    );
}
