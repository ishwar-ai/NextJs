// app/hybrid/PostsTable.tsx
"use client";
import { useMemo, useState } from "react";
import type { Post } from "../lib/api";

type Props = { posts: Post[] };

export default function PostsTable({ posts }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.body].some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, query]);

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
            {filtered.map((p) => (
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
      <div className="text-xs text-gray-500">Showing {filtered.length} of {posts.length}</div>
    </div>
  );
}
