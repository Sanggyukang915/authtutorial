import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { OAuthConfig } from "next-auth/providers";

const KakaoProvider: OAuthConfig<any> = {
    id: "kakao",
    name: "Kakao",
    type: "oauth",
    authorization: {
        url: "https://kauth.kakao.com/oauth/authorize",
        params: { scope: "profile_nickname" },
    },
    token: "https://kauth.kakao.com/oauth/token",
    userinfo: "https://kapi.kakao.com/v2/user/me",
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    async profile(profile: any) {
        return {
            id: profile.id.toString(),
            name: profile.kakao_account?.profile?.nickname ?? null,
            email: profile.kakao_account?.email ?? null,
            image: profile.kakao_account?.profile?.profile_image_url ?? null,
        };
    },
};

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        KakaoProvider,
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const { email, password } = validateFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );
                    if (passwordMatch) return user;
                }
                return null;
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig