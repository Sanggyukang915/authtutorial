"use server";

import { Redis } from "@upstash/redis";
import { format, subDays } from "date-fns";

const redis = Redis.fromEnv();

export const views = async (id: string, n: number) => {
    const now = new Date();

    const days = Array.from({ length: n }, (_, i) => {
        const day = subDays(now, n - 1 - i);
        return format(day, "MM/dd/yyyy");
    });

    const viewerPromises = days.map(async (date) => {
        const dayViewers = await redis.hgetall(`pageviews:docuemnts:${id}:${date}`);
        const mobile = Number(dayViewers?.mobile ?? 0);
        const desktop = Number(dayViewers?.desktop ?? 0);
        return { date, mobile, desktop };
    });

    const viewers = await Promise.all(viewerPromises);

    return viewers;
}