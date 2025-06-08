import DocPagination from "@/components/doc-pagination";

export default async function RecentPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="justify-center text-3xl font-semibold mb-2">Recent</header>
        <DocPagination pageSize={4} searchParam={"rpage"}/>

      </div>
    </div>
  )
}
