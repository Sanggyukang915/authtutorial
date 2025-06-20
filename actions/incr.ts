"use server";

import { headers } from "next/headers";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function incr(id: string, isMobile: boolean) {
    if (!id) {
        return { error: "Slug not found" };
    }

    const forwardedFor = (await headers()).get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim();

    if (ip) {
        const buf = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(ip)
        );
        const hash = Array.from(new Uint8Array(buf))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        const key = `deduplicate:${hash}:${id}`;
        const isNew = await redis.set(key, true, {
            nx: true,
            ex: 60 * 60 * 24,
        });

        if (!isNew) {
            return { message: "Already counted" };
        }
    }
    if (isMobile) await redis.incr(`pageviews:docuemnts:${id}:mobile`);
    else await redis.incr(`pageviews:docuemnts:${id}:desktop`)
    return { message: "Counted" };
}
