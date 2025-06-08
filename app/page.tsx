import DocPagination from "@/components/doc-pagination";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="justify-center text-xl font-semibold">Home</header>
        <div className="mt-4 mb-4 rounded-lg border border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg text-gray-900 dark:text-gray-100">
            I created this blog-style personal website as a space to document and store what I’ve learned and explored, so I can easily refer back to it later when needed.
            Anyone can add their own documents, share them, and also edit or delete them if necessary.
            Many features are still under development. For example, the Trending page will later incorporate a like system, the search functionality will be improved to be more effective, and I also plan to enhance the hashtag feature to make it easier for users to find content by tags.
          </h3>
        </div>
        <header className="justify-center text-xl font-semibold">Trending</header>
        <div className="mt-4 mb-4 rounded-lg border border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Not Implemented
          </h3>
        </div>
        <header className="justify-center text-xl font-semibold mb-2">Recent</header>
        <DocPagination pageSize={1} searchParam={"rpage"} />
      </div>
    </div>
  )
}