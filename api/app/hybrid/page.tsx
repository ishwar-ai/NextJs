// app/hybrid/page.tsx

import { getPosts } from "../lib/api";
import PostsTable from "./PostsTable";

export default async function HybridPage() {
  const posts = await getPosts(); // fetch on server
  return (
    <div>
      <h1>📌 Hybrid (Server + Client)</h1>
      <PostsTable posts={posts} />
    </div>
  );
}
