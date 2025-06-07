'use client'

import { useState, useEffect, useRef } from "react"
import { SearchIcon } from "lucide-react"
import { publicDocumentsNameId } from "@/data/document"

type Doc = {
  id: string
  name: string
}

export function SearchBar() {
  const [search, setSearch] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [docs, setDocs] = useState<Doc[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchDocs = async () => {
      const docs = await publicDocumentsNameId()
      setDocs(docs)
    }
    fetchDocs()
  }, [])

  const filtered = docs.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white">
        <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 150)
          }}
          className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
        />
      </div>

      {showDropdown && search && (
        <ul className="absolute z-10 mt-2 w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-y-auto text-sm">
          {filtered.length === 0 ? (
            <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
              No results found.
            </li>
          ) : (
            filtered.map((doc) => (
              <li
                key={doc.id}
                onMouseDown={() => {
                  window.location.href = `/${doc.id}`
                }}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition"
              >
                {doc.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
