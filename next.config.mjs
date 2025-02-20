/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    // async headers() {
    //     return [
    //         {
    //             // Applied for all API Routes
    //             source: "/app/api/:path*",
    //             headers: [
    //                 {
    //                     key: "Cache-Control",
    //                     value: "no-store, no-cache, must-revalidate, proxy-revalidate",
    //                 },
    //                 {
    //                     key: "Pragma",
    //                     value: "no-cache",
    //                 },
    //                 {
    //                     key: "Expires",
    //                     value: "0",
    //                 },
    //             ],
    //         },
    //     ];
    // },
};

export default nextConfig;
