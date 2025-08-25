// lib/api.ts
import "server-only";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
