"use server"

import { incr } from "@/actions/incr";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DocumentTable } from "@/components/doc-table";
import { views } from "@/data/view";
import { headers } from "next/headers";

export default async function Home() {
  const userAgent = (await headers()).get("user-agent");
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent ?? "")

  await incr("home", isMobile);
  const viewers = await views("home", 90);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <ChartAreaInteractive isMobile={isMobile} viewers={viewers}/>
          <DocumentTable />
        </div>
      </div>
    </div>
  )
}