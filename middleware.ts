import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ROLES } from '@/data/init-data';

export default withAuth(
    function middleware(req) {
        const { token } = req.nextauth;
        const { pathname } = req.nextUrl;

        if (pathname.startsWith("/admin") && token?.role !== ROLES.admin) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};
