import { DefaultSession } from "next-auth";
import { ROLES } from '../data/init-data';

declare module "next-auth" {
    interface Session {
        user: {
            role: string;
        } & DefaultSession[ROLES.user];
    }

    interface User {
        role: string;
    }
}
