// app/client/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function ClientPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h1>📌 Client Fetched Posts</h1>
      <ul>
        {posts.slice(0, 5).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
