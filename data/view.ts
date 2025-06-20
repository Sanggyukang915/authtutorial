"use server";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const views = async (id: string) => {
    const mobileViewers = (await redis.get<number>(["pageviews", "docuemnts", id,"mobile"].join(":"))) ?? 0;
    const desktopViewers = (await redis.get<number>(["pageviews", "docuemnts", id,"desktop"].join(":"))) ?? 0;
    return {mobileViewers: mobileViewers, desktopViewers: desktopViewers}
}