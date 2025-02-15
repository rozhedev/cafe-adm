import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@/models";
import { connectDB } from "@/lib/mongodb";
import { ROUTES } from "@/data";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.name || !credentials?.password) {
                    throw new Error("Please provide all required fields");
                }

                await connectDB();

                const user = await User.findOne({ name: credentials.name });

                if (!user) {
                    throw new Error("User not found");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    role: user.role,
                    balance: user.balance,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user.id;
                token.role = user.role;
                token.balance = user.balance;
            }
            return token;
        },
        async session({ session, token }) {
            // Modify user balance in session when balance update on server
            if (session?.user) {
                const user = await User.findById(token.sub);
                session.user.balance = user.balance;
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token._id,
                    role: token.role,
                },
            }
           
        },
    },
    pages: {
        signIn: ROUTES.signin,
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
