"use server"

import { DocumentTable } from "@/components/doc-table";
import { publicRecentDocuments } from "@/data/document";

export default async function RecentPage() {
  const docs = await publicRecentDocuments();
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
