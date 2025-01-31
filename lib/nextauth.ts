import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NEXTAUTH_SECRET } from "@/data/env";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            // * credentials - library arg. Use any for prevent errors
            async authorize(credentials: any) {
                const { name, password }: any = credentials;
                try {
                    await connectDB();
                    const user = await User.findOne({ name });
                    if (!user) return null;

                    const isDehashedPassMatch = await bcrypt.compare(password, user.password);
                    if (!isDehashedPassMatch) return null;

                    return user;
                } catch (error) {
                    console.error("Error:", error);
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
    },
};