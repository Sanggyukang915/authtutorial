"use server"

import { DocumentTable } from "@/components/doc-table";
import { publicTrendDocuments } from "@/data/document";

export default async function TrendingPage() {
  const docs = await publicTrendDocuments();
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DocumentTable doc={docs}/>
        </div>
      </div>
    </div>
  )
}
