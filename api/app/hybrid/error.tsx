// app/hybrid/error.tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-3 border border-red-200 bg-red-50 p-4 rounded">
      <h2 className="font-semibold text-red-700">Something went wrong</h2>
      <pre className="text-xs whitespace-pre-wrap text-red-600">{error.message}</pre>
      <button
        onClick={() => reset()}
        className="border px-3 py-2 rounded bg-white hover:bg-gray-50"
      >
        Try again
      </button>
    </div>
  );
}
