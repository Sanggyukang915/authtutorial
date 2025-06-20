"use client"

import { incr } from "@/actions/incr";
import { DocumentTable } from "@/components/doc-table";
import { views } from "@/data/view";
import { useMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Viewers {
  mobileViewers: number;
  desktopViewers: number;
}

export default function Home() {
  const isMobile = useMobile();
  const [viewers, setViewers] = useState<Viewers>({ mobileViewers: 0, desktopViewers: 0 });
  useEffect(() => {
    async function trackPageView() {
      try {
        const result = await incr("home",isMobile);

        if (result.error) {
          toast.error(result.error);
        } else if (result.message) {
          toast.success(result.message);
        }

        const viewers = await views("home");
        setViewers(viewers);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }

    trackPageView();
  }, []);
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div>{viewers?.desktopViewers}</div>
          <div>{viewers?.mobileViewers}</div>
          <DocumentTable />
        </div>
      </div>
    </div>
  )
}