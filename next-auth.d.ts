import { Project, Team, UserRole, Document } from "@prisma/client"
import NextAuth, {type DefaultSession} from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    teams: Team[];
    projects: Project[];
    documents: Document[];
}

declare module "next-auth" {
    interface Session{
        user: ExtendedUser
    }
}