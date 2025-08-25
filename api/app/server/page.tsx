// app/server/page.tsx
export default async function ServerPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div>
      <h1>📌 Server Rendered Posts</h1>
      <ul>
        {posts.slice(0, 5).map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
