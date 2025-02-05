import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Admin from "@/models/Admin";
import { NEXTAUTH_SECRET } from "@/data/env";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            // * credentials - library arg. Use any for prevent errors
            async authorize(credentials: any) {
                const { name, password } = credentials;
                if (!name || !password) return null;

                try {
                    await connectDB();

                    const [user, admin] = await Promise.all([User.findOne({ name }).select("+password"), Admin.findOne({ name }).select("+password")]);

                    if (!user && !admin) return null;

                    if (user) {
                        const isValidPassword = await bcrypt.compare(password, user.password);

                        if (isValidPassword) {
                            // * Add role for define user type
                            const userWithRole = {
                                ...user.toObject(),
                                role: "user",
                            };
                            return userWithRole;
                        }
                    }
                    if (admin) {
                        const isValidPassword = await bcrypt.compare(password, admin.password);
                        if (isValidPassword) {
                            const adminWithRole = {
                                ...admin.toObject(),
                                role: "admin",
                            };
                            return adminWithRole;
                        }
                    }
                    return null;
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Authentication failed");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        signOut: "/",
    },
};
