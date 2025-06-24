"use client"

import { incr } from "@/actions/incr";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DocumentTable } from "@/components/doc-table";
import { useMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const isMobile = useMobile();
  useEffect(() => {
    async function trackPageView() {
      try {
        const result = await incr("home", isMobile);

        if (result.error) {
          toast.error(result.error);
        } else if (result.message) {
          toast.success(result.message);
        }

      } catch (err) {
        toast.error(`Something went wrong!:${err}`)
      }
    }

    trackPageView();
  }, []);
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <ChartAreaInteractive />
          <DocumentTable />
        </div>
      </div>
    </div>
  )
}