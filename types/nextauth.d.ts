import { DefaultSession } from "next-auth";
import { ROLES } from '@/data/init-data';
import { TOrderArr } from ".";

declare module "next-auth" {
    interface Session {
        user: {
            role: string;
            balance: number;
        } & DefaultSession[ROLES.user];
    }

    interface User {
        role: string;
        balance: number;
    }
}
