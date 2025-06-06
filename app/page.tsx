import { HashtagList } from "@/components/hshtage-list";
import { publicDocuments } from "@/data/document"
import Link from "next/link";

export default async function Home() {
  const documents = await publicDocuments();

  return (<div className="min-h-screen">
    <div className="max-w-4xl mx-auto">
      <header className="justify-center text-3xl font-semibold mb-2">Home</header>
      {documents?.map((doc) => (
        <Link key={doc.id} href={`/${doc.id}`}>
          <div
            className="mt-6 rounded-lg border border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {doc.name}
            </h3>
            <p className="mt-2 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-3 py-1 text-sm font-medium">
              {doc.content[0]?.content.slice(0, 100).replace(/<[^>]*>/g, "")}...
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Created at: {new Date(doc.createdAt).toLocaleString()}
            </p>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.76 0 5.299.904 7.379 2.43M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Created by <span className="font-medium">{doc.user?.name ?? "Unknown"}</span>
            </p>
            <HashtagList doc={doc}/>
          </div>
        </Link>
      ))}
    </div>
  </div>

  )
}