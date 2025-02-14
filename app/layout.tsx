import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { APP_NAME } from "@/data";
import { AuthProvider, DishesProvider } from "@/providers";
import { ToastProvider } from "@/components/Toast";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: APP_NAME,
    description: `${APP_NAME} dashboard`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ToastProvider>
                    <AuthProvider>
                        <DishesProvider>{children}</DishesProvider>
                    </AuthProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
