// ! Middleware must export default f(x)
export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/dashboard/:path*", "/admin/dashboard/:path*"],
};
