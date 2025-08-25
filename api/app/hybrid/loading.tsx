// app/hybrid/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-3">
      <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
      <div className="h-9 w-80 bg-gray-200 rounded animate-pulse" />
      <div className="h-64 w-full bg-gray-200 rounded animate-pulse" />
    </div>
  );
}
