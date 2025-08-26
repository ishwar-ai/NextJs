// app/hybrid/PostsTable.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import type { Post } from "../lib/api";

type Props = { posts: Post[] };

export default function PostsTable({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.body].some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, query]);

  useEffect(() => {
    // Reset to first page on new query
    setPage(1);
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filtered.length);
  const pageItems = filtered.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="border px-3 py-2 rounded hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b p-2 text-left">ID</th>
              <th className="border-b p-2 text-left">Title</th>
              <th className="border-b p-2 text-left">Body</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p) => (
              <tr key={p.id} className="odd:bg-white even:bg-gray-50">
                <td className="border-t p-2 align-top whitespace-nowrap">{p.id}</td>
                <td className="border-t p-2 align-top font-medium">{p.title}</td>
                <td className="border-t p-2 align-top">{p.body}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-500">
          {filtered.length > 0
            ? `Showing ${startIndex + 1}–${endIndex} of ${filtered.length}${filtered.length !== posts.length ? ` (filtered from ${posts.length})` : ""}`
            : `Showing 0 of ${posts.length}`}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="border px-3 py-1 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="border px-3 py-1 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
