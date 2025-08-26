// app/hybrid/page.tsx

import { getPosts, type Post } from "../lib/api";
import PostsTable from "./PostsTable";

export default async function HybridPage() {
  const posts: Post[] = await getPosts(); // fetch on server
  return (
    <div className="space-y-4 m-10 p-4">
      <h1 className="text-xl font-semibold">📌 Hybrid (Server + Client)</h1>
      <PostsTable posts={posts} />
    </div>
  );
}
