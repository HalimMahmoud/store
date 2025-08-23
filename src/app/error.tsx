"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6 text-red-600">
      <p>⚠️ Failed to load products: {error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  );
}
